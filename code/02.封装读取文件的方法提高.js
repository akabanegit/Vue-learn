const fs =require('fs')
const path=require('path')


//封装方法读取文件
//callback有两个参数 第一个是失败的结果 第一个是成功的结果
//如果成功后返回的结果位于callback参数的第二个位置 第一个位置为null  如果失败 则第一个位置放置Error对象 ，第二个 undefined
function getFileByPath(fpath,sucCb,errCb){
    fs.readFile(fpath,'utf-8',(err,dataStr)=>{
        //如果报错了，进入if分支后，if后面代码就没有必要执行了
        if (err) return errCb(err);

        sucCb(null,dataStr)
    })
}


// getFileByPath(path.join(__dirname,'./file/1.txt'),function(data){
//     console.log(data+'成功')
// },function(err){
//     console.log('失败'+err.message)
// })

//需求 先读取文件1 再读取文件2 再读取文件3 回调嵌套
getFileByPath(path.join(__dirname,'./file/1.txt'),function(data){
    getFileByPath(path.join(__dirname,'./file/2.txt'),function(data){
        getFileByPath(path.join(__dirname,'./file/3.txt'),function(data){
            console.log(data+'成功')
        },function(err){
            console.log('失败'+err.message)
        })
    },function(err){
        console.log('失败'+err.message)
    })
},function(err){
    console.log('失败'+err.message)
})
// 使用es6中的promise来解决回调地狱问题
//promise本质是要干什么的：单纯的为了解决回调地狱  把多层的嵌套改造成串联式的
