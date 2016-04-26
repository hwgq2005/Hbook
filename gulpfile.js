/**
 *
 * @authors H君
 * @date    2015-07-14 14:02:03
 * @version $Id$
 */

//    js/src.js：指定确切的文件名。
//    js/*.js：某个目录所有后缀名为js的文件。
//    js/**/*.js：某个目录及其所有子目录中的所有后缀名为js的文件。
//    !js/src.js：除了js/src.js以外的所有文件。
//    *.+(js|css)：匹配项目根目录下，所有后缀名为js或css的文件。

//引入gulp插件node模块
var gulp = require('gulp'),
	template = require('gulp-template'),
	ejs = require("gulp-ejs"),
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
	livereload = require('gulp-livereload'),
	notify = require('gulp-notify');

//Gulp 仅有 5 个方法就能组合出你需要的任务流程：task, run, watch, src, dest


// 定义web模块,类似于全局的http-server
gulp.task('http-server', function() {
	connect.server({
		livereload: true
	});
});
gulp.task('clean', function () {
	return gulp.src('./src/scripts/lib/jquery/src/', {read: false})
    .pipe(clean());
 
});

gulp.task('html', function() {
	return gulp.src('./src/**.*')
		.pipe(template({
			srcName: 'aa'
		})) //模板变量
		.pipe(gulp.dest('./dist/'));
});

gulp.task('copy', function() {
	gulp.src('./src/scripts/lib/**/*.js')
		.pipe(gulp.dest('./dist/scripts/lib/'));
});

//gulp.task(name, fn)gulp模块的task方法，用于定义具体的任务。它的第一个参数是任务名，第二个参数是任务函数。
gulp.task('uglify', function() {

	//gulp.src(glob)返回了一个可读的stream，如此行返回了./js/*.js下的全部
	gulp.src('./src/scripts/**/*.js')

		.pipe(uglify())
		//gulp.dest(glob)返回一个可写的stream，如此行是将文件流写入到 ./dist/js 里的对应路径下            
		.pipe(gulp.dest('./dist/scripts/'))
		.pipe(notify({
			message: '可以了 ok !'
		}))
})

// 创建Compass任务
gulp.task('compass', function() {
	gulp.src(['./src/sass/*.scss','!./src/sass/config.scss'])
		.pipe(compass({
			comments: false,
			style:'nested',
			css: './dist/style',
			sass: './src/sass',
			image: './src/images'

		}))
		
		.pipe(rename( { suffix: '.min' }))
		.pipe(minicss())
		.pipe(gulp.dest('./dist/style'));

});

//压缩样式
// gulp.task('minicss', function() {
// 	gulp.src('./dist/style/*.css')
// 		.pipe(minicss())
// 		.pipe(gulp.dest('./dist/style'))
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
	gulp.src(['./src/scripts/**/*.js','!./src/scripts/lib/**/*.js'])
	// gulp.src('./src/scripts/*.js')
		// .pipe(concat('all.js'))
		// .pipe(gulp.dest('./dist/scripts'))
		.pipe(rename( { suffix: '.min' }))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/scripts'))
		.pipe(livereload())
});

//压缩图片
gulp.task('imagemin', function() {
	gulp.src('./src/images/**/*.*')
		.pipe(imagemin())
		.pipe(gulp.dest('./dist/images'))
		.pipe(notify({
			message: 'compress ok !'
		}))
})

// 检测HTML变化并刷新
// gulp.task("html", function() {
// 	// gulp.src('*.*')
// 	// 	.pipe(livereload());

// 	gulp.src('./src/*.html')
// 		.pipe(gulp.dest('./dist/'))
// })

//定义名为"watch"的任务
gulp.task('watch', function() {
	gulp.watch('./src/images/*.*',['imagemin']);
	gulp.watch('./src/template/*.ejs',['ejs']);
	gulp.watch('./src/scripts/**/*.js',['scripts']);
	gulp.watch('./src/sass/*.scss',['compass']);
	// gulp.watch('./src/style/*.css',['compass']);
})


//每个gulpfile.js里都应当有一个dafault任务，它是缺省任务入口（类似C语言的main()入口），运行gulp的时候实际只是调用该任务（从而来调用其它的任务）
gulp.task('default', function() {
	//gulp.run(tasks)表示运行对应的任务，这里表示执行名
	gulp.run('clean','html','copy', 'compass',  'imagemin','scripts');
	//执行'watch'监听任务
	// gulp.run('watch');
	// 监听文件变化
	gulp.watch([
		'./src/*.html',
		'./src/template/*.ejs',
		'./src/sass/*.scss',
		'./src/images/**',
		'./src/style/*.css',
		'./src/scripts/**/*.js'
	], function() {
		livereload.listen();
		gulp.run('clean','html','copy', 'compass',  'imagemin', 'scripts');
	});
})