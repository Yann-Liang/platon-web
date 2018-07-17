$(function() {
    //隐藏列表点击
    $('.nav-list').on('click',function() {
        if(!$(this).hasClass('active')) {
            $(this).addClass('active');
            $('.nav-mask').addClass('active');
            $('.nav-list-div').addClass('active');
        } else {
            $(this).removeClass('active');
            $('.nav-mask,.nav-list-div').removeClass('active');
        }
    });
    //语言切换
    $('#language').on('click', function() {
        if($('#model-language').css('display') === 'none') {
            $('#model-language').show();
        } else {
            $('#model-language').hide();
        }
    });
    //微信公众号
    $('#weixin').on('click',function() {
        weixinTab();
    });

    function weixinTab(){
        if($('#weixin-img').css('display') === 'none') {
            $('#weixin-img').show();
            $('.nav-mask').addClass('active');
        } else {
            $('#weixin-img').hide();
            $('.nav-mask').removeClass('active');
        }
    }

    //点击遮罩  弹窗消失
    $('.nav-mask').on('click',function(){
        $('.nav-list,.nav-mask,.nav-list-div').removeClass('active');
        $('.model-popup').css('display','none');
        $('#weixin-img').hide();
    })
    //页面锚点跳转
    var timer=null;
    $(".technology, .contact-join").on('click',function() {
        $('.nav-list').removeClass('active');
        $('.nav-mask').removeClass('active');
        $('.nav-list-div').removeClass('active');

        $("html, body").animate({
            scrollTop: $($(this).find('a').attr("href")).offset().top + "px"
        }, {
            duration: 500,
            easing: "swing"
        });
        return false;
    });
})