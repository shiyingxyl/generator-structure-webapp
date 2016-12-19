const path = require('path');
const constants = require('../constants.js');
module.exports = {
  module: {
    preLoaders: [
        {
            test: /\.js$/,
            exclude: [/bower_components/, /node_modules/],
            loader: 'eslint'
        }
    ],

    loaders: [
        {
            test: /.json$/,
            loaders: [
              'json'
            ]
        },
        {
            test: /\.js$/,
            exclude: [/bower_components/, /node_modules/],
            loaders: [
              'babel'
            ]
        },
        {
            test: /\.js$/,
            exclude: /(node_modules|.*\.spec\.js)/,
            loader: 'isparta'
        },
        {
            test: /\.(css|scss)$/,
            loaders: [
                'style',
                'css',
                'sass'
            ]
        },
        {test: /\.html$/,   loader: "html?minimize=false"},
        {test: /\.tpl$/, loader: "html?minimize=false"},
        {test: /\.(woff|woff2)$/,   loader: "url?limit=10000&minetype=application/font-woff&name=[path][name].[ext]"},
        {test: /\.ttf$/,    loader: "file?name=[path][name].[ext]"},
        {test: /\.eot$/,    loader: "file?&name=[path][name].[ext]"},
        {test: /\.svg$/,    loader: "file?&name=[path][name].[ext]"},
        {test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=1&&name=[path][name].[ext]'}
        ]
    },
    plugins: [],
    debug: true,
    devtool: 'cheap-module-eval-source-map',
    externals: {
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        // modulesDirectories: ["node_modules", "bower_components"],
        modules: ['node_modules', 'bower_components'],
        descriptionFiles: ['package.json', 'bower.json'],
        alias: {
            jquery: 'jquery/dist/jquery.js',
            framework7: 'framework7/dist',
            styles: path.resolve(constants.ROOT_DIR, './src/scss'),
             modules: path.resolve(constants.ROOT_DIR, './src/app/modules')
            // images: path.join(constants.ROOT_DIR, "./img"),
            // fonts: path.join(constants.ROOT_DIR, "./fonts"),
            // lib: path.join(constants.ROOT_DIR, "./src/main/lib"),
            // views: path.join(constants.ROOT_DIR, "./src/webapp/views"),
            // WXUtil:  path.join(constants.ROOT_DIR, "./src/weixin/wx-util"),
            // util:  path.join(constants.ROOT_DIR, "./src/main/util"),
            // service:  path.join(constants.ROOT_DIR, "./src/main/service"),
            // widgets:  path.join(constants.ROOT_DIR, "./src/main/widgets"),
            // main:  path.join(constants.ROOT_DIR, "./src/main"),
            // wxService:path.join(constants.ROOT_DIR, "./src/weixin/service")
        }
    }
};
