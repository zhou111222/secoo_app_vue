//css部分
import './public/css/common.scss';
import './widget/firstscreen/firstscreen.scss';
import './widget/introduce/introduce.scss';
import './widget/floor/floor.scss';

//楼层js部分
import { firstscreen } from './widget/firstscreen/firstscreen';
import { introduce } from './widget/introduce/introduce';
import { floor } from './widget/floor/floor';

function jsLoaded() {
    $(function() {
        firstscreen();
        introduce();
        floor();
        new Vue({
            el: '#app',
            data: {
                message: 'hello world!'
            },
            mounted() {},
            methods: {}
        });
    });
}

jsLoaded();