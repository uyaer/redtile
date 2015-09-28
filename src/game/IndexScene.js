var IndexScene = cc.Scene.extend({
    /**
     * @type cc.Node
     */
    mainNode: null,
    /**
     * @type cc.Sprite
     */
    boy: null,
    /**
     * @type cc.Sprite
     */
    girl: null,
    /**
     * @type cc.Sprite
     */
    light: null,
    /**
     * @type ccui.Button
     */
    playBtn: null,
    /**
     * @type ccui.Button
     */
    musicBtn: null,
    ctor: function () {
        this._super();

        if (IndexScene.isFirstEnter) {
            if (Net.count > 0) {
                LoadingGif.show(this);
            }
            IndexScene.isFirstEnter = false;
        }

        var scene = ccs.load(res.scene_index);
        this.mainNode = scene.node;
        this.addChild(this.mainNode);

        this.boy = seekChildByName(this.mainNode, "boy");
        this.girl = seekChildByName(this.mainNode, "girl");
        this.light = seekChildByName(this.mainNode, "light");
        this.playBtn = seekChildByName(this.mainNode, "playBtn");
        this.musicBtn = seekChildByName(this.mainNode, "musicBtn");

        shake.randomShakeLoop(this.boy);
        shake.randomShakeLoop(this.girl);
        shake.randomShakeLoop(this.playBtn);

        this.light.runAction(
            cc.sequence(cc.fadeOut(1), cc.fadeIn(1)).repeatForever()
        );
        this.light.runAction(
            cc.rotateBy(5, 360).repeatForever()
        );

        //title
        var title = new IndexTitle();
        title.x = Const.WIN_W / 2;
        title.y = Const.WIN_H * 0.725;
        this.addChild(title, 1);

        //event
        var that = this;
        this.playBtn.addClickEventListener(function () {
            cc.director.runScene(new cc.TransitionFade(0.35, new ChapterScene(), hex2Color(0xd8f5fd)));
        });

        this.musicBtn.addClickEventListener(function () {
            SoundsManager.instance.toggle();
            that.musicShow();
        });
        this.musicShow();
        SoundsManager.instance.playMusic();

        if (cc.sys.isNative) {
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyReleased: this.onKeyClicked.bind(this)
            }, this);
        }
    },

    musicShow: function () {
       var url = "ui/music_open.png";
        if(!SoundsManager.instance.isAudio){
            url = "ui/music_close.png";
        }
        this.musicBtn.loadTextures(url,url,url,ccui.Widget.PLIST_TEXTURE);
    },

    onKeyClicked: function (keyCode, event) {
        if (keyCode == cc.KEY.back) {
            if(LevelManager.instance.lastOpen<10){
                App.showConfirmClose();
            }else{
                App.showExitAd();
            }
        }
    }
});

IndexScene.isFirstEnter = true;
