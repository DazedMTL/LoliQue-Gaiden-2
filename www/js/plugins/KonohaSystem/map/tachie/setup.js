(() => {
    'use strict';

    const $p = {
        pictures: KONOHA.parameters.pictures,
    };

    /* rpg_objects.js */

    //==============================================================================
    // Game_Map
    //==============================================================================

    (__setup => {
        Game_Map.prototype.setup = function (mapId) {
            __setup.apply(this, arguments);

            // 立ち絵用ピクチャを透明状態で準備
            for (let key in $p.pictures) {
                let picture = $p.pictures[key];
                if (!$gameScreen.picture(picture.id)) {
                    $gameScreen.showPicture(picture.id, picture.image, 0, picture.x, picture.y, picture.scale, picture.scale, 0, 0);
                }
            }
        };
    })(Game_Map.prototype.setup);

})();
