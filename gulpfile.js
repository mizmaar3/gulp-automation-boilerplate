var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var  browserSync = require('browser-sync').create();

gulp.task('babelfy', function() {
  return gulp.src('js/*.*')
    .pipe(sourcemaps.init())
    .pipe(babel({
			presets: ['es2016']
    }))
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('css', function() {
  return gulp.src('less/*.*')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(concat('style.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['browserSync'], function() {
  gulp.watch('less/*.*', ['css', browserSync.reload]);
  gulp.watch('js/*.*', ['babelfy', browserSync.reload]);
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      proxy: "localhost:9800"
    }
  });
});
