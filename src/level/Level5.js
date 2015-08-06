var Level5 = LevelBase.extend({
    /**
     * @type cc.Sprite
     */
    cloud: null,
    ctor: function () {
        this._super(5);
    },

    /**
     * @override
     */
    loadOver: function () {
        this.cloud = seekChildByName(this.mainNode, "cloud");
    },

    onEnter: function () {
        this.cloud.runAction(
            cc.sequence(
                cc.place(cc.p(800, 140)),
                cc.fadeTo(0, 0),
                cc.spawn(cc.fadeIn(2), cc.moveBy(2, cc.p(-400, 0))),
                cc.spawn(cc.fadeOut(2), cc.moveBy(2, cc.p(-400, 0)))
            ));
    }
});
