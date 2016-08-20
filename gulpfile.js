// grab our gulp packages
const gulp = require('gulp'),
  gutil = require('gulp-util')

// create a default task and just log a message
gulp.task('default', () => {
  return gutil.log('Gulp is running!')
})
