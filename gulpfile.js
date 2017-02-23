/**
 *
 * @authors H君
 * @date    2015-07-14 14:02:03
 * @version $Id$
 */

// js/src.js：指定确切的文件名。
// js/*.js：某个目录所有后缀名为js的文件。
// js/**/*.js：某个目录及其所有子目录中的所有后缀名为js的文件。
// !js/src.js：除了js/src.js以外的所有文件。
// *.+(js|css)：匹配项目根目录下，所有后缀名为js或css的文件。

var gulp = require('gulp'),
	runSequence = require('run-sequence'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	compass = require("gulp-compass"),
	sourcemaps = require('gulp-sourcemaps'),
	minicss = require('gulp-mini-css'),
	connect = require('gulp-connect'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	gulpif = require('gulp-if'),
	clean = require('gulp-clean'),
	concat = require('gulp-concat'),
	rev = require('gulp-rev'),
	revCollector = require('gulp-rev-collector'),
	minifyHtml = require('gulp-minify-html'),
	jsdoc = require("gulp-jsdoc"),
	livereload = require('gulp-livereload'),
	notify = require('gulp-notify');

// 删除文件
gulp.task('clean', function() {
	return gulp.src(['./dist/','./docs/'], {read: false})
			   .pipe(clean());
});

// 复制文件
gulp.task('copy', function() {
	gulp.src(['./src/js/lib/**/*.js'])
		.pipe(gulp.dest('./docs/js/lib/'));
		
	gulp.src(['./src/font-awesome/**/*'])
		.pipe(gulp.dest('./docs/font-awesome'));

});

// 文档说明
gulp.task('readme', function() {

	return gulp.src(['./Readme.md'])
			.pipe(gulp.dest('./package/hbook-ui/'));
});

// 创建Compass任务
gulp.task('compass-docs', function() {

	//生成docs目录
	return gulp.src(['./src/sass/**/*.scss', '!./src/sass/config.scss', '!./src/sass/reset.scss'])
		.pipe(compass({
			comments: false,
			style: 'nested',
			css: './docs/css',
			sass: './src/sass',
			image: './src/images'
		}))
		.pipe(gulp.dest('./docs/css'))
		//.pipe(rename( { suffix: '.min' }))
		//.pipe(minicss())
		//.pipe(gulp.dest('./docs/css'))
		.pipe(livereload())

});

gulp.task('compass-dist', function() {

	//生成dist目录
	return gulp.src(['./src/sass/hbook.scss'])
		.pipe(compass({
			comments: false,
			style: 'nested',
			css: './docs/css',
			sass: './src/sass',
			image: './src/images'
		}))
		.pipe(gulp.dest('./dist/css'))
		.pipe(gulp.dest('./package/hbook-ui/dist/css'))
		.pipe(gulp.dest('./docs/css'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(minicss())
		.pipe(gulp.dest('./dist/css'))
		.pipe(gulp.dest('./package/hbook-ui/dist/css'))
		//.pipe(gulp.dest('./docs/css'))
})


// 创建Compass任务
gulp.task('compass-package', function() {

	//生成docs目录
	return gulp.src(['./src/sass/module/*.scss'])
		.pipe(compass({
			comments: false,
			style: 'nested',
			css: './package/hbook-ui/src/css/',
			sass: './src/sass'
		}))
		// .pipe(gulp.dest('./package/hbook-ui/src/css/module'))
		.pipe(livereload())

});

// 压缩样式
gulp.task('minicss', function() {
	return gulp.src('./src/css/*.css')
		.pipe(minicss())
		.pipe(gulp.dest('./docs/css'))
})

// 编译sass
gulp.task("sass", function() {
	return sass('sass').on('error', function(err) {
			console.error('Error!', err.message);
			})
			.pipe(gulp.dest('style'));

})

// 合并、压缩文件
gulp.task('scripts-docs', function() {

	//生成docs目录
	return gulp.src(['./src/js/**/*.js', '!./src/js/lib/**/*.js'])
			.pipe(rename({
				suffix: '.min'
			}))
			.pipe(uglify())
			.pipe(gulp.dest('./docs/js'))
			.pipe(livereload())
});

// dist目录
gulp.task('scripts-dist', function() {

	return gulp.src(['./src/js/module/*.js'])
			.pipe(concat('hbook.js'))
			.pipe(gulp.dest('./dist/js'))
			.pipe(gulp.dest('./docs/js'))
			.pipe(rename({
				suffix: '.min'
			}))
			.pipe(uglify())
			.pipe(gulp.dest('./dist/js'))
			
			//.pipe(gulp.dest('./docs/js'))
});

// package目录
gulp.task('scripts-package', function() {

	return gulp.src(['./src/js/module/*.js'])
			.pipe(gulp.dest('./package/hbook-ui/src/js/module'))
			.pipe(rename({
				suffix: '.min'
			}))
			.pipe(uglify())
			.pipe(gulp.dest('./package/hbook-ui/dist/js/module'))
});

// 压缩图片
gulp.task('imagemin', function() {
	return gulp.src('./src/images/**/*.*')
		.pipe(imagemin())
		.pipe(gulp.dest('./docs/images'))
		.pipe(notify({
			message: 'compress ok !'
		}))
})

// 压缩Html、更新引入文件版本
gulp.task('miniHtml', function() {
	return gulp.src(['./docs/rev/**/*.json', './docs/**/*.html'])
			   // .pipe(revCollector())
			   .pipe(minifyHtml())
			   .pipe(gulp.dest('./dist/'))

});

// 正式构建
gulp.task('build', function(done) {

	runSequence('copy', 'readme', 'minicss', 'compass-docs', 'compass-dist','compass-package','scripts-docs','scripts-dist','scripts-package','imagemin');
	// 监听文件变化
	gulp.watch([
		'./src/**/*.html',
		'./src/sass/**/*.scss',
		'./src/images/**',
		'./src/css/**/*.css',
		'./src/js/**/*.js',
		'./Readme.md'
	], function() {
		livereload.listen();
		runSequence('readme', 'minicss', 'compass-docs', 'compass-dist','compass-package','scripts-docs','scripts-dist','scripts-package','imagemin');
	});
})

gulp.task('default', ['build']);