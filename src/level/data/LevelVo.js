
/**
 * ================================== Level  =====================================
 * @constructor
 */
function LevelVo(levelObj) {
    /**
     *
     * @type {Array} SceneVo
     */
    this.sceneList = [];
    this.index = 0;
    this.music = 0;
    this.setData(levelObj);
}
LevelVo.prototype.setData = function (levelObj) {
    this.index = levelObj.index;
    this.music = levelObj.music;
    var sceneArr = levelObj.sceneList;
    for (var i = 0; i < sceneArr.length; i++) {
        var sceneObj = sceneArr[i];
        this.sceneList.push(new SceneVo(sceneObj));
    }
    this.numScene = this.sceneList.length;
}
