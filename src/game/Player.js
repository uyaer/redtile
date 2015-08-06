/**
 * Created by Administrator on 2014/5/30.
 */

var Player = cc.Node.extend({
    /**
     * @type LevelView
     */
    levelControl: null,
    /**
     * 状态
     */
    state: null,
    ctor: function (levelControl) {
        this._super();

        this.levelControl = levelControl;

        this.mainSp = new cc.Sprite("#player_run0001.png");
        this.addChild(this.mainSp, 1);

        this.huiSp = new cc.Sprite();
        this.huiSp.runAction(AnimManager.instance.getAnimate(ANIM_HUICHENG));
        this.huiSp.x = -20;
        this.addChild(this.huiSp);
        this.huiSp.visible = false;

        this.runAnim = null;
        this.jumpAnim = null;
        this.state = STATE_RUN;
    },
    run: function () {
        this.state = STATE_RUN;
        this.jumpAnim = null;
        this.huiSp.visible = true;
        this.runAnim = this.mainSp.runAction(AnimManager.instance.getAnimate(ANIM_RUN));
        SoundsManager.instance.playEffect("run", true);
    },
    jump: function () {
        this.state = STATE_JUMP;
        this.huiSp.setVisible(false);
        if (this.runAnim) {
            this.mainSp.stopAction(this.runAnim);
            this.runAnim = null;
        }
        this.jumpAnim = cc.spawn(
            cc.rotateBy(0.56, 360),
            cc.jumpBy(0.56, cc.p(this.levelControl.currSceneIndex % 2 == 0 ? 0 : 0, 0), 90, 1)
        );
        this.runAction(this.jumpAnim);
        this.runAction(cc.sequence(
            cc.delayTime(0.56),
            cc.callFunc(this.run, this)
        ));
        SoundsManager.instance.playEffect("jump");
    },
    dead: function () {
        this.state = STATE_DEAD;
        this.huiSp.setVisible(false);
        if (this.runAnim) {
            this.mainSp.stopAction(this.runAnim);
            this.runAnim = null;
        }
        this.mainSp.stopAllActions();

        this.jumpAnim = null;
        this.setRotation(0);
        this.y = this.levelControl.playerY;

        this.mainSp.runAction(AnimManager.instance.getAnimate(ANIM_DEAD));
        this.runAction(cc.moveBy(0.35, cc.p(this.levelControl.currSceneIndex % 2 == 1 ? 10 : -10, -5)));
        this.runAction(cc.sequence(
            cc.delayTime(1),
            cc.callFunc(this._deadOver, this)
        ));
        SoundsManager.instance.playEffect("dead");
    },
    _deadOver: function () {
        this.levelControl.restart();
    }
});
STATE_RUN = 1;
STATE_JUMP = 2;
STATE_DEAD = 3;