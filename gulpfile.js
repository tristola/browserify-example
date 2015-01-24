var gulp = require('gulp');
var ngconfig = require('./ngauto-config.js');

var ngAutoBootstrap = require('gulp-ng-autobootstrap');

gulp.task('default',['task-module','user-module']);




gulp.task('task-module', function() {
    return gulp
        .src('app/test/**/*.js')
        .pipe(ngAutoBootstrap(ngconfig))
        .pipe(gulp.dest('app/test'));
});
gulp.task('user-module', function() {
    return gulp
        .src('app/user/**/*.js')
        .pipe(ngAutoBootstrap(ngconfig))
        .pipe(gulp.dest('app/user/task'));
});

