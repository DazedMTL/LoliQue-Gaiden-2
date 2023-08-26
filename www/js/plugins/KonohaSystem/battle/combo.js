{
    'use strict';

    const COMBO_DAMAGE_RATE = [];
    COMBO_DAMAGE_RATE[0] = 1.0;
    COMBO_DAMAGE_RATE[5] = 1.25;
    COMBO_DAMAGE_RATE[10] = 1.30;
    COMBO_DAMAGE_RATE[15] = 1.35;
    COMBO_DAMAGE_RATE[20] = 1.40;
    COMBO_DAMAGE_RATE[25] = 1.45;
    COMBO_DAMAGE_RATE[30] = 1.50;
    COMBO_DAMAGE_RATE[35] = 1.525;
    COMBO_DAMAGE_RATE[40] = 1.55;
    COMBO_DAMAGE_RATE[45] = 1.755;
    COMBO_DAMAGE_RATE[50] = 1.60;
    COMBO_DAMAGE_RATE[55] = 1.625;
    COMBO_DAMAGE_RATE[60] = 1.65;
    COMBO_DAMAGE_RATE[65] = 1.675;
    COMBO_DAMAGE_RATE[70] = 1.70;
    COMBO_DAMAGE_RATE[75] = 1.725;
    COMBO_DAMAGE_RATE[80] = 1.75;
    COMBO_DAMAGE_RATE[85] = 1.775;
    COMBO_DAMAGE_RATE[90] = 1.80;
    COMBO_DAMAGE_RATE[95] = 1.90;
    COMBO_DAMAGE_RATE[100] = 2.00;

    //==============================================================================
    // ComboManager
    //==============================================================================

    class Sprite_ComboManager extends Sprite {
        constructor() {
            ImageManager.loadSystem('battle/Combo');
            ImageManager.loadSystem('battle/co_00');
            ImageManager.loadSystem('battle/co_01');
            ImageManager.loadSystem('battle/co_02');
            ImageManager.loadSystem('battle/co_03');
            ImageManager.loadSystem('battle/co_04');
            ImageManager.loadSystem('battle/co_05');
            ImageManager.loadSystem('battle/co_06');
            ImageManager.loadSystem('battle/co_07');
            ImageManager.loadSystem('battle/co_08');
            ImageManager.loadSystem('battle/co_09');
            super();
            this._lastCombo = 0;
            this._comboSprite = null;
        }

        update() {
            super.update();
            if ($gameKonoha.battleInfo.combo != this._lastCombo) {
                this._lastCombo = $gameKonoha.battleInfo.combo;
                if (this._lastCombo > 1) {
                    if (this._comboSprite) {
                        this.removeChild(this._comboSprite);
                    }
                    this._comboSprite = new Sprite_Combo(this._lastCombo);
                    this.addChild(this._comboSprite);
                } else if (this._comboSprite) {
                    this._comboSprite.collapse = true;
                    this._comboSprite = null;
                }
            }
        }
    }

    //==============================================================================
    // Sprite_Combo
    //==============================================================================

    class Sprite_Combo extends Sprite {
        constructor(number) {
            super();
            this.x = 670;
            this.y = 130;
            this.collapse = false;
            this._alphaRate = 1;
            this._labelSprite = new Sprite_ComboLabel();
            this._digitSprites = [];
            this.addChild(this._labelSprite);

            String(number).split('').forEach((n, i) => {
                let sprite = new Sprite_ComboDigit(n, i);
                this._digitSprites.push(sprite);
                this.addChild(sprite);
            });
        }

        update() {
            super.update();
            if (this.collapse) {
                if (this._alphaRate > 0) {
                    this._alphaRate -= (1 / 10);
                    this.alpha = Math.max(0.5 - 0.5 * Math.cos(this._alphaRate * Math.PI), 0);
                } else {
                    this.parent.removeChild(this);
                }
            }
        }
    }

    //==============================================================================
    // Sprite_ComboLabel
    //==============================================================================

    class Sprite_ComboLabel extends Sprite {
        constructor() {
            super();
            this.bitmap = ImageManager.loadSystem('battle/Combo');
            this.anchor.x = 0.5;
            this.anchor.y = 0.5;
        }
    }

    //==============================================================================
    // Sprite_ComboDigit
    //==============================================================================

    class Sprite_ComboDigit extends Sprite {
        constructor(number, position) {
            super();
            this.bitmap = ImageManager.loadSystem(`battle/co_0${number}`);
            this.x = 68 + 53 * position;
            this.y = -17;
            this.anchor.x = 0.5;
            this.anchor.y = 0.5;
            this.scale.x = 0;
            this.scale.y = 0;
            this._scaleRate = 0;
        }

        update() {
            super.update();
            if (this._scaleRate < 1) {
                this._scaleRate += (1 / 5);
                this.scale.x = this.scale.y = Math.min(0.5 - 0.5 * Math.cos(this._scaleRate * Math.PI), 1);
            }
        }
    }

    //==============================================================================
    // Game_Action
    //==============================================================================

    (__executeDamage => {
        Game_Action.prototype.executeDamage = function (target, value) {
            let subject = this.subject();
            if (subject.isActor() && target.isEnemy() && this.item().id == 1) {
                $gameKonoha.battleInfo.combo++;
                let rate = COMBO_DAMAGE_RATE.reduce((a, b, i) => $gameKonoha.battleInfo.combo >= i ? b : a, 1);
                value = parseInt(value * rate);
            }
            __executeDamage.call(this, target, value);
        };
    })(Game_Action.prototype.executeDamage);

    (__apply => {
        Game_Action.prototype.apply = function (target) {
            __apply.apply(this, arguments);
            let subject = this.subject();
            let result = target.result();
            if (subject.isActor() && target.isEnemy() && this.item().id == 1) {
                if (result.missed || result.evaded) {
                    $gameKonoha.battleInfo.combo = 0;
                }
            }
        };
    })(Game_Action.prototype.apply);

    //==============================================================================
    // Scene_Battle
    //==============================================================================

    (__create => {
        Scene_Battle.prototype.create = function () {
            $gameKonoha.battleInfo.combo = 0;
            __create.apply(this, arguments);
        };
    })(Scene_Battle.prototype.create);

    (__createWindowLayer => {
        Scene_Battle.prototype.createWindowLayer = function () {
            __createWindowLayer.apply(this, arguments);
            this._comboManager = new Sprite_ComboManager();
            this.addChild(this._comboManager);
        };
    })(Scene_Battle.prototype.createWindowLayer);

    (__update => {
        Scene_Battle.prototype.update = function () {
            if (this._actorWindow.active || this._enemyWindow.active || this._skillWindow.active || this._itemWindow.active || this._stateListWindow.active) {
                this._comboManager.visible = false;
            } else {
                this._comboManager.visible = true;
            }
            __update.apply(this, arguments);
        };
    })(Scene_Battle.prototype.update);

}