(() => {
    'use strict';

    const $p = {
        pictures: KONOHA.parameters.pictures,
        images: {
            14: 'Bst001_ninsin',
            15: 'Bst002_datai',
            16: 'Bst003_hatujo',
            17: 'Bst004_seieki',
            18: 'Bst005_inmon',
            19: 'Bst006_doping',
            20: 'Bst007_kairaku',
            21: 'Bst008_bonyu',
            22: 'Bst009_kisei',
            23: 'Bst010_dorei',
            24: 'Bst011_torauma',
            25: 'Bst012_bive',
            26: 'Bst013_tikubi',
            27: 'Bst014_kuripi',
            28: 'Bst015_kando3000',
            29: 'Bst016_seiekimore',
            30: 'Bst017_saimin',
            31: 'Bst018_hairan',
            32: 'Bst019_deisui',
            33: 'Bst020_houkai',
            34: 'Bst021_massyou',
            35: 'Bst022_naedoko',
            36: 'Bst023_kongou',
        }
    };

    //==============================================================================
    // Sprite_BadState
    //==============================================================================

    class Sprite_BadState extends Sprite {
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

    class Spriteset_BadState extends Sprite {
        constructor() {
            super();
            this._sprites = {};
            this._states = [];
            for (let key in $p.images) {
                let sprite = new Sprite_BadState(key);
                this.addChildAt(sprite, 0);
                this._sprites[key] = sprite;
            }
        }

        update() {
            super.update();
            this.updateStates();
        }

        updateStates() {
            let actor = $gameParty.leader();
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
    }

    /* rpg_sprites.js */

    //==============================================================================
    // Sprite_Picture
    //==============================================================================

    (__initialize => {
        Sprite_Picture.prototype.initialize = function (pictureId) {
            __initialize.apply(this, arguments);

            if (SceneManager._scene instanceof Scene_Map) {
                if (pictureId == $p.pictures.badState.id) {
                    this._badStateSpriteset = new Spriteset_BadState();
                    this.addChild(this._badStateSpriteset);
                }
            }
        };
    })(Sprite_Picture.prototype.initialize);

})();
