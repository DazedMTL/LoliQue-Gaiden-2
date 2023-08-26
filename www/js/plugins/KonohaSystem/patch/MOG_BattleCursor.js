(() => {
    'use strict';

    /* カーソル移動速度アップ対応 */
    (__create => {
        Scene_Battle.prototype.create = function () {
            __create.apply(this, arguments);
            let sprite_move_to = this._battleCursor.sprite_move_to;
            this._battleCursor.sprite_move_to = function (value, real_value, speed) {
                return sprite_move_to.call(this, value, real_value, 3);
            };
        };
    })(Scene_Battle.prototype.create);

})();
