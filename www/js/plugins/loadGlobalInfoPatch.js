(() => {
    (__loadGlobalInfo => {
        DataManager.loadGlobalInfo = function () {
            return this._globalInfo
                || (this._globalInfo = __loadGlobalInfo.apply(this, arguments));
        };
    })(DataManager.loadGlobalInfo);

    (__saveGlobalInfo => {
        DataManager.saveGlobalInfo = function (info) {
            this._globalInfo = null;
            return __saveGlobalInfo.apply(this, arguments);
        };
    })(DataManager.saveGlobalInfo);
})();
