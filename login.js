define(["jquery"], function($){
    var login = function(){
        var ispc = false;
        $("#transferField a").on({
            click:function(){
                if(ispc == false){
                    $("#transferField").attr("class", "pic2");
                    $("#scan").css("display","block");
                    ispc = true;
                }else{
                    $("#transferField").attr("class", "pic1");
                    $("#scan").css("display","none");
                    ispc = false;
                }
                return false;
            }
        })


        $("#toAccountLogin").attr("class","color1");

        $("#toVCodeLogin").attr("class", "color2");


        // $("#cycode-box").find(".cycode-selected").on({
        //     click:function(){
        //         $("#cycode-container").animate({width:296,height:210,opacity:1},1000);
        //         return false;
        //     }
        // })
        var isopen = false;
        $("#cycode-box").find(".cycode-selected").on({
            click:function(){
                if(isopen == false){
                    $("#cycode-container").animate({width:296,height:210,opacity:1},1000).css("display","block");
                    isopen = true;
                }else{
                    $("#cycode-container").animate({width:0,height:0,opacity:0},1000).css("display","none");
                    isopen = false;
                }
            }
        })

        $("#phone").on({
            click:function(){
              $("#cycode-container").animate({width:296,height:210,opacity:1},0).css("display","none");
                isopen = false;
            }
        })
        $("#phone").on({
            focus: function(){
                $("#cycode-box").css("borderColor", "#32A5E7");
                 $("#phone").css("color","#333");

            },
            blur: function(){
                $("#cycode-box").css("borderColor", "#DADADA");
            }
        })
        $("#code").on({
            focus: function(){
                $(".input2").css("borderColor", "#32A5E7");
                $("#code").css("color","#333");
            },
            blur: function(){
                $(".input2").css("borderColor", "#DADADA");
            }
        })


        $("#cycode-container").find(".container").find("ul li").on({
            mouseover:function(){
                $(this).css("backgroundColor", "#F2F2F2");
            },
            mouseout: function(){
                $(this).css("backgroundColor", "#fff");
            },
            mousedown: function(ev){
                // alert($(this).find(".record-code").html());
                $("#cycode").attr('value',$(this).find(".record-code").html());
                $("#cycode-container").animate({width:0,height:0,opacity:0},1000).css("display","none");
                isopen = false;
            }
        })
        $("#off1").on({
            click:function(){
                $(".error1").css("display","none");
            }
        })
        $("#off2").on({
            click:function(){
                $(".error2").css("display","none");
            }
        })
        $("#phone").blur(function(){
            var oValue = $("#phone").val();
            if(!oValue.length){
                    $(".error1").css("display","block");
                    $(".error1 span").html("手机号码不能为空");
                    $(".error2").css("display","none");
            }else if(oValue.length > 13 || oValue.length < 11 || ! /\d/.test(oValue[0])){
                $(".error1").css("display","block");
                $(".error1 span").html("手机号码格式不对");
            }else{
                $(".error1").css("display","none");
                $(".error2").css("display","block");
            }
        })



        $("#up").on({
            mouseenter:function(){
                $("#weixin").css("display","block");
            },
            mouseleave:function(){
                $("#weixin").css("display","none");
            }
        })

        $("#foot").find(".last").on({
            mouseover: function(){
            $("#foot .language").css("display", "block");
            }
        })
        $("#foot .language").on({
            mouseover: function(){
                $("#foot .language").css("display", "block");
            },
            mouseout: function(){
                $("#foot .language").css("display", "none");
            }
        })

    }
    return {
        login: login
    }
})