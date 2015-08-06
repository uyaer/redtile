var LevelBase = cc.Node.extend({
    /**
     * @type cc.Node
     */
    mainNode: null,

    ctor: function (id) {
        this._super();

        var scene = ccs.load("res/Level" + id + ".json");
        this.mainNode = scene.node;
        this.addChild(this.mainNode);

        var colorbg = seekChildByName(this.mainNode, "colorbg");
        if (colorbg) {
            colorbg.height = App.WIN_H;
        }

        this.loadOver();
    },

    /**
     * @override
     */
    loadOver: function () {

    }
});