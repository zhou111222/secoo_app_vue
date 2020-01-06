/*
 * @Tips: 需要自己配置user-config.json
 * @Description: 页面代码上传到erp并发布
 * @Author: zhoupengfei
 * @Date: 2019-11-27 15:52:31
 */
const path = require('path');
const fs = require('fs'); //引入文件读取模块
const request = require('request');
const cheerio = require('cheerio');
const Progress = require('./untils.js').Progress;
const logTips = require('./untils.js').logTips;
const escape2Html = require('./untils.js').escape2Html;

function upload() {
    var htmlData = fs.readFile(path.join(__dirname, '..', '/dist/index.html'), 'utf-8', function(err, data) {
        if (err) {
            console.log(err);
        } else {
            var $ = cheerio.load(data);
            var uploadurl = 'http://erp.secoo.com/foms/page_updatePageContent.do';
            var page_push_url = 'http://erp.secoo.com/foms/page_publishPage.do';
            var userConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '/user-config.json')), 'utf8');
            if (userConfig.pageId != '') {
                escape2Html($.html()).then((escapedata) => {
                    var uploadformData = {
                        id: userConfig.pageId,
                        pageName: userConfig.pageName,
                        pagePath: userConfig.url,
                        pageContent: $.html(),
                    };
                    var pushformData = {
                        id: userConfig.pageId
                    };
                    request.post({
                        url: uploadurl,
                        form: uploadformData,
                    }, (err, res, body) => {
                        if (body === '1') {
                            request.post({
                                url: page_push_url,
                                form: pushformData,
                            }, (err, res, body) => {
                                if (body === '1') {
                                    Progress("代码正在上传...".brightYellow, "代码已发布至erp".brightGreen, 100);
                                } else {
                                    logTips('代码发布失败');
                                    process.exit(1);
                                }
                            })
                        } else {
                            logTips('代码上传失败');
                            process.exit(1);
                        }
                    })
                });
            } else {
                logTips('user-config.json文件异常，代码上传失败');
                process.exit(1);
            }
        }
    });
}
upload();