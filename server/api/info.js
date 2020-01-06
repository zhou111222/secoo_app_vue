// api/info.js

var infoData = {
    status: 0,
    enableRemind: 0,
    teamInfo: {
        allocateWishValue: 100000,
        teamUserList: [{
            devoteWishValue: 1000,
            headImage: '//pic12.secooimg.com/res/combat/combat/head.png',
            isLeader: 1,
            nickName: '周鹏飞',
            targetUser: 0,
            teamId: '1234345',
            userId: '1111'
        }, {
            devoteWishValue: 1000,
            headImage: '//pic12.secooimg.com/res/combat/combat/head.png',
            isLeader: 0,
            nickName: '周鹏飞',
            targetUser: 0,
            teamId: '1234345',
            userId: '1111'
        }, {
            devoteWishValue: 1000,
            headImage: '//pic12.secooimg.com/res/combat/combat/head.png',
            isLeader: 0,
            nickName: '周鹏飞',
            targetUser: 0,
            teamId: '1234345',
            userId: '1111'
        }, {
            devoteWishValue: 1000,
            headImage: '//pic12.secooimg.com/res/combat/combat/head.png',
            isLeader: 0,
            nickName: '周鹏飞',
            targetUser: 0,
            teamId: '1234345',
            userId: '1111'
        }, {
            devoteWishValue: 1000,
            headImage: '//pic12.secooimg.com/res/combat/combat/head.png',
            isLeader: 0,
            nickName: '周鹏飞',
            targetUser: 0,
            teamId: '1234345',
            userId: '1111'
        }, {
            devoteWishValue: 1000,
            headImage: '//pic12.secooimg.com/res/combat/combat/head.png',
            isLeader: 0,
            nickName: '周鹏飞',
            targetUser: 0,
            teamId: '1234345',
            userId: '1111'
        }],
        totalSize: 500,
        totalWishValue: 20000
    }
};
exports.getData = function(method, data) {
    var backData = {
        'retCode': 0,
        'retMsg': 'message消息11',
        "data": infoData
    }
    if (method == 'DELETE') {
        backData = {
            "code": '999',
            "msg": "不支持DELETE方法"
        }
    }
    return JSON.stringify(backData);
}