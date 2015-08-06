/**
 * ================================== LevelManager  =====================================
 * @constructor
 */
function LevelManager() {
    this._levelConfig = {};
    this.levelTotal = 40;
    this.currentLevel = 1;

    this.levelData = {};
    this.lastOpen = 1;
}
LevelManager.prototype.initConfig = function () {
    var jsonData = cc.loader.getRes(res.data);
    this.levelTotal = jsonData.length;
    for (var i = 0; i < this.levelTotal; i++) {
        var vo = new LevelVo(jsonData[i]);
        this._levelConfig[i + 1] = vo;
    }
    this.load();
}

/**
 *
 * @param lv
 * @returns {LevelVo}
 */
LevelManager.prototype.loadLevel = function (lv) {
    if (lv > this.levelTotal){
        trace("to max level!!");
        return null;
    }
    this.currentLevel = lv;
    return this._levelConfig[lv];
}

LevelManager.prototype.load = function () {
    for (var i = 0; i < 40; i++) {
        this.levelData[i + 1] = 9999;
    }
    var dataStr = cc.sys.localStorage.getItem("levels");
    if (!dataStr)return;
    var data = JSON.parse(dataStr);
    this.lastOpen = data.lastOpen;
    this.levelData = data.levelData;
}
LevelManager.prototype.save = function () {
    var data = {"lastOpen": this.lastOpen};
    data.levelData = this.levelData;
    cc.sys.localStorage.setItem("levels", JSON.stringify(data));
}

LevelManager.instance = new LevelManager();
