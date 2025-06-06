/**
 * GitHub API integration for fetching link blog entries from issues
 */

const GITHUB_API_BASE = 'https://api.github.com';

export async function fetchLinkEntries() {
  // Get repo info from environment or use current repo
  const owner = process.env.GITHUB_OWNER || 'paultreanor';
  const repo = process.env.GITHUB_REPO || 'taispeain';
  const token = process.env.GITHUB_TOKEN; // Optional for public repos
  
  try {
    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/issues?labels=link,published&state=open&sort=created&direction=desc`;
    
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'taispeain-link-blog'
    };
    
    // Add auth header if token is provided
    if (token) {
      headers['Authorization'] = `token ${token}`;
    }
    
    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }
    
    const issues = await response.json();
    
    // Transform GitHub issues into link entries
    return issues.map(issue => parseIssueToLinkEntry(issue));
    
  } catch (error) {
    console.error('Error fetching link entries from GitHub:', error);
    
    // Return mock data as fallback during development
    return getMockLinks();
  }
}

function parseIssueToLinkEntry(issue) {
  const body = issue.body || '';
  
  // Parse the structured issue body to extract fields
  const urlMatch = body.match(/### Link URL\s*\n\s*(.+?)(?:\n|$)/);
  const titleMatch = body.match(/### Link Title\s*\n\s*(.+?)(?:\n|$)/);
  const authorMatch = body.match(/### Author\s*\n\s*(.+?)(?:\n|$)/);
  const commentMatch = body.match(/### Your Comment\s*\n\s*([\s\S]*?)(?:\n### |$)/);
  
  return {
    id: issue.number,
    title: titleMatch ? titleMatch[1].trim() : issue.title.replace(/^\[LINK\]\s*/, ''),
    url: urlMatch ? urlMatch[1].trim() : '#',
    author: authorMatch ? authorMatch[1].trim() : issue.user.login,
    date: new Date(issue.created_at).toISOString().split('T')[0],
    comment: commentMatch ? commentMatch[1].trim() : ''
  };
}

// Fallback mock data for development
function getMockLinks() {
  return [
    {
      id: 1,
      title: "The Future of Web Development",
      url: "https://example.com/future-web-dev",
      author: "Jane Doe",
      date: "2024-01-15",
      comment: "Fascinating insights into where the web is heading. The section on distributed computing really resonated with my recent experiments."
    },
    {
      id: 2,
      title: "Understanding Celtic Typography",
      url: "https://example.com/celtic-typography",
      author: "Seán Ó Briain",
      date: "2024-01-12",
      comment: "Beautiful exploration of traditional Irish letterforms. Makes me want to redesign everything with proper respect for our heritage."
    }
  ];
}