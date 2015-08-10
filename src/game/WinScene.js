/**
 * ================================================
 * @type {Function}
 */
var WinScene = cc.Scene.extend({
    ctor: function () {
        this._super();
        var bg = cc.Sprite.create("#ui/quadbg.png");
        bg.setScaleX(App.WIN_W / 32);
        bg.setScaleY(App.WIN_H / 32);
        bg.setAnchorPoint(cc.p(0, 0));
        this.addChild(bg);


        var win = cc.Sprite.create("#ui/win.png");
        win.setPosition(cc.p(App.WIN_W / 2 - 15, App.WIN_H / 2));
        this.addChild(win);

        var deadTF = bitmapText(L.i18n["Total Dead!"]);
        deadTF.setAnchorPoint(cc.p(0.5, 1));
        deadTF.setPosition(cc.p(App.WIN_W / 2, App.WIN_H / 2 - 50));
        this.addChild(deadTF);

        var count = 0;
        for (var i = 1; i <= LevelManager.instance.levelTotal; i++) {
            count += LevelManager.instance.levelData[i];
        }

        var deadCountTF = bitmapText(count > 99999 ? "99999+" : (count + ""));
        deadCountTF.setAnchorPoint(cc.p(0.5, 1));
        deadCountTF.setPosition(cc.p(App.WIN_W / 2, App.WIN_H / 2 - 90));
        this.addChild(deadCountTF);

        var tip = bitmapText(L.i18n["You are a great sire!"]);
        tip.setPosition(cc.p(App.WIN_W / 2, App.WIN_H / 2 - 157));
        tip.setScale(0.9);
        this.addChild(tip);

        //home btn
        var homeBtn = cc.MenuItemImage.create("#ui/home.png", "#ui/home.png", function () {
            cc.director.runScene(new ChapterScene());
        }, this);
        //homeBtn.setColor(hex2Color(0x5A7CBC));
        var menu = cc.Menu.create(homeBtn);
        this.addChild(menu, 10);
        menu.setPosition(cc.p(325, App.WIN_H - 75));
    }
});