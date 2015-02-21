// File: Gulpfile.js
'use strict';
var gulp = require('gulp'),
    clean = require('gulp-clean'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    stylish = require('jshint-stylish'),
    jshint = require('gulp-jshint');

gulp.task('clean', function() {
    return gulp.src('dist/**/*.*', {
            read: false
        })
        .pipe(clean());
});

gulp.task('copy', function() {
    gulp.src('./src/**/*.*')
        .pipe(useref())
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulpif('*.js', uglify({
            mangle: false
        })))
        // .pipe(rename({
        //     suffix: '.min'
        // }))
        .pipe(gulp.dest('./dist'));

    // gulp.src('./src/**/*.*')        
    //     .pipe(gulp.dest('./dist'));

});

gulp.task('jshint', function() {
    return gulp.src('./src/js/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('default', ['jshint']);
gulp.task('build', ['clean', 'copy']);
