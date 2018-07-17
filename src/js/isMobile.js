var mobile_flag = isMobile();

function isMobile() {
    var userAgentInfo = navigator.userAgent;
    var mobileAgents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPod"];
    var mobile_flag = false;
    //根据userAgent判断是否是手机
    for(var v = 0; v < mobileAgents.length; v++) {
        if(userAgentInfo.indexOf(mobileAgents[v]) > 0) {
            mobile_flag = true;
            break;
        }
    }
    var screen_width = window.screen.width;
    var screen_height = window.screen.height;
    //根据屏幕分辨率判断是否是手机
    if(screen_width < 825 && screen_height < 800) {
        mobile_flag = true;
    }
    return mobile_flag;
}

//判断浏览器语言
var languageNow = window.sessionStorage.getItem("language");
var Is_language = JudgeLanguage();

function JudgeLanguage(){
    var lang = navigator.language || navigator.userLanguage; //常规浏览器语言和IE浏览器
    lang = lang.substr(0, 2); //截取lang前2位字符
    //默认中文
    var language_isTh = true;
    if(lang == 'zh') {
        language_isTh = true;
    }else{
        language_isTh = false;
    }
    return language_isTh;
}
