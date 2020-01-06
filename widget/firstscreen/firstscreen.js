const firstscreen = function() {
    // 注册组件
    Vue.component('firstscreen', {
        data: function() {
            return {
                desc: '一个基于 Node、express、Vue.js、webpack 的深度定制化寺库前端工程化统一方案，帮助你快速构建H5页面应用。',
            }
        },
        props: ['message'],
        mounted() {
            console.log(this.message);
        },
        template: '#tmpl_firstscreen'
    });
}
export { firstscreen }