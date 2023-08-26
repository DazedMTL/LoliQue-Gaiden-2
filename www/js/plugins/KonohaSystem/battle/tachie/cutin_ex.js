(() => {
    'use strict';

    const $spines = {};

    // コノハ
    $spines[1] = { skeleton: { front: 'cutin_konoha', back: 'back_cutin_konoha' }, animation: 'cut_a1' };
    $spines[2] = { skeleton: { front: 'cutin_dw', back: 'back_cutin_konoha' }, animation: 'cut_a1' };
    $spines[10] = { skeleton: { front: 'cutin_inp', back: 'back_cutin_konoha' }, animation: 'cut_a1' };
    $spines[11] = { skeleton: { front: 'cutin_gob', back: 'back_cutin_konoha' }, animation: 'cut_a1' };
    $spines[12] = { skeleton: { front: 'cutin_dor', back: 'back_cutin_konoha' }, animation: 'cut_a1' };
    $spines[13] = { skeleton: { front: 'cutin_dhu', back: 'back_cutin_konoha' }, animation: 'cut_a1' };
    $spines[14] = { skeleton: { front: 'cutin_ket', back: 'back_cutin_konoha' }, animation: 'cut_a1' };
    $spines[15] = { skeleton: { front: 'cutin_hap', back: 'back_cutin_konoha' }, animation: 'cut_a1' };
    $spines[16] = { skeleton: { front: 'cutin_mam', back: 'back_cutin_konoha' }, animation: 'cut_a1' };
    $spines[17] = { skeleton: { front: 'cutin_ghu', back: 'back_cutin_konoha' }, animation: 'cut_a1' };
    $spines[18] = { skeleton: { front: 'cutin_mdu', back: 'back_cutin_konoha' }, animation: 'cut_a1' };
    $spines[19] = { skeleton: { front: 'cutin_sah', back: 'back_cutin_konoha' }, animation: 'cut_a1' };
    $spines[20] = { skeleton: { front: 'cutin_pix', back: 'back_cutin_konoha' }, animation: 'cut_a1' };
    $spines[21] = { skeleton: { front: 'cutin_sla', back: 'back_cutin_konoha' }, animation: 'cut_a1' };
    $spines[22] = { skeleton: { front: 'cutin_kum', back: 'back_cutin_konoha' }, animation: 'cut_a1' };
    $spines[23] = { skeleton: { front: 'cutin_ten', back: 'back_cutin_konoha' }, animation: 'cut_a1' };
    $spines[24] = { skeleton: { front: 'cutin_oro', back: 'back_cutin_konoha' }, animation: 'cut_a1' };

    //==============================================================================
    // Game_SpineCutin
    //==============================================================================

    class Game_SpineExCutin extends Game_Spine {
        constructor(cutinId, layerId) {
            super();
            this._cutinId = cutinId;
            this._layerId = layerId;
            this._orgasmList = [];
            this._prevExMembers = null;
            this._delay = cutinId * 5;
        }

        update() {
            // EXスキル判定
            let exMembers = $gameKonoha.battleInfo.exMembers;
            if (exMembers != this._prevExMembers) {
                if (this._delay == 0) {
                    // カットイン人数からカットイン対象かどうか判断
                    if (this._cutinId < exMembers.length) {
                        // カットイン表示
                        let actorId = exMembers[this._cutinId];
                        let x = [204, 524, 844, 1164];
                        this.setSkeleton($spines[actorId].skeleton[this._layerId]);
                        this.setAnimation(0, $spines[actorId].animation, 'none');
                        this.setOffset(exMembers.length == 1 ? 1080 : x[4 - (exMembers.length - this._cutinId)], 394);
                    }

                    this._prevExMembers = exMembers;
                    this._delay = this._cutinId * 5;
                } else {
                    this._delay--;
                }
            }
        }
    }

    //==============================================================================
    // Sprite_SpineCutin
    //==============================================================================

    class Sprite_SpineExCutin extends Sprite_Spine {
        constructor(...args) {
            super(...args);
            this._spine = args[0] instanceof Game_SpineExCutin ? args[0] : null;
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
                        }
                    }
                }
                this.spine().update();
            }
            super.update.apply(this, arguments);
        }

        onEvent(entry, event) {
            if (this.spine()) {
                if (this.spine()._cutinId == 0) {
                    return super.onEvent(entry, event);
                }
            }
            if (this._isRestore) return;
            let switchId = event.data.switchId;
            if (switchId == null) {
                switchId = [];
                let stringValue = event.data.stringValue;
                for (let value of stringValue.replace(/ +/, '').split(/,/)) {
                    if (value.match(/^switch:(\d+)$/i)) {
                        switchId.push(Number(RegExp.$1));
                    }
                }
                event.data.switchId = switchId;
            }
            for (let id of switchId) {
                $gameSwitches.setValue(id, true);
            }
        }
    }

    /* rpg_managers.js */

    //==============================================================================
    // BattleManager
    //==============================================================================

    (__setup => {
        BattleManager.setup = function (troopId, canEscape, canLose) {
            __setup.apply(this, arguments);
            $gameKonoha.battleInfo.exMembers = null;
        };
    })(BattleManager.setup);

    (__startAction => {
        BattleManager.startAction = function () {
            __startAction.apply(this, arguments);
            if (this._action.isSkill() && this._action.item().stypeId == 5) {
                // スキル使用者を先頭メンバーに設定
                let exMembers = [this._subject.actorId()];

                // レベル2以上なら2人目以降を設定
                let id = this._action.item().id;
                if (id > 5) {
                    // メンバー候補
                    let members = $gameParty.aliveBattleMembers().map(member => member.actorId()).filter(id => id != exMembers[0]);
                    for (let i = 0; i < id - 5; i++) {
                        let id = members[Math.floor(Math.random() * members.length)];
                        exMembers.push(id);
                        members = members.filter(member => member != id);
                    }
                }

                $gameKonoha.battleInfo.exMembers = exMembers;
            }
        };
    })(BattleManager.startAction);

    /* rpg_scenes.js */

    //==============================================================================
    // Scene_Battle
    //==============================================================================

    (__createAllWindows => {
        Scene_Battle.prototype.createAllWindows = function () {
            __createAllWindows.apply(this, arguments);
            for (let i = 0; i < 4; i++) {
                let sprite = new Sprite();
                this.addChild(sprite);
                // 背景カットインとキャラクターカットイン用に2つ登録
                sprite.addChild(new Sprite_SpineExCutin(new Game_SpineExCutin(i, 'back')));
                sprite.addChild(new Sprite_SpineExCutin(new Game_SpineExCutin(i, 'front')));
            }
        };
    })(Scene_Battle.prototype.createAllWindows);

})();
