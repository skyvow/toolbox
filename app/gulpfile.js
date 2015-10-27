/*!
 * gulp
 * $ npm install gulp gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-cache gulp-clean gulp-usemin gulp-rev imagemin-pngquant gulp-zip browser-sync --save-dev
 */

// Load plugins
var gulp         = require('gulp'),                   //gulp  
    sass         = require('gulp-ruby-sass'),         //sass
    autoprefixer = require('gulp-autoprefixer'),      //css前缀 
    minifycss    = require('gulp-minify-css'),        //css压缩
    jshint       = require('gulp-jshint'),            //js代码校验
    uglify       = require('gulp-uglify'),            //js压缩
    imagemin     = require('gulp-imagemin'),          //img压缩
    pngquant     = require('imagemin-pngquant'),      //img压缩
    rename       = require('gulp-rename'),            //重命名
    concat       = require('gulp-concat'),            //合并文件
    notify       = require('gulp-notify'),            //更改提醒
    cache        = require('gulp-cache'),             //图片缓存
    Browsersync  = require('browser-sync').create(),  //同步多浏览器
    reload       = Browsersync.reload,                //自动刷新页面
    clean        = require('gulp-clean'),             //清空文件夹
    usemin       = require('gulp-usemin'),            //替换css、js路径
    rev          = require('gulp-rev'),               //追加哈希值为版本号
    zip          = require('gulp-zip');               //自动打包文件

//时间戳
var nowDate = '-' + new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate();

//替换css、js路径
gulp.task('usemin', function() {
  return gulp.src('../src/*.html')
    .pipe(usemin({
      css: [  ],
      js: [  ],
    }))
    .pipe(gulp.dest('../dist/'));
});

// Styles
gulp.task('styles', function() {
  return sass('../src/styles/main.scss', { style: 'expanded' })
    .pipe(autoprefixer())
    .pipe(gulp.dest('../dist/styles'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('../dist/styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Styles
gulp.task('styles-src', function() {
  return sass('../src/styles/main.scss', { style: 'expanded' })
    .pipe(autoprefixer())
    .pipe(gulp.dest('../src/styles'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('../src/styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src([
        '../src/scripts/angular/*.js',
        '../src/scripts/angular-ui/*.js',
        '../src/scripts/custom/*.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('../dist/scripts'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('../dist/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
    return gulp.src('../src/images/**/*')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest('../dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

//Html copy
gulp.task('html', function () {
    return gulp.src('../src/*.html')
    .pipe(gulp.dest('../dist/'))
    .pipe(notify({ message: 'Html task complete' }));
});

//Fonts copy
gulp.task('fonts', function () {
    return gulp.src('../src/fonts/**/*')
    .pipe(gulp.dest('../dist/fonts'))
    .pipe(notify({ message: 'Fonts task complete' }));
});

//Tpl copy
gulp.task('tpl', function () {
    return gulp.src('../src/tpl/**/*')
    .pipe(gulp.dest('../dist/tpl'))
    .pipe(notify({ message: 'Tpl task complete' }));
});

//Api copy
gulp.task('api', function () {
    return gulp.src('../src/api/**/*')
    .pipe(gulp.dest('../dist/api'))
    .pipe(notify({ message: 'Api task complete' }));
});

//Clean
gulp.task('clean', function() {
  return gulp.src(
    [
        '../dist/styles', 
        '../dist/scripts', 
        '../dist/images', 
        '../dist/fonts', 
        '../dist/tpl', 
        '../dist/api',
        '../dist/**/*',
    ], {read: false})
    .pipe(clean({force: true}));
});

//自动打包文件
gulp.task('zip', function () {
    return gulp.src('../dist/**/*')
        .pipe(zip('app.zip'))
        .pipe(rename({ suffix: nowDate }))
        .pipe(gulp.dest('../build'));
});

// 生产环境 
gulp.task('browser-sync', ['styles', 'scripts', 'images', 'fonts', 'tpl', 'api'], function() {

    //替换css、js路径为生产环境
    gulp.start('usemin');

    //静态服务器
    Browsersync.init({
        port: '8888',
        server: {
            baseDir: "../dist"
        }
    });

    // Watch .scss files
    gulp.watch('../src/styles/**/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('../src/scripts/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch('../src/images/**/*', ['images']);

    // Watch fonts files
    gulp.watch('../src/fonts/**/*', ['fonts']);

    // Watch tpl files
    gulp.watch('../src/tpl/**/*', ['tpl']);

    // Watch api files
    gulp.watch('../src/api/**/*', ['api']);

    // Watch any files in dist/, reload on change
    gulp.watch(['../dist/**']).on('change', reload);
});

// Default task
gulp.task('default', ['browser-sync'], function() {
    // gulp.start('styles', 'scripts', 'images');
});



// 开发环境
gulp.task('app-src', ['styles-src'], function() {

    //静态服务器
    Browsersync.init({
        port: '8888',
        server: {
            baseDir: "../src"
        }
    });

    // Watch .scss files
    gulp.watch('../src/styles/**/*.scss', ['styles-src']);

    // Watch any files in dist/, reload on change
    gulp.watch(['../src/**']).on('change', reload);
});

// Src task
gulp.task('src', ['app-src'], function() {
    // gulp.start('styles', 'scripts', 'images');
});