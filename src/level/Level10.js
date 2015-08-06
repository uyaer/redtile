var Level10 = LevelBase.extend({
    /**
     * @type cc.Sprite
     */
    c1: null,
    ctor: function () {
        this._super(10);
    },

    /**
     * @override
     */
    loadOver: function () {
        this.c1 = seekChildByName(this.mainNode, "c1");
    },

    onEnter: function () {
        this.c1.setOpacity(0);
        this.c1.runAction(
            cc.sequence(
                cc.moveTo(10, cc.p(-100, 105)),
                cc.place(cc.p(900, 105))
            )
        );
        this.c1.runAction(
            cc.sequence(
                cc.fadeIn(5),
                cc.fadeOut(5)
            )
        );
    }
});
