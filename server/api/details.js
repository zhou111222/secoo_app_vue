// api/details.js
// 接口地址：http://localhost:5505/api/details
var teamData1 = {
    detailList: [{
        devoteWishValue: 1000,
        createDate: '2019-11-15 12:08',
        nickName: '大美1',
        teamId: '12345',
        teamType: 2,
        userId: '11222'
    }, {
        devoteWishValue: 1000,
        createDate: '2019-11-15 12:08',
        nickName: '大美',
        teamId: '12345',
        teamType: 2,
        userId: '11222'
    }, {
        devoteWishValue: 1000,
        createDate: '2019-11-15 12:08',
        nickName: '大美',
        teamId: '12345',
        teamType: 2,
        userId: '11222'
    }, {
        devoteWishValue: 1000,
        createDate: '2019-11-15 12:08',
        nickName: '大美',
        teamId: '12345',
        teamType: 2,
        userId: '11222'
    }, {
        devoteWishValue: 1000,
        createDate: '2019-11-15 12:08',
        nickName: '大美',
        teamId: '12345',
        teamType: 2,
        userId: '11222'
    }, {
        devoteWishValue: 1000,
        createDate: '2019-11-15 12:08',
        nickName: '大美',
        teamId: '12345',
        teamType: 2,
        userId: '11222'
    }, {
        devoteWishValue: 1000,
        createDate: '2019-11-15 12:08',
        nickName: '大美',
        teamId: '12345',
        teamType: 2,
        userId: '11222'
    }, {
        devoteWishValue: 1000,
        createDate: '2019-11-15 12:08',
        nickName: '大美',
        teamId: '12345',
        teamType: 2,
        userId: '11222'
    }]
};
var teamData2 = {
    detailList: [{
        devoteWishValue: 1000,
        createDate: '2019-11-15 12:08',
        nickName: '大美222',
        teamId: '12345',
        teamType: 2,
        userId: '11222'
    }, {
        devoteWishValue: 1000,
        createDate: '2019-11-15 12:08',
        nickName: '大美',
        teamId: '12345',
        teamType: 2,
        userId: '11222'
    }, {
        devoteWishValue: 1000,
        createDate: '2019-11-15 12:08',
        nickName: '大美',
        teamId: '12345',
        teamType: 2,
        userId: '11222'
    }, {
        devoteWishValue: 1000,
        createDate: '2019-11-15 12:08',
        nickName: '大美',
        teamId: '12345',
        teamType: 2,
        userId: '11222'
    }, {
        devoteWishValue: 1000,
        createDate: '2019-11-15 12:08',
        nickName: '大美',
        teamId: '12345',
        teamType: 2,
        userId: '11222'
    }, {
        devoteWishValue: 1000,
        createDate: '2019-11-15 12:08',
        nickName: '大美',
        teamId: '12345',
        teamType: 2,
        userId: '11222'
    }, {
        devoteWishValue: 1000,
        createDate: '2019-11-15 12:08',
        nickName: '大美',
        teamId: '12345',
        teamType: 2,
        userId: '11222'
    }, {
        devoteWishValue: 1000,
        createDate: '2019-11-15 12:08',
        nickName: '大美',
        teamId: '12345',
        teamType: 2,
        userId: '11222'
    }]
};
var teamData3 = {
    detailList: [{
        devoteWishValue: 1000,
        createDate: '2019-11-15 12:08',
        nickName: '大美3',
        teamId: '12345',
        teamType: 2,
        userId: '11222'
    }, {
        devoteWishValue: 1000,
        createDate: '2019-11-15 12:08',
        nickName: '大美',
        teamId: '12345',
        teamType: 2,
        userId: '11222'
    }, {
        devoteWishValue: 1000,
        createDate: '2019-11-15 12:08',
        nickName: '大美',
        teamId: '12345',
        teamType: 2,
        userId: '11222'
    }, {
        devoteWishValue: 1000,
        createDate: '2019-11-15 12:08',
        nickName: '大美',
        teamId: '12345',
        teamType: 2,
        userId: '11222'
    }, {
        devoteWishValue: 1000,
        createDate: '2019-11-15 12:08',
        nickName: '大美',
        teamId: '12345',
        teamType: 2,
        userId: '11222'
    }, {
        devoteWishValue: 1000,
        createDate: '2019-11-15 12:08',
        nickName: '大美',
        teamId: '12345',
        teamType: 2,
        userId: '11222'
    }]
};
exports.getData = function(method, data) {
    var mydata = null;
    if (data.currPage === '1') {
        mydata = teamData1
    } else if (data.currPage === '2') {
        mydata = teamData2
    } else if (data.currPage === '3') {
        mydata = teamData3
    } else {
        mydata = {
            detailList: []
        }
    }
    var backData = {
        'retCode': 0,
        'retMsg': 'message消息11',
        "data": mydata
    }
    if (method == 'DELETE') {
        backData = {
            "code": '999',
            "msg": "不支持DELETE方法"
        }
    }
    return JSON.stringify(backData);
}