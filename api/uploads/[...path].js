export default async function handler(req, res) {
  const targetUrl = 'https://api.floreiro.ru' + req.url.replace(/^\/api/, '');

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
