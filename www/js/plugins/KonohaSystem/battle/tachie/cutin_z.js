(() => {
    'use strict';

    const $p = {
        states: KONOHA.parameters.states
    };

    const ORGASM_STATE = $p.states.badStateBattle2;

    const $spines = {};

    // コノハ
    $spines[1] = { skeleton: { front: 'cutin_konoha', back: 'back_cutin_konoha' }, animation: 'cut_z1' };
    $spines[2] = { skeleton: { front: 'cutin_dw', back: 'back_cutin_konoha' }, animation: 'cut_z1' };
    $spines[10] = { skeleton: { front: 'cutin_inp', back: 'back_cutin_konoha' }, animation: 'cut_z1' };
    $spines[11] = { skeleton: { front: 'cutin_gob', back: 'back_cutin_konoha' }, animation: 'cut_z1' };
    $spines[12] = { skeleton: { front: 'cutin_dor', back: 'back_cutin_konoha' }, animation: 'cut_z1' };
    $spines[13] = { skeleton: { front: 'cutin_dhu', back: 'back_cutin_konoha' }, animation: 'cut_z1' };
    $spines[14] = { skeleton: { front: 'cutin_ket', back: 'back_cutin_konoha' }, animation: 'cut_z1' };
    $spines[15] = { skeleton: { front: 'cutin_hap', back: 'back_cutin_konoha' }, animation: 'cut_z1' };
    $spines[16] = { skeleton: { front: 'cutin_mam', back: 'back_cutin_konoha' }, animation: 'cut_z1' };
    $spines[17] = { skeleton: { front: 'cutin_ghu', back: 'back_cutin_konoha' }, animation: 'cut_z1' };
    $spines[18] = { skeleton: { front: 'cutin_mdu', back: 'back_cutin_konoha' }, animation: 'cut_z1' };
    $spines[19] = { skeleton: { front: 'cutin_sah', back: 'back_cutin_konoha' }, animation: 'cut_z1' };
    $spines[20] = { skeleton: { front: 'cutin_pix', back: 'back_cutin_konoha' }, animation: 'cut_z1' };
    $spines[21] = { skeleton: { front: 'cutin_sla', back: 'back_cutin_konoha' }, animation: 'cut_z1' };
    $spines[22] = { skeleton: { front: 'cutin_kum', back: 'back_cutin_konoha' }, animation: 'cut_z1' };
    $spines[23] = { skeleton: { front: 'cutin_ten', back: 'back_cutin_konoha' }, animation: 'cut_z1' };
    $spines[24] = { skeleton: { front: 'cutin_oro', back: 'back_cutin_konoha' }, animation: 'cut_z1' };

    function nextId() {
        let _nextId = 0;
        function id() {
            return _nextId++;
        }
        return id;
    }

    let nextCutinId = nextId();

    //==============================================================================
    // Game_SpineCutin
    //==============================================================================

    class Game_SpineZCutin extends Game_Spine {
        constructor(layerId) {
            super();
            this._cutinId = Infinity;
            this._layerId = layerId;
            this._actorId = null;
            this._slideX = 0;
        }

        get cutinId() { return this._cutinId; }
        get actorId() { return this._actorId; }
        get slide() { return this._slide; }

        init() {
            super.init();
            this._slide = {};
        }

        setSlide(amount, frames) {
            this._slide = {
                amount: amount,
                frames: frames
            };
            return this;
        }

        update() {
            let members = $gameKonoha.battleInfo.orgasmMembers;
            if (members.length > 0) {
                if (!this._actorId) {
                    // 絶頂メンバーリストから1人目のIDを取得
                    let actorId = members[0];
                    this.setSkeleton($spines[actorId].skeleton[this._layerId]);
                    this.setAnimation(0, $spines[actorId].animation, 'none');
                    this.setOffset(1080, 394);

                    // 新しいカットインIDをセット
                    this._cutinId = nextCutinId();

                    // 初期スライド値セット
                    this._slideX = (members.length - 1) * 300;
                    if (this._slideX > 0) {
                        this.setSlide(this._slideX, 10);
                    }

                    // アクターIDを保持
                    this._actorId = actorId;

                    // メンバーリストから1人目を削除（キャラカットインの場合）
                    if (this._layerId == 'front') {
                        members.shift();
                    }
                } else {
                    // カットイン表示中に追加絶頂が来たらスライド
                    this._slideX += 300 * members.length;
                    this.setSlide(this._slideX, 10);

                    // 新しいカットインIDをセット
                    this._cutinId = nextCutinId();
                }
            } else if (!this._actorId) {
                this._cutinId = Infinity;
            }
        }
    }

    //==============================================================================
    // Sprite_SpineCutin
    //==============================================================================

    class Sprite_SpineZCutin extends Sprite_Spine {
        constructor(...args) {
            super(...args);
            this._spine = args[0] instanceof Game_SpineZCutin ? args[0] : null;
            this._easing = null;
        }

        update() {
            if (this.spine()) {
                if (this._data) {
                    // アニメーションが終わっていたらスケルトンをクリア
                    let track = this._data.state.tracks[0];
                    if (track) {
                        if (track.trackTime >= track.animationEnd) {
                            this.spine().setSkeleton('');
                            this.spine()._actorId = null;
                            this._easing = null;
                        }
                    }
                }
                this.spine().update();
            }
            super.update.apply(this, arguments);
        }

        updateVisible(spine) {
            super.updateVisible(spine);
            this.updateSlide(spine);
        }

        updateSlide(spine) {
            if (spine.slide != this._slide) {
                if (spine.slide.amount) {
                    const Easing = KONOHA.utils.Easing;
                    let amount = spine.slide.amount - (1080 - this.x);
                    this._easing = new Easing(amount, spine.slide.frames, Easing.TYPE.Cubic, Easing.MODE.Out);
                    this._slideBaseX = this.x;
                }
                this._slide = spine.slide;
            }

            if (this._easing) {
                this.x = this._slideBaseX - this._easing.pos();
                this._easing.next();
                if (this._easing.pos() == this._easing.amount) {
                    this._easing = null;
                }
            }
        }
    }

    /* rpg_scenes.js */

    //==============================================================================
    // Scene_Battle
    //==============================================================================

    (__createAllWindows => {
        Scene_Battle.prototype.createAllWindows = function () {
            __createAllWindows.apply(this, arguments);
            this._cutinSprites = new Sprite();
            this.addChild(this._cutinSprites);
            for (let i = 0; i < 4; i++) {
                let sprite = new Sprite();
                this._cutinSprites.addChild(sprite);
                // 背景カットインとキャラクターカットイン用に2つ登録
                sprite.addChild(new Sprite_SpineZCutin(new Game_SpineZCutin('back')));
                sprite.addChild(new Sprite_SpineZCutin(new Game_SpineZCutin('front')));
            }
        };
    })(Scene_Battle.prototype.createAllWindows);

    (__update => {
        Scene_Battle.prototype.update = function () {
            if (this._cutinSprites) {
                this._cutinSprites.children = this._cutinSprites.children.sort((a, b) => {
                    let id_a = a.children[0].spine().cutinId;
                    let id_b = b.children[0].spine().cutinId;
                    return id_a - id_b;
                });
            }
            __update.apply(this, arguments);
        };
    })(Scene_Battle.prototype.update);

})();
