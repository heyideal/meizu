define(["jquery"], function($){
    var register = function(){



        $("#toAccountLogin").attr("class","color2");
        $("#toVCodeLogin").attr("class", "color1");

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
                // $("#phone").css("color","#999");
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
        var check = false;
        $("#checkbox").on({
            click:function(){
                if(check == false){
                    $("#checkbox").attr("class","pic4");
                    check = true;
                }else{
                    $("#checkbox").attr("class", "pic3");
                    check = false;
                }
                return false;
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

    }
    return {
        register: register
    }
})