var gulp = require('gulp'),
    connect = require('gulp-connect-php'),
    browserSync = require('browser-sync'),
    sass = require('gulp-ruby-sass'),
    plumber = require('gulp-plumber'),
    prefix = require('gulp-autoprefixer');

gulp.task('connect-sync', function() {
      connect.server({
      	base: './'
      }, function (){
        browserSync({
          injectChanges: true,
          proxy: '127.0.0.1:8000'
        });
      });

      gulp.start('sass');
      gulp.start('watch');

});

gulp.task('sass', function() {
      plumber()
      sass('sass/*.sass',{
        style: 'compressed'
      })
      .pipe(prefix('last 2 versions'))
      .pipe(gulp.dest('css/'))
      .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('css', function() {
  return gulp.src('css/*.css')
    .pipe(browserSync.stream({match: '**/*.css'}));
});
gulp.task('watch', function() {
  gulp.watch('sass/*.sass', ['sass']);
  gulp.watch('*.css', ['css']);
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('*.php', browserSync.reload);
  gulp.watch('js/*.js', browserSync.reload);
});

gulp.task('default', ['connect-sync','styles'], function(){
  gulp.watch("sass/*.sass", ['styles']);
});
