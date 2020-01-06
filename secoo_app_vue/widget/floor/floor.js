import { getHotProduct } from '../../api/index.js';
import { pageObserve } from '../../public/js/observe';
const floor = function() {
    // 注册组件
    Vue.component('floor', {
        data: function() {},
        mounted() {
            //懒加载
            let that = this;
            const executionFn = function(that) {
                that.getData();
            }
            pageObserve($('#floor'), executionFn, that);
        },
        methods: {
            getData: function() {
                getHotProduct().then(res => {
                    if (res.data.code === 0) {
                        console.log("获取热门商品", res);
                    }
                });
            }
        },
        template: '#tmpl_floor'
    });
}
export {
    floor,
}