(() => {
    'use strict';

    const $p = {
        states: KONOHA.parameters.states
    };

    const DOWN_STATE = $p.states.down;

    /* rpg_managers.js */

    //==============================================================================
    // BattleManager
    //==============================================================================

    (__initMembers => {
        BattleManager.initMembers = function () {
            __initMembers.apply(this, arguments);
            this._tryEscapeTime = 0;
        };
    })(BattleManager.initMembers);

    BattleManager.isSuspendEscape = function () {
        let suspend = false;
        let coolTime = (40 + $gameKonoha.battleInfo.wait) * 2;
        if (Graphics.frameCount - this._tryEscapeTime < coolTime) {
            suspend = true;
        }
        if ($gameTroop.aliveMembers().some(enemy => enemy._bindData)) {
            suspend = true;
        }
        return suspend;
    };

    (__processEscape => {
        BattleManager.processEscape = function () {
            if (this.isSuspendEscape()) {
                return false;
            }
            let processEscape = __processEscape.apply(this, arguments);
            if (!processEscape) {
                this._tryEscapeTime = Graphics.frameCount;
            }
        };
    })(BattleManager.processEscape);

    BattleManager.selectNextCommand = function () {
        do {
            if (!this.actor() || !this.actor().selectNextCommand()) {
                break;
            }
        } while (!this.actor().canInput());
    };

    /* rpg_objects.js */

    //==============================================================================
    // Game_Party
    //==============================================================================

    (__onBattleStart => {
        Game_Party.prototype.onBattleStart = function () {
            __onBattleStart.apply(this, arguments);
            let index = Math.randomInt(this.battleMembers().length);
            this.battleMembers()[index].setCommandGauge(50);
        };
    })(Game_Party.prototype.onBattleStart);

    (__isAllDead => {
        Game_Party.prototype.isAllDead = function () {
            let isAllDead = __isAllDead.apply(this, arguments);
            isAllDead = isAllDead || this.aliveBattleMembers().every(actor => {
                return actor.isStateAffected(DOWN_STATE);
            });
            return isAllDead;
        };
    })(Game_Party.prototype.isAllDead);

    /* rpg_scenes.js */

    //==============================================================================
    // Scene_Battle
    //==============================================================================

    (__update => {
        Scene_Battle.prototype.update = function () {
            if (this.isActive() && !this.isBusy() && !this.isAnyInputWindowActive()) {
                // アクター状態更新
                $gameParty.battleMembers().forEach(actor => {
                    actor.inspectAction();
                    actor.updateOrgasm();
                    actor.autoIncreaseCommandGauge();
                });

                // エネミー状態更新
                $gameTroop.members().forEach(enemy => {
                    enemy.updateBind();
                });
            }

            // 敵が全滅したら強制的にウインドウを閉じる
            if ($gameTroop.isAllDead()) {
                [
                    this._actorCommandWindow,
                    this._skillWindow,
                    this._itemWindow,
                    this._helpWindow,
                    this._enemyWindow
                ].forEach(w => {
                    w.deactivate();
                    w.close();
                });
            }

            __update.apply(this, arguments);
        };
    })(Scene_Battle.prototype.update);

    // ウインドウが開いているときでもフェーズが'action'なら継続
    (__updateBattleProcess => {
        Scene_Battle.prototype.updateBattleProcess = function () {
            __updateBattleProcess.apply(this, arguments);
            if (this.isAnyInputWindowActive() && !BattleManager.isAborting() && !BattleManager.isBattleEnd()) {
                if (BattleManager._phase == 'action') {
                    BattleManager.update();
                }
            }
        };
    })(Scene_Battle.prototype.updateBattleProcess);

    // ウインドウ自動クローズ処理は無効化
    Scene_Battle.prototype.endCommandSelection = function () {
    };

})();
