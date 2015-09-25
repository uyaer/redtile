var TutorialLayer = cc.Layer.extend({
    /**
     * @param control {GameScene}
     */
    ctor: function (control) {
        this._super();

        this.control = control;

        var bg = new cc.LayerColor(cc.color(0, 0, 0, 125), App.WIN_W, App.WIN_H);
        this.addChild(bg);

        var titleTF = bitmapText(Lang.i18n(2));//Tap Start!
        titleTF.setAlignment(cc.TEXT_ALIGNMENT_CENTER);
        titleTF.setAnchorPoint(cc.p(0.5, 0.5));
        titleTF.setPosition(cc.p(App.WIN_W / 2, App.WIN_H / 2));
        this.addChild(titleTF);

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: this.onTouchBeganHandler.bind(this)
        }, this);
    },

    /**
     * @param touch {cc.Touch}
     * @param event {cc.Event}
     * @returns {boolean}
     */
    onTouchBeganHandler: function (touch, event) {
        event.stopPropagation();

        this.control.resumeGame();
        this.removeFromParent();
        return true;
    }
});

