var Level2 = LevelBase.extend({
    ctor: function () {
        this._super(2);
    },

    /**
     * @override
     */
    loadOver: function () {
    },

    onEnter: function () {
        cc.spriteFrameCache.addSpriteFrames(res.el_1_2);
        var count = 20;
        var root = new cc.Node();
        this.addChild(root);
        for (var i = 0; i < count; i++) {
            var isCub = Math.random() < 0.3;
            var snow = new cc.Sprite(isCub ? "#1-2-1.png" : "#1-2-0.png");
            root.addChild(snow);
            if (isCub) {
                snow.runAction(cc.rotateBy(1, 360).repeatForever());
            } else {
                snow.runAction(cc.rotateBy(1, 25).repeatForever());
            }
            this.startSnowDown(snow);
        }
    },

    startSnowDown: function (snow) {
        snow.stopAllActions();
        snow.setPosition(cc.p(Math.random() * 750 + 25, 560));
        snow.setOpacity(0);
        var delay = 5 * Math.random();
        snow.runAction(
            cc.sequence(
                cc.delayTime(delay),
                cc.moveBy(1, cc.p(Math.random() * 25 + 25, -100)),
                cc.moveBy(1, cc.p(-Math.random() * 25 - 25, -100)),
                cc.moveBy(1, cc.p(Math.random() * 25 + 25, -100)),
                cc.moveBy(1, cc.p(-Math.random() * 25 - 25, -100)),
                cc.moveBy(1, cc.p(Math.random() * 25 + 25, -100)),
                cc.callFunc(this.startSnowDown, this, snow)
            ));
        snow.runAction(
            cc.sequence(
                cc.delayTime(delay),
                cc.fadeTo(1.25, 255),
                cc.fadeTo(1.25, 125),
                cc.fadeTo(1.25, 255),
                cc.fadeTo(1.25, 0)
            ));
    }
});