const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use('/map', 
        createProxyMiddleware({
            target: 'https://openapi.naver.com/v1/search/local.json',
            changeOrigin: true,
            pathRewrite: { '^/map' : '' },
        })
    );
}