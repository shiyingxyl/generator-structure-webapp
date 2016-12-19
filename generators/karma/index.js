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

       this.option('name', {
            type: String,
            required: true,
            desc: 'Project name'
        });
   },

   writing: {
         package: function () {
            var pkg = this.fs.readJSON(this.destinationPath(this.options.generateInto, 'package.json'), {});

            var devDep = {
              "isparta-loader": "^2.0.0",
              "jasmine": "^2.4.1",
              "karma": "^1.3.0",
              "karma-coverage": "^0.5.3",
              "karma-jasmine": "^0.3.8",
              "karma-junit-reporter": "^0.4.2",
              "karma-phantomjs-launcher": "^1.0.0",
              "karma-phantomjs-shim": "^1.1.2",
              "karma-webpack": "^1.7.0",
              "node-sass": "^3.4.2",
              "phantomjs-prebuilt": "^2.1.13",
            };

            extend(pkg, {
                devDependencies: devDep,
            });

            this.fs.writeJSON(this.destinationPath(this.options.generateInto, 'package.json'), pkg);
        },

        eslintddsfd: function () {
            this.fs.copyTpl(
                this.templatePath('karma.conf.js'),
                this.destinationPath(this.options.generateInto, 'conf/karma.conf.js') );

             this.fs.copyTpl(
                this.templatePath('karma-auto.conf.js'),
                this.destinationPath(this.options.generateInto, 'conf/karma-auto.conf.js') );

              this.fs.copyTpl(
                this.templatePath('webpack-test.conf.js'),
                this.destinationPath(this.options.generateInto, 'conf/webpack-test.conf.js') );
        }
   }
});
