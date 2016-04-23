var gulp = require('gulp'),
    bower = require('gulp-bower'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

var config = {
  lib: './client/assets/lib'
}

gulp.task('bower', function() {
  return bower().pipe(gulp.dest(config.lib));
});

gulp.task('uglify', function () {
  return gulp.src('client/app/**/*.js')
    .pipe(concat('app.min.js'))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('client/public/js'));
});

gulp.task('dist', ['uglify']);

gulp.task('default', ['bower']);
