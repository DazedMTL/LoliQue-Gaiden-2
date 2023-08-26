(() => {
    'use strict';

    //==============================================================================
    // Scene_Menu
    //==============================================================================

    (__create => {
        Scene_Menu.prototype.create = function () {
            let checkTouchCommand = this.checkTouchCommand;
            this.checkTouchCommand = () => {
                // サブコマンド表示中はタッチ判定しない
                if (this._subMenuWindow) {
                    return;
                }

                checkTouchCommand.call(this);
            };

            __create.apply(this, arguments);
        };
    })(Scene_Menu.prototype.create);

})();
