export default async function handler(req, res) {
  const { path } = req.query;
  const segments = Array.isArray(path) ? path.join('/') : (path || '');
  const targetUrl = 'https://api.floreiro.ru/api/' + segments;

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: { 'Content-Type': 'application/json' },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });
    const data = await response.text();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.status(response.status).send(data);
  } catch (err) {
    res.status(502).json({ error: 'Proxy error', details: err.message });
  }
}
