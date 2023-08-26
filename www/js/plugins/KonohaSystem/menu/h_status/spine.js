!function () {
    'use strict';

    const $p = {
        states: KONOHA.parameters.states
    };

    function setupSpine() {
        let actor = null;
        let spine = new Game_Spine();
        let sprite = new Sprite();

        sprite.addChild(new Sprite_Spine(spine));

        sprite.x = 345;
        sprite.y = 1045;
        sprite.scale.x = 0.5;
        sprite.scale.y = 0.5;

        // 通常コノハ or 悪堕ちコノハ
        {
            if ($gameParty.members().includes($gameActors.actor(1))) {
                actor = $gameActors.actor(1);
                spine.setSkeleton('Konoha_erost');
            } else {
                actor = $gameActors.actor(2);
                spine.setSkeleton('DW_erost');
            }
        }

        // アニメーション設定
        {
            let anime_value = $gameVariables.value(261);
            if (anime_value < 100) {
                spine.setAnimation(0, 'defoLV1')
            } else if (anime_value < 300) {
                spine.setAnimation(0, 'defoLV2')
            } else if (anime_value < 600) {
                spine.setAnimation(0, 'defoLV3')
            } else if (anime_value < 900) {
                spine.setAnimation(0, 'defoLV4')
            } else {
                spine.setAnimation(0, 'defoLV5')
            }
        }

        // スキン設定
        {
            let skins = [];
            // D_inmon_a
            if (actor == $gameActors.actor(2)) {
                if (!actor.isStateAffected($p.states.badStateMap1)) {
                    skins.push('D_inmon_a');
                }
            }
            // baibu
            if (actor.isStateAffected($p.states.badStateMap12)) {
                skins.push('baibu');
            }
            // bonyu
            if (actor.isStateAffected($p.states.badStateMap8)) {
                skins.push('bonyu');
            }
            // bote
            if (actor.isStateAffected($p.states.badStateMap1)) {
                skins.push('bote');
            }
            // dorei
            if (actor.isStateAffected($p.states.badStateMap10)) {
                skins.push('dorei');
            }
            // kisei
            if (actor.isStateAffected($p.states.badStateMap9)) {
                skins.push('kisei');
            }
            // kuripiasu
            if (actor.isStateAffected($p.states.badStateMap14)) {
                skins.push('kuripiasu');
            }
            // saimin
            if (actor.isStateAffected($p.states.badStateMap17)) {
                skins.push('saimin');
            }
            // seiekimore
            if (actor.isStateAffected($p.states.badStateMap16)) {
                skins.push('seiekimore');
            }
            // tikubipiasu
            if (actor.isStateAffected($p.states.badStateMap13)) {
                skins.push('tikubipiasu');
            }
            // oppai
            skins.push(`oppai${$gameVariables.value(256) + 1}`);
            // tuikainmon
            if (actor.isStateAffected($p.states.badStateMap5)) {
                if (!actor.isStateAffected($p.states.badStateMap1)) {
                    skins.push('tuikainmon_a');
                } else {
                    skins.push('tuikainmon_b');
                }
            }
            spine.setSkin(...skins);
        }

        return sprite;
    }

    function hook() {
        //==============================================================================
        // Window_EroStatus
        //==============================================================================

        (__drawPicture => {
            Window_EroStatus.prototype.drawPicture = function (dir, filename, sx, sy, x, y, w, h, zoom, hue) {
                let parameters = PluginManager._parameters['cbr_erostatus_1'];
                let picName_1 = parameters.picName_1;
                let picName_10 = parameters.picName_10;
                if (filename == picName_1) {
                    let index = this.children.indexOf(this._windowContentsSprite);
                    let sprite = new Sprite(ImageManager.loadPicture(filename));
                    this.addChildAt(sprite, index);
                    filename = '';
                } else if (filename == picName_10) {
                    let index = this.children.indexOf(this._windowContentsSprite);
                    let sprite = setupSpine();
                    this.addChildAt(sprite, index);
                    filename = '';
                }
                __drawPicture.call(this, dir, filename, sx, sy, x, y, w, h, zoom, hue);
            };
        })(Window_EroStatus.prototype.drawPicture);
    }

    (__initialize => {
        Scene_Boot.prototype.initialize = function () {
            __initialize.apply(this, arguments);
            hook();
        };
    })(Scene_Boot.prototype.initialize);
}();
