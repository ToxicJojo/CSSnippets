const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const gap = require('gulp-append-prepend');
const tap = require('gulp-tap');
const path = require('path');
const autoprefixer = require('gulp-autoprefixer');


module.exports = () => {
  gulp.src('app/sass/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/css'));

  gulp.src('app/sass/snippets/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('public/css/intern'));

  /* We want to scope the css snippets. To do this we add put the wohle scss
    in a .$filename class. This way the css will be scoped to only apply to
    elements that are inside a parent with the .filename class.
  */
  gulp.src('app/sass/snippets/**/*.scss')
    .pipe(tap((file, t) => {
      const fileName = path.basename(file.path, '.scss');
      return t.through(gap.prependText, [`.${fileName} {`]);
    }))
    .pipe(gap.appendText('}'))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('public/css/snippets'));
};
