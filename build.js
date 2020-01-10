/*
 * @Tips: 禁止改动
 * @Description: webpack打包好代码后,对index.tmpl.html页面数据进行读取,拼接成本地预览页面'./dist/index.html'
 * @Author: zhoupengfei
 * @Date: 2019-11-27 15:52:31index.html
 */
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const colors = require('colors');
const postcss = require('postcss');
const px2rem = require('postcss-px2rem');
const Progress = require('./bin/untils.js').Progress;
const logSuccess = require('./bin/untils.js').logSuccess;
const logTips = require('./bin/untils.js').logTips;
const logName = require('./bin/untils.js').logName;
const logGrid = require('./bin/untils.js').logGrid;
const escape2Html = require('./bin/untils.js').escape2Html;
const template = fs.readFileSync(path.join(__dirname, '/template/widget/widget.html'), 'utf-8');

/*
 * @Description: 执行打包逻辑，生成dist下的index.html
 * @Author: zhoupengfei
 */
function spliteHtml() {
    fs.readFile('./index.tmpl.html', 'utf8', function(err, data) {
        if (err) {
            logTips(err);
        } else {
            var $ = cheerio.load(data);
            var childs = $('#app .observe');
            if (childs && childs.length > 0) {
                childs.each(function() {
                    var name = $(this).attr('name'),
                        id = $(this).attr('id'),
                        templateData = JSON.parse($(this).attr('data') ? $(this).attr('data') : '{}'),
                        htmls = fs.readFileSync('./widget/' + name + '/' + name + '.html', 'utf-8'),
                        _$ = cheerio.load(htmls);
                    if (process.env.NODE_ENV != 'development' && _$('.template').length > 0) {
                        _$('.template').each((index, item) => {
                            $(item).html(template.replace(/templateId/g, templateData[$(item).attr('template_tpl')]));
                        });
                    }
                    var tempDom = _$(`<template id="tmpl_${name}"></template>`).html(_$.html());
                    $("#template").append(tempDom);
                    logName(id);
                });
                var originCssText = fs.readFileSync(path.join(__dirname, '/dist/css/styles.css'), 'utf-8');
                var spriteCssText = '';
                if (fs.existsSync(path.join(__dirname, '/dist/css/sprite.css'))) {
                    spriteCssText = fs.readFileSync(path.join(__dirname, '/dist/css/sprite.css'), 'utf-8');
                }
                var cssData = postcss().use(px2rem({ remUnit: 75 })).process(originCssText + spriteCssText).css;
                var jsData = fs.readFileSync(path.join(__dirname, '/dist/js/main.js'), 'utf-8');
                if (cssData && jsData) {
                    logSuccess("【页面样式读取完毕！】");
                    logSuccess("【页面脚本读取完毕！】");
                    $("<style ></style>").text(cssData).appendTo($("head"));
                    $('<script type="text/javascript"><script/>').text(jsData).appendTo($("body"));
                    fs.writeFileSync('./dist/index.html', $.html(), 'utf-8');
                    logSuccess("【所有楼层结构写入完毕】");
                    logSuccess("【所有页面样式加载完毕】");
                    logSuccess("【所有页面脚本加载完毕】");
                    console.log("");
                    console.log("");
                    Progress('渲染进度：', '渲染完成：', 100);
                    if (process.env.NODE_ENV != 'development') {
                        logGrid();
                    }
                }
            }
        }
    });
}
spliteHtml();