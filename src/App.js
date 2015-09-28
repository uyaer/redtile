/**
 * Created by Administrator on 2014/5/4.
 */

//主要控制器，程序入口
var App = {};


App.DESIGN_W = 400;
App.DESIGN_H = 712;
App.WIN_W = 400;
App.WIN_H = 712;


App.runScene = function (SceneClass) {
    cc.director.runScene(cc.TransitionMoveInR(0.5, new SceneClass()));
}

var ANIM_RUN = "player_run";
var ANIM_DEAD = "player_dead";
var ANIM_HUICHENG = "huicheng";
var ANIM_FIRE = "fire_";


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
var App = {};
App.__android_class = "org/cocos2dx/javascript/AppActivity";

/**
 * 检查签名是否被篡改
 * @returns {boolean}
 */
App.checkAppVertify = function () {
    if (cc.sys.isNative && cc.sys.isMobile) {
        var uri = jsb.reflection.callStaticMethod(App.__android_class, "getPackageURI", "()Ljava/lang/String;");
        if (uri == "com.uyaer.myprincess") {
            return true;
        }
        return false;
    } else {
        return true;
    }
}

/**
 * 向android端发送请求关闭 (显示广告)
 */
App.showExitAd = function () {
    jsb.reflection.callStaticMethod(App.__android_class, "showExitAd", "()V");
}
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
/**
 * 购买能量
 */
App.buyPower = function () {
    jsb.reflection.callStaticMethod(App.__android_class, "buyPower", "()V");
}

App.buyPowerSuccess = function () {
    gameStepVo.step = gameStepVo.maxStep;
    cc.director.runScene(GameScene);
    showTip("购买成功");
}
App.buyPowerFail = function () {
    showTip("购买失败");
}

App.openHome = function () {
    var url = "http://www.uyaer.com";
    jsb.reflection.callStaticMethod(App.__android_class, "showShare", "(Ljava/lang/String;)V", url);
}

App.showShare = function () {
    var lang = Const.LANG;

    var url = "http://uyaer.qiniudn.com/share.html?lang=" + lang +
        "&icon=_games/ten2more/icon512.png" +
        "&name=" + (lang == "zh" ? "别踩红块儿" : "Don't%20tap%20the%20red%20tile") +
        "&pic=http://uyaer.qiniudn.com/images/5.png" +
        "&title=" + (lang == "zh" ? "很好玩的游戏" : "A fun game with you!") +
        "&desc=" + (lang == "zh" ? "这是一款非常好玩的游戏，也特别的有难度，敢来挑战吗！！" : "This is a very fun game, it is particularly difficult, dare to challenge it!!") +
        "&r=" + Date.now() +
        "&url=http://uyaer.qiniudn.com/?v" + Date.now() + (lang == "zh" ? "#game-4" : "#game-6");
    if (cc.sys.isNative) {
        jsb.reflection.callStaticMethod(App.__android_class, "showShare", "(Ljava/lang/String;)V", url);
    } else {
        window.open(url);
    }
}

App.showCpAd = function () {
    if (cc.sys.isNative) {
        jsb.reflection.callStaticMethod(App.__android_class, "showCpAd", "()V");
    }
}
App.hideCpAd = function () {
    if (cc.sys.isNative) {
        jsb.reflection.callStaticMethod(App.__android_class, "hideCpAd", "()V");
    }
}
