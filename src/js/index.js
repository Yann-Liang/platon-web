$(function() {
    //导航条颜色变化
    $(document).scroll(function() {
        navColor();
    });

    function navColor() {
        var scrnum = $(document).scrollTop();
        var $indexBg = $(".big-background");
        var $navBg = $('.block-header');
        $indexBg.css({
            "background-position": "50% " + (-(scrnum / 3) + $(window).height() + 400) + "px"
        });
        if(scrnum>70){
            $navBg.css({'background-color':'rgba(36, 44, 57, .9)'});
        }else{
            $navBg.css({'background-color':'transparent'});
        }
    }
    //页面滚动效果
    if(!(/mise[6|7|8|9]/i.test(navigator.userAgent))) {
        var wow = new WOW({
            boxClass: 'wow', //需要执行动画的元素的 class
            animateClass: 'animated', //animation.css 动画的 class
            offset: 100, //距离可视区域多少开始执行动画
            mobile: true, //是否在移动设备上执行动画
            live: true //异步加载的内容是否有效
        });
    };
    wow.init();

    //首页第一屏 高度自适应
    var width = $(window).width();
    var height = $(window).height();

    function indexHeight() {
        if(height>800){
            height = 800;
        }
        if(width > 1320) {
            $('.index-block-1').css('height', height + 'px');
        }
    }
    indexHeight();
    $(window).resize(function() {
        indexHeight();
    });

    //应用案例 轮播效果
    var isMoving = true;
    $('#arrow-right').on('click', function() {
        clearInterval(timer);
        tabRight();
    });

    function tabRight() {
        if(isMoving) {
            isMoving = false;
            $("#slide-content").animate({
                'marginLeft': '-320px'
            }, 600, function() {
                $("#slide-content>li").eq(0).appendTo($("#slide-content"));
                $("#slide-content").css('marginLeft', '0px');
                isMoving = true;
            });
        } else {
            return;
        }
    }
    $('#arrow-left').on('click', function() {
        clearInterval(timer);
        tabLeft();
    });

    function tabLeft() {
        if(isMoving) {
            isMoving = false;
            $("#slide-content").css('marginLeft', '-320px');
            $("#slide-content>li").eq(6).prependTo($("#slide-content"));
            $("#slide-content").animate({
                'marginLeft': '0px'
            }, 600, function() {
                isMoving = true;
            });
        } else {
            return;
        }
    }

    //应用案例  轮播定时器
    var timer = setInterval(function() {
        tabRight();
    }, 3000);

    $('#slide-content,#arrow-left,#arrow-right').mouseenter(function() {
        clearInterval(timer);
    })

    $('#slide-content,#arrow-left,#arrow-right').mouseleave(function() {
        timer = setInterval(function() {
            tabRight();
        }, 3000);
    })
})