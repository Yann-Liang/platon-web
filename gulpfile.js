/**
 * @description 2018/7/17 gulp
 * @author liangyanxiang
 * @version 1.0.0
 *
 */

const gulp = require('gulp'),
	htmlmin = require('gulp-htmlmin'),
	autoprefixer = require('gulp-autoprefixer'),
	minifyCss = require('gulp-minify-css'),
	less = require("gulp-less"),
	LessPluginAutoPrefix = require("less-plugin-autoprefix"),
	LessPluginCleanCSS = require("less-plugin-clean-css"),
	cleancss = new LessPluginCleanCSS,
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	plumber = require('gulp-plumber'),
	browserSync = require('browser-sync').create(),
	reload = browserSync.reload,
	changed = require("gulp-changed"),
	imagemin = require('gulp-imagemin'),
	// ngAnnotate = require('gulp-ng-annotate'),
	ngmin = require('gulp-ngmin'),
	stripDebug = require('gulp-strip-debug'),
	notify = require('gulp-notify'),
	babel = require("gulp-babel"),
	es2015 = require("babel-preset-es2015");

const commonSrc = {
	url: "src/",
	index: "src/**.html",
	pcHtml: `src/*.html`,
	webHtml: `src/mobile/*.html`,
	enHtml:`src/en/**/*.html`,
	static:`src/static/**/*.*`,
	css:`src/css/**/*.css`,
	js: "src/js/**/*.js",
	less: "src/less/common/**/*.less",
	img: "src/img/**/*.**",
	lib:`src/lib/**/*`,
},
	dist = {
		url: "dist/",
		index: "dist/",
		pcHtml: `dist/`,
		webHtml: `dist/mobile`,
		enHtml:`dist/en`,
		static:`dist/static`,
		css:`dist/css`,
		js: "dist/js",
		less: "dist/css",
		img: "dist/img",
		lib:`dist/lib`,
	};

const options = {
	collapseWhitespace: true,
	collapseBooleanAttributes: true,
	removeComments: true,
	removeEmptyAttributes: true,
	removeScriptTypeAttributes: true,
	removeStyleLinkTypeAttributes: true,
	minifyJS: true,
	minifyCSS: true
},
	autoprefix = new LessPluginAutoPrefix({
		browsers: [
			"ie >= 7",
			"ie_mob >= 10",
			"ff >= 26",
			"chrome >= 30",
			"safari >= 6",
			"opera >= 23",
			"ios >= 5",
			"android >= 2.3",
			"bb >= 10"
		]
	});

gulp.task('pcHtml', function () {
	return gulp.src(commonSrc.pcHtml)
		.pipe(plumber())
		.pipe(changed(dist.pcHtml,
			{ extension: '.html' }))
		.pipe(htmlmin(options))
		.pipe(gulp.dest(dist.pcHtml))
		.pipe(reload({ stream: true }))
		.pipe(notify({ message: '执行pcHtml完毕' }));
});


gulp.task('css', function () {
	return gulp.src([commonSrc.css])
		.pipe(plumber())
		.pipe(less({
			plugins: [autoprefix, cleancss]
		}))
		// .pipe(concat('useMain.css'))
		.pipe(minifyCss())
		// .pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(dist.css))
		.pipe(reload({ stream: true }))
});

gulp.task('browser-sync', function () {
	const files = [
		'**/*.html',
		'**/*.css',
		'**/*.js'
	];
	browserSync.init(files, {
		//		proxy: "http://192.168.1.20:11500/biz",
		browser: "chrome",
		server: {
			//port:8020,
			baseDir: dist.url,
			index: "index.html"
		}
	});
});

gulp.task('js', function () {
	return gulp.src([commonSrc.js,])
		.pipe(babel({
			presets: ['es2015']
		}))
		// .pipe(ngAnnotate())
		// .pipe(ngmin({ dynamic: false }))
		// .pipe(stripDebug())//除去js代码中的console和debugger输出
		.pipe(uglify({ outSourceMap: false, mangle: false }))
		// .pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(dist.js))
		.pipe(reload({ stream: true }));
});

gulp.task('img', function () {
	return gulp.src(commonSrc.img)
		.pipe(changed(dist.index,
			{ extension: ['.png', '.jpg', 'gif'] }))
		.pipe(imagemin())
		.pipe(gulp.dest(dist.img))
		.pipe(notify({ message: '图片压缩完毕' }));
});

gulp.task('copyStatic', function () {
	return gulp.src(commonSrc.static)
		.pipe(gulp.dest(dist.static))
		.pipe(notify({ message: 'copyStatic task ok' }));
});

gulp.task('copyLib', function () {
	return gulp.src(commonSrc.lib)
		.pipe(gulp.dest(dist.lib))
		.pipe(notify({ message: 'copyLib task ok' }));
});

gulp.task('myWatch', function () {
	// gulp.watch(commonSrc.index, ['html']);
	gulp.watch(commonSrc.pcHtml, ['pcHtml']);

	gulp.watch([commonSrc.css, ], ['css']);
	gulp.watch([commonSrc.js], ['js']);

	gulp.watch(commonSrc.img, ['img']);
	gulp.watch(commonSrc.static, ['copyStatic']);
	gulp.watch(commonSrc.lib, ['copyLib']);
});



gulp.task('default', ['browser-sync', 'myWatch'], function () {
	console.log("run gulp");
	console.info("\n=>=>此版本支持ES6转ES5=>=>\n");
});
