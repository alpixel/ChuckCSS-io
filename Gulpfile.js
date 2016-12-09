var gulp = require('gulp');
var less = require('gulp-less');
var shell = require('gulp-shell');
var cssnano = require('gulp-cssnano');
var watch = require('gulp-watch');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var rewriteCSS = require('gulp-rewrite-css');
var autoprefixer = require('gulp-autoprefixer');



gulp.task('front', function() {
    gulp.src('src/less/front.less')
        .pipe(less())
        // .pipe(cssnano({
        //     'postcss-minify-font-values': true
        // }))
        .pipe(autoprefixer({
            browsers:"> 1%, last 2 versions, Safari >= 8"
        }))
        .pipe(rename({basename: 'front', suffix: '.min'}))
        .pipe(gulp.dest('dist/'));
});

gulp.task('app_js', function() {
  gulp.src('src/js/*.js')
  .pipe(concat('app.js'))
  .pipe(uglify().on('error', gutil.log))
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function() {
    gulp.watch('src/less/**/*.less', ['front']);
    gulp.watch('src/js/*.js', ['app_js']);
});

gulp.task('default', [
  'front',
  'app_js'
]);
