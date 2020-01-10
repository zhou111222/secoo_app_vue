![neves.png](https://upload-images.jianshu.io/upload_images/18616547-5e8e093dae6a42a9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
# 项目开发说明
## 技术框架
1. 前端采用`Vue/ES6、sass`架构，兼容IE8+
2. Neves脚手架采用`node + express + Webpack 4.0`。node完成脚手架基本的开发，express完成server端mock数据接口的开发.Webpack负责模块打包和项目优化。
3. 项目样式支持Sass,css
5. 异步请求使用`axios`，并在`api/server.js`中做了拦截器封装
6. 项目已集成 `webpack-spritesmith` `postcss-px2rem` `page-skeleton-webpack-plugin,zepto`等插件或类库，详情请查看webpack.config.js

## 项目原理和结构
![项目原理和结构.jpg](https://upload-images.jianshu.io/upload_images/18616547-a08dfb2a9b0f82b3.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## 目录结构及说明

```

|-- api                             // 页面异步请求和拦截器
|   |-- index.js                    // 页面异步请求集合
|   |-- server.js                   // 页面异步请求axios拦截器封装
|--bin                              // 脚手架主要功能node代码
|   |-- create.js                   // 创建组件脚本
|   |-- untils.js                   // 脚手架公共方法封装
|   |-- upload.js                   // 打包后代码上传到erp的脚本
|   |-- watch.js                    // 检测代码改变和浏览器热更新脚本
|-- dist                            // 打包后的代码集合
|   |--css                          // 页面的样式集合
|   |   |--sprite.css               // 页面对应的css sprite样式
|   |   |--styles.css               // 页面对应的各个楼层的样式
|   |-- js                          // 页面脚本集合
|   |   |--main.js                  //打包生成的页面脚本
|   |-- sprites                     // webpack生成的css sprite图片
|   |-- index.html                  // 最终打包生成的需要上传到erp的html文件
|-- node_modules                    // 项目依赖包
|-- public                          // 页面需要的静态资源
|-- server                          // 本地服务mock数据
|-- template                        // 板块模板规范
|-- widget                          // 项目中的组件集合
|   |-- floor                       // 其中一个组件
|   |   |-- floor.html              // 组件html
|   |   |-- floor.js                // 组件js脚本
|   |   |-- floor.scss              // 组件scss样式
|-- build.js                        // 构建页面node脚本
|-- index.tmpl.html                 // 页面的html模板
|-- main.js                         // 程序入口文件，加载各个组件
|-- package-lock.json               // 锁定安装时的包的版本号
|-- package.json                    // 项目基本信息
|-- README.md                       // 项目说明
|-- user-config.json                   // erp新建页面参数配置
|-- webpack.config.js                   // webpack基本常用配置

```
## 主要功能讲解
执行`npm ren  start`命令页面准确打开之后。可以进行项目的开发，h5活动页、app内嵌页的初始化、配置、调native方法等。可以在`index.tmpl.html`文件中配置。配置方式和之前保持统一。详细的请参考[h5活动页、app内嵌页开发说明](http://gitlab.secoo.com:8090/H5/h5_arsenal/h5_arsenal)。页面配置完成之后。完成主要功能可以参考如下：

#####新建楼层
执行`npm run create`之后输入楼层名称，**如果是vue的开发环境。楼层名称全部小写**。Neves自动生成一个楼层。楼层格式已包含在文件中。**不要随意删除楼层外壳的类名。可以在现有类名的基础上添加类名**
#####楼层引入页面规范
一个楼层新建完成之后，需要在2个文件中引入：
（1）`index.tmpl.html`，这个文件声明楼层。es6环境和 vue环境的引入基本一致，不同的是es6环境楼层由div标签包裹，vue环境由组件名包裹。例如：
```
### es6环境
<div name="floor" class="observe" state="observeing" id="floor" data='{"pro_1":"28095"}'></div>

### vue环境
<floor name="floor" class="observe" state="observeing" id="floor" data='{"pro_1":"28095"}'></floor>
```
楼层属性的属性可参考：
属性 | 是否必填 |  意义  
-|-|-
name |是 | 楼层名称,需要和创建时填的的一致 |
class | 否 | 类名为observe时楼层懒加载，不需要懒加载可不填|
state | 否 | 懒加载的状态， 不需要懒加载可不填|
id | 是 | 楼层id，需要页面唯一 |
data | 否 | 楼层需要的数据，比如板块的id |

(2)`main.js`这个文件引入楼层的css和js，并在jsLoaded函数中执行楼层对应的函数，例如：
```
//css部分
import './public/css/common.scss';
import './widget/firstScreen/firstScreen.scss';
import './widget/introduce/introduce.scss';
import './widget/floor/floor.scss';
// js部分
import store from './public/js/global';
const _$store = new store();
//楼层js部分

import { firstScreen } from './widget/firstScreen/firstScreen';
import { introduce } from './widget/introduce/introduce';
import { floor } from './widget/floor/floor';

function jsLoaded() {
    $(function() {
        _$store.initstate();
        //页面主逻辑
       firstScreen();
       ntroduce();
       floor();
    });
}

jsLoaded();
```
#####楼层懒加载规范
es6环境要在main.js中操作
第一步：引入pageObserver函数：
```
import { pageObserve } from './public/js/observe';
```
第一步：引入需要加懒加载的楼层函数：
```
import { firstScreen } from './widget/firstScreen/firstScreen';
import { introduce } from './widget/introduce/introduce';
import { floor } from './widget/floor/floor';
```
第三步： 在jsLoaded中执行pageObserve函数，参数为需要加懒加载的楼层函数的名称

```
pageObserve({ firstScreen, introduce, floor });
```
#####楼层绑定板块规范
有时候需要在楼层中绑定模板。比如图文模板或者商品模板。
第一步：在erp上新建板块，将之前的楼层html替换掉对应的字段后，复制到相应的位置。保存。生成板块编码。
第二步：在项目的`index.tmpl.html`文件中找到对应楼层为楼层绑定板块编码。例如：
```
//一般商品板块建议属性名称为pro_1、pro_2。图片板块属性名称为pic_1、pic_2
<floor name="floor" class="observe" state="observeing" id="floor" data='{"pro_1":"28095"}'></floor>
```
第三步：在楼层的html代码中，找到包裹板块的标签，添加两个属性：class="template"；template_tpl="板块名称，和第二步的名称一致"，例如：
```
<ul class="template recommend clearfix bindEventList" template_tpl="pro_1">

```
#####图标的使用规范
h5页面开发中，有一种优化叫做css sprites,但是在操作过程中很复杂，需要手动拼图，并且计算出每个图标的坐标和大小。Neves在此做了大量优化，用户无需关心拼图和计算图标的坐标、大小。在使用图标时
第一步：将需要的图标复制到public/icons文件夹,假如icon名称为btn.png
第二步：给需要加图标的标签增加2个class:例如：
```
<i class="icon icon-btn"></i>
```
#####mock数据使用规范
在开发项目的过程中，有些楼层需要请求数据接口，传统的开发模式是前后端分离，后端首先提供接口的数据结构和字段。前端造假数据开发。有些开发会使用一些mock数据平台或者mock.js之类的库。使用起来都比较麻烦。在这里，使用neves非常简单可以制造mock数据。

第一步：进入文件夹，打开终端命令行工具，实行`npm install`安装依赖包
第二步：进入serve/api文件夹，新建一个js文件，文件名即为接口名称
第三步：按照示例details.js,规定要返回的文件结构，字段等，制造mock数据。
第四步：修改serve/bin/www文件的端口号和项目端口号一致。并执行`npm start`

- mock数据完成，接口地址为：[http://localhost:5505/api/info](http://localhost:5505/api/info)
- '5505'为第四步填写的端口号，也就是本地项目的端口号，'info'为第二步创建的文件名称
#####px转rem
h5页面样式无需关注px转rem。开发过程中直接根据设计稿填px即可。Neves会自动转换为rem。默认按页面宽度分为10份，每一份为75px进行转换。假如设计稿给的宽度不是750，可以在build.js中修改。例如：
```
var cssData = postcss().use(px2rem({ remUnit: 75 })).process(originCssText + spriteCssText).css;
```
#####页面打包上传
项目开发完需要打包上传到erp上进行测试。也很简单：
第一步：执行`npm run build`将项目打包
第二步：执行`npm run upload`将打包后的页面上传到erp
>  需要特别注意的：
(1)项目打包之后需要将生成的css sprite图片上传到服务器。图片在dist/sprites/sprites.png。将生成的链接替换掉`webpack.config.js`中的spriteBaseUrl字段。
 (2)切换环境的时候千万不要忘记修改`user-config.js`中的pageId字段。替换为新环境中创建的页面id,不然会导致页面上传失败。
 (3)本地预览测试默认使用的是localhost:3000/index.html。会导致cdn上的activity_2019库和vue.js库无法加载，需要将localhost换成127.0.0.1

## 常用命令
1. `npm run start` 开发时使用，将启动本地服务
2. `npm run build` 构建项目，用于生产环境代码打包
3. `npm run create` 开发时使用，用于新建楼层
4. `npm run upload` 构建项目，用于将代码部署到erp上(寺库内部员工可用)

## 未来规划
1. 开发适合大型项目的Vue脚手架，提高开发效率，规范开发流程
2. 脚手架至少需要完成Vue-cli所有功能。并且在具备neves脚手架功能的基础上增加(1)可以使用Vue/Vue+Typescript开发。如果选择后者开发，所有的配置项、与其配套的优化措施，npm包需要自己开发(2)和activity_2020的npm包配套使用，让页面体积更小。(3)与之配套的骨架屏npm包(4)一键上传到堡垒机完成部署。
3. 支持新建板块