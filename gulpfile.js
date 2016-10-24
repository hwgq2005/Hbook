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

//引入gulp插件node模
var gulp = require('gulp'),
	template = require('gulp-template'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	//gminifycss = require('gulp-minify-css'),
	compass = require("gulp-compass"),
	jshint = require('gulp-jshint'),
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
	livereload = require('gulp-livereload'),
	notify = require('gulp-notify');

//Gulp 仅有 5 个方法就能组合出你需要的任务流程：task, run, watch, src, dest


gulp.task('clean', function () {
	return gulp.src(['./src/js/lib/jquery/src/','./dist/'], {read: false})
    .pipe(clean());
 
});


gulp.task('copy', function() {
	gulp.src('./src/js/lib/**/*.js')
		.pipe(gulp.dest('./docs/js/lib/'));
});

//gulp.task(name, fn)gulp模块的task方法，用于定义具体的任务。它的第一个参数是任务名，第二个参数是任务函数。
gulp.task('uglify', function() {

	//gulp.src(glob)返回了一个可读的stream，如此行返回了./js/*.js下的全部
	gulp.src('./src/js/**/*.js')

		.pipe(uglify())
		//gulp.dest(glob)返回一个可写的stream，如此行是将文件流写入到 ./dist/js 里的对应路径下            
		.pipe(gulp.dest('./docs/js/'))
		.pipe(notify({
			message: '可以了 ok !'
		}))
})

// 创建Compass任务
gulp.task('compass', function() {


    //生成docs目录
	gulp.src(['./src/sass/**/*.scss','!./src/sass/config.scss','!./src/sass/reset.scss'])
		.pipe(compass({
			comments: false,
			style:'nested',
			css: './docs/css',
			sass: './src/sass',
			image: './src/images'

		}))
		.pipe(gulp.dest('./docs/css'))
		//.pipe(rename( { suffix: '.min' }))
		//.pipe(minicss())
		//.pipe(gulp.dest('./docs/css'))
		.pipe(livereload())
		
	//生成dist目录
	gulp.src(['./src/sass/hbook.scss'])
		.pipe(compass({
			comments: false,
			style:'nested',
			css: './docs/css',
			sass: './src/sass',
			image: './src/images'

		}))

		.pipe(gulp.dest('./dist/css'))
		.pipe(gulp.dest('./docs/css'))
		.pipe(rename( { suffix: '.min' }))
		.pipe(minicss())
		.pipe(gulp.dest('./dist/css'))
		//.pipe(gulp.dest('./docs/css'))
		

});

//压缩样式
// gulp.task('minicss', function() {
// 	gulp.src('./dist/css/*.css')
// 		.pipe(minicss())
// 		.pipe(gulp.dest('./dist/css'))
// })

//编译sass
gulp.task("sass", function() {
	return sass('sass')
		.on('error', function(err) {
			console.error('Error!', err.message);
		})
		.pipe(gulp.dest('style'));

})

//检查js
gulp.task("jshint", function() {
	gulp.src("./src/scripts/.js")
		.pipe(jshint())
		.pipe(jshint.reporter('default')); //导入到模块任务里面
})

// 合并、压缩文件
gulp.task('scripts', function() {

	//生成docs目录
	gulp.src(['./src/js/**/*.js','!./src/js/lib/**/*.js'])
		.pipe(rename( { suffix: '.min' }))
		.pipe(uglify())
		.pipe(gulp.dest('./docs/js'))
		.pipe(livereload())

	//生成dist目录
	gulp.src(['./src/js/module/*.js'])
		.pipe(concat('hbook.js'))
		.pipe(gulp.dest('./dist/js'))
		.pipe(gulp.dest('./docs/js'))
		.pipe(rename( { suffix: '.min' }))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js'))
		//.pipe(gulp.dest('./docs/js'))
});

//压缩图片
gulp.task('imagemin', function() {
	gulp.src('./src/images/**/*.*')
		.pipe(imagemin())
		.pipe(gulp.dest('./docs/images'))
		.pipe(notify({
			message: 'compress ok !'
		}))
})

//压缩Html/更新引入文件版本
gulp.task('miniHtml', function () {
    return gulp.src(['./docs/rev/**/*.json', './docs/**/*.html'])
	        //.pipe(revCollector())
	        .pipe(minifyHtml())
	        .pipe(gulp.dest('./dist/'))
	        
});


//定义名为"watch"的任务
gulp.task('watch', function() {
	gulp.watch('./src/images/*.*',['imagemin']);
	gulp.watch('./src/template/*.ejs',['ejs']);
	gulp.watch('./src/js/**/*.js',['scripts']);
	gulp.watch('./src/sass/**/*.scss',['compass']);
	// gulp.watch('./src/style/*.css',['compass']);
})


//每个gulpfile.js里都应当有一个dafault任务，它是缺省任务入口（类似C语言的main()入口），运行gulp的时候实际只是调用该任务（从而来调用其它的任务）
gulp.task('default', function() {
	//gulp.run(tasks)表示运行对应的任务，这里表示执行名
	gulp.run('clean','copy', 'compass',  'imagemin','scripts');
	//执行'watch'监听任务
	// gulp.run('watch');
	// 监听文件变化
	gulp.watch([
		'./src/**/*.html',
		'./src/sass/**/*.scss',
		'./src/images/**',
		'./src/css/**/*.css',
		'./src/js/**/*.js'
	], function() {
		livereload.listen();
		gulp.run('clean','copy', 'compass',  'imagemin', 'scripts');
	});
})