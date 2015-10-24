var gulp = require('gulp');
var ngconfig = require('./ngauto-config.js');
var ngAutoBootstrap = require('gulp-ng-autobootstrap');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var babelify = require('babelify');
var ngannotate = require('gulp-ng-annotate');
var rimraf = require('rimraf');
var rename = require("gulp-rename");

var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');

var folders = require('gulp-folders');
var minify = require('gulp-minify');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');

gulp.task('default', ['clean','modules', 'views', 'jshint', 'browserify', 'browser-sync', 'watch']);

// add custom browserify options here
var customOpts = {
  entries: ['./app/main.js'],
  fullpaths: false,
  debug: true,

};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts).transform(babelify));

gulp.task('clean', function (cb) {
   rimraf('./dist', function(){});
});

//Autobootstrap
gulp.task('modules', folders('./app/modules', function(folder){
    return gulp
      .src('./app/modules/'+folder+'/**/*.js')
      .pipe(ngAutoBootstrap(ngconfig))
      .pipe(gulp.dest('./app/modules/'+folder));
}));

gulp.task('watch', function() {
    gulp.watch('app/**/*.js', ['browserify']);
    gulp.watch('app/**/*.html', ['views'] );
    gulp.watch("dist/*.html").on('change', reload);
});

gulp.task('views', function() {
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist/'));
});

gulp.task('jshint', function() {
    gulp.src('/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('browser-sync', function() {
  browserSync({
    open: false,
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
    .pipe(source('app/main.js'))
    .pipe(rename('js/bundle.js'))
    .pipe(buffer())
    .pipe(ngannotate())
    .pipe(minify().on('error', gutil.log))
    .pipe(uglify({mangle: false}).on('error', gutil.log))
    .pipe(sourcemaps.init({loadMaps: false})) // loads map from browserify file
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./dist'))
    .pipe(reload({stream: true, once: true}));
}
