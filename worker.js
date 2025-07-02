export default {
  async fetch(request, env, ctx) {
    const response = await fetch(request);
    const contentType = response.headers.get('content-type') || '';

    if (!contentType.includes('text/html')) return response;

    let html = await response.text();

    html = html.replace(
      '</head>',
      `<link rel="manifest" href="/manifest.json">
       <script src="/pwa.js"></script></head>`
    );

    return new Response(html, {
      status: response.status,
      headers: response.headers
    });
  }
}