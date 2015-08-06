var ChapterScene = cc.Scene.extend({
    ctor: function () {
        this._super();

        cc.spriteFrameCache.addSpriteFrames(res.menu);
        cc.spriteFrameCache.addSpriteFrames(res.ui);
        cc.spriteFrameCache.addSpriteFrames(res.el_cloud);

        //bg
        var bg = new cc.Sprite("res/cbg.png");
        bg.scaleX = App.WIN_W / bg.width;
        bg.scaleY = App.WIN_H / bg.height;
        bg.anchorX = bg.anchorY = 0;
        this.addChild(bg);

        var cloud = new cc.Sprite("#el/1-1_cloud.png");
        cloud.anchorX = 0;
        this.addChild(cloud, 1);
        cloud.setOpacity(0);
        cloud.runAction(
            cc.sequence(
                cc.place(cc.p(400, App.WIN_H * 0.45 + App.WIN_H * 0.3 * Math.random())),
                cc.scaleTo(0, 0.35 * Math.random() + 0.4),
                cc.moveBy(20, cc.p(-800, 0))
            ).repeatForever()
        );
        cloud.runAction(
            cc.sequence(
                cc.fadeIn(8),
                cc.fadeOut(8),
                cc.delayTime(4)
            ).repeatForever()
        );

        //关卡位置信息
        var posArr = [cc.p(0, 0), cc.p(App.WIN_W - 8, 0), cc.p(0, App.WIN_H - 8), cc.p(0, 0)];
        var sizeArr = [cc.size(8, App.WIN_H), cc.size(8, App.WIN_H), cc.size(App.WIN_W, 8), cc.size(App.WIN_W, 8)];
        for (var i = 0; i < 4; i++) {
            var bb = new cc.LayerColor(hex2Color(0xfafaff), sizeArr[i].width, sizeArr[i].height);
            bb.setPosition(posArr[i]);
            this.addChild(bb, 15);
        }

        this.itemArr = [];

        var root = new cc.Node();
        for (var i = 0; i < 40; i++) {
            var page = int(i / 12);
            var index = i % 12;
            var col = int(index % 3);
            var row = int(index / 3);
            var everyH = (App.WIN_H - 130) / 4;
            everyH = Math.max(everyH, 112);
            var bottomH = App.WIN_H - everyH * 4;
            var item = new ChapterItem(i + 1);
            item.setPosition(400 * page + col * 133 + 66.5, (3 - row) * everyH + bottomH);
            root.addChild(item);
            this.itemArr.push(item);
            if (i < LevelManager.instance.lastOpen - 1) {
                item.setComplete();
            } else if (i == LevelManager.instance.lastOpen - 1) {
                item.setOpen();
            } else {
                item.setClose();
            }
        }
        var scroll = new cc.ScrollView(cc.size(App.WIN_W, App.WIN_H), root);
        scroll.setDirection(cc.SCROLLVIEW_DIRECTION_HORIZONTAL);
        scroll.setContentSize(cc.size(App.WIN_W * 4, App.WIN_H));
        scroll.setBounceable(true);
        scroll.setTouchEnabled(false);
        this.addChild(scroll, 10);
        this.scroll = scroll;
        this.pageIndex = 0;

        //event
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesBegan: this.onTouchesBeganHandler.bind(this),
            onTouchesMoved: this.onTouchesMovedHandler.bind(this),
            onTouchesEnded: this.onTouchesEndedHandler.bind(this)
        }, this);

        if(cc.sys.isNative){
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyReleased: this.onKeyClicked.bind(this)
            }, this);
        }

        //music
        var isAudio = SoundsManager.instance.isAudio;
        this.musicSp = new cc.Sprite("#ui/music_" + (isAudio ? "open" : "close") + ".png");
        var that = this;
        var item = new cc.MenuItemSprite(this.musicSp);
        item.setCallback(function () {
            SoundsManager.instance.toggle();
            isAudio = !isAudio;
            var frame = new cc.SpriteFrame("#ui/music_" + (isAudio ? "open" : "close") + ".png", cc.rect(0, 0, 70, 83));
            that.musicSp.setSpriteFrame(frame);
        }, this);

        var menu = cc.Menu.create(item);
        menu.setPosition(cc.p(45, 50));
        this.addChild(menu);

    },
    onKeyClicked: function (keyCode, event) {
        if (keyCode == cc.KEY.back) {
            App.showConfirmClose();
        }
    },
    onEnter: function () {
        this._super();

        App.hideBannerAd();
        SoundsManager.instance.playMusic();
        var lastOpenIndex = LevelManager.instance.lastOpen - 1;
        var page = int(lastOpenIndex / 12);
        this.pageIndex = page;
        this.scroll.setContentOffsetInDuration(cc.p(-App.WIN_W * page, 0), 0.35 * page);
    },
    onExit: function () {
        this._super();

        SoundsManager.instance.stopAll();
    },
    onTouchesBeganHandler: function (touches, event) {
        if (touches.length > 0) {
            var touch = touches[0];
            this.startTouchPos = touch.getLocation();
        }
    },
    onTouchesMovedHandler: function (touches, event) {
        if (touches.length > 0) {
            var touch = touches[0];
            var dx = touch.getLocation().x - touch.getPreviousLocation().x;
            var offset = this.scroll.getContentOffset();
            this.scroll.setContentOffset(cc.p(offset.x + dx, offset.y));
        }
    },
    onTouchesEndedHandler: function (touches, event) {
        if (touches.length > 0) {
            var touch = touches[0];
            var dis = touch.getLocation().x - this.startTouchPos.x;
            if (dis > 50) {
                this.prevPage();
            } else if (dis < -50) {
                this.nextPage();
            } else {
                this.scroll.setContentOffsetInDuration(cc.p(-400 * this.pageIndex, 0), 0.15);
                if (cc.pDistance(touch.getLocation(), this.startTouchPos) < 15) {
                    this._checkClick(touch.getLocation());
                }
            }
        }
    },
    nextPage: function () {
        if (this.pageIndex < 3) {
            this.pageIndex++;
        }
        this.scroll.setContentOffsetInDuration(cc.p(-400 * this.pageIndex, 0), 0.25);
    },
    prevPage: function () {
        if (this.pageIndex > 0) {
            this.pageIndex--;
        }
        this.scroll.setContentOffsetInDuration(cc.p(-400 * this.pageIndex, 0), 0.25);
    },
    _checkClick: function (pos) {
        for (var i = this.pageIndex * 12; i < Math.min(this.itemArr.length, (this.pageIndex + 1) * 12); i++) {
            var item = this.itemArr[i];
            var center = item.convertToWorldSpace(cc.p(0, 47.5));
            if (cc.pDistance(center, pos) < 45) {
                item.clicked();
                break;
            }
        }
    }
});
