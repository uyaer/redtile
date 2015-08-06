
var Level1 = LevelBase.extend({
    /**
     * @type cc.Sprite
     */
    c2: null,
    /**
     * @type cc.Sprite
     */
    c1: null,
    ctor: function () {
        this._super(1);
    },

    /**
     * @override
     */
    loadOver: function () {
        this.c1 = seekChildByName(this.mainNode, "c1");
        this.c2 = seekChildByName(this.mainNode, "c2");
    },

    onEnter: function () {
        var move1 = cc.moveBy(1, cc.p(0, 15));
        this.c1.runAction(cc.sequence(
            move1, move1.reverse()
        ).repeatForever());
        var move2 = cc.moveBy(1.2, cc.p(0, 15));
        this.c2.runAction(cc.sequence(
            move2, move2.reverse()
        ).repeatForever());
    }
});
