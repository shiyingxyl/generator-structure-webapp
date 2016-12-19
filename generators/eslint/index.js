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

       this.option('es2015', {
           required: false,
           defaults: false,
           desc: 'Allow ES2015 syntax'
       });
   },

   writing: {
         package: function () {
            var pkg = this.fs.readJSON(this.destinationPath(this.options.generateInto, 'package.json'), {});

            var eslintConfig = {
                extends: 'xo-space',
                env: {
                    "browser": true,
                    "node": true,
                    'mocha': true,
                    "es6": true
                }
            };

            var devDep = {
                'gulp-eslint': '^3.0.1',
                'eslint': '^3.1.1',
                "eslint-loader": "^1.3.0",
                'eslint-config-xo-space': '^0.15.0'
            };

            if (this.options.es2015) {
                devDep['babel-eslint'] = '^6.1.2';
                devDep['eslint-plugin-babel'] = '^3.3.0';
            }

            extend(pkg, {
                devDependencies: devDep,
                eslintConfig: eslintConfig
            });

            this.fs.writeJSON(this.destinationPath(this.options.generateInto, 'package.json'), pkg);
        },

        eslint: function () {
            this.fs.copyTpl(
                this.templatePath('eslintrc'),
                this.destinationPath(this.options.generateInto, '.eslintrc'),
                {
                    babel: this.options.babel
                }
            );
        }
   }
});
