const gulp = require('gulp');
const less = require('gulp-less');
const browserSync = require('browser-sync').create(); //для запуска виртуального сервера
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');

function styles() {
  return gulp.src('./app/less/style.less')
		.pipe(less())  
		.pipe(gulp.dest('./app/css')) //куда складываем стили
		.pipe(browserSync.stream()); //для обновления браузера кагда чего-то поменяли
}

function minify() {
	return gulp.src('./app/css/*.css')
	  	.pipe(sourcemaps.init())
	  	.pipe(cleanCSS())
	  	.pipe(sourcemaps.write())
	  	.pipe(gulp.dest('./app/minify-css'));
}

function watch() {
  browserSync.init({
    server: {
        baseDir: './app' //указываем в какой папке искать html файлы
    },
    // tunnel: true
  });

  gulp.watch('./app/less/**/*.less', styles) //при изменении любого less файла запускаем функцю styles, но тянуть будет только style.less
  gulp.watch('./app/js/*.js').on('change', browserSync.reload); //при изменении html обновляемся
  gulp.watch('./app/*.html').on('change', browserSync.reload); //при изменении html обновляемся
}

gulp.task('watch', watch)