//1.Promise是一个构造函数 既然是构造函数 那么就可以new一个Promise()  得到一个对象
//resolve()成功后的回调函数
//reject()  失败后的回调函数
//在promise构造函数的prototype属性上有一个.then（）方法 只要是promise创建的实例  都可以访问到
//如果Promise表示一个异步操作 每当new一个Promise实例 这个实例就表示一个具体的异步操作
//异步操作的结果分两种状态  
//1 状态1：异步执行成功了 成功回调函数 resolve()
//2 状态2：异步执行失败了 失败回调函数 reject()
//因为是异步操作无法使用return 返回给调用者 只能使用回调函数的形势 来把成功或失败的结果返回给调用者
//实例上 调用.then()方法 预先为这个异步操作 指定成功和失败回调函数

//注意 这里new出来的promise只是代表形式上的异步操作
// var promise = new Promise()

//这里是使用function指定一个具体的异步操作
// var promise = new Promise(function(){

// })


const fs = require('fs')
// var promise =new Promise(function(){
//     fs.readFile('./file/2.txt','utf-8',(err,dataStr)=>{
//         if (err) throw err
//         console.log(dataStr)
//     })
// })

//给路径 返回读取到的内容
function getFileByPath(fpath){
    var promise =new Promise(function(resolve,reject){
    fs.readFile(fpath,'utf-8',(err,dataStr)=>{
        // if (err) throw err
        // console.log(dataStr)
        if(err) return reject(err)
        resolve(dataStr)
    })
})
return promise
}

// var p =getFileByPath('./file/2.txt')
// p.then(function(dataStr){
//     console.log(dataStr+'-----')
// },function(err){
//     console.log(err.message)
// })


//需求 先读取文件1 再读取文件2 
//再上一个.then中返回一个新的promise实例 可以继续用下一个.then

//如果 前面的promise执行失败 不想让后续的promise操作被终止 可以为每个promise指定失败的回调
// getFileByPath('./file/11.txt').then(function(dataStr){
//     console.log(dataStr+'-----')
//     return getFileByPath('./file/2.txt')
// },function(err){
//     console.log(err.message)
//     return getFileByPath('./file/2.txt')
// }).then(function(dataStr){
//     console.log(dataStr+'-----')
//     return getFileByPath('./file/3.txt')
// }).then(function(dataStr){
//     console.log(dataStr+'-----')

// })

//需求1：哪怕前面的promise执行失败 但是不要影响后续的promise执行 
//需求2：如果promise互相依赖 如果前面的失败了  则后面的就没有意义执行 一旦失败 立即退出
//且捕获这个失败

getFileByPath('./file/11.txt').then(function(dataStr){
    console.log(dataStr+'-----')
    return getFileByPath('./file/2.txt')
}).then(function(dataStr){
    console.log(dataStr+'-----')
    return getFileByPath('./file/3.txt')
}).then(function(dataStr){
    console.log(dataStr+'-----')

}).catch(function(err){//catch作用  如果前面有任何promise执行失败  则立即终止所以promise执行 并进入catch中
    //去处理promise中的错误
    console.log('这是自己处理方式'+err.message)
})

