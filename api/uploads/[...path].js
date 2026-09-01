export default async function handler(req, res) {
  const { path } = req.query;
  const segments = Array.isArray(path) ? path.join('/') : (path || '');
  const targetUrl = 'https://api.floreiro.ru/uploads/' + segments;

  try {
    const response = await fetch(targetUrl);
    const buffer = await response.arrayBuffer();
    res.setHeader('Content-Type', response.headers.get('content-type') || 'image/jpeg');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(response.status).send(Buffer.from(buffer));
  } catch (err) {
    res.status(502).send('Proxy error');
  }
}
