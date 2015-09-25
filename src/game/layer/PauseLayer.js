/**
 * ��ͣ
 */
var PauseLayer = cc.Layer.extend({
    /**
     * @type cc.LabelTTF
     */
    timeTF: null,
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

        var tipTF = bitmapText(Lang.i18n(5));//Tip_Resume
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

        //恢复时间
        var timeTF = new cc.LabelTTF("", "Arial", 32);
        timeTF.x = Const.WIN_W * 0.5;
        timeTF.y = Const.WIN_H * 0.75;
        this.addChild(timeTF);
        this.timeTF = timeTF;

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
    },

    onEnter: function () {
        this._super();

        this.updateTimeTF();
        this.schedule(this.updateTimeTF.bind(this), 1, Number.MAX_VALUE);
    },

    onExit: function () {
        this._super();

        this.unschedule(this.updateTimeTF);
    },

    /**
     * 更新时间tf
     */
    updateTimeTF: function () {
        var time = TimerTicker.getNeedTime();
        time = Math.round(time / 1000);
        var m = int(time / 60);
        var s = time % 60;
        var timeStr = m + ":" + (s < 10 ? "0" + s : s);
        this.timeTF.string = Lang.i18n(15).replace("{0}", timeStr);
    }
});