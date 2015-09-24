var GameManager = {};
GameManager.instance = {

    loadData: function (str) {
        LevelManager.instance.load(str);
    },

    /**
     * delay save id
     */
    _saveCfgDelayId: 0,
    /**
     *delay save count
     */
    _saveCfgDelayCount: 0,

    saveData: function () {
        this._saveCfgDelayCount++;
        clearTimeout(this._saveCfgDelayId);
        this._saveCfgDelayId = setTimeout(this._saveDataDelay.bind(this), 1000);
        //当大于10的时候才会保存
        if (this._saveCfgDelayCount > 10) {
            this._saveDataDelay();
        }
    },

    _saveDataDelay: function () {
        this._saveCfgDelayCount = 0;
        var dataStr = this.getSaveDataStr();
        Net.saveGameData(dataStr);
    },

    getSaveDataStr: function () {
        var dataStr = LevelManager.instance.getSaveStr();
        return dataStr;
    },

    /**
     * 获取用户id
     * @returns {String}
     */
    getUserId: function () {
        var id = cc.sys.localStorage.getItem(Const.STORE_USER_KEY);
        return id;
    },
    saveUserId: function (id) {
        cc.sys.localStorage.setItem(Const.STORE_USER_KEY, id);
    },
    /**
     * 获取用户数据id
     * @returns {String}
     */
    getGameDataId: function () {
        var id = cc.sys.localStorage.getItem(Const.STORE_GAME_DATA_ID_KEY);
        return id;
    },
    saveGameDataId: function (id) {
        cc.sys.localStorage.setItem(Const.STORE_GAME_DATA_ID_KEY, id);
    }

};

this["GameManager"] = GameManager;