var gulp = require('gulp');
var fs = require('fs');
var del = require('del');
var run = require('gulp-run');
var concat = require("gulp-concat");
var addsrc = require('gulp-add-src');
var uglify = require('gulp-uglify');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
// var notify = require('gulp-notify');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();

gulp.task('styles', function() {
  return sass('public/stylesheets/style.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('public/stylesheets/css/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('public/stylesheets/css/css'));
    // .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task("deldist", function() {
  del("public/dist");
});

gulp.task('js', function() {
  gulp.src(["public/javascripts/jsmain/script.js", "public/javascripts/jsmain/controllers/*.js"])
  // .pipe(addsrc("public/javascripts/jsmain/controllers/*.js"))
  .pipe(concat("bundle.js"))
  .pipe(uglify({mangle: false}))
  .pipe(gulp.dest("public/dist"));
  // .pipe(notify({ message: 'Build task complete' }));
});

gulp.task('styles', function() {
  return sass('public/stylesheets/*.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('public/dist'));
    // .pipe(notify({ message: 'Styles task complete' }));
});
gulp.task('watch', function() {
  gulp.watch("public/javascripts/jsmain/script.js", ['build']);
  gulp.watch("public/javascripts/jsmain/controllers/*.js", ['build']);
  gulp.watch('public/stylesheets/*', ['build']);

});

gulp.task("nodemon", function() {
  nodemon();
});
gulp.task('build', ["js",  "styles", "watch"]);

gulp.task("default", ["nodemon", "deldist", "build"]);
