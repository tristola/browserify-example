var gulp = require('gulp');
var ngconfig = require('./ngauto-config.js');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var ngAutoBootstrap = require('gulp-ng-autobootstrap');
var browserSync = require('browser-sync');


gulp.task('default', ['task-module', 'user-module', 'views', 'browserify', 'browser-sync']);

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
    .pipe(gulp.dest('app/user'));
});

gulp.task('browserify', function() {
  gulp.src(['app/main.js'])
    .pipe(browserify({
      insertGlobals: true,
      debug: false
    }))
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('dist/js'));
});


gulp.task('views', function() {
  gulp.src('app/index.html')
    .pipe(gulp.dest('dist/'));
});

// Static server
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "dist/"
    }
  });
})
