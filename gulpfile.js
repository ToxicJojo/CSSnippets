// Load tasks
const gulp = require('./gulp')([
  'sassDev',
  'sassProd',
  'jsDev',
]);

// Register build tasks
gulp.task('buildDev', ['sassDev', 'jsDev']);
gulp.task('buildProd', ['sassProd']);

gulp.task('dev', ['buildDev'], () => {
  gulp.watch('app/sass/**/*.scss', ['sassDev']);
  gulp.watch('app/js/**/*.js', ['jsDev']);
});
