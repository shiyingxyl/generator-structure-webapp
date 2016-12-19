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

        this.option('coveralls', {
            type: Boolean,
            required: false,
            desc: 'Send coverage reports to coveralls'
        });

        this.option('babel', {
            type: Boolean,
            required: false,
            defaults: false,
            desc: 'Compile ES2015 using Babel'
        });

        this.option('cli', {
            type: Boolean,
            required: false,
            defaults: false,
            desc: 'Add a CLI'
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
                    // gulp: '^3.9.0',
                    'gulp-exclude-gitignore': '^1.0.0',
                    'gulp-line-ending-corrector': '^1.0.1',
                    'gulp-istanbul': '^1.0.0',
                    'gulp-mocha': '^3.0.1',
                    'gulp-plumber': '^1.0.0',
                    'gulp-nsp': '^2.1.0',
                    "gulp": "gulpjs/gulp#4ed9a4a3275559c73a396eff7e1fde3824951ebb",
                    "gulp-filter": "^4.0.0",
                    "gulp-hub": "frankwallis/gulp-hub#d461b9c700df9010d0a8694e4af1fb96d9f38bf4",
                    "gulp-sass": "^2.1.1",
                    "gulp-util": "^3.0.7",
                    "del": "^2.0.2"
                },
                scripts: {
                    "build": "gulp",
                    "server": "gulp server",
                    "server:dist": "gulp server:dist",
                    "test" : "gulp test",
                    "test:auto": "gulp test:auto"
                }
            });

            if (this.options.coveralls) {
                pkg.devDependencies['gulp-coveralls'] = '^0.1.0';
            }

            if (this.options.babel) {
                // pkg.devDependencies['gulp-babel'] = '^6.1.2';
                // pkg.devDependencies['babel-register'] = '^6.9.0';

                // pkg.devDependencies["babel-loader"] = "^6.2.0";
                // pkg.devDependencies["babel-polyfill"] = "^6.7.4";
                // pkg.devDependencies['babel-core'] = '^6.11.4';
                // pkg.devDependencies['babel-preset-es2015'] = '6.9.0';
                //???????? search isparta
                // pkg.devDependencies.isparta = '^4.0.0';
            }

            if (this.options.cli) {
                pkg.devDependencies['gulp-line-ending-corrector'] = '^1.0.1';
            }


            this.fs.writeJSON(this.destinationPath(this.options.generateInto, 'package.json'), pkg);
        },

        gulpfile: function () {
            this.fs.copyTpl(
                this.templatePath('gulpfile.js'),
                this.destinationPath(this.options.generateInto, 'gulpfile.js'),
                {
                    includeCoveralls: this.options.coveralls,
                    cli: this.options.cli,
                    babel: this.options.babel,
                    // tasks: stringifyArray(tasks),
                    // prepublishTasks: stringifyArray(prepublishTasks),
                    projectRoot: path.join(this.options.projectRoot, '**/*.js').replace(/\\/g, '/')
                }
            );
            this.fs.copyTpl(
                this.templatePath('gulp.conf.js'),
                this.destinationPath(this.options.generateInto, 'conf/gulp.conf.js')
            );

            this.fs.copyTpl(
                this.templatePath('browsersync.js'),
                this.destinationPath(this.options.generateInto, 'gulp_tasks/browsersync.js')
            );
            this.fs.copyTpl(
                this.templatePath('webpack.js'),
                this.destinationPath(this.options.generateInto, 'gulp_tasks/webpack.js')
            );

            this.fs.copyTpl(
                this.templatePath('misc.js'),
                this.destinationPath(this.options.generateInto, 'gulp_tasks/misc.js')
            );

             this.fs.copyTpl(
                this.templatePath('karma.js'),
                this.destinationPath(this.options.generateInto, 'gulp_tasks/karma.js')
            );

            return; //TODO


            var tasks = ['static', 'test'];
            var prepublishTasks = ['nsp'];

            if (this.options.coveralls) {
                tasks.push('coveralls');
            }

            if (this.options.cli) {
                prepublishTasks.push('line-ending-corrector');
            }

            if (this.options.babel) {
                prepublishTasks.push('babel');
            }

            this.fs.copyTpl(
                this.templatePath('gulpfile.js'),
                this.destinationPath(this.options.generateInto, 'gulpfile.js'),
                {
                    includeCoveralls: this.options.coveralls,
                    cli: this.options.cli,
                    babel: this.options.babel,
                    tasks: stringifyArray(tasks),
                    prepublishTasks: stringifyArray(prepublishTasks),
                    projectRoot: path.join(this.options.projectRoot, '**/*.js').replace(/\\/g, '/')
                }
            );
        },


        babel: function () {
            if (!this.options.babel) {
                return;
            }

            this.fs.copy(
                this.templatePath('babelrc'),
                this.destinationPath(this.options.generateInto, '.babelrc')
            );

            // Add dist/ to the .gitignore file
            var gitignore = this.fs.read(
                this.destinationPath(this.options.generateInto, '.gitignore'),
                {defaults: ''}
            ).split('\n').filter(Boolean);
            gitignore.push('dist');
            this.fs.write(
                this.destinationPath(this.options.generateInto, '.gitignore'),
                gitignore.join('\n') + '\n'
            );
        }
    }
});

function stringifyArray(arr) {
    return '[\'' + arr.join('\', \'') + '\']';
}
