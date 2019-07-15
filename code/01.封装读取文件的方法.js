const fs =require('fs')
const path=require('path')


//封装方法读取文件
//callback有两个参数 第一个是失败的结果 第一个是成功的结果
//如果成功后返回的结果位于callback参数的第二个位置 第一个位置为null  如果失败 则第一个位置放置Error对象 ，第二个 undefined
function getFileByPath(fpath,callback){
    fs.readFile(fpath,'utf-8',(err,dataStr)=>{
        //如果报错了，进入if分支后，if后面代码就没有必要执行了
        if (err) return callback(err);

        callback(null,dataStr)
    })
}

// var result =getFileByPath(path.join(__dirname,'./file/1.yxy'))
getFileByPath(path.join(__dirname,'./file/1.yxy'),(err,dataStr)=>{
    if (err) return console.log(err.message)
    console.log(dataStr)
})