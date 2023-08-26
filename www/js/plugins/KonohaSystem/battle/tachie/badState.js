(() => {
    'use strict';

    const $p = {
        pictures: KONOHA.parameters.pictures,
        images: {
            49: 'Bstbt001_chichi',
            50: 'Bstbt002_zettyou',
            51: 'Bstbt003_stuchi',
            52: 'Bstbt004_htuchi',
            53: 'Bstbt005_skouin',
            54: 'Bstbt006_hkouin',
            55: 'Bstbt007_skousoku',
            56: 'Bstbt008_hagaijime',
            57: 'Bstbt009_slkousoku',
            58: 'Bstbt010_kkousoku',
            59: 'Bstbt011_ssounyu',
            60: 'Bstbt012_hsounyu',
            61: 'Bstbt014_slsounyu',
            62: 'Bstbt013_hsounyu2',
            63: 'Bstbt015_jsounyu',
            64: 'Bstbt016_ksounyu',
            65: 'Bstbt017_hsounyu3',
            66: 'Bstbt018_teisi',
            67: 'Bstbt019_suikan',
        }
    };

    //==============================================================================
    // Sprite_BadStateBattle
    //==============================================================================

    class Sprite_BadStateBattle extends Sprite {
        constructor(stateId) {
            super(ImageManager.loadPicture($p.images[stateId]));
            this._baseX = 0;
            this._baseY = 0;
            this._openX = 0;
            this._easing = null;
            this.visible = false;
        }

        setup(x, y, openX) {
            this.x = this._baseX = x;
            this.y = this._baseY = y;
            this._openX = openX;

            const Easing = KONOHA.utils.Easing;
            this._easing = new Easing(x - openX, 12, Easing.TYPE.Cubic, Easing.MODE.Inout);
        }

        update() {
            super.update();
            this.updatePosition();
        }

        updatePosition() {
            let mx = TouchInput._moveX;
            let my = TouchInput._moveY;
            let open = Input.isPressed('B')
                || (mx >= Graphics.width - 48 && my >= this.y && my <= this.y + this.height);

            // 終端まで移動していたら何もしない
            if (open ? this.x <= this._openX : this.x >= this._baseX) {
                return;
            }

            // 移動量を取得
            let moveX = open ? this._easing.next() : this._easing.prev();

            this.x = this._baseX - moveX;
            this.y = this._baseY;
        }
    }

    //==============================================================================
    // Spriteset_BadState
    //==============================================================================

    class Spriteset_BadStateBattle extends Sprite {
        constructor(actorId) {
            super();
            this._actorId = actorId;
            this._sprites = {};
            this._states = [];
            for (let key in $p.images) {
                let sprite = new Sprite_BadStateBattle(key);
                this.addChildAt(sprite, 0);
                this._sprites[key] = sprite;
            }
            this.visible = false;
        }

        update() {
            super.update();
            this.updateStates();
            this.updateVisible();
        }

        updateStates() {
            let actor = $gameActors.actor(this._actorId);
            let states = actor ? actor._states : [];

            // ステートが変わってなければ何もしない
            if (String(states) == String(this._states)) {
                return;
            }

            let x = Graphics.width - 48;
            let y = Graphics.height - 48 * 2 - 4;
            let width = 144;
            let height = 48;
            let openX = Graphics.width - (width + 2);
            let topY = y - (height + 4) * 10;
            let bottomY = y;

            for (let key in this._sprites) {
                let sprite = this._sprites[key];

                // ステート画像設定
                if (states.includes(Number(key))) {
                    sprite.setup(x, y, openX);
                    sprite.visible = true;

                    // 座標を更新
                    y -= height + 4;
                    if (y < topY) {
                        x -= 14;
                        y = bottomY;
                        openX -= width + 2;
                    }
                } else {
                    sprite.visible = false;
                }
            }

            // 最新のステートを保持
            this._states = [...states];
        }

        updateVisible() {
            this.visible = $gameKonoha.battleInfo.selectedActorId == this._actorId;
        }
    }

    /* rpg_sprites.js */

    //==============================================================================
    // Sprite_Picture
    //==============================================================================

    (__initialize => {
        Sprite_Picture.prototype.initialize = function (pictureId) {
            __initialize.apply(this, arguments);

            if (SceneManager._scene instanceof Scene_Battle) {
                if (pictureId == $p.pictures.badState.id) {
                    $gameParty.battleMembers().forEach(actor => {
                        this.addChild(new Spriteset_BadStateBattle(actor.actorId()));
                    });
                }
            }
        };
    })(Sprite_Picture.prototype.initialize);

})();
