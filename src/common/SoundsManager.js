/**
 * Created by Administrator on 2014/4/7.
 */

var SoundsManager = cc.Class.extend({

    /**
     * 是否播放音乐
     */
    isAudio: true,
    /**
     * 当前背景音乐的路径
     */
    bgSoundPath: "res/sounds/bgsound.mp3",
    ctor: function () {
        this.load();
    }
});

SoundsManager.prototype.load = function () {
    var dataStr = cc.sys.localStorage.getItem("sound");
    if (!dataStr)return;
    var sound = JSON.parse(dataStr);
    this.isAudio = sound.isAudio;
}
SoundsManager.prototype.save = function () {
    var data = {"isAudio": this.isAudio};
    cc.sys.localStorage.setItem("sound", JSON.stringify(data));
}

/**
 * 是否有音乐播放
 * @param flag
 */
SoundsManager.prototype.setHasMusic = function (flag) {
    if (this.isAudio != flag) {
        this.isAudio = flag;
        if (flag) {
            this.playMusic();
        } else {
            cc.audioEngine.stopMusic();
        }
        this.save();
    }
}
SoundsManager.prototype.toggle = function () {
    this.setHasMusic(!this.isAudio);
}

/**
 * 播放背景音乐
 * @param path
 */
SoundsManager.prototype.playMusic = function (path) {
    path = path || this.bgSoundPath;
    if (this.isAudio) {
        if (!cc.audioEngine.isMusicPlaying()) {
            this.bgSoundPath = path;
            cc.audioEngine.playMusic(path, true);
            cc.audioEngine.setMusicVolume(0.55);
        }
    }
}
/**
 * 播放音效
 * @param path
 * @param loop 默认false
 */
SoundsManager.prototype.playEffect = function (name, loop, vol) {
    var path = "res/sounds/" + name + ".mp3";
    if (arguments.length < 3) {
        vol = 1;
    }
    if (this.isAudio) {
        loop = arguments[1] || false;
        cc.audioEngine.stopAllEffects();
        cc.audioEngine.playEffect(path, loop);
        cc.audioEngine.setEffectsVolume(vol);
    }
}

SoundsManager.prototype.stopAll = function () {
    cc.audioEngine.stopMusic(false);
    cc.audioEngine.stopAllEffects();
    this.time = 0;
    this.lastPlays = {};
}
SoundsManager.prototype.pauseMusic = function () {
    cc.audioEngine.pauseMusic();
}
SoundsManager.prototype.resumeMusic = function () {
    cc.audioEngine.resumeMusic();
}


SoundsManager.instance = new SoundsManager();