// Load tasks
const gulp = require('./gulp')([
  'sassDev',
  'sassProd',
]);

// Register build tasks
gulp.task('buildDev', ['sassDev']);
gulp.task('buildProd', ['sassProd']);

gulp.task('dev', ['buildDev'], () => {
  gulp.watch('app/sass/**/*.scss', ['sassDev']);
});
