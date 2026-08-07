// This file now exports an HTML string so the app can display it for deployment verification.
// Edit the HTML below and redeploy to see changes at http://localhost:3000/

module.exports = `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Playwright Docker Demo - Deployed Page</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 2rem; background: #f7f7f9; }
    .card { background: white; border-radius: 8px; padding: 1.5rem; box-shadow: 0 2px 6px rgba(0,0,0,0.08); }
    h1 { color: #333; }
    p { color: #555; }
    .timestamp { color: #888; font-size: 0.9rem; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Hello from playwright-docker-demo直接改main</h1>
    <p>This page is generated from <code>tests/example.spec.js</code>. Edit that file and push to trigger CI/CD — the deployed page will reflect your changes.</p>
    <p class="timestamp">Rendered at: ${new Date().toISOString()}</p>
    <p>Random tip: you can include any HTML here to verify deployment.</p>
  </div>
</body>
</html>
`;
