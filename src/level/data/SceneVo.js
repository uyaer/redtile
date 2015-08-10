/**
 * ================================== SceneVo  =====================================
 * @constructor
 */
function SceneVo(sceneObj) {
    /**
     *
     * @type {Array} BlockVo
     */
    this.blockList = [];
    this.setData(sceneObj);
}
SceneVo.prototype.setData = function (sceneObj) {
    this.bg = sceneObj.bg;
    this.sky = sceneObj.sky;
    this.blockColorType = sceneObj.blockColorType;
    this.playerSpeed = sceneObj.playerSpeed;

    var blockArr = sceneObj.blockList;
    if (blockArr) {
        for (var i = 0; i < blockArr.length; i++) {
            this.blockList.push(new BlockVo(blockArr[i]));
        }
    }
}
