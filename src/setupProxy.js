const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/games/random',
    createProxyMiddleware({
      target: 'http://www.giantbomb.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api/games/random': '/api/games/?api_key=5a9aed02c512451b238b2e25ac4c739ecc8de336&format=json&resources=game'
      },
      onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('Accept-Encoding', 'gzip');
      },
    })
  );
};
