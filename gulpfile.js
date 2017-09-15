// Load tasks
const gulp = require('./gulp')([
  'sassDev',
  'sassProd',
  'jsDev',
  'serviceWorker',
]);

// Register build tasks
gulp.task('buildDev', ['sassDev', 'jsDev', 'serviceWorker']);
gulp.task('buildProd', ['sassProd']);


gulp.task('dev', ['buildDev'], () => {
  gulp.watch('app/templates/**/*.pug', ['serviceWorker']);
  gulp.watch('app/sass/**/*.scss', ['sassDev', 'serviceWorker']);
  gulp.watch('app/js/**/*.js', ['jsDev', 'serviceWorker']);
});
