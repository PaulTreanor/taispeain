/**
 * Vercel webhook function to trigger rebuilds when GitHub issues are updated
 */

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify webhook secret if configured
    const webhookSecret = process.env.GITHUB_WEBHOOK_SECRET;
    if (webhookSecret) {
      const signature = req.headers['x-hub-signature-256'];
      if (!signature || !verifyWebhookSignature(req.body, signature, webhookSecret)) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
    }

    const payload = req.body;
    
    // Only rebuild for relevant issue events
    const relevantEvents = ['opened', 'edited', 'closed', 'reopened', 'labeled', 'unlabeled'];
    if (!relevantEvents.includes(payload.action)) {
      return res.status(200).json({ message: 'Event ignored' });
    }

    // Check if this is a link blog issue (has 'link' label)
    const issue = payload.issue;
    const hasLinkLabel = issue.labels.some(label => label.name === 'link');
    
    if (!hasLinkLabel) {
      return res.status(200).json({ message: 'Not a link issue, ignoring' });
    }

    // Trigger Vercel deployment using deploy hook
    const deployHookUrl = process.env.VERCEL_DEPLOY_HOOK_URL;
    if (!deployHookUrl) {
      console.warn('VERCEL_DEPLOY_HOOK_URL not configured');
      return res.status(200).json({ message: 'Deploy hook not configured' });
    }

    const deployResponse = await fetch(deployHookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!deployResponse.ok) {
      throw new Error(`Deploy hook failed: ${deployResponse.status}`);
    }

    console.log(`Triggered rebuild for issue #${issue.number}: ${issue.title}`);
    
    return res.status(200).json({ 
      message: 'Rebuild triggered successfully',
      issue: issue.number,
      action: payload.action
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

function verifyWebhookSignature(payload, signature, secret) {
  const crypto = require('crypto');
  const expectedSignature = 'sha256=' + crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}