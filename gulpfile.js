var gulp = require('gulp'),
    bower = require('gulp-bower'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    cssnano = require('gulp-cssnano');

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

gulp.task('minify-css', function() {
  return gulp.src('client/assets/css/*.css')
      .pipe(concat('app.min.css'))
      .pipe(cssnano())
      .pipe(gulp.dest('client/public/css'));
});

gulp.task('watch', function () {
    var watchFiles = [
        'client/app/**/*',
        'client/index.html'
    ]

    return gulp.watch(watchFiles, ['dist']);
});

gulp.task('dist', ['uglify', 'minify-css']);

gulp.task('default', ['bower', 'dist', 'watch']);
