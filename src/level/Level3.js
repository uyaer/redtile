var Level3 = LevelBase.extend({
    ctor: function () {
        this._super(3);
    },

    /**
     * @override
     */
    loadOver: function () {
    },

    onEnter: function () {
        cc.spriteFrameCache.addSpriteFrames(res.el_1_3);
        var count = 6;
        var root = new cc.Node();
        this.addChild(root);
        for (var i = 0; i < count; i++) {
            var star = new cc.Sprite("#1-3-" + getInt(3) + ".png");
            star.setPosition(cc.p(50 + Math.random() * 700, 260 + Math.random() * 300));
            root.addChild(star);
            var delay = Math.random() * 2 + 1.5;
            star.runAction(
                cc.sequence(
                    cc.fadeOut(delay),
                    cc.fadeIn(delay)
                ).repeatForever());
        }
    }
});
