/*
 * @Tips: 禁止修改
 * @Description: 检测代码改动，浏览器热更新脚本
 * @Author: zhoupengfei
 * @Date: 2019-11-27 15:52:31
 */
const npm = require('npm');
const bs = require('browser-sync').create();
const chokidar = require('chokidar');
const child_process = require('child_process');
const colors = require('colors');
const logSuccess = require('./untils.js').logSuccess;
const logTips = require('./untils.js').logTips;
const logName = require('./untils.js').logName;
var ready = false;
/*
 * @Description: 执行npm run dev成功之后对生成的代码进行观察
 * @params commond <string> cb <callback>
 * @Author: zhoupengfei
 */
function directives(commond, cb) {
    npm.load(function() {
        npm.commands.cache(['clean'], function() {
            npm.commands.run([commond], cb);
        })
    })
}
/*
 * @Description: 执行函数
 * @params cb <callback>
 * @Author: zhoupengfei
 */
function dev(cb) {
    return directives('dev', function() {
        cb && cb();
    })
}
/*
 * @Description: 观察文件内容改变
 * @params path <string>
 * @Author: zhoupengfei
 */
function fileChangeListener(path) {
    logTips(path + '源码发生修改，进行编译,请稍后');
    child_process.exec('npm run dev', function(error, stdout, stderr) {
        if (error) {
            logTips(error.stack);
        }
        logSuccess('编译完成');
    })
}
/*
 * @Description: 观察新增文件
 * @params path <string>
 * @Author: zhoupengfei
 */
function fileAddListener(path) {
    if (ready) {
        fileChangeListener(path);
    }
}

/*
 * @Description: 观察删除文件
 * @params path <string>
 * @Author: zhoupengfei
 */
function fileDeleteListener(path) {
    fileChangeListener(path);
}
/*
 * @Description: 监听源码
 * @params cb <callback>
 * @Author: zhoupengfei
 */
function soundCode(cb) {
    logSuccess('neves开始监听源代码文件变化...')
    const warcher = chokidar.watch(['widget/**/*.*', 'public/**/*.*', 'api/**/*.*', 'main.js', 'index.tmpl.html'])
    warcher.on('all', (event, path) => {
        switch (event) {
            case 'change':
                fileChangeListener(path);
                break;
            case 'add':
                fileAddListener(path);
                break;
            case 'addDir':
                fileAddListener(path);
                break;
            case 'unlink':
                fileDeleteListener(path);
                break;
            case 'unlinkDir':
                fileDeleteListener(path);
                break;
            case 'ready':
                ready = true
                break;
            default:
                break;
        }
    });
    logSuccess("源码监听完成");
}

/*
 * @Description: 监听dist下的html文件
 * @params cb <callback>
 * @Author: zhoupengfei
 */
function compileCompleteCode(cb) {
    logSuccess("neves开始监听dist下的html文件");
    //该文件产生变化时 说明构建已完成。
    const watcher = chokidar.watch('dist/**/*.html');
    watcher.on('all', (event, path) => {
        if (event === 'change') {
            logTips(path + '发生变化，开始进行热更新');
            bs.reload(path);
            logSuccess("热更新已完成");
        }
    });
    logSuccess("编译后的代码监听完成");
}
/*
 * @Description: 代码打包成功后进行检测，并启动一个本地服务
 */
dev(function() {
    logSuccess("neves已开始进行本地编译");
    soundCode()
    compileCompleteCode()
    logSuccess('neves开启browserSync代理服务...');
    bs.init({
        server: {
            baseDir: "dist",
            index: "index.htm"
        },
        logPrefix: "secoo neves",
        open: 'local'
    });
});