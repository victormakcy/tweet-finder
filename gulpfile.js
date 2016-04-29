var gulp = require('gulp'),
    bower = require('gulp-bower'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

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

gulp.task('watch', function () {
    var watchFiles = [
        'client/app/**/*'
    ]

    return gulp.watch(watchFiles, ['dist']);
});

gulp.task('dist', ['uglify']);

gulp.task('default', ['bower', 'watch']);
