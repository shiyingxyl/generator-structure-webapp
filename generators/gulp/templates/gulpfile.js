const gulp = require('gulp');

//Gulp-hub will execute that task in all of the gulpfiles.
const HubRegistry = require('gulp-hub');
const browserSync = require('browser-sync');

const conf = require('./conf/gulp.conf');
// Load some files into the registry
// conf.path.tasks("*.js") ====> gulp_tasks/*.js
const hub = new HubRegistry([conf.path.tasks('*.js')]);

// Tell gulp to use the tasks just loaded
gulp.registry(hub);

gulp.task('build', gulp.parallel('other', 'webpack:dist'));
gulp.task('prepublish', gulp.series('test'));

/*打包部署*/
gulp.task('default', gulp.series('clean', 'build'));

/*启动服务,开发*/
gulp.task("server", gulp.series('webpack:watch', 'watch', 'other', 'browsersync'));

/*启动服务,测试*/
gulp.task("server:dist", gulp.series('default', 'browsersync:dist'));

gulp.task('test', gulp.series('karma:single-run'));
gulp.task('test:auto', gulp.series('karma:auto-run'));

gulp.task("watch", watch);

function reloadBrowserSync(cb) {
    browserSync.reload();
    cb();
}

function watch(done) {
    // gulp.watch(conf.path.tmp('index.html'), reloadBrowserSync);
    done();
}

