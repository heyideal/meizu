define(["jquery","jquery-cookie"], function($){
    var detail = function(){
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
                        top: -480 * iNow//第五张图片动画结束的时候在这里
                    }, 800, function(){
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


        $("#off").click(function(){
            $(".mzcontainer").animate({height:0},1000);
        })

            $("#nav .user").on({
                mouseover:function(){
                    $("#nav .register").css("display", "block");
                }
            })
            $(".register").on({
                mouseenter:function(){
                     $("#nav .register").css("display", "block");
                 },
                mousemove:function(){
                     $("#nav .register").css("display", "block");
                 },
                mouseleave: function(){
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

            $.ajax({
                url: "../data/hot1.json",
                type: "GET",
                success: function(res){
                    var hot1 = "";

                    for(var i = 0; i < res.length; i++){
                        hot1 += `<li><a href="">
                                        <img src="${res[i].img}" alt="">
                                        <h4>${res[i].h4}</h4>
                                        <span>${res[i].span}</span>
                                        <p>￥${res[i].p}</p>
                                    </a>
                                </li>`;
                    }
                    $(".hot-list .one").html(hot1);
                    $(".hot-list .two").html(hot1);
                }
            })
            $(".cut .more").click(function(){
                $(".scroll").animate({marginLeft:-1260},1000);
                $(".cut .more").css("color","#eee");
                $(".cut .more").css("borderColor","#eee");
                $(".cut .back").click(function(){
                    $(".cut .more").css("color","#999");
                    $(".cut .more").css("borderColor","#999");
                })

            })
            $(".cut .back").click(function(){
                    $(".scroll").animate({marginLeft:0},1000);
                    $(".cut .back").css("color","#eee");
                    $(".cut .back").css("borderColor","#eee");
                    $(".cut .more").click(function(){
                    $(".cut .back").css("color","#999");
                    $(".cut .back").css("borderColor","#999");
                    })
            })
                        sc_car();
            $.ajax({
                url: "../data/phone1.json",
                type: "GET",
                success: function(res){
                    var phone = "";

                    for(var i = 0; i < res.length; i++){
                        phone += `<li><a href="">
                                        <img src="${res[i].img}" alt="">
                                        <h4 class = "sc_btn" id = "${res[i].id}" price = "${res[i].price}">加入购物车</h4>
                                        <h4>${res[i].h4}</h4>
                                        <span>${res[i].span}</span>
                                        <p>￥${res[i].price}</p>
                                    </a>
                            </li>`;
                    }
                    $("#phone ul").html(html);

                }
            })
        
            $(".phone-list").on("click", ".sc_btn", function(){

                sc_msg();
                var inCarLeft = $(this).offset().left;
                var inCarTop = $(this).offset().top;
                //alert(inCarTop);

                //取出当前被电击的按钮的li在兄弟节点的坐标
                var li_index = $(this).parents("li").index();
                //alert(li_index);
                //判断是否是否是最右边的下标为3的li
                if(li_index == 3){
                    //点击加入购物车，弹出加入购物车成功
                    $("#inCar_success").css({
                        left: $(this).offset().left - 150,
                        top: $(this).offset().top + 20,
                        display: "block",
                        zIndex:3
                    });
                }else{
                    //点击加入购物车，弹出加入购物车成功
                    $("#inCar_success").css({

                        left: $(this).offset().left + 20,
                        top: $(this).offset().top + 20,
                        display: "block"
                    });
                }

                //点击关闭按钮，弹窗消失
                $("#colse_inCar").click(function(){
                    $("#inCar_success").css("display", "none");
                })
                //点击继续购物，关闭弹窗
                $(".car_go").find("span").click(function(){
                    $("#inCar_success").css("display", "none");
                })


                //a:取出当前按钮对应的商品的id
                var id = this.id;
                //取出当前按钮对应的商品的price
                var price = $(this).attr("price");
                //b:判断是否是第一次添加该商品
                var first = $.cookie("goods") == null ? true : false;

                if(first){ //第一次添加
                    //设置cookie  [{id:id,num:1}]
                    $.cookie("goods", "[{id:" + id + ",price:" + price + ",num:1}]", {
                        expires: 7
                    });
                }else{
                    //c:判断之前是否有添加过该商品
                    var str = $.cookie("goods");
                    var arr = eval(str);
                    var same = false; //代表是否有相同商品


                    //b:遍历所有的对象，判断id是否有相同的，如果有num++
                    for(var i in arr){
                        if(arr[i].id == id){
                            arr[i].num++;

                            var cookieStr = JSON.stringify(arr);
                            $.cookie("goods", cookieStr, {
                                expires: 7
                            })
                            same = true;
                            break;
                        }
                    }

                    //e:是否有相同的商品 新增商品 数量是1
                    if(!same){
                        var obj = {id: id, price:price, num: 1};
                        arr.push(obj);
                        var cookieStr = JSON.stringify(arr);
                        $.cookie("goods", cookieStr, {
                            expires: 7
                        });
                    }
                }
                // alert($.cookie("goods"));
                sc_car();
                //为了阻止冒泡
                return false;
            })


            //<3>计算购物车数字
            function sc_car(){
                var sc_str = $.cookie("goods");
                if(sc_str){ //如果cookie存在
                    var arr = eval(sc_str);
                    var sum_money = 0;//记录总钱数
                    var sum = 0; //用于累加的和
                    for(var i in arr){
                        sum += arr[i].num;
                        sum_money += arr[i].price * arr[i].num;
                    }
                    $(".sc_num").html(sum);
                    $(".num").html(sum);
                    $(".car_piece").html(sum);
                    $(".car_varietyNum").html(arr.length);
                    $(".car_money").html(sum_money + "元");
                    $(".inCar_goods_sum").find("span").eq(0).html(sum);
                    $(".inCar_goods_money").find("p").find("span").html(sum_money + "元");
                }else{
                    $(".sc_num").html(0);
                    $(".num").html(0);
                    $(".car_piece").html(0);
                    $(".car_varietyNum").html(0);
                    $(".car_money").html(0);
                    $(".inCar_goods_sum").find("span").eq(0).html(0);
                    $(".inCar_goods_money").find("p").find("span").html(0);

                }
            }


            //<4>添加移入移出事件
            /*
                mouseover mouseout
                mouseenter/移入 mouseleave/移出
                【注】每次使用animate之前，最好前面调用一次stop
            */
            $(".sc_right").mouseenter(function(){
                sc_msg();
                $(this).stop().animate({right: 0});
            });

            $(".sc_right").mouseleave(function(){
                $(this).stop().animate({right: -270});
            });

            sc_msg();
            //<5>加载购物车中商品
            function sc_msg(){
                $.ajax({
                    url: "../data/phone1.json",
                    type: "get",
                    success: function(res){
                        //a:找出所有cookie数据

                        if(!$.cookie("goods")){
                            //要将购物车内的商品清空
                            $(".inCar_goods ul").html("");
                            return;
                        }

                        var arr = eval($.cookie("goods"));
                        var html = '';
                        for(var i = 0; i < arr.length; i++){
                            //用id当做下标取出数据
                            $(".inCar_goods ul").html("");
                            html += `<li>
                                        <div class = "inCar_goods_pic">
                                            <img src="${res[arr[i].id-1].img}" alt="">
                                        </div>
                                        <div class = "inCar_goods_name">
                                            ${res[arr[i].id-1].h4}
                                        </div>
                                        <div class = "inCar_goods_price">
                                            <p>￥${res[arr[i].id-1].price} x ${arr[i].num}</p>
                                            <p><span class = "inCar_delete" od = "${res[arr[i].id-1].id}">移出</span></p>
                                        </div>
                                    </li>`
                        }
                        $(".inCar_goods ul").html(html);
                    }
                })
            }



            //编写清空购物车的功能
            $(".goods_clear").click(function(){
                //a:清除cookie的缓存
                $.cookie("goods", null);
                sc_car();
                sc_msg();
            })

            //给购物车添加移入移出事件
            $(".car").mouseenter(function(){
                $(".inCar_goods").css("display", "block");
            })
            $(".inCar_goods").hover(function(){
                $(".inCar_goods").css("display", "block");
            },function(){
                $(".inCar_goods").css("display", "none");
            })
            //给移出按钮添加点击事件
            $(".inCar_goods").on("click", ".inCar_delete", function(){
                var dele_od = $(this).attr("od");
                var arr = eval($.cookie("goods"));
                for(var i = arr.length - 1; i >= 0; i--){
                    if(arr[i].id == dele_od){
                        arr.splice(i, 1);
                    }
                }
                var cookieStr = JSON.stringify(arr);
                $.cookie("goods", cookieStr, {
                    expires: 7
                });
                sc_car();
                sc_msg();
            })
            //编写清空购物车的功能
            $(".inCar_goods_sum").find("span").eq(1).click(function(){
                //a:清除cookie的缓存
                $.cookie("goods", null);
                sc_car();
                sc_msg();
            })
    }
    return{
            detail:detail
        }

})