const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 3000;
const version = process.env.BUILD_SHA || process.env.COMMIT_SHA || 'dev';

function tryLoadHtmlFromTest() {
  try {
    const testPath = path.join(__dirname, 'tests', 'example.spec.js');
    if (fs.existsSync(testPath)) {
      // require the file as a module to get exported HTML string
      delete require.cache[require.resolve(testPath)];
      const exported = require(testPath);
      if (typeof exported === 'string') return exported;
      // fallback: read raw file and return wrapped in pre
      const raw = fs.readFileSync(testPath, 'utf8');
      return `<pre>${escapeHtml(raw)}</pre>`;
    }
  } catch (e) {
    console.error('Error loading test HTML:', e);
  }
  return null;
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const server = http.createServer((req, res) => {
  if (req.url === '/version') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(version + '\n');
    return;
  }

  if (req.url === '/' || req.url === '/index.html') {
    const html = tryLoadHtmlFromTest();
    if (html) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Hello from playwright-docker-demo\nVersion: ${version}\n`);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
