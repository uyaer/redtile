/**
 * ��ͣ
 */
var PauseLayer = cc.Layer.extend({
    ctor: function (control) {
        this._super();

        this.control = control;
        var bg = new cc.LayerColor(hex2Color(000000), App.WIN_W, App.WIN_H);
        this.addChild(bg);
        bg.setOpacity(50);

        var sp = new cc.Sprite("#ui/pause.png");
        sp.x = App.WIN_W * 0.5;
        sp.y = App.WIN_H * 0.5;
        this.addChild(sp);

        var tipTF = bitmapText(L.i18n["Tip_Resume"]);
        tipTF.setAlignment(cc.TEXT_ALIGNMENT_CENTER);
        tipTF.setAnchorPoint(cc.p(0.5, 1));
        tipTF.setPosition(cc.p(App.WIN_W * 0.5, App.WIN_H * 0.5 - 10));
        this.addChild(tipTF);

        //home btn
        var homeBtn = new cc.MenuItemImage("#ui/home.png", "#ui/home.png", function () {
            cc.director.runScene(new ChapterScene());
        }, this);
        var menu = new cc.Menu(homeBtn);
        this.addChild(menu, 10);
        menu.x = App.WIN_W - homeBtn.width * 0.5 - 10;
        menu.y = homeBtn.height * 0.5 + 10;

        //event
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: this.onTouchBeganHandler.bind(this)
        }, this);
    },

    /**
     *
     * @param touche {cc.Touch}
     * @param event {cc.Event}
     * @returns {boolean}
     */
    onTouchBeganHandler: function (touche, event) {
        event.stopPropagation();
        
        this.control.resumeGame();
        this.removeFromParent(false);
        return true;
    }
});