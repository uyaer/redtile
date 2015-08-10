var MapEditor = cc.Scene.extend({
    /**
     * @type GameScene
     */
    control: null,


    lv: 1,
    ctor: function () {
        this._super();



        this.lv = 5;
        this.init(this.lv);

        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: this.nextLv.bind(this)
        }, this);
    },

    nextLv: function (keyCode) {
        if(keyCode == cc.KEY.right){
            this.lv++;
            this.init(this.lv);
        }else if(keyCode == cc.KEY.left){
            this.lv--;
            this.init(this.lv);
        }
        trace(this.lv);
    },

    init: function (lv) {
        cc.spriteFrameCache.addSpriteFrames(res.ui)

        //init data
        LevelManager.instance.currentLevel = lv;
        this.currentLv = lv;
        this.deadCount = 0;
        this.blockSceneArr = [];

        this.removeAllChildren(true);

        var bg = new cc.LayerColor(cc.color(255,255,255),App.WIN_W,App.WIN_H);
        this.addChild(bg);

        this.makeScenes(lv);
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
            //TODO color bg
            bg = new cc.Sprite("res/bg/" + name + ".png");
            bg.anchorX = bg.anchorY = 0;
            if (bg.height < this.everyH) {
                bg.scaleY = this.everyH / bg.height;
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
    }
});