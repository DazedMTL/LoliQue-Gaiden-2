(() => {
    'use strict';

    (__makeSaveContents => {
        DataManager.makeSaveContents = function () {
            $gameSystem.smoothscroll = {
                villaA_scrollSpeed: villaA_scrollSpeed,
                villaA_mapscroll: villaA_mapscroll,
                villaA_smoothScrolling: villaA_smoothScrolling
            };

            return __makeSaveContents.apply(this, arguments);
        };
    })(DataManager.makeSaveContents);

    (__extractSaveContents => {
        DataManager.extractSaveContents = function (contents) {
            __extractSaveContents.apply(this, arguments);

            if ($gameSystem.smoothscroll) {
                villaA_scrollSpeed = $gameSystem.smoothscroll.villaA_scrollSpeed;
                villaA_mapscroll = $gameSystem.smoothscroll.villaA_mapscroll;
                villaA_smoothScrolling = $gameSystem.smoothscroll.villaA_smoothScrolling;
            }
        };
    })(DataManager.extractSaveContents);

})();
