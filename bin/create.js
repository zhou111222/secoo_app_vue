/*
 * @Tips: 禁止改动
 * @Description: 创建楼层脚本
 * @Author: zhoupengfei
 * @Date: 2019-11-27 15:52:31
 */
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const logSuccess = require('./untils.js').logSuccess;
const logTips = require('./untils.js').logTips;
const exitFolder = require('./untils.js').exitFolder;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/*
 * @Description: 咨询文件夹名称
 * @Author: zhoupengfei
 */
function acceptFileName() {
    rl.question('【请输入要创建的楼层名称】'.brightGreen, answer => {
        // 创建目录和文件 
        mkdirs(answer.trim());
        process.exit(0)
    });
}
/*
 * @Description: 创建楼层
 * @Author: zhoupengfei
 */
function mkdirs(dirname) {
    if (exitFolder(path.join(__dirname, './widget', dirname))) {
        logTips(`${dirname}楼层已存在，请重新创建！`);
    } else {
        try {
            let floorHtml = `<div class="${dirname}"></div>`;
            let floorCss = `.${dirname}{}`;
            let floorJs = `const ${dirname} = function() {
    Vue.component('${dirname}', {
        data: function() {},
        props: [],
        watch: {},
        computed: {},
        created: function() {},
        mounted: function() {},
        methods: {},
        template: '#tmpl_${dirname}'
    });
}
export { ${dirname} }`;
            fs.mkdirSync(path.join('./widget', dirname));
            fs.writeFileSync(path.join('./widget', dirname, dirname + '.html'), floorHtml, 'utf-8');
            fs.writeFileSync(path.join('./widget', dirname, dirname + '.scss'), floorCss, 'utf-8');
            fs.writeFileSync(path.join('./widget', dirname, dirname + '.js'), floorJs, 'utf-8');
            logSuccess(`${dirname}楼层已创建完成...`);
        } catch (error) {
            logTips(error);
        }
    }
}
acceptFileName();