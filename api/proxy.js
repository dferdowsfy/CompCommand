export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  const targetUrl = req.headers.get('x-target-url');
  if (!targetUrl) return new Response(JSON.stringify({ error: 'Missing x-target-url header' }), { status: 400 });

  const headers = new Headers(req.headers);
  headers.delete('host');
  headers.delete('x-target-url');
  headers.delete('x-forwarded-for');
  headers.delete('x-forwarded-host');
  headers.delete('x-forwarded-proto');
  headers.delete('origin');
  headers.delete('referer');

  const fetchOpts = {
    method: req.method,
    headers,
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    const rawBody = await req.arrayBuffer();
    if (rawBody.byteLength > 0) fetchOpts.body = rawBody;
  }

  try {
    const response = await fetch(targetUrl, fetchOpts);
    const resHeaders = new Headers(response.headers);
    
    resHeaders.set('Access-Control-Allow-Origin', '*');
    resHeaders.delete('content-encoding'); // Let Vercel handle compression

    return new Response(response.body, {
      status: response.status,
      headers: resHeaders,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Proxy fetch failed: ' + error.message }), {
      status: 500,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
    });
  }
}
