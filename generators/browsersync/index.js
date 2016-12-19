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
                    "browser-sync": "^2.9.11",
                    "browser-sync-spa": "^1.0.3"
                }
            });

            this.fs.writeJSON(this.destinationPath(this.options.generateInto, 'package.json'), pkg);
        },

        browsersync: function () {
            this.fs.copyTpl(
                this.templatePath('browsersync.conf.js'),
                this.destinationPath(this.options.generateInto, 'conf/browsersync.conf.js'),
                {
                    babel: this.options.babel,
                    projectRoot: path.join(this.options.projectRoot, '**/*.js').replace(/\\/g, '/')
                }
            );
            this.fs.copyTpl(
                this.templatePath('browsersync-dist.conf.js'),
                this.destinationPath(this.options.generateInto, 'conf/browsersync-dist.conf.js')
            );

        }
    }
});