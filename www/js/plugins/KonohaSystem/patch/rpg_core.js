(() => {
    'use strict';

    /* rpg_core.js */

    //==============================================================================
    // Input
    //==============================================================================

    // Bキー
    Input.keyMapper[66] = 'B';

    //==============================================================================
    // TouchInput
    //==============================================================================

    (__clear => {
        TouchInput.clear = function () {
            __clear.apply(this, arguments);

            // マウスカーソルの座標を初期化
            this._moveX = 0;
            this._moveY = 0;
        };
    })(TouchInput.clear);

    (___onMouseMove => {
        TouchInput._onMouseMove = function (event) {
            ___onMouseMove.apply(this, arguments);

            // マウスカーソルの座標をリアルタイムに更新
            this._moveX = Graphics.pageToCanvasX(event.pageX);
            this._moveY = Graphics.pageToCanvasY(event.pageY);
        };
    })(TouchInput._onMouseMove);

})();
