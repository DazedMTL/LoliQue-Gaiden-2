(() => {
    'use strict';

    /* rpg_manager.js */

    //==============================================================================
    // ImageManager
    //==============================================================================

    (__loadNormalBitmap => {
        ImageManager.loadNormalBitmap = function (path, hue) {
            // 階層の区切り文字が%2Fだとサブフォルダの画像読み込みに失敗するようなので置き換え
            return __loadNormalBitmap.call(this, path.replace('%2F', '/'), hue);
        };
    })(ImageManager.loadNormalBitmap);

})();
