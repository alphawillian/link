let gulp = require('gulp');
let fs = require('fs');
let wrapper = require('gulp-wrapper');
let browserSync = require('browser-sync');  //启动本地服务
let gulpSequence = require('gulp-sequence');    //管理任务队列
let sourcemaps = require('gulp-sourcemaps');    //sass的maps插件，方便定位sass
let sass = require('gulp-sass');    //sass转css插件
let less = require('gulp-less');	//less转css插件

let minifyCSS = require('gulp-clean-css'); //压缩css
let uglify = require('gulp-uglify');    //压缩js
let replace = require('gulp-replace');	//替换字符串

let babel = require('gulp-babel');

let watcherCss = gulp.watch('static/less/*.less', ['devDistCss']);
let watcherJs = gulp.watch('static/js/*.js',['devDistJs']);
let watcherHtml = gulp.watch('views/*.html', ['devDistHtml']);

let projectUtil = {
	// 获取一个时间戳
	getTimestamp: function(){
		let timestamp =Date.parse(new Date());
		return timestamp;
	},
	// 获取当前时间
	getNowDate: function() {
		var nowDate = new Date();
		now = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate() + ' ' + nowDate.getHours() + ':' + nowDate.getMinutes() + ':' + nowDate.getMinutes();
		return now;
	},
	// 删除文件夹
	deleteDir: function(path) {
		var _this = this;
		var files = [];
		if (fs.existsSync(path)) {
			files = fs.readdirSync(path);
			files.forEach(function(file, index) {
				var curPath = path + "/" + file;
				if (fs.statSync(curPath).isDirectory()) { // recurse
					_this.deleteDir(curPath);
				} else { // delete file
					fs.unlinkSync(curPath);
				}
			});
			fs.rmdirSync(path);
		}
	},
}
// 启动服务
gulp.task('server', function() {
	var files = [
		'html/**/*.html',
		'**/**/*.js',
		'**/**/*.css'
	];
	browserSync.init(files, {
		server: {
				baseDir: './',
				directory: true,
				https: false
		},
		port: 8888
	});
});
// 开发时的css处理
gulp.task('devDistCss',function(){
	gulp.src('static/less/*.less')
			.pipe(sourcemaps.init())
			.pipe(less())
			.pipe(sourcemaps.write('lessmap'))
			.pipe(gulp.dest('static/css'))
})
// 开发时的js处理
gulp.task('devDistJs', function(){
	gulp.src('static/js/*.js')
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(gulp.dest('build/js'))
})
// 开发时的html处理
gulp.task('devDistHtml', function(){
	gulp.src('views/*.html')
	.pipe(gulp.dest('html'))
})
// 将index.scss 编译为 index.css
gulp.task('sass', function () {
	return gulp.src('css/*.scss')
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(sourcemaps.write('css/maps'))
	.pipe(gulp.dest('css'));
});
gulp.task('sass:watch', function () {
  gulp.watch('./css/*.scss', ['sass']);
});
//压缩css
gulp.task('miniCss', function(){
	gulp.src(['css/**/*.css'])
		.pipe(minifyCSS({}))
		.pipe(wrapper({
				header: '/* @update: ' + projectUtil.getNowDate() + ' */ \n'
		}))
		// .pipe(rev())
		.pipe(gulp.dest('build/css'))
		// .pipe(rev.manifest({}))
		.pipe(gulp.dest('build/css'));
})
// 压缩js
gulp.task('miniJs', function() {
	gulp.src(['js/*.js'])
		.pipe(uglify({
				// mangle: {
				//     except: ['jQuery', '$', 'require']
				// },
				// output: {
				//     ascii_only: true
				// }
		}))
		.pipe(wrapper({
				header: '/* @update: ' + projectUtil.getNowDate() + ' */ \n'
		}))
		.pipe(gulp.dest('build/js'));
	gulp.src(['js/index.js','js/extend.js','js/proHub.js'])
		.pipe(uglify({
			// mangle: {
			//     except: ['jQuery', '$', 'require']
			// },
			// output: {
			//     ascii_only: true
			// }
		}))
		.pipe(wrapper({
				header: '/* @update: ' + projectUtil.getNowDate() + ' */ \n'
		}))
		// .pipe(rev())
		.pipe(gulp.dest('build/js'))
		// .pipe(rev.manifest({}))
		.pipe(gulp.dest('build/js'));    
});
// 根据css和js的添加后缀名的json.替换掉HTML中引用的css,js
gulp.task('html',function(){
	return gulp.src(['build/js/*.json', 'build/css/*.json', 'html/index.html'])
			// .pipe(revCollector())
			.pipe(gulp.dest('build/html'));
})
// 将压缩后的js,css和替换后的HTML输出到和develop同级目录下
gulp.task('destFile', function(){
	gulp.src(['build/css/*.css'])
		.pipe(gulp.dest("../css"));
	gulp.src(['build/js/*.js'])
		.pipe(gulp.dest("../js"));
	gulp.src(['build/html/*.html'])
		.pipe(gulp.dest("../html"));
})

// 删除build 文件夹
gulp.task('deleteBuild', function() {
  projectUtil.deleteDir('build');
});
//删除父级元素和develop统计目录的css js html 以便随后的压缩输出
gulp.task('deleteParent', function() {
	projectUtil.deleteDir('../css');
	projectUtil.deleteDir('../html');
	projectUtil.deleteDir('../js');
});

//功能样式完成之后压缩
gulp.task('build', function(cb){
  gulpSequence('deleteBuild','miniCss', 'miniJs', cb);
})
// 文件输出到develop同级的文件 
gulp.task('dest', function(cb){
  gulpSequence('html','deleteParent','destFile', cb);
})
//开发时执行该命令 开发完成后需依次执行 gulp build 和 gulp dest 命令。
gulp.task('dev',function(cb){
  gulpSequence('server', cb);
})