var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var jasmine = require('gulp-jasmine');
var shell = require('gulp-shell');

var files = "./lib/src/*.js";
var spec = "./spec/**/*.js";

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

gulp.task('specs', function() {
    return gulp.src(spec)
        .pipe(jasmine());
});

gulp.task('watch', ['init', 'specs'], function() {
    gulp.watch(files, function(evt) {
        gulp.start('lint', 'dist');
    });
});

gulp.task('deploy', ['init', 'specs'], function() {
    gulp.start('lint', 'dist');
});

gulp.task('init', shell.task([
    'clear;'
]))

process.on('uncaughtException', function(e) {
    console.error(e);
});