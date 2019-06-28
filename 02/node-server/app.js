//导入http内置模块
const http = require('http')
const urlModule = require('url')

//创建一个http 服务器
const server =http.createServer()



//监听http服务器的request请求
server.on('request',function(req,res){
    //const url = req.url
    const{pathname:url,query} = urlModule.parse(req.url,true)
    var data={
        name:'213',
        age:'18'
    }
    const url =req.url
    if(url==='/getscript'){
        var scriptStr=`${query.callback}(${json.stringify(data)})`
        //res.end 发送给客户端 客户端把这个字符串当做JS代码去解析执行
        res.end(scriptStr)
    }else{
        res.end('404')
    }
})


//指定端口号并启动服务器监听
server.listen(2000,function(){
    console.log('服务器启动')
})