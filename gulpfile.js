var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnext = require('cssnext');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');

gulp.task('css', function () {
  var processors = [
      autoprefixer,
      cssnext
  ];
  return gulp.src('./src/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./css/'))
    .pipe(cssnano())
    .pipe(rename({
          suffix: '.min'
      }))
    .pipe(gulp.dest('./css/'));
});


gulp.task('watch', function() {
    gulp.watch('./src/*.css', ['css']);
});