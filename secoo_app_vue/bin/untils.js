/*
 * @Tips: 可自行添加
 * @Description: node使用的公共函数
 * @Author: zhoupengfei
 * @Date: 2019-11-27 15:52:31
 */
const colors = require('colors');
const readline = require('readline');
const slog = require('single-line-log').stdout;
const unloadChar = '█';
const loadedChar = '█';
/*
 * @Description: 进度条执行函数
 * @Author: zhoupengfei
 */
function Progress(loadingText, endText, time) {
    let i = 0;
    let timer = setInterval(() => {
        if (i > 10) {
            clearInterval(timer);
            process.exit(0);
        } else if (i === 10) {
            renderProgress(`${endText}: `, i);
            i++;
        } else {
            renderProgress(`${loadingText}: `, i);
            i++;
        }
    }, time);
}
/*
 * @Description: 进度条渲染函数
 * @Author: zhoupengfei
 */
function renderProgress(text, step) {
    const PERCENT = Math.round(step * 10);
    const COUNT = 3;
    const unloadStr = new Array(COUNT * (10 - step)).fill(unloadChar).join('');
    const loadedStr = new Array(COUNT * (step)).fill(loadedChar).join('');
    slog(`${text}${PERCENT}%【${loadedStr.brightGreen}${unloadStr.grey}】`);
}
/*
 * @Description: html反转义
 * params str<string>
 * @Author: zhoupengfei
 */
function escape2Html(str) {
    return new Promise(function(resolve, reject) {
        var s = "";
        if (str.length == 0) return "";
        s = str.replace(/&amp;/g, "&");
        s = s.replace(/&lt;/g, "<");
        s = s.replace(/&gt;/g, ">");
        s = s.replace(/&nbsp;/g, " ");
        s = s.replace(/&#39;/g, "\'");
        s = s.replace(/&quot;/g, "\"");
        s = s.replace(/<br\/>/g, "\n");
        resolve(s);
    });
}
/*
 * @Description: 打印执行成功的信息
 * @Author: zhoupengfei
 */
function logSuccess(text) {
    console.log(text.brightGreen);
}
/*
 * @Description: 打印执行过程中的提示信息
 * @Author: zhoupengfei
 */
function logTips(text) {
    console.log('\033[40;31m ' + text);
}
/*
 * @Description: 打印执行过程中高亮显示的信息
 * @Author: zhoupengfei
 */
function logName(id) {
    console.log(`【${id.bgGreen}楼层读取完毕】`);
}

/*
 * @Description: 创建文件夹
 * @params fileName <string>
 * @Author: zhoupengfei
 */
function createFolder(dirPath) {
    var dirname = path.basename(dirPath);
    try {
        fs.access(dirPath, fs.constants.F_OK, (err) => {
            if (err) {
                console.log(`${dirname}文件已存在，请重新创建！`);
                process.exit(1);
            } else {
                fs.mkdirSync(dirPath);
            }
        });
    } catch (e) {
        console.log(`${dirname}文件已存在，请重新创建！`);
        process.exit(1);
    }
}
/*
 * @Description: 判断文件或者文件夹是否存在
 * @params path <string>
 * @Author: zhoupengfei
 */
function exitFolder(path) {
    try {
        fs.access(path, fs.constants.F_OK, (err) => {
            if (err) {
                return false;
            } else {
                return true;
            }
        });
    } catch (e) {
        return false;
    }
}
exports.Progress = Progress;
exports.logSuccess = logSuccess;
exports.escape2Html = escape2Html;
exports.logTips = logTips;
exports.logName = logName;
exports.createFolder = createFolder;
exports.exitFolder = exitFolder;