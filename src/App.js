/**
 * Created by Administrator on 2014/5/4.
 */

//主要控制器，程序入口
var App = {};


App.DESIGN_W = 800;
App.DESIGN_H = 712;
App.WIN_W = 800;
App.WIN_H = 712;


App.runScene = function (SceneClass) {
    cc.director.runScene(cc.TransitionMoveInR(0.5, new SceneClass()));
}

var ANIM_RUN = "player_run";
var ANIM_DEAD = "player_dead";
var ANIM_HUICHENG = "huicheng";
var ANIM_FIRE = "fire_";



var L = {};
L.i18n = {};

var LevelSwfMap = {
    "1-1.swf": Level1,
    "1-2.swf": Level2,
    "1-3.swf": Level3,
    "2-1.swf": Level4,
    "2-2.swf": Level5,
    "3-4.swf": Level6,
    "3-5.swf": Level7,
    "3-6.swf": Level8,
    "3-8.swf": Level9,
    "3-9.swf": Level10
};


//////////////////////////////////////
///////////////  plus ///////////////////////
////////////////         //////////////////////
/////////////////             /////////////////////
App.__android_class = "org/cocos2dx/javascript/AppActivity";

/**
 * 向android端发送请求关闭
 */
App.showConfirmClose = function () {
    jsb.reflection.callStaticMethod(App.__android_class, "confirmClose", "()V");
}
/**
 * 关闭应用
 */
App.closeApp = function () {
    cc.director.end();
}
/////////////////////////////////////////////////////

App.showCpAd = function () {
//    if (cc.sys.os.toLowerCase() == "android") {
//        SendMessageToNative("showCpAd", null);
//    }
}
App.showBannerAd = function () {
    if (cc.sys.os.toLowerCase() == "android" || cc.sys.os.toLowerCase() == "ios") {
        SendMessageToNative("showBannerAd", {"isShow": "1"});
    }
}
App.hideBannerAd = function () {
    if (cc.sys.os.toLowerCase() == "android" || cc.sys.os.toLowerCase() == "ios") {
        SendMessageToNative("showBannerAd", {"isShow": "0"});
    }
}

App.openURL = function (url) {
    if (arguments.length == 0) {
        url = "http://www.uyaer.com";
    }
    if (cc.sys.os.toLowerCase() == "android" || cc.sys.os.toLowerCase() == "ios") {
        SendMessageToNative("openURL", {"url": url});
    } else {
        trace("can't open webview");
    }
}
App.openShare = function (type) {
    if (cc.sys.os.toLowerCase() == "android" || cc.sys.os.toLowerCase() == "ios") {
        SendMessageToNative("openShare", {"type": type});
    }
}