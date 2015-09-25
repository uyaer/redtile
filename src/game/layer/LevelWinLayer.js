var LevelWinLayer = cc.Layer.extend({
    /**
     * @type GameScene
     */
    control:null,
    ctor: function (control) {
        this._super();
        this.control = control;
        var bg = new cc.LayerColor(hex2Color(000000), App.WIN_W, App.WIN_H);
        this.addChild(bg);
        bg.setOpacity(25);

        var sp = new cc.Sprite("#ui/next.png");
        sp.setPosition(cc.p(App.WIN_W / 2, App.WIN_H / 2));
        this.addChild(sp);

        var titleTF = bitmapText("");
        titleTF.setAlignment(cc.TEXT_ALIGNMENT_CENTER);
        titleTF.setAnchorPoint(cc.p(0.5, 1));
        titleTF.setPosition(cc.p(App.WIN_W / 2, App.WIN_H / 2 + 65));
        this.addChild(titleTF);
        this.titleTF = titleTF;

        var deadTF = bitmapText("");
        deadTF.setColor(hex2Color(0x4dcded));
        deadTF.setAlignment(cc.TEXT_ALIGNMENT_CENTER);
        deadTF.setAnchorPoint(cc.p(0.5, 1));
        deadTF.setPosition(cc.p(App.WIN_W / 2, App.WIN_H / 2 - 15));
        this.addChild(deadTF);
        this.deadTF = deadTF;

        cc.eventManager.addListener({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan:this.onTouchBeganHandler.bind(this)
        },this);
    },

    updateTF: function () {
        var lv = LevelManager.instance.currentLevel - 1;
        this.titleTF.setString(Lang.i18n(3).replace("{0}", lv));//level_complete
        this.deadTF.setString(Lang.i18n(4).replace("{0}", LevelManager.instance.levelData[lv]));//Best Result:
    },

    onTouchBeganHandler: function () {
        this.control.resumeGame();
        this.control.nextLv();
        this.removeFromParent(false);
        return true;
    }
});
