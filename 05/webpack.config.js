//由于webpack基于node构建 所以配置文件中任何合法代码支持
var path=require('path')

//在内存中 根据指定的模板的页面 生成一份内存中的首页 同事自动把打包好的bundle注入到页面底部
//如果要配置插件 需要在导出的对象中 挂载一个plugins节点
var htmlWebpackPlugin = require('html-webpack-plugin')
//入口和出口文件 检查配置文件 导入配置对象 根据这个对象进行打包构建
module.exports={
    entry:path.join(__dirname,'./src/main.js'),
    output:{
        path:path.join(__dirname,'./dist'),
        filename:"bundle.js"
    },
    plugins:[
        new htmlWebpackPlugin({
            template:path.join(__dirname,'./src/index.html'),//指定模板文件路径
            filename:'index.html'//设置生成页面名称
            })
    ],
    module:{//配置所有第三方loader模块的
        rules:[//第三方模块的匹配规则
            {test:/\.css$/,use:['style-loader','css-loader']}//处理css文件的loader
        ]
    }
}