var gulp = require('gulp');
var less = require('gulp-less');
var cssmin = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var postcss = require('gulp-postcss');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync');

gulp.task('default', function () {
    gulp.watch('static/less/*.less', ['disposeLess']); //当所有less文件发生改变时，调用disposeLess任务
    gulp.watch('static/js/*.js', ['disposeJs']); //当所有js文件发生改变时，调用disposeJs任务
    gulp.watch('static/img/*', ['disposeImg']); //当所有img文件发生改变时，调用disposeImg任务
});

//Less输出CSS
gulp.task('disposeLess', function() {
	gulp.src('static/less/*.less')
    	.pipe(less())
    	.pipe(gulp.dest('build/css'));
});
//Js 输出
gulp.task('disposeJs',function() {
	gulp.src('static/js/*.js')
		.pipe(gulp.dest('build/js'));
})
//图片 输出
gulp.task('disposeImg', function () {
    gulp.src('static/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'));
});
//文件输出及压缩
gulp.task('miniFile',function(){
	gulp.src('static/less/*.less')
        .pipe(less())
        .pipe(cssmin())
        .pipe(gulp.dest('build/css'));
    gulp.src('static/less/lib/*.css')
    	.pipe(gulp.dest('build/css/lib'));
    gulp.src('static/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
    gulp.src('static/js/lib/*.js')
    	.pipe(gulp.dest('build/js/lib'));
    gulp.src('static/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'));
})
//启动服务
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
        port: 7777
    });
});

