/*
 * @Tips: 禁止改动
 * @Description: 定义全局数据
 * @Author: zhoupengfei
 * @Date: 2019-11-27 15:52:31
 */
export default class {
    constructor() {}
    state() {
        return window.__proto__.state || {}
    }
    initstate() {
        window.__proto__.state = {}
    }
    getstate(keys) {
        let key = keys.toString();
        try {
            for (let attr in window.__proto__.state) {
                if (attr === key) {
                    return window.__proto__.state[key]
                } else {
                    console.error(`未发现state对象有${key}属性,请检查代码`);
                }
            }
        } catch (err) {
            console.error(err);
        }
    }
    dispatch(keys, value) {
        let key = keys.toString();
        window.__proto__.state[key] = value
    }
}