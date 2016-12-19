const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');
const constants = require('../constants.js');


const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');
const commonsPlugin = new webpack.optimize.CommonsChunkPlugin( {
    name: 'common'
    // chunks: ['index']
});

module.exports = {
    module: {
        loaders: [{
                test: /\.js$/,
                exclude: [/bower_components/, /node_modules/],
                loaders: [
                    'babel',
                ]
                ,
                query: {
                    retainLines: true,
                    cacheDirectory: true
                }
            },
            {
                test: /.json$/,
                loaders: [
                    'json'
                ]
            },
            {
                test: /\.(css|scss)$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style',
                    loader: 'css?minimize!sass!postcss'
                })
                // loaders: [
                //     'style',
                //     'css',
                //     'sass',
                //     'postcss'
                // ]
            },
            {
              enforce: "pre",
              test: /\.js$/,
              exclude: [/bower_components/, /node_modules/],
              //exclude: /(node_modules|bower_components)/,
              loader: "eslint-loader",
            },
            // {test: /\.html$/,   loader: "html?minimize=false"},
            // {test: /\.tpl$/, loader: "html?minimize=false"},
            {test: /\.(woff|woff2)$/,   loader: "url?limit=10000&minetype=application/font-woff&name=[path][name].[ext]"},
            {test: /\.ttf$/,    loader: "file?name=[path][name].[ext]"},
            {test: /\.eot$/,    loader: "file?&name=[path][name].[ext]"},
            {test: /\.svg$/,    loader: "file?&name=[path][name].[ext]"},

            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=1&&name=[path][name].[ext]'
                // , query: {
                    /*
                     *  limit=10000 ： 10kb
                     *  图片大小小于10kb 采用内联的形式，否则输出图片
                     * */
                    // limit: 10000,
                    // name: '/img/[name]-[hash:8].[ext]'
                // }
            }
            //{test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=1&&name=datacenter/images/[name].[ext]'}
        ]
    },
    // 表示这个依赖项是外部lib，遇到require它不需要编译，
     // 且在浏览器端对应window.React
    externals: [{
      // 'react': 'window.React',
      // 'react-bootstrap': 'window.ReactBootstrap',
      // 'jquery': 'window.jQuery'
    }],
    resolve: {
        extensions: ['', '.js', '.jsx'],
        // modulesDirectories: ["node_modules", "bower_components"],
        modules: ['node_modules', 'bower_components'],
        descriptionFiles: ['package.json', 'bower.json'],
        alias: {
            jquery: 'jquery/dist/jquery.js',
            framework7: 'framework7/dist',
            bootstrap: 'bootstrap/dist',
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
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"dev"',
            __DEVAPI__: "/devApi/"
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        commonsPlugin,
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
         /*
         * Search for equal or similar files and deduplicate them in the output
         * （删除重复依赖的文件）
         */
        // new webpack.optimize.DedupePlugin(),
        // new webpack.ResolverPlugin([
        //     new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        // ], ["normal", "loader"]),
        new HtmlWebpackPlugin({
            template: conf.path.src('index.html'),
            inject: true,
            cache: false,
            hash: true,
             // 根据依赖自动排序
            chunksSortMode: 'dependency'
        }),
        /*
         * extract css
         * （提取css文件到单独的文件中）
         */
        // new ExtractTextPlugin(devServer ? "css/[name].css" : "css/[name]-[chunkhash:8].css", {allChunks: true}),
        new ExtractTextPlugin('[name].css'),
        new webpack.HotModuleReplacementPlugin()
    ],
    // devServer: {
    //     // contentBase: conf.paths.src,
    //     // historyApiFallback: true,
    //     hot: true,
    //     inline: true,
    // },
    postcss: () => [autoprefixer],
    debug: true,
    devtool: 'source-map',
    // devtool: 'eval-source-map',
    output: {
        path: path.join(process.cwd(), conf.paths.tmp),
        // publicPath: '/icm/dist/',
        filename: "[name].js"
        /*
         * The filename of non-entry chunks as relative path inside the output.path directory.
         * （按需加载模块时输出的文件名称）
         * 适用于单页面程序
         * */
        ,chunkFilename: '[name]-[chunkhash:8].chunk.js'
    },
    entry: {
         common: ['jquery', 'bootstrap/js/bootstrap.js', 'bootstrap/css/bootstrap.css'],
         'index': [
            'webpack/hot/dev-server',
            'webpack-hot-middleware/client',
            `./${conf.path.src('index')}`
        ]
    },

   eslint: {
      configFile: './.eslintrc'
    }
};
