var express = require('express');
var router = express.Router();
var data = {
    'code': '000',
    'message': 'message消息',
    'lists': [{
        'naem': '小马',
        'age': '12',
        'sex': '男'
    }, {
        'naem': '小韦',
        'age': '12',
        'sex': '女'
    }]

};
/* GET users listing. */
router.get('/', function(req, res, next) {

    res.send(data);
});

module.exports = router;