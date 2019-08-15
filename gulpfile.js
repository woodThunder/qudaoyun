var gulp = require('gulp');
var less = require('gulp-less');
var clean = require('gulp-clean');
var babel = require('gulp-babel');
var copy = require('gulp-copy');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var util = require('gulp-util');
var minifycss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var koa = require('koa');
var app = koa();
var cfg = require('./devServer/config');
var zip = require('gulp-zip');
var gulpIgnore = require('gulp-ignore');
var fs = require('fs');
var del = require('del');

var DevServer = require("./devServer/server");

var projectdir = "src/ocm-web";

// var R = require("r-js");

var serverConfig = cfg.serverConfig;

var publishConfig = cfg.publishConfig;

function errHandle(err) {
    console.log(err);
    util.log(err.fileName + '文件编译出错，出错行数为' + err.lineNumber + '，具体错误信息为：' + err.message);
    this.end();
};

// 编译 src 下所有的 html,js 文件到 dist 目录
gulp.task('copy:static', function() {
    return gulp.src([projectdir + '/**'])
        .pipe(rename(function(path) {
            path.dirname += '';
        }))
        .pipe(gulp.dest("./dist"));
})



// 完整 copy vendor 目录下的资源到 dist
gulp.task('copy:vendor', function(done) {
    done();
});



// 匹配所有 less文件进行 less 编译
gulp.task('less', function() {
    return gulp.src(['src/**/style.less', 'src/**/theme_color.less'])
        .pipe(less())
        .pipe(rename(function(path) {
            path.extname = ".css"
        }))
        .pipe(gulp.dest('src'));
});

gulp.task('less:dist', function() {
    gulp.src([projectdir + '/**/*.less'])
        .pipe(less())
        .pipe(minifycss())
        .pipe(rename(function(path) {
            path.extname = ".css"
        }))
        .pipe(gulp.dest('dist'));
    return gulp.src([projectdir + '/**/*.css'])
        .pipe(minifycss())
        .pipe(gulp.dest('dist'));
});



//
gulp.task('es2015', function() {
    console.log('编译 JS 代码，支持 ES6 语法编译')
    return gulp.src(['src/**/*.es'])
        .pipe(babel({
            presets: ['es2015'],
            plugins: ['transform-es2015-modules-amd']
        }))
        .on('error', errHandle)
        .pipe(rename(function(path) {
            path.extname = ".js"
        }))
        .pipe(gulp.dest('src'));
});

