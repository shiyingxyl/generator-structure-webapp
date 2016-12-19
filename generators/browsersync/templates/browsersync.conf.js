const conf = require('./gulp.conf');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackConf = require('./webpack.conf');
const webpackBundler = webpack(webpackConf);

const proxy = require('http-proxy-middleware');

/**
 * @return {Boolean}
 */
var filter = function(pathname, req) {
    return !(pathname.match('^/(icm/dist|modules)') && req.method === 'GET');
};

/**
 * Configure proxy middleware
 */
var jsonPlaceholderProxy = proxy(filter, {
    //target: 'http://127.0.0.1:8080',
    target: 'http://100.7.32.68',
    changeOrigin: true, // for vhosted sites, changes host header to match to target's host
    logLevel: 'debug',
    pathRewrite: {
        // '^/icm/dist': '/dist'
    },
    router: {
        // when request.headers.host == 'dev.localhost:3000',
        // override target 'http://www.example.org' to 'http://localhost:8000'
        // 'dev.localhost:3000' : 'http://localhost:8000'
    }
});

module.exports = function() {
    return {
        server: {
            baseDir: [
                conf.paths.tmp,
                conf.paths.src
            ],
            routes: {
                '/icm/dist': 'dist',
                'icm/templates': 'dist/datacenter/templates'
            },
            middleware: [
                webpackDevMiddleware(webpackBundler, {
                    // IMPORTANT: dev middleware can't access config, so we should
                    // provide publicPath by ourselves
                    //即.tmp文件夹
                    publicPath: webpackConf.output.publicPath,

                    // Quiet verbose output in console
                    quiet: true
                }),

                // bundler should be the same as above
                webpackHotMiddleware(webpackBundler)

                // jsonPlaceholderProxy
            ]
        },
        port: 3333,
        open: false
    };
};
