/**
 * ================================== BlockVo  =====================================
 * @constructor
 */
function BlockVo(blockObj) {
    this.setData(blockObj);
}
BlockVo.prototype.setData = function (blockObj) {
    this.width = Number(blockObj.w);
    this.height = Number(blockObj.h);
    this.x = Number(blockObj.x);
    this.y = Number(blockObj.y);
    /**
     *
     * @type {Easing}
     */
    this.easing = null;

    var easeObj = blockObj.easing;
    if (easeObj) {
        this.easing = new Easing(easeObj);
    }
}