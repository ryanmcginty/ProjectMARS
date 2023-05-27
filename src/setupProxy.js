const { faGaugeSimpleMed } = require('@fortawesome/free-solid-svg-icons');
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://192.168.1.118:3000',
            secure: false,
            changeOrigin: true,
        })
    );
};