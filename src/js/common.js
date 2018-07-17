//请求地址(线上)
var baseURL = 'https://cdn.platon.network/website/';

//ajax请求封装
function postRequest(url, param, callback, errorCallback) {
    param = JSON.parse(param);
    $.ajax({
        url: baseURL + url,
        data: JSON.stringify(param),
        type: 'post',
        cache: false,
        dataType: 'json',
        contentType: "application/json;charset=UTF-8",
        success: function(data) {
            if(data && data.ret === 12999) {

            } else if(callback && typeof callback == 'function') {
                callback(data);
            }
        },
        error: function(data) {
            if(errorCallback && typeof errorCallback == 'function') {
                errorCallback(data);
            } else {

            }
        }
    });
};

$(function() {
    //判断当前是中文还是英文页面
    var pageUrl = window.location.pathname;
    var alertLanguage = true; //中文
    if(pageUrl.indexOf("en") === -1) {
        alertLanguage = true;
    }else{
        alertLanguage = false;
    }

    //弹框
    var re = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    $('.btn-mail').on('click', function() {
        if(/^\s*$/.test($('#email').val())) {
//          alertLanguage?alert('请填写您的邮箱地址'):alert('en');
            alert('请填写您的邮箱地址');
        } else if(!re.test($('#email').val())) {
            alert('您填写的邮箱格式不正确');
        } else {
            var param = {};
            param.email = $('#email').val();

            postRequest('subscribe/saveSubscribe', JSON.stringify(param), function(data) {
                if(data && data.ret === 0) {
                    $('#email-show').html(param.email);
                    $('.mask,.model-popup').css('display', 'block');
                    $('body').css('overflowY', 'hidden');
                    $('.nav-mask').addClass('active');
                } else if((data && data.ret === 11001) || (data && data.ret === 11002)) {
                    alert('已订阅，请勿重复订阅');
                } else if(data && data.ret === 11003) {
                    alert('订阅信息不能为空');
                } else {
                    alert('系统异常');
                }
            })
        }
    });

    //身份切换
    var identity = null;
    $("#user-ul").on("click", "li", function() {
        if($(this).hasClass('active')) {
            $(this).removeClass('active');
            identity = null;
        } else {
            $('#user-ul li').removeClass('active');
            $(this).addClass('active');
            identity = '0' + $(this).index();
        }
    });

    //提交
    $('#submit').on('click', function() {
        var param = {};
        param.name = $('#name').val();
        param.companyName = $('#companyName').val();
        param.identity = identity;
        param.email = $('#email').val();
        if((param.name === '' || param.name === null) && (param.companyName === '' || param.companyName === null) && (param.identity === '' || param.identity === null)) {
            alert('请填写您的信息');
            return;
        } else {
            $.ajax({
                url: baseURL + 'subscribe/saveSubscribeInfo',
                data: JSON.stringify(param),
                type: 'post',
                cache: false,
                dataType: 'json',
                contentType: "application/json;charset=UTF-8",
                success: function(data) {
                    if(data && data.ret === 0) {
                        $('.mask,.model-popup').css('display', 'none');
                        $('body').css('overflowY', 'auto');
                        $('.nav-mask').removeClass('active');
                        alert('提交成功');
                        emptyInput();
                    } else if((data && data.ret === 11001) || (data && data.ret === 11002)) {
                        alert('已订阅，请勿重复订阅');
                    } else if(data && data.ret === 11003) {
                        alert('订阅信息不能为空');
                    } else {
                        alert('系统异常');
                    }
                },
                error: function(data) {

                }
            });
        }

    })

    $('.back,.close').on('click', function() {
        $('.mask,.model-popup').css('display', 'none');
        $('body').css('overflowY', 'auto');
        $('.nav-mask').removeClass('active');
    });

    function emptyInput(){
        $('#name,#companyName,#email').val('');
        $('#user-ul li').removeClass('active');
        identity = null;
    }
})