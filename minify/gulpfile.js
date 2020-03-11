const gulp = require('gulp')
const cssmin = require('gulp-clean-css')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')

gulp.task('build-css', function () {
  return gulp.src('./before/css/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest('./after/css'))
})

gulp.task('build-js', function () {
  return gulp.src('./before/js/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(
      gulp.dest('./after/js')
    )
})
