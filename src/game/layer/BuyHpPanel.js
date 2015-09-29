var BuyHpPanel = cc.Node.extend({
    /**
     * @type cc.Node
     */
    mainNode: null,
    /**
     * @type ccui.Text
     */
    titleTF: null,
    /**
     * @type ccui.Text
     */
    tipTF: null,
    /**
     * @type ccui.Text
     */
    tip2TF: null,
    /**
     * @type ccui.Button
     */
    okBtn: null,
    /**
     * @type ccui.Button
     */
    cancelBtn: null,
    ctor: function () {
        this._super();

        var scene = ccs.load(res.layer_buy_hp);
        this.mainNode = scene.node;
        this.addChild(this.mainNode);

        doLayout(this.mainNode);

        this.titleTF = seekChildByName(this.mainNode, "titleTF");
        this.tipTF = seekChildByName(this.mainNode, "tipTF");
        this.tip2TF = seekChildByName(this.mainNode, "tip2TF");
        this.okBtn = seekChildByName(this.mainNode, "okBtn");
        this.cancelBtn = seekChildByName(this.mainNode, "cancelBtn");

        this.titleTF.string = Lang.i18n(9);
        this.tipTF.string = Lang.i18n(10);
        this.tip2TF.string = Lang.i18n(11);
        this.okBtn.setTitleText(Lang.i18n(12));
        this.cancelBtn.setTitleText(Lang.i18n(13));

        var that = this;
        this.okBtn.addClickEventListener(function () {
            if (Const.LANG == "zh") {
                // buy power
                App.buyPower();
            } else {
                that.noBuyHandler();
            }
        });
        this.cancelBtn.addClickEventListener(this.noBuyHandler);
    },

    /**
     * 不购买的操作
     */
    noBuyHandler: function () {
        cc.director.runScene(new cc.TransitionFade(0.25, new IndexScene()), hex2Color(0xFFFFFF));
        App.showCpAd();
        gameStepVo.step = randomInt(5, 10);
        gameStepVo.saveToRemote();
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