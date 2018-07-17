$(function() {
    //语言切换
    $('#language').mouseenter(function() {
        languageTab();
    });
    $('#language').mouseleave(function() {
        languageTab();
    });

    function languageTab(){
        if($('#model-language').css('display') === 'none') {
            $('#model-language').show();
        } else {
            $('#model-language').hide();
        }
    }

    $('#model-language li').on('click',function(){
        window.sessionStorage.setItem("language", $(this).find('a').attr('name'));
    });

    //微信公众号
    $('#weixin').on('click',function() {
        weixinTab();
    });

    $('.mask').on('click',function(){
    	$('#weixin-img,.mask').hide();
    })

    function weixinTab(){
        if($('#weixin-img').css('display') === 'none') {
            $('#weixin-img,.mask').show();
        } else {
            $('#weixin-img,.mask').hide();
        }
    }

    //页面锚点跳转
    $(".technclogy,.roadmap,.contact,.team,.what-platOn,.roadmap2,.team-2,.net,.comput-anchor").on('click', function() {
        $("html, body").animate({
            scrollTop: $($(this).find('a').attr("href")).offset().top + "px"
        }, {
            duration: 500,
            easing: "swing"
        });
        return false;
    });

});