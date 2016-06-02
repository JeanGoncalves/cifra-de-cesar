var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

var files = "./lib/src/*.js";

gulp.task('lint', function() {
	gulp.src(files)
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});

gulp.task('dist', function() {
	gulp.src(files)
	.pipe(concat('./lib/dist'))
	.pipe(rename('cifraCesarPersonalized.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./lib/dist'));
});

gulp.task('watch', function() {
	gulp.watch(files, function(evt) {
		gulp.start('lint', 'dist');
	});
});

gulp.task('deploy', function() {
	gulp.start('lint', 'dist');
});