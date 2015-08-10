var LevelBase = cc.Node.extend({
    /**
     * @type cc.Node
     */
    mainNode: null,
    /**
     * @type cc.Sprite
     */
    singleBg: null,
    ctor: function (id) {
        this._super();

        var scene = ccs.load("res/Level" + id + ".json");
        this.mainNode = scene.node;
        this.addChild(this.mainNode);

        var colorbg = seekChildByName(this.mainNode, "colorbg");
        if (colorbg) {
            colorbg.height = App.WIN_H;
        }
        //if has single picture bg,set it's height fit screen
        this.singleBg = seekChildByName(this.mainNode, "bg");

        this.loadOver();
    },

    /**
     * 填充背景
     */
    fitBackground: function (h) {
        if (this.singleBg) {
            this.singleBg.scaleY = h / this.singleBg.height;
        }
    },

    /**
     * @override
     */
    loadOver: function () {

    }
});