var IndexTitle = cc.Node.extend({
    /**
     * @type cc.Node
     */
    mainNode: null,
    ctor: function () {
        this._super();

        var url = res.node_title_en;
        if (Const.LANG == "zh") {
            url = res.node_title_zh;
        }

        var scene = ccs.load(url);
        this.mainNode = scene.node;
        this.addChild(this.mainNode);

        var arrayRootChildren = this.mainNode.getChildren();
        var length = arrayRootChildren.length;
        for (var i = 0; i < length; i++) {
            var child = arrayRootChildren[i];
            shake.randomShakeLoop(child);
        }
    },

    onExit: function () {
        this._super();

        var arrayRootChildren = this.mainNode.getChildren();
        var length = arrayRootChildren.length;
        for (var i = 0; i < length; i++) {
            var child = arrayRootChildren[i];
            shake.stopRandomShake(child);
        }
    }

});