//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     DECLARATIONS     //
//////////////////////////

var gulp  = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var jasmine = require('gulp-jasmine');
var shell = require('gulp-shell');


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     FILES PATH     //
////////////////////////

var files = "./lib/src/*.js";
var spec = "./spec/**/*.js";


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     FUNCIONS     //
//////////////////////

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

gulp.task('jasmine', shell.task([
    'jasmine;'
]));

gulp.task('specs', function() {
    return gulp.src(spec)
        .pipe(jasmine());
});

gulp.task('init', shell.task([
    'clear;'
]));

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     GLOBAL     //
////////////////////

gulp.task('global', function() {
    gulp.start('lint', 'dist');
});

var before = ['init'];

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     CMD/TERMINAL     //
//////////////////////////

gulp.task('watch', before, function() {
    gulp.watch(files, function(event) {
        console.log('\n - File ' + event.path + ' was ' + event.type + ', running tasks...\n');
        gulp.start('global');
    });
});

gulp.task('deploy', before, function() {
    gulp.start('global');
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     ERROR     //
///////////////////

process.on('uncaughtException', function(e) {
    console.error(e);
});