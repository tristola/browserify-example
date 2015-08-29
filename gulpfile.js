var gulp = require('gulp');
var ngconfig = require('./ngauto-config.js');
var ngAutoBootstrap = require('gulp-ng-autobootstrap');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var babelify = require('babelify');

var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');


gulp.task('default', ['task-module', 'user-module', 'views', 'browserify', 'browser-sync']);

// add custom browserify options here
var customOpts = {
  entries: ['./app/main.js'],
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

//Autobootstrap
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

gulp.task('views', function() {
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist/'));
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "dist/"
    }
  });
})

gulp.task('browserify', bundle);
b.on('update', bundle);
b.on('log', gutil.log);

function bundle() {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('js/bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    .pipe(sourcemaps.write('./')) // writes .map file
    .transform(babelify)
    .pipe(gulp.dest('./dist'))
    .pipe(reload({stream: true, once: true}));
}
