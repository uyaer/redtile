/**
 * Created by Administrator on 2014/5/6.
 */

var AnimManager = function () {
}
AnimManager.instance = new AnimManager();


AnimManager.prototype.init = function () {
    cc.animationCache.addAnimation(makeAnimation(ANIM_DEAD, 20), ANIM_DEAD);
    cc.animationCache.addAnimation(makeAnimation(ANIM_RUN, 12, 30, 1e10), ANIM_RUN);
    cc.animationCache.addAnimation(makeAnimation(ANIM_HUICHENG, 18, 30, 1e10), ANIM_HUICHENG);
    cc.animationCache.addAnimation(makeAnimation(ANIM_FIRE, 5, 10, 1e10), ANIM_FIRE);
}
AnimManager.prototype.getAnimate = function (name) {
    var cache = cc.animationCache;
    var animation = cache.getAnimation(name);
    if (!animation) {
        trace("the name is:", name);
    }
    var anim = cc.animate(animation);
    return anim;
}