var Level8 = LevelBase.extend({
    /**
     * @type cc.Sprite
     */
    fire1: null,
    /**
     * @type cc.Sprite
     */
    fire2: null,
    ctor: function () {
        this._super(8);
    },

    /**
     * @override
     */
    loadOver: function () {
        this.fire1 = seekChildByName(this.mainNode, "fire1");
        this.fire2 = seekChildByName(this.mainNode, "fire2");
    },

    onEnter: function () {
        this.fire1.runAction(AnimManager.instance.getAnimate(ANIM_FIRE));
        this.fire2.runAction(AnimManager.instance.getAnimate(ANIM_FIRE));
    }
});
