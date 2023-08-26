(() => {
    'use strict';

    const $p = {
        pictures: KONOHA.parameters.pictures,
    };

    /* rpg_managers.js */

    //==============================================================================
    // Spriteset_Battle
    //==============================================================================

    (__createUpperLayer => {
        Spriteset_Battle.prototype.createUpperLayer = function () {
            // フレーム描画
            let sprite = new Sprite(ImageManager.loadSystem('battle/btui_back'));
            this.addChild(sprite);

            __createUpperLayer.apply(this, arguments);
        };
    })(Spriteset_Battle.prototype.createUpperLayer);

    /* rpg_objects.js */

    //==============================================================================
    // Game_Troop
    //==============================================================================

    (__onBattleStart => {
        Game_Troop.prototype.onBattleStart = function () {
            __onBattleStart.apply(this, arguments);

            // メンバー先頭アクターを選択中アクターに設定
            $gameKonoha.battleInfo.selectedActorId = $gameParty.leader().actorId();

            // 立ち絵用ピクチャを表示状態で準備
            for (let key in $p.pictures) {
                if (key != 'button') {
                    let picture = $p.pictures[key];
                    if (!$gameScreen.picture(picture.id)) {
                        let y = key == 'spine' ? Graphics.height : picture.y;
                        let scale = key == 'spine' ? 100 : picture.scale;
                        $gameScreen.showPicture(picture.id, picture.image, 0, picture.x, y, scale, scale, 255, 0);
                    }
                }
            }

            // HP10%以下のアクターはHP20%に回復
            $gameParty.battleMembers().forEach(member => {
                if (member.isAlive()) {
                    let border = Math.floor(member.mhp * 0.1);
                    if (member.hp <= border) {
                        member.gainHp(border * 2 - member.hp);
                    }
                }
            });
        };
    })(Game_Troop.prototype.onBattleStart);

    /* rpg_scenes.js */

    //==============================================================================
    // Scene_Battle
    //==============================================================================

    (__initialize => {
        Scene_Battle.prototype.initialize = function () {
            __initialize.apply(this, arguments);
            ImageManager.loadSystem('battle/btui_ATOFF');
            ImageManager.loadSystem('battle/btui_ATON');
            ImageManager.loadSystem('battle/btui_ATTU');
            ImageManager.loadSystem('battle/btui_back');
            ImageManager.loadSystem('battle/btui_bind01');
            ImageManager.loadSystem('battle/btui_bind02');
            ImageManager.loadSystem('battle/btui_BATTLE');
            ImageManager.loadSystem('battle/btui_cursor');
            ImageManager.loadSystem('battle/btui_DFOFF');
            ImageManager.loadSystem('battle/btui_DFON');
            ImageManager.loadSystem('battle/btui_DFTU');
            ImageManager.loadSystem('battle/btui_enm01');
            ImageManager.loadSystem('battle/btui_enm02');
            ImageManager.loadSystem('battle/btui_ESNG');
            ImageManager.loadSystem('battle/btui_ESOFF');
            ImageManager.loadSystem('battle/btui_ESON');
            ImageManager.loadSystem('battle/btui_ESTU');
            ImageManager.loadSystem('battle/btui_EX01');
            ImageManager.loadSystem('battle/btui_EX02');
            ImageManager.loadSystem('battle/btui_EX03');
            ImageManager.loadSystem('battle/btui_START');
            ImageManager.loadSystem('battle/btui_win');
            ImageManager.loadSystem('battle/bt_ac0_w_heart');
            ImageManager.loadSystem('battle/bt_ac1_w');
            ImageManager.loadSystem('battle/bt_ac2_w_ring');
            ImageManager.loadSystem('battle/bt_ac3_w_gauge');
            ImageManager.loadSystem('battle/bt_ac4_w_back');
            ImageManager.loadSystem('battle/HPMeter');
            ImageManager.loadSystem('battle/MPMeter');
            ImageManager.loadSystem('battle/Bi_ac_24');
            ImageManager.loadSystem('battle/Bi_ac_01');
            ImageManager.loadSystem('battle/Bi_ac_02');
            ImageManager.loadSystem('battle/Bi_ac_10');
            ImageManager.loadSystem('battle/Bi_ac_11');
            ImageManager.loadSystem('battle/Bi_ac_12');
            ImageManager.loadSystem('battle/Bi_ac_13');
            ImageManager.loadSystem('battle/Bi_ac_14');
            ImageManager.loadSystem('battle/Bi_ac_15');
            ImageManager.loadSystem('battle/Bi_ac_16');
            ImageManager.loadSystem('battle/Bi_ac_17');
            ImageManager.loadSystem('battle/Bi_ac_18');
            ImageManager.loadSystem('battle/Bi_ac_19');
            ImageManager.loadSystem('battle/Bi_ac_20');
            ImageManager.loadSystem('battle/Bi_ac_21');
            ImageManager.loadSystem('battle/Bi_ac_22');
            ImageManager.loadSystem('battle/Bi_ac_23');
            ImageManager.loadSystem('battle/SpeedGauge01');
            ImageManager.loadSystem('battle/SpeedGauge02');
        };
    })(Scene_Battle.prototype.initialize);

    /* rpg_windows.js */

    //==============================================================================
    // Window_BattleLog
    //==============================================================================

    (__initialize => {
        Window_BattleLog.prototype.initialize = function () {
            __initialize.apply(this, arguments);
            this.x += 106;
            this.y += 22;
        };
    })(Window_BattleLog.prototype.initialize);

})();
