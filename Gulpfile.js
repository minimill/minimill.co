'use strict';

var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var handlebars   = require('gulp-compile-handlebars');
var layouts      = require('handlebars-layouts');
var rename       = require('gulp-rename');
var yaml         = require('js-yaml');
var fs           = require('fs');
var uglify       = require('gulp-uglify');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var plumber      = require('gulp-plumber');
var reload       = browserSync.reload;

handlebars.Handlebars.registerHelper(layouts(handlebars.Handlebars));


gulp.task('sass', function () {
  gulp.src('./src/sass/**/*.scss')
  .pipe(plumber())
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.init())
  .pipe(autoprefixer())
  .pipe(sass({
    outputStyle: 'compressed'
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./dist/css'));
});

gulp.task('js', function() {
  return gulp.src('src/js/**/*.js')
  .pipe(plumber())
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'));
});

gulp.task('images', function () {
  gulp.src('src/img/**/*')
  .pipe(plumber())
  .pipe(gulp.dest('./dist/img'));
});

gulp.task('fonts', function () {
  gulp.src('src/font/*')
  .pipe(plumber())
  .pipe(gulp.dest('./dist/font'));
});

gulp.task('templates', function () {
  var templateData = yaml.safeLoad(fs.readFileSync('data.yml', 'utf-8'));
  var options = {
        ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false
        batch : ['./src/partials/'],
        helpers : {
          capitals : function(str){
            return str.toUpperCase();
          }
        }
      };

      return gulp.src('src/templates/*.hbs')

      .pipe(plumber())
      .pipe(handlebars(templateData, options))
      .pipe(rename(function(path) {
        path.extname = '.html';
      }))
      .pipe(gulp.dest('dist'));
    });

gulp.task('watch', function() {
  gulp.watch('./src/templates/**/*.hbs', ['templates'], reload);
  gulp.watch('./src/sass/**/*.scss', ['sass'], reload);
  gulp.watch('./src/img/**/*', ['images'], reload);
  gulp.watch('./src/js/**/*.js', ['js'], reload);
});

// use default task to launch Browsersync and watch JS files
gulp.task('serve', ['templates', 'sass', 'images', 'fonts', 'js'], function () {

  // Serve files from the root of this project
  browserSync.init(['./dist/**/*'], {
    server: {
      baseDir: "./dist"
    }
  });

  // add browserSync.reload to the tasks array to make
  // all browsers reload after tasks are complete.
  gulp.start(['watch']);
});
