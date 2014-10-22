// include gulp
var gulp = require('gulp'); 

// include plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
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

// compile sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'));
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
    gulp.watch('scss/*.scss', ['sass']);
});

// default task
// gulp.task('default', ['lint', 'sass', 'mocha', 'scripts', 'watch']);
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);
