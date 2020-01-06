import request from './server.js';

/*
 * @Description: 获取热门推荐商品
 * @Date: 2019-08-23 11:29:45
 */
export function getHotProduct() {
    return request({
        url: "/market/prod/hot",
        method: 'get',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        params: {}
    });
}