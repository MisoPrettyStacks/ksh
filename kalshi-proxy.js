// Optional: only needed if your browser blocks direct calls to Kalshi (CORS).
// Run:  node kalshi-proxy.js     (Node 18+). The terminal tries http://localhost:8787 automatically.
const http = require('http');
http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const r = await fetch('https://api.elections.kalshi.com' + req.url);
    res.statusCode = r.status; res.setHeader('Content-Type', 'application/json'); res.end(await r.text());
  } catch (e) { res.statusCode = 502; res.end(JSON.stringify({ error: String(e) })); }
}).listen(8787, () => console.log('Kalshi proxy listening on http://localhost:8787'));
