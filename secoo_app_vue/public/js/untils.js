//工具函数
/*
 * @desc 名字中间部分替换成星号
 * @params name<string> 用户名
 * @params num<number>中间保留几位*号
 */
const formatName = function(name, num) {
    var newStart = '*';
    var newName = '';
    for (let i = 1; i < num; i++) {
        newStart = newStart + '*';
    }
    if (name.length >= 2) {
        newName = name.split('')[0] + newStart + name.split('')[name.length - 1];
    } else {
        newName = name + newStart + '*';
    }
    return newName;
};
export {
    formatName,
}