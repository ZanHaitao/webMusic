//导入需要属性
const { series, src, dest, watch } = require('gulp');
//压缩html文件
const htmlClean = require('gulp-htmlclean');
//编译less文件
const less = require('gulp-less');
//压缩css文件
const cleanCss = require('gulp-clean-css');
//去除调试
const stripDebug = require('gulp-strip-debug');
//压缩js文件
const uglify = require('gulp-uglify');
//压缩image文件
const imageMin = require('gulp-imagemin');
//gulp本地服务器
const connect = require('gulp-connect');

//路径配置
const folder = {
    src: './src/',
    dist: './dist/',
};

function html() {
    return src(folder.src + '/html/*.html')
        .pipe(htmlClean())
        .pipe(dest(folder.dist + 'html'))
        .pipe(connect.reload());
}

function css() {
    return src(folder.src + '/css/*')
        .pipe(less())
        .pipe(cleanCss())
        .pipe(dest(folder.dist + 'css'))
        .pipe(connect.reload());
}

function js() {
    return (
        src(folder.src + '/js/*.js')
            // .pipe(stripDebug())
            .pipe(uglify())
            .pipe(dest(folder.dist + 'js'))
            .pipe(connect.reload())
    );
}

function image() {
    return src(folder.src + '/images/*')
        // .pipe(imageMin())
        .pipe(dest(folder.dist + 'images'));
}

function server(cb) {
    connect.server({
        port: '8888',
        livereload: true,
    });
    cb();
}

watch(folder.src + 'html/*', { delay: 2000 }, function (cb) {
    html();
    cb();
});

watch(folder.src + 'css/*', { delay: 2000 }, function (cb) {
    css();
    cb();
});

watch(folder.src + 'js/*', { delay: 2000 }, function (cb) {
    js();
    cb();
});

exports.default = series(html, css, js, image, server);
