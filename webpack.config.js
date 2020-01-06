'use strict'
const webpack = require('webpack');
const path = require('path')
const SpritesmithPlugin = require('webpack-spritesmith');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const uglify = require('uglifyjs-webpack-plugin');
let spriteBaseUrl = '//pic12.secooimg.com/res/combat/combat/';

// 封装链接拼接函数
function resolve(dir) {
    return path.join(__dirname, dir)
}
// 自定义雪碧图插件css模板
function templateFunction(data) {
    let shared = '.icon { display:inline-block; background-image: url(I); background-size:WSMpx HSMpx; }'
        .replace('I', data.sprites[0].image)
        .replace('WSM', data.spritesheet.width)
        .replace('HSM', data.spritesheet.height);

    let perSprite = data.sprites.map(function(sprite) {
        return '.icon-N { width: Wpx; height: Hpx; background-position: Xpx Ypx; }'
            .replace('N', sprite.name)
            .replace('W', sprite.width)
            .replace('H', sprite.height)
            .replace('X', sprite.offset_x)
            .replace('Y', sprite.offset_y);
    }).join('\n');

    return shared + '\n' + perSprite;
}
module.exports = {
    mode: "production",
    entry: { //入口文件配置
        main: './main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js', //打包后输出文件的文件名
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@': resolve('public'),
            '@api': resolve('api'),
            '@w': resolve('widget'),
        },
        modules: ["node_modules", "spritesmith-generated"]
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['env', {
                                targets: {
                                    browsers: ['> 1%', 'last 2 versions']
                                }
                            }]
                        ]
                    }
                },
                exclude: '/node_modules/'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]', //保持打包后的图片名字和原来一样
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1000000,
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.scss/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"]
                })
            },
            {
                test: require.resolve('zepto'),
                loader: 'exports-loader?window.Zepto!script-loader'
            }
        ]
    },
    plugins: [
        // css打包到一个文件
        new ExtractTextPlugin("/css/styles.css"), //打包后的文件名
        // 雪碧图插件
        new SpritesmithPlugin({
            // 目标小图标
            src: {
                cwd: path.resolve(__dirname, './public/icons'),
                glob: '*.png'
            },
            // 输出雪碧图文件及样式文件
            target: {
                image: path.resolve(__dirname, './dist/sprites/sprite.png'),
                css: [
                    [path.resolve(__dirname, './dist/css/sprite.css'), {
                        format: 'function_based_template'
                    }]
                ]
            },
            // 样式文件中调用雪碧图地址写法
            apiOptions: {
                cssImageRef: process.env.NODE_ENV === 'development' ? './sprites/sprite.png' : spriteBaseUrl + 'sprite.png'
            },
            customTemplates: {
                'function_based_template': templateFunction,
            },
            spritesmithOptions: {
                padding: 10
            }
        }),
        // 引入zepto
        new webpack.ProvidePlugin({
            $: 'zepto'
        }),
        //压缩html
        new uglify()
    ]
}