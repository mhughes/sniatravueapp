var gulp            = require('gulp'),
    compass         = require('gulp-compass'),
    concat          = require('gulp-concat'),
    util            = require('gulp-util'),
    del             = require('del'),
    plumber         = require('gulp-plumber'),
    browserSync     = require('browser-sync').create(),
    source          = require('vinyl-source-stream'),
    browserify      = require('browserify'),
    vueify          = require('vueify'),
    historyFallback = require('connect-history-api-fallback');

var onError = function (err) {
  util.beep();
  console.log(err);
};

gulp.task('default', ['browser-sync', 'watch']);

gulp.task('build', ['clean-distribution', 'styles', 'browserify', 'copy-fonts', 'bootstrap'], function() {
  gulp.src(['./assets/css/**'])
    .pipe(plumber({errorHandler: onError}))
    .pipe(plumber.stop())
    .pipe(gulp.dest('./public/css'))

  gulp.src(['./assets/js/**'])
    .pipe(plumber({errorHandler: onError}))
    .pipe(plumber.stop())
    .pipe(gulp.dest('./public/js'))

  gulp.src(['./assets/fonts/**'])
    .pipe(plumber({errorHandler: onError}))
    .pipe(plumber.stop())
    .pipe(gulp.dest('./public/fonts'))

  gulp.src(['./assets/images/**'])
    .pipe(plumber({errorHandler: onError}))
    .pipe(plumber.stop())
    .pipe(gulp.dest('./public/images'))
});

gulp.task('clean-distribution', function() {
  del(['./dist/css/*.*']);
  del(['./dist/js/*.*']);
  del(['./dist/fonts/*.*']);
  del(['./dist/images/*.*']);
});

gulp.task('watch', ['styles', 'browserify', 'copy-fonts', 'bootstrap'], function () {
  gulp.watch([
    'assets/styles/**/*.scss'
  ], ['styles']);

  gulp.watch([
    'vue/**/*.js',
    'vue/**/*.vue',
  ], ['browserify']);
});

gulp.task('browser-sync', function() {
  browserSync.init({
    proxy: {
      target: 'localhost:4567',
      middleware: [
        historyFallback()
      ],
    }
  });
});

gulp.task('styles', function() {
  gulp.src(['./assets/styles/**/*.scss'])
    .pipe(plumber({errorHandler: onError}))
    .pipe(gulp.dest('./temp/styles'))
    .pipe(compass({
      css: './assets/css',
      sass: './assets/styles'
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest('./assets/css'))
    .pipe(browserSync.stream())
});

gulp.task('browserify', function(){
  browserify({
        entries: ['./vue/initialize.js'],
        paths: ['./node_modules','./vue/']
    })
    .transform(vueify)
    .bundle()
    .on('error', function(err) {
      console.log(err);
    })
    .pipe(source('app.js'))
    .pipe(gulp.dest('./vue/js'))
    .pipe(browserSync.stream())
});

/*** Static files ***/

gulp.task('bootstrap', function() {
  gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css', 'node_modules/bootstrap/dist/css/bootstrap.min.css.map'])
    .pipe(plumber({errorHandler: onError}))
    .pipe(plumber.stop())
    .pipe(gulp.dest('./vue/css'))
});

gulp.task('copy-fonts', function () {
  gulp.src('node_modules/bootstrap/dist/fonts/**')
    .pipe(gulp.dest('./vue/fonts'));
});

/*** Static files ***/
