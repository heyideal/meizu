console.log("载入成功");
// 设置需要引入的js文件

require.config({
    paths: {
        //模块名字： 模块路径
        "jquery": "jquery-1.11.3",
        "index": "index",
        "parabola": "parabola"

    }
        //设置依赖关系


})

//要去调用index.js中的main
require(["index"], function(index){
     console.log(index.main());
})
require(["login"], function(login){
     console.log(login.login());
})



