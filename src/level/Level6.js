
var Level6 = LevelBase.extend({
    /**
     * @type cc.Sprite
     */
    fire1: null,
    ctor: function () {
        this._super(6);
    },

    /**
     * @override
     */
    loadOver: function () {
        this.fire1 = seekChildByName(this.mainNode, "fire1");
    },

    onEnter: function () {
        this.fire1.runAction(AnimManager.instance.getAnimate(ANIM_FIRE));
    }
});
