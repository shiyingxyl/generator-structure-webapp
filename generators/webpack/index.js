'use strict';
var path = require('path');
const generators = require('yeoman-generator');
const extend = require('lodash').merge;

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);

        this.option('generateInto', {
            type: String,
            required: false,
            defaults: '',
            desc: 'Relocate the location of the generated files.'
        });

        this.option('babel', {
            type: Boolean,
            required: false,
            defaults: false,
            desc: 'Compile ES2015 using Babel'
        });


        this.option('projectRoot', {
            type: String,
            required: true,
            desc: 'Relative path to the project code root'
        });
    },

    writing: {
        package: function () {
            var pkg = this.fs.readJSON(this.destinationPath(this.options.generateInto, 'package.json'), {});

            extend(pkg, {
                devDependencies: {
                    "webpack": "2.1.0-beta.20",
                    "webpack-dev-middleware": "^1.4.0",
                    "webpack-hot-middleware": "^2.6.0",
                    "autoprefixer": "^6.2.2",
                    "css-loader": "^0.23.1",
                    "es6-shim": "^0.35.0",
                    "extract-text-webpack-plugin": "^2.0.0-beta.3",
                    "file-loader": "^0.9.0",
                    "html-loader": "^0.3.0",
                    "html-webpack-plugin": "^2.9.0",
                    "http-proxy-middleware": "^0.17.1",
                    "json-loader": "^0.5.4",
                    "node-sass": "^3.4.2",
                    "postcss-loader": "^0.8.0",
                    "sass-loader": "^3.1.2",
                    "style-loader": "^0.13.0",
                    "url-loader": "^0.5.7"
                }
            });

            if (this.options.babel) {

                pkg.devDependencies.del = '^2.0.2';
                pkg.devDependencies["babel-loader"] = "^6.2.0";
                pkg.devDependencies["babel-polyfill"] = "^6.7.4";
                pkg.devDependencies['babel-core'] = '^6.11.4';
                pkg.devDependencies['babel-preset-es2015'] = '6.9.0';

                //???????? search isparta
                // pkg.devDependencies.isparta = '^4.0.0';
                // pkg.devDependencies["isparta-loader"] = '^2.0.0';
            }

            this.fs.writeJSON(this.destinationPath(this.options.generateInto, 'package.json'), pkg);
        },

        webpack: function () {
            this.fs.copyTpl(
                this.templatePath('webpack.conf.js'),
                this.destinationPath(this.options.generateInto, 'conf/webpack.conf.js'),
                {
                    babel: this.options.babel,
                    projectRoot: path.join(this.options.projectRoot, '**/*.js').replace(/\\/g, '/')
                }
            );
            this.fs.copyTpl(
                this.templatePath('webpack-dist.conf.js'),
                this.destinationPath(this.options.generateInto, 'conf/webpack-dist.conf.js')
            );

             this.fs.copyTpl(
                this.templatePath('constants.js'),
                this.destinationPath(this.options.generateInto, 'constants.js')
            );

        }
    }
});
