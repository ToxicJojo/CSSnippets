const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');

module.exports = () => {
  gulp.src('app/sass/style.scss')
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(gulp.dest('public/css'));
};
