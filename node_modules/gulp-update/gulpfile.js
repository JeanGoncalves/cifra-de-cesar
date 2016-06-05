'use strict';
var gulp  = require('gulp');

gulp.task('npmUpdate', function () {
  var update = require('./index')();
  gulp.watch('./package.json').on('change', function (file) {
    update.write(file);
  });

})



gulp.task('default', ['npmUpdate']);