gulp.task('es2015:dist', function() {
    return gulp.src(['src/**/*.es'])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015'],
            plugins: ['transform-es2015-modules-amd']
        }))
        .pipe(rename(function(path) {
            path.extname = ".js"
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .on('error', errHandle)
        .pipe(gulp.dest('dist'));
});
//压缩js
gulp.task('uglify:config', function() {
    return gulp.src([projectdir + '/config/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist/config'));
});
gulp.task("uglify:pages", function() {
    return gulp.src([projectdir + '/pages/**/*.js'])
        .pipe(uglify())
        .on('error', errHandle)
        .pipe(gulp.dest('dist/pages'));
});
gulp.task("uglify:vendor", function() {
    return gulp.src([projectdir + '/vendor/**/*.js'])
        .pipe(uglify())
        .on('error', errHandle)
        .pipe(gulp.dest('dist/vendor'));
});


gulp.task("uglify:js", function() {
    return gulp.src([projectdir + '/**/*.js'])
        .pipe(uglify())
        .on('error', errHandle)
        .pipe(gulp.dest('dist'));
});
gulp.task("uglify:css", function() {
    return gulp.src([projectdir + '/**/*.css', '!' + projectdir + '/vendor/kindeditor{,/**}', '!' + projectdir + '/pages/b2b/globalviewsale/globalviewsale.css', '!' + projectdir + '/pages/inventory/globalviewinventory/globalviewinventory.css'])
        .pipe(minifycss())
        .on('error', errHandle)
        .pipe(gulp.dest('dist'));
});
gulp.task('uglify', gulp.parallel('uglify:js', 'uglify:css'))

//打包为war
gulp.task("zip", function() {
    var condition = ['index.html', 'index.css', 'main.css', 'bower.json', '/document/', '*.es', '*.less', './**/*.map']; //打包忽略文件列表
    return gulp.src(['dist/**/*']).pipe(gulpIgnore.exclude(condition)).pipe(zip('dist.war')).pipe(gulp.dest('./'));
});

gulp.task('_package', gulp.series('copy:vendor', 'copy:static', 'es2015:dist', 'uglify', 'zip'));

//安装到maven中
gulp.task("_install", function() {

    if (!publishConfig) {
        console.console.error("can't find publishConfig in config.js");
    }
    var targetPath = fs.realpathSync('.');
    var installCommandStr = publishConfig.command + " install:install-file -Dfile=" + targetPath + "/dist.war   -DgroupId=" + publishConfig.groupId + " -DartifactId=" + publishConfig.artifactId + "  -Dversion=" + publishConfig.version + " -Dpackaging=war";
    var process = require('child_process');
    var installWarProcess = process.exec(installCommandStr, function(err, stdout, stderr) {
        if (err) {
            console.log('install war error:' + stderr);
        }
    });
    installWarProcess.stdout.on('data', function(data) {
        console.info(data);
    });
    installWarProcess.on('exit', function(data) {
        console.info('install war success');
    })

})
//发布到maven仓库中
gulp.task("_deploy", function() {
    if (!publishConfig) {
        console.console.error("can't find publishConfig in config.js");
    }
    var process = require('child_process');
    var targetPath = fs.realpathSync('.');
    var publishCommandStr = publishConfig.command + " deploy:deploy-file  -Dfile=" + targetPath + "/dist.war   -DgroupId=" + publishConfig.groupId + " -DartifactId=" + publishConfig.artifactId + "  -Dversion=" + publishConfig.version + " -Dpackaging=war  -DrepositoryId=" + publishConfig.repositoryId + " -Durl=" + publishConfig.repositoryURL;
    console.info(publishCommandStr);
    var publishWarProcess = process.exec(publishCommandStr, {
        encoding: 'utf8',
        timeout: 0,
        maxBuffer: Infinity, // 默认 200 * 1024
        killSignal: 'SIGTERM'
    }, function(err, stdout, stderr) {
        if (err) {
            console.log('publish war error:' + stderr);
        }
    });

    publishWarProcess.stdout.on('data', function(data) {
        console.info(data);
    });
    publishWarProcess.on('exit', function(data) {
        console.info('publish  war success');
    });
});

//监听文件改动，执行相应任务
gulp.task('watch', function() {
    console.log('监听文件改动，执行相应任务')
    gulp.watch('src/**/*.less', gulp.parallel('less'));
    gulp.watch('src/**/*.es', gulp.parallel('es2015'));
    // gulp.watch(['src/**/*.html', 'src/**/*.js', 'src/**/*.css'], ['copy:static']);
});

//清空 dist 目录下的资源
gulp.task('clean', function(done) {
    return del(['dist.war', './dist'], done);
});
// gulp.task('clean', function() {
//     console.log('清空 dist 目录下的资源')
//     return gulp.src(['dist.war', './dist'], {
//             read: false
//         })
//         .pipe(clean({
//             force: true
//         }));
// });

//
gulp.task('dev-server', function() {
    serverConfig.app = app;
    var mockServer = new DevServer(serverConfig);
    mockServer.start(serverConfig);
});

gulp.task('deploy', gulp.parallel('clean', '_package', '_deploy'));
gulp.task('install', gulp.parallel('clean', '_package', '_install'));
gulp.task('package', gulp.series('clean', '_package'));

gulp.task('copy', gulp.parallel('copy:vendor'));
gulp.task('before', gulp.parallel('copy', 'less', 'es2015'));
gulp.task('default', gulp.parallel('copy:static', 'dev-server', 'watch'));
