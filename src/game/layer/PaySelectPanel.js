var PaySelectPanel = cc.Node.extend({
    /**
     * @type cc.Node
     */
    mainNode: null,
    /**
     * @type ccui.Layout
     */
    panel: null,
    /**
     * @type ccui.Button
     */
    alipay: null,
    ctor: function () {
        this._super();

        var scene = ccs.load(res.layer_pay);
        this.mainNode = scene.node;
        this.addChild(this.mainNode);

        doLayout(this.mainNode);

        this.panel = seekChildByName(this.mainNode, "panel");
        this.alipay = seekChildByName(this.mainNode, "alipay");

        this.alipay.addClickEventListener(this.onBuySelectHandler.bind(this));

        if (cc.sys.isNative) {
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyReleased: this.onKeyClicked.bind(this)
            }, this);
        }
    },

    /**
     * 点击购买操作
     */
    onBuySelectHandler: function (target) {
        App.buyPower(1);
    },

    onEnter: function () {
        this._super();

        this.panel.y = 0;
        this.panel.runAction(cc.moveBy(0.25, 0, Const.WIN_H / 2).easing(cc.easeSineIn()));
    },

    onKeyClicked: function (keyCode, event) {
        if (keyCode == cc.KEY.back) {
            event.stopPropagation();
            this.removeFromParent();
        }
    }

});