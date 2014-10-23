// include gulp
var gulp = require('gulp'); 

// include plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var mocha = require('gulp-mocha');

// linter
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// run tests
gulp.task('mocha', function(){
    return gulp.src('test.js', {read: false})
        .pipe(mocha({reporter: 'spec'}));
});

// concatenate & minify JS
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// watch for changes
gulp.task('watch', function() {
    // gulp.watch('js/*.js', ['lint', 'mocha', 'scripts']);
    gulp.watch('js/*.js', ['lint', 'scripts']);
});

// default task
// gulp.task('default', ['lint', 'mocha', 'scripts', 'watch']);
gulp.task('default', ['lint', 'scripts', 'watch']);
