(() => {
    'use stirct';

    const $p = {
        pictures: KONOHA.parameters.pictures
    };

    //==============================================================================
    // Sprite_Name
    //==============================================================================

    class Sprite_NameFieldMap extends Sprite {
        constructor() {
            super();
            this._name = '';
        }

        update() {
            super.update();
            this.updateName();
        }

        updateName() {
            // 親SpriteのBitmapの準備ができていなければ何もしない
            if (!this.parent || !this.parent.bitmap || !this.parent.bitmap.width) {
                return;
            }

            if (!this.bitmap) {
                // Bitmap生成
                this.bitmap = new Bitmap(this.parent.bitmap.width, 80);
            }

            // 名前取得
            let actor = $gameParty.leader();
            let name = actor ? actor.name() : '';

            // 名前が変わっていなければ更新しない
            if (name == this._name) {
                return;
            }

            // 表示更新
            this.bitmap.clear();
            this.bitmap.drawText(name, 0, 0, this.bitmap.width, 62, 'center');
            this._name = name;
        }
    }

    /* rpg_sprites.js */

    //==============================================================================
    // Sprite_Picture
    //==============================================================================

    (__initialize => {
        Sprite_Picture.prototype.initialize = function (pictureId) {
            __initialize.apply(this, arguments);

            if (pictureId == $p.pictures.nameField.id) {
                if (SceneManager._scene instanceof Scene_Map) {
                    this._nameFieldSprite = new Sprite_NameFieldMap();
                    this.addChild(this._nameFieldSprite);
                }
            }
        };
    })(Sprite_Picture.prototype.initialize);

})();
