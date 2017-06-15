const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('vinyl-buffer');
const rename = require('gulp-rename');

module.exports = () => {
  return browserify('app/js/main.js', { debug: true }).transform(babelify, { presets: ['es2017'], sourceMaps: true })
    .bundle()
    .pipe(source('app/js/main.js'))
    .pipe(buffer())
    .pipe(rename({
      dirname: '',
      basename: 'main',
      extname: '.js',
    }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/js'));
};
