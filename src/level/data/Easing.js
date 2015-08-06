/**
 * ================================== Easing  =====================================
 * @constructor
 */
function Easing(easeObj) {
    this.type = easeObj.type;
    this.range = Number(easeObj.range);
    this.time = this.range/50;
}
/**
 * 横向运动
 * @type {string}
 */
Easing.BACK = "back";
/**
 * 纵向运动
 * @type {string}
 */
Easing.FLOAT = "float";