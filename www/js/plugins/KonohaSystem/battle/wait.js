(() => {
    'use strict';

    //==============================================================================
    // Sprite_BattleWait
    //==============================================================================

    class Sprite_BattleWait extends Sprite {
        constructor() {
            super(ImageManager.loadSystem('battle/SpeedGauge01'));
            // this.x = 683;
            // this.y = 7;
            this.x = 618;
            this.y = 27;
            this._adjust = 0;
            this._changing = false;
            this.createSlierSprite();
        }

        createSlierSprite() {
            let wait = $gameKonoha.battleInfo.wait;
            this._sliderSprite = new Sprite(ImageManager.loadSystem('battle/SpeedGauge02'));
            this._sliderSprite.x = wait == Infinity ? 130 : wait + 20;
            this._sliderSprite.y = 1;
            this._sliderSprite.anchor.x = 0.5;
            this.addChild(this._sliderSprite);
        }

        update() {
            if (TouchInput.isTriggered()) {
                let x = this.x + (this._sliderSprite.x - this._sliderSprite.width / 2);
                let y = this.y + this._sliderSprite.y;
                let width = this._sliderSprite.width;
                let height = this._sliderSprite.height;

                let tx = TouchInput.x;
                let ty = TouchInput.y;

                if (tx >= x && tx <= x + width && ty >= y && ty <= y + height) {
                    this._adjust = x - tx;
                    this._changing = true;
                }
            }

            if (!TouchInput.isPressed()) {
                this._changing = false;
            }

            if (this._changing) {
                let tx = TouchInput._moveX;
                let x = tx < this.x + 30 ? 30
                    : tx > this.x + 130 ? 130
                        : tx - this.x;

                this._sliderSprite.x = x;

                let wait = 10 + 110 * ((x - 30) / 100);
                $gameKonoha.battleInfo.wait = wait < 120 ? wait : Infinity;
            }

            super.update();
        }
    }

    /* tpg_managers.js */

    //==============================================================================
    // BsttleManaget
    //==============================================================================

    (__initMembers => {
        BattleManager.initMembers = function () {
            __initMembers.apply(this, arguments);
            this._waitCount = 0;
        };
    })(BattleManager.initMembers);

    // ウェイト処理
    (__update => {
        BattleManager.update = function () {
            if (!this.isBusy() && $gameTroop.aliveMembers().length > 0 && this._phase != 'battleEnd' && this._waitCount > 0) {
                this._waitCount--;

                // 再設定されたウェイト値が残りカウントより小さかったら設定値で上書き
                if (this._waitCount > $gameKonoha.battleInfo.wait) {
                    this._waitCount = $gameKonoha.battleInfo.wait;
                }

                return;
            }

            __update.apply(this, arguments);
        };
    })(BattleManager.update);

    // 行動後ウェイト
    (__endAction => {
        BattleManager.endAction = function () {
            __endAction.apply(this, arguments);

            this.wait($gameKonoha.battleInfo.wait);
        };
    })(BattleManager.endAction);

    // ウェイト設定
    BattleManager.wait = function (times) {
        this._waitCount = times;
    };

    /* rpg_scenes.js */

    //==============================================================================
    // Scene_Battle
    //==============================================================================

    (__createWindowLayer => {
        Scene_Battle.prototype.createWindowLayer = function () {
            this._waitSprite = new Sprite_BattleWait();
            this.addChild(this._waitSprite);
            __createWindowLayer.apply(this, arguments);
        };
    })(Scene_Battle.prototype.createWindowLayer);

})();
