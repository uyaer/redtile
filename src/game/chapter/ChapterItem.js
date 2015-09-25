var ChapterItem = cc.Node.extend({
    ctor: function (lv) {
        this._super();
        this.lv = lv;

        var bg = new cc.Sprite("#chapterSkin_complete.png");
        bg.anchorY = 0;
        this.addChild(bg);
        this.bg = bg;

        var lvTF = new cc.LabelBMFont(Lang.i18n(8).replace("{0}", lv), FONT);//LEVEL_n
        lvTF.y = 60;
        lvTF.scale = 0.65;
        this.addChild(lvTF);

        var resultTF = new cc.LabelBMFont("-999", FONT);
        resultTF.y = 23;
        this.addChild(resultTF);
        this.resultTF = resultTF;
    },
    setComplete: function () {
        this.bg.setSpriteFrame("chapterSkin_complete.png");
        this.resultTF.setVisible(true);
        var deadCount = LevelManager.instance.levelData[this.lv];
        this.resultTF.setString((deadCount > 0 ? "-" : "") + Math.min(deadCount, 999));
    },
    setOpen: function () {
        this.bg.setSpriteFrame("chapterSkin_open.png");
        this.resultTF.setVisible(false);
    },
    setClose: function () {
        this.bg.setSpriteFrame("chapterSkin_close.png");
        this.resultTF.setVisible(false);
    },
    clicked: function () {
        if (this.lv > LevelManager.instance.lastOpen) {
            showTip(Lang.i18n(14));//关卡未开放
        } else {
            if (gameStepVo.step > 0) {
                LevelManager.instance.currentLevel = this.lv;
                cc.director.runScene(new GameScene());
            } else {
                cc.eventManager.dispatchCustomEvent(GameEvent.SHOW_BUY_HP);
            }
        }
    }
});

