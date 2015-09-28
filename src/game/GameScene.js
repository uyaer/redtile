var GameScene = cc.Scene.extend({
    /**
     * @type PauseLayer
     */
    pauseLayer: null,
    /**
     * @type LevelWinLayer
     */
    levelWinLayer: null,
    /**
     * @type LevelView
     */
    view: null,
    /**
     * 是否暂停状态
     */
    isPause: false,
    ctor: function () {
        this._super();

        this.isPause = false;

        this.initTopLayer();

        this.initOtherUILayer();

        this.initLevelViewLayer();

        //event
        if (cc.sys.isNative) {
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyReleased: this.onKeyClicked.bind(this)
            }, this);
        }
    },

    initLevelViewLayer: function () {
        var view = new LevelView(this);
        view.width = 800;
        view.height = 712;
        view.y = 30;
        this.addChild(view);
        view.init(LevelManager.instance.currentLevel);

        view.start();
        this.view = view;
    },

    initOtherUILayer: function () {
        this.pauseLayer = new PauseLayer(this);
        this.pauseLayer.retain();

        this.levelWinLayer = new LevelWinLayer(this);
        this.levelWinLayer.retain();
    },

    initTopLayer: function () {
        var topLayer = new cc.Node();
        this.addChild(topLayer, 10);
        var viewTop = App.WIN_H - 30;

        var hpIcon = new cc.Sprite("#ui/hp.png");
        hpIcon.x = 22;
        hpIcon.y = viewTop;
        topLayer.addChild(hpIcon);

        var hpTF = bitmapText(""+gameStepVo.step);
        hpTF.setAlignment(cc.TEXT_ALIGNMENT_LEFT);
        hpTF.setAnchorPoint(cc.p(0, 0.5));
        hpTF.setPosition(cc.p(50, viewTop));
        hpTF.setColor(hex2Color(0x5A7CBC));
        topLayer.addChild(hpTF);
        this.deadCountTF = hpTF;

        var levelTF = bitmapText("1/40");
        levelTF.setPosition(cc.p(App.WIN_W / 2, viewTop));
        topLayer.addChild(levelTF);
        levelTF.setColor(hex2Color(0x5A7CBC));
        this.levelTF = levelTF;

        //=========pause==========
        var pauseTF = new cc.MenuItemLabel(bitmapText(Lang.i18n(1)), this.showPause, this);//PAUSE
        pauseTF.setColor(hex2Color(0x5A7CBC));
        var menu = new cc.Menu(pauseTF);
        menu.x = 350;
        menu.y = viewTop;
        topLayer.addChild(menu);
    },

    onKeyClicked: function () {
        this.showPause();
    },
    showPause: function () {
        if (this.isPause)return;
        this.view.pauseGame();
        this.addChild(this.pauseLayer, 200);
        this.isPause = true;
    },

    resumeGame: function () {
        this.isPause = false;
        this.view.resumeGame();
    },

    nextLv: function () {
        this.view.nextLv();
    },

    updateLevel: function () {
        this.levelTF.setString(LevelManager.instance.currentLevel + "/" + LevelManager.instance.levelTotal);
    },

    updateDead: function (count) {
        this.deadCountTF.setString(gameStepVo.step+"");
    },

    showLevelComplete: function () {
        this.view.pause();
        this.levelWinLayer.updateTF();
        this.addChild(this.levelWinLayer, 200);
        this.isPause = true;

        App.showCpAd();
    },

    onEnter: function () {
        this._super();

        setTimeout(this._showTutorial.bind(this), 500);
    },

    onExit: function () {
        this._super();

        this.pauseLayer.release();
        this.levelWinLayer.release();
    },
    /**
     * 显示引导
     * @private
     */
    _showTutorial: function () {
        if (LevelManager.instance.currentLevel == 1) {
            var tutorial = new TutorialLayer(this);
            this.view.pauseGame();
            this.addChild(tutorial, 200);
            this.isPause = true;
        }
    }

});
