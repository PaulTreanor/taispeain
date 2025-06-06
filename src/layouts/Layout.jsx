export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <title>Taispeáin</title>
        <style dangerouslySetInnerHTML={{
          __html: `
            html, body {
              margin: 0;
              width: 100%;
              height: 100%;
            }
          `
        }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}