// include gulp
var gulp = require('gulp'); 

// include plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var mochaPhantomJS = require('gulp-mocha-phantomjs');
var htmlReplace = require('gulp-html-replace');
var minifyCSS = require('gulp-minify-css');

// linter
gulp.task('lint', function() {
  return gulp
    .src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// run tests
gulp.task('test', function () {
  return gulp
    .src('test/SpecRunner.html')
    .pipe(mochaPhantomJS());
});

// concatenate & minify JS
gulp.task('scripts', function() {
  return gulp
    .src([
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/jquery-leanmodal/jquery.leanModal.js',
      'bower_components/firebase/firebase.js',
      'bower_components/coquette/coquette-min.js',
      'js/particle.js',
      'js/player.js',
      'js/otherplayer.js',
      'js/goalbucket.js',
      'js/spout.js',
      'js/displayname.js',
      'js/gamescore.js',
      'js/room.js',
      'js/main.js'
    ])
    .pipe(concat('production.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename('production.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// copy over index.html and replace tags
gulp.task('html', function(){
  return gulp
    .src('index.html')
    .pipe(htmlReplace({
      js: 'js/production.min.js',
      css: 'css/production.css'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('styles', function() {
  return gulp
    .src('styles/*.css')
    .pipe(concat('production.css'))
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('assets', function(){
  return gulp
    .src('assets/*')
    .pipe(gulp.dest('dist/assets'));
});

// build everything into dist folder
gulp.task('build', ['scripts', 'styles', 'assets', 'html']);

// watch for changes
gulp.task('watch', function() {
  gulp.watch(['js/*.js', 'css/*.css', 'index.html'], ['build']);
});

// default task
gulp.task('default', ['lint', 'test', 'build', 'watch']);

