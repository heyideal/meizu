// 

define(["jquery"], function($){
    var main = function(){
        //主页代码写在这里
        $(function(){
            var aBtns = $("#banner").find("ol").find("li");
            var oUl = $("#banner").find("ul");
            var aLis = oUl.find("li");

            var iNow = 0;//当前是第几张图片索引
            var timer = null;
            aBtns.click(function(){
                iNow = $(this).index();
            })

            function tab(){
                //按钮亮起的地方
                aBtns.removeClass("active").eq(iNow).addClass("active");
                if(iNow == 5){
                    aBtns.eq(0).addClass("active");
                }
                //让ul动
                oUl.animate({
                    top: -680 * iNow//第五张图片动画结束的时候在这里
                }, 600, function(){
                    if(iNow == 5){
                        iNow = 0;
                        oUl.css("top", 0);
                    }
                })
            }

            function timerInner(){
                iNow++;
                tab();
            }
            timer = setInterval(timerInner, 2000);
            //添加移入移出效果
            $("#banner").hover()
        })
        $(function(){

            //<1>下载商品列表
            $.ajax({
                url: "../data/data.json",
                type: "GET",
                success: function(res){
                    var html = "";

                    for(var i = 0; i < res.length; i++){
                        html += `<li class = "goods_item">
                                        <div class = "goods_pic">
                                            <img src = "${res[i].img}" alt = "我是图片">
                                        </div>
                                        <div class = "goods_title">
                                            <p>我是标题描述</p>
                                        </div>
                                        <div class = "sc_btn" id = "${res[i].id}">加入购物车</div>
                                    </li>`;
                    }
                    $(".goods_box ul").html(html);
                }
            })
            $("#nav .user").on({
                mouseover: function(){
                    $("#nav .register").css("display", "block");
                    $("#header").css("background","");

                }
            })
            $(".register").on({
                mouseover:function(){
                     $("#nav .register").css("display", "block");
                 },
                mousemove:function(){
                     $("#nav .register").css("display", "block");
                 },
                mouseout: function(){
                    $(".register").css("display", "none");
                }

            })

            $("#nav .register").find("li").find("a").on({
                mouseover: function(){
                    $(this).css("color", "#31A5E7");
                },
                mouseout: function(){
                    $(this).css("color", "black");
                }
            })
            $("#nav .nav").find("li").has(".box").on({
                mouseenter: function(){
                    $("#header").css("backgroundColor", "#fff");
                    // $("#nav .nav li a").css("color", "#31A5E7");
                    $("#nav .nav ul").attr("class","headercolor2");
                    $("#nav .logo img").attr("src","images/blue.png");
                },
                 mousemove: function(){
                    // $("#header").css("backgroundColor","");
                    $("#nav .nav ul").attr("class","headercolor2");
                    $("#nav .logo img").attr("src","images/blue.png");
                },
                mouseout: function(){
                    $("#header").css("backgroundColor","");
                    $("#nav .nav ul").attr("class","headercolor1");
                    $("#nav .logo img").attr("src","images/white.png");
                }
            })


            //<1>下载视频列表
            $.ajax({
                url: "../data/video.json",
                type: "GET",
                success: function(res){
                    var video = "";

                    for(var i = 0; i < res.length; i++){
                        video += `<li><a href = ""><img class = "img" src="${res[i].img}" alt=""></a>
                                    <p class = "word">${res[i].desc}</p>
                                </li>`;
                    }
                    $(".video ul").html(video);
                }
            })
            //下载手机列表
            $.ajax({
                url: "../data/phone.json",
                type: "GET",
                success: function(res){
                    var phone = "";

                    for(var i = 0; i < res.length; i++){
                        phone += `<li class = "box-active">
                                        <a href="" style = "background:url(${res[i].img});background-size:160% 100%;background-position:center center">
                                            <span class = "logo" style = "background:url(${res[i].logo}) no-repeat;background-position:center center"></span>
                                            <p>${res[i].desc}</p>
                                        </a>
                                    </li>`;
                    }
                    $(".phone ul").html(phone);
                }
            })
            //下载配件列表
            $.ajax({
                url: "../data/parts.json",
                type: "GET",
                success: function(res){
                    var parts = "";

                    for(var i = 0; i < res.length; i++){
                        parts += `<li class = "box-active">
                                        <a href="" style = "background:url(${res[i].img});background-size:160% 100%;background-position:center center">
                                            <span>${res[i].span}</span>
                                            <p>${res[i].em}</p>
                                        </a>
                                    </li>`;
                    }
                    $(".parts .border ul").html(parts);
                }
            })
             //下载配件列表
            $.ajax({
                url: "../data/parts.json",
                type: "GET",
                success: function(res){
                    var parts = "";

                    for(var i = 0; i < res.length; i++){
                        parts += `<li class = "box-active">
                                        <a href="" style = "background:url(${res[i].img});background-size:160% 100%;background-position:center center">
                                            <span>${res[i].span}</span>
                                            <p>${res[i].em}</p>
                                        </a>
                                    </li>`;
                    }
                    $(".parts .border ul").html(parts);
                }
            })

             //下载服务列表
            $.ajax({
                url: "../data/serve.json",
                type: "GET",
                success: function(res){
                    var serve = "";

                    for(var i = 0; i < res.length; i++){
                        if(res[i].QRcode){
                            serve += `<li class = "box-active">
                                        <a href="">
                                        <p>${res[i].em}</p>
                                            <img class = "normal" src="${res[i].img}" alt="">
                                            <img class = "rotate" src="${res[i].QRcode}" alt="">
                                        </a>
                                    </li>`;
                        }else{
                            serve += `<li class = "box-active">
                                        <a href="" style = "background:url(${res[i].img}) no-repeat;background-position-x:-160px;">
                                        <p>${res[i].em}</p>
                                        </a>
                                    </li>`;
                        }

                    }
                    $(".serve .border ul").html(serve);
                }
            })
             //下载文章列表
            $.ajax({
                url: "../data/box.json",
                type: "GET",
                success: function(res){
                    var essay = "";

                    for(var i = 0; i < res.length; i++){
                        essay += `<li class = "box-active">
                                    <a href="">
                                        <div class = "img">
                                            <img src="${res[i].img}" alt="">
                                        </div>
                                        <div class = "user">
                                            <img src="${res[i].user}" alt="">
                                            <em>${res[i].em}</em>
                                        </div>
                                        <div class = "user-info">
                                            <span class = "title">${res[i].title}</span>
                                            <span class = "watch">${res[i].watch}</span>
                                            <span class = "comments">${res[i].comments}</span>
                                        </div>
                                    </a>
                                </li>`;
                    }
                    $(".box ul").html(essay);
                }
            })

            $.ajax({
                url: "../data/box1.json",
                type: "GET",
                success: function(res){
                    var pro7 = "";

                    for(var i = 0; i < res.length; i++){
                        pro7 += `<li>
                                    <a href=""><img src="${res[i].img}" alt=""></a>
                                    <p>${res[i].title}</p>
                                </li>`;
                    }
                    $(".meizuphone").html(pro7);
                }
            })
            $(".box1").on({
                mouseenter:function(){
                   // $(".pro").css("display","block");
                   $(".meizuphone").animate({height:136,opacity:1,paddingLeft:468},400).css("display","block");
                   $(".meilanphone").css("display","none");
                   $(".appcessory").css("display","none");
                }
            })
            $(".meizuphone").on({
                mouseenter:function(){
                    $("#header").css("background","#fff");
                    $(".nav ul").attr("class","headercolor2");
                    $("#nav logo img").attr("src","images/blue.png");
                },
                mousemove:function(){
                    $("#header").css("background","#fff");
                    $(".meizuphone").css("display","block");
                },
                mouseleave:function(){
                    $("#header").css("background","");
                    $(".nav ul").attr("class","headercolor1");
                    $(".meizuphone").css("display","none");
                    $(".meizuphone").css("paddingLeft",500);
                }
            })

            $.ajax({
                url: "../data/box2.json",
                type: "GET",
                success: function(res){
                    var meilan = "";

                    for(var i = 0; i < res.length; i++){
                        meilan += `<li>
                                    <a href=""><img src="${res[i].img}" alt=""></a>
                                meizuphone<p>${res[i].title}</p>
                                </li>`;
                    }
                    $(".meilanphone").html(meilan);
                }
            })
            $(".box2").on({
                mouseenter:function(){
                   $(".meilanphone").animate({height:136,opacity:1,paddingLeft:140},400).css("display","block");
                   $(".meizuphone").css("display","none");
                   $(".appcessory").css("display","none");

                }
            })
            $(".meilanphone").on({
                mouseenter:function(){
                    $("#header").css("background","#fff");
                    $(".nav ul").attr("class","headercolor2");
                    $("#nav logo img").attr("src","images/blue.png");
                },
                mousemove:function(){
                    $("#header").css("background","#fff");
                    $(".meilanphone").css("display","block");
                },
                mouseleave:function(){
                    $("#header").css("background","");
                    $(".nav ul").attr("class","headercolor1");
                    $(".meilanphone").css("display","none");
                    $(".meilanphone").css("paddingLeft","160");
                }
            })

            $.ajax({
                url: "../data/box3.json",
                type: "GET",
                success: function(res){
                    var peijian = "";

                    for(var i = 0; i < res.length; i++){
                        peijian += `<li>
                                    <a href=""><img src="${res[i].img}" alt=""></a>
                                    <p>${res[i].title}</p>
                                </li>`;
                    }
                    $(".appcessory").html(peijian);
                }
            })
            $(".box3").on({
                mouseenter:function(){
                   // $(".pro").css("display","block");
                   $(".appcessory").animate({height:136,opacity:1,paddingLeft:140},400).css("display","block");
                   $(".meizuphone").css("display","none");
                   $(".meilanphone").css("display","none");

                }
            })
            $(".appcessory").on({
                mouseenter:function(){
                    $("#header").css("background","#fff");
                    $(".nav ul").attr("class","headercolor2");
                    $("#nav logo img").attr("src","images/blue.png");
                },
                mousemove:function(){
                    $("#header").css("background","#fff");
                    $(".appcessory").css("display","block");
                },
                mouseleave:function(){
                    $("#header").css("background","");
                    $(".nav ul").attr("class","headercolor1");
                    $(".appcessory").css("display","none");
                    $(".appcessory").css("paddingLeft","160");
                }
            })

            $(document).mouseleave(function(){
                $(".appcessory").animate({height:0,opacity:0},0).css("paddingLeft",160);
                $(".meilanphone").animate({height:0,opacity:0},0).css("paddingLeft",160);
                $(".meizuphone").animate({height:0,opacity:0},0).css("paddingLeft",500);
            })
            $(".none").mouseenter(function(){
                $("#nav .nav ul").attr("class","headercolor1");
                $(".appcessory").animate({height:0,opacity:0},0);
                $(".meilanphone").animate({height:0,opacity:0},0);
                $(".meizuphone").animate({height:0,opacity:0},0);
            })

        })
        return "我是main函数";
    }
    return {
        main: main
    }
})
