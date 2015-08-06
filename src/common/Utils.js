
function makeAnimation(name, endFrame, fps, loop, startFrame) {
    fps = fps || 30;
    loop = loop || 1;
    startFrame = startFrame || 1;
    var cache = cc.spriteFrameCache;
    var anim = cc.Animation.create();
    anim.setDelayPerUnit(1 / fps);
    anim.setLoops(loop);
    for (var i = startFrame; i <= endFrame; i++) {
        var uri = name + number2String(i, 4) + ".png";
        var frame = cache.getSpriteFrame(uri);
        anim.addSpriteFrame(frame);
    }
    return anim;
}

function bitmapText(str, fnt) {
    fnt = fnt || FONT;
    var tf = new cc.LabelBMFont(str, fnt);
    return tf;
}
