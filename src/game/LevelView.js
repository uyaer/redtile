var LevelView = cc.Layer.extend({
    /**
     * @type GameScene
     */
    control: null,

    ctor: function (control) {
        this._super();
        this.control = control;
    },

    init: function (lv) {
        //event
        cc.eventManager.removeListeners(this);
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: this.onTouchBeganHandler.bind(this)
        }, this);

        //init data
        LevelManager.instance.currentLevel = lv;
        this.currentLv = lv;
        this.deadCount = 0;
        this.blockSceneArr = [];

        this.removeAllChildren(true);

        this.makeScenes(lv);


        //player
        this.player = new Player(this);
        this.player.y = 12.5;
        this.addChild(this.player, 100);
        this.playerRunAnim = null;

        //this.nextScene();
        //this.nextScene();
    },

    makeScenes: function (lv) {
        var levelVo = LevelManager.instance.loadLevel(lv);
        var sceneList = levelVo.sceneList;
        var everyH = App.WIN_H / sceneList.length;
        this.everyH = everyH;
        for (var i = 0; i < sceneList.length; i++) {
            var sceneVo = sceneList[i];
            this.makeOneScene(i, sceneVo);
        }

        //first scene
        this.currSceneIndex = 0;
        this.currScene = sceneList.shift();
        this.sceneList = sceneList;
        this.playerSpeed = this.currScene.playerSpeed;
    },
    /**
     * 创建当个场景
     * @param i
     * @param sceneVo {SceneVo}
     */
    makeOneScene: function (i, sceneVo) {
        var sceneNode = new cc.Node();
        sceneNode.y = App.WIN_H - this.everyH * (i + 1);
        this.addChild(sceneNode, 10 - i);
        //bg
        var bgName = sceneVo.bg;
        var ext = bgName.substring(bgName.lastIndexOf(".") + 1);
        var name = bgName.substring(0, bgName.indexOf("."));
        var bg;
        if (ext == "swf") {
            bg = new LevelSwfMap[bgName]();
            bg.fitBackground(this.everyH);
        } else {
            bg = new cc.Sprite("res/bg/" + name + ".png");
            bg.anchorX = bg.anchorY = 0;
            var skyColor = sceneVo.sky;
            if (skyColor) {
                var sky = new cc.LayerColor(hex2Color(skyColor), App.WIN_W, this.everyH);
                sceneNode.addChild(sky, -i);
            } else {
                if (bg.height < this.everyH) {
                    bg.scaleY = this.everyH / bg.height;
                }
            }
        }
        sceneNode.addChild(bg, -i);
        bg.y = -30;

        //make block
        var blockArr = [];
        this.blockSceneArr.push(blockArr);
        var blockList = sceneVo.blockList;
        for (var j = 0; j < blockList.length; j++) {
            var blockVo = blockList[j];

            var blockSkin = new cc.Node();
            blockArr.push(blockSkin);
            sceneNode.addChild(blockSkin, 10);

            this.makeBlock(j, blockVo, blockSkin);
        }
    },

    /**
     *
     * @param j
     * @param blockVo {BlockVo}
     * @param blockSkin {cc.Node}
     */
    makeBlock: function (j, blockVo, blockSkin) {
        var maxRow = (Math.floor(blockVo.width / 25)) || 1;
        var maxCol = (Math.floor(blockVo.height / 25)) || 1;
        var row = 0;
        while (row < maxRow) {
            var col = 0;
            while (col < maxCol) {
                var item = new cc.Sprite("#ui/item.png");
                item.ignoreAnchorPointForPosition(true);
                item.setPosition(row * 25, col * 25);
                blockSkin.addChild(item);
                col++;
            }
            row++;
        }
        blockSkin.setContentSize(blockVo.width, blockVo.height);
        blockSkin.setScaleX(blockVo.width / (25 * maxRow));
        blockSkin.setScaleY(blockVo.height / (25 * maxCol));
        blockSkin.setPosition(blockVo.x, -blockVo.y);
        //easing
        if (blockVo.easing) {
            var ease = blockVo.easing;
            var moveAnim;
            if (ease.type == Easing.BACK) {
                blockSkin.x = blockVo.x - ease.range;
                blockSkin.y = -blockVo.y;
                moveAnim = cc.moveBy(ease.time, cc.p(ease.range * 2, 0));
            } else if (ease.type == Easing.FLOAT) {
                blockSkin.x = blockVo.x;
                blockSkin.y = -blockVo.y - ease.range;
                moveAnim = cc.moveBy(ease.time, cc.p(0, ease.range * 2));
            }
            blockSkin.runAction(cc.sequence(
                moveAnim,
                moveAnim.reverse()
            ).repeatForever());
        }
    },

    update: function (dt) {
        this.scheduleIndex++;
        var px = this.player.getPositionX();
        var offx = 200 - px;
        if (offx > 0)offx = 0;
        if (offx < -400) {
            offx = -400;
        }
        this.setPositionX(offx);
        if (this.player.state == STATE_DEAD)return;
        //检测边界
        var x = this.player.getPositionX();
        if (this.currSceneIndex % 2 == 0) { //向右边移动
            if (x > 850) {
                this.nextScene();
                return;
            }
        } else {
            if (x < -50) {
                this.nextScene();
                return;
            }
        }
        //碰撞检查
        var blockArr = this.blockSceneArr[this.currSceneIndex];
        for (var i = 0; i < blockArr.length; i++) {
            var block = blockArr[i];
            var blockPos = block.convertToWorldSpace(cc.p(0, 0));
            var blockSize = block.getContentSize();
            var blockRect = cc.rect(blockPos.x, blockPos.y, blockSize.width, blockSize.height);

            var playerPos = this.player.convertToWorldSpace(cc.p(0, 0));
            var playerRect = cc.rect(playerPos.x - 12.5, playerPos.y - 12.5, 20, 20);
            if (cc.rectIntersectsRect(playerRect, blockRect)) {
                if (this.playerRunAnim) {
                    this.player.stopAction(this.playerRunAnim);
                    this.playerRunAnim = null;
                }
                this.player.stopAllActions();
                this.player.dead();
            }
        }
    },

    nextScene: function () {
        this.unscheduleUpdate();
        if (this.sceneList.length > 0) {
            this.currSceneIndex++;
            this.currScene = this.sceneList.shift();
            this.playerSpeed = this.currScene.playerSpeed;
            this.start();
        } else {
            //胜利通关，进入下一关
            var lv = ++LevelManager.instance.currentLevel;
            if (LevelManager.instance.lastOpen < lv) {
                LevelManager.instance.lastOpen++;
            }
            if (LevelManager.instance.levelData[this.currentLv] > this.deadCount) {
                LevelManager.instance.levelData[this.currentLv] = this.deadCount;
            }
            LevelManager.instance.save();
            if (lv <= LevelManager.instance.levelTotal) {
                this.control.showLevelComplete();
            } else {
                cc.director.runScene(new WinScene());
            }
        }
    },

    nextLv: function () {
        var lv = LevelManager.instance.currentLevel;
        this.init(lv);
        this.start();
    },

    start: function () {
        this.player.stopAllActions();
        this.player.setRotation(0);
        if (this.currSceneIndex % 2 == 0) {
            this.player.setScaleX(1);
            this.playerY = 12.5 + App.WIN_H - ((this.currSceneIndex + 1) * this.everyH);
            this.player.setPosition(cc.p(-50, this.playerY));
            this.playerRunAnim = this.player.runAction(
                cc.moveBy(0.91 / this.playerSpeed + 0.3, cc.p(910, 0)));
        } else {
            this.player.setScaleX(-1);
            this.playerY = 12.5 + App.WIN_H - ((this.currSceneIndex + 1) * this.everyH);
            this.player.setPosition(cc.p(850, this.playerY));
            this.playerRunAnim = this.player.runAction(
                cc.moveBy(0.91 / this.playerSpeed + 0.3, cc.p(-910, 0)));
        }
        this.player.run();
        this.scheduleIndex = 0;
        this.scheduleUpdate();

        //更新界面
        this.control.updateLevel();
        this.control.updateDead();
    },

    pauseGame: function () {
        this.player.getActionManager().pauseTarget(this.player);
        SoundsManager.instance.stopAll();
    },

    resumeGame: function () {
        this.player.getActionManager().resumeTarget(this.player);
        if (this.state == STATE_RUN) {
            SoundsManager.instance.playEffect("run", true);
        }
    },

    restart: function () {
        this.unscheduleUpdate();
        this.deadCount++;
        gameStepVo.step--;
        gameStepVo.saveToRemote();
        if (gameStepVo.step > 0) {
            this.start();
        } else {
            //没有生命了
            this.parent.addChild(new BuyHpPanel(), 100);
        }
    },

    onTouchBeganHandler: function () {
        if (this.player.state == STATE_RUN) {
            this.player.jump();
        }
    },

    onExit: function () {
        this._super();

        this.unscheduleUpdate();
    }
});