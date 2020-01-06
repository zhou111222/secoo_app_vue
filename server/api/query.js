// api/query.js

var teamData = {
    isLeader: 1,
    teamId: '123'
}
exports.getData = function(method, data) {
    var backData = {
        'retCode': 0,
        'retMsg': 'message消息11',
        "data": teamData
    }
    if (method == 'DELETE') {
        backData = {
            "code": '999',
            "msg": "不支持DELETE方法"
        }
    }
    return JSON.stringify(backData);
}