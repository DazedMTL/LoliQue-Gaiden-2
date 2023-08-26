(() => {
    'use strict';

    const $p = {
        states: KONOHA.parameters.states,
        battle: KONOHA.parameters.battle
    };

    const ORGASM_STATE = $p.states.badStateBattle2;
    const DOWN_STATE = $p.states.down;

    const INSERTING_STATE = 47; // 挿入中ステート

    const WAIT = $p.battle.wait;

    /* rpg_objects.js */

    //==============================================================================
    // Game_Action
    //==============================================================================

    (__apply => {
        Game_Action.prototype.apply = function (target) {
            __apply.apply(this, arguments);

            let subject = this.subject();
            let result = target.result();
            if (result.isHit()) {
                if (subject.isActor() && target.isEnemy()) {
                    // 拘束値削減処理
                    let bindData = target._bindData;
                    if (bindData) {
                        bindData.value -= bindData.reduce;
                        if (bindData.value <= 0) {
                            $gameActors.actor(bindData.actorId).removeState(bindData.stateId);
                            target._bindData = null;
                            target.removeState(INSERTING_STATE);
                        }
                    }
                } else if (subject.isEnemy() && target.isActor()) {
                    // 被ダメージモーション開始
                    target.damageFrame = 24;
                }

                // 自動攻撃時
                if (subject.isActor() && this.isAttack()) {
                    // コマンドゲージ増加
                    subject.increaseCommandGauge(result);
                }
            }
        };
    })(Game_Action.prototype.apply);

    //==============================================================================
    // Game_Actor
    //==============================================================================

    (__initialize => {
        Game_Actor.prototype.initialize = function (actorId) {
            __initialize.apply(this, arguments);
            this.initBattleData();
        };
    })(Game_Actor.prototype.initialize);

    Object.defineProperty(Game_Actor.prototype, 'commandGauge', {
        get: function () {
            return this._commandGauge;
        }
    });

    Object.defineProperty(Game_Actor.prototype, 'attackFrame', {
        get: function () {
            return this._attackFrame;
        },
        set: function (value) {
            this._attackFrame = value;
        }
    });

    Object.defineProperty(Game_Actor.prototype, 'damageFrame', {
        get: function () {
            return this._damageFrame;
        },
        set: function (value) {
            this._damageFrame = value;
        }
    });

    (__eraseState => {
        Game_Actor.prototype.eraseState = function (stateId) {
            __eraseState.apply(this, arguments);

            // 絶頂ステート⇒ダウンステート
            if ($gameParty.inBattle() && stateId == ORGASM_STATE) {
                this.addState(DOWN_STATE);
            }
        };
    })(Game_Actor.prototype.eraseState);

    (__gainHp => {
        Game_Actor.prototype.gainHp = function (value) {
            if (value < 0) {
                if ($gameParty.inBattle() && !this.isStateAffected(DOWN_STATE)) {
                    // ダウン状態じゃなければHP10%未満にならない
                    value = Math.max(value, -Math.max(this.hp - Math.floor(this.mhp * 0.1), 0));
                }
            }

            __gainHp.call(this, value);

            if (value < 0) {
                if ($gameParty.inBattle() && !this.isStateAffected(DOWN_STATE)) {
                    // HP10%以下でダウンステート
                    if (this.hp > 0 && this.hp <= Math.floor(this.mhp * 0.1)) {
                        this.addState(DOWN_STATE);
                    }
                }
            }
        };
    })(Game_Actor.prototype.gainHp);

    // ZP(TP)増加分をEXゲージに反映
    (__gainTp => {
        Game_Actor.prototype.gainTp = function (value) {
            if ($gameParty.inBattle() && value > 0) {
                BattleManager.increaseExGauge(value);
                this.setCommandGauge(this.commandGauge + 20);
            }
            __gainTp.apply(this, arguments);
        };
    })(Game_Actor.prototype.gainTp);

    // ZP(TP)増加分をEXゲージに反映
    (__gainSilentTp => {
        Game_Actor.prototype.gainSilentTp = function (value) {
            if ($gameParty.inBattle() && value > 0) {
                BattleManager.increaseExGauge(value);
                this.setCommandGauge(this.commandGauge + 20);
            }
            __gainSilentTp.apply(this, arguments);
        };
    })(Game_Actor.prototype.gainSilentTp);

    (__maxSlipDamage => {
        Game_Actor.prototype.maxSlipDamage = function () {
            // スリップダメージではHP10%未満にならない
            return Math.max(this.hp - Math.floor(this.mhp * 0.1), 0);
        };
    })(Game_Actor.prototype.maxSlipDamage);

    (__makeActions => {
        Game_Actor.prototype.makeActions = function () {
            // 自動戦闘でなければ通常の処理を行う
            if (!this.isAutoBattle()) {
                __makeActions.apply(this, arguments);
                return;
            }

            this.clearActions();

            if (this._reservedAction) {
                // コマンドによるアクションが予約されていたら設定
                this.setAction(0, this._reservedAction);
                this._reservedAction = null;
            } else if (!this.getBindData()) {
                // 戦闘モードによりアクション切り替え
                if (BattleManager.mode == 'attack' && this.canAttack()) {
                    // 攻撃
                    let action = new Game_Action(this);
                    action.setAttack();
                    this.setAction(0, action);
                } else if (BattleManager.mode == 'defence' && this.canGuard()) {
                    // 防御
                    let action = new Game_Action(this);
                    action.setGuard();
                    this.setAction(0, action);
                }
            }

            this.setActionState('waiting');
        };
    })(Game_Actor.prototype.makeActions);

    (__inputtingAction => {
        Game_Actor.prototype.inputtingAction = function () {
            if (!this.isAutoBattle()) {
                return __inputtingAction.apply(this, arguments);
            }

            // コマンド入力用アクションを返す（なければ新規作成）
            return this._inputtingAction = this._inputtingAction || new Game_Action(this);
        };
    })(Game_Actor.prototype.inputtingAction);

    (__selectNextCommand => {
        Game_Actor.prototype.selectNextCommand = function () {
            if (this._inputtingAction) {
                if (this.numActions() > 0) {
                    // 決定したアクションで上書き
                    this.setAction(0, this._inputtingAction);
                } else {
                    // 次回アクションを予約
                    this._reservedAction = this._inputtingAction;
                }

                // 入力用アクションをクリア
                this._inputtingAction = null;
            }

            return __selectNextCommand.apply(this, arguments);
        };
    })(Game_Actor.prototype.selectNextCommand);

    // 攻撃モーション
    (__performActionStart => {
        Game_Actor.prototype.performActionStart = function (action) {
            __performActionStart.apply(this, arguments);

            if (action.isAttack()) {
                this._attackFrame = 48;
            }
        };
    })(Game_Actor.prototype.performActionStart);

    // 武器宝珠アニメ適用
    (__attackAnimationId1 => {
        Game_Actor.prototype.attackAnimationId1 = function () {
            let attackAnimationId1 = __attackAnimationId1.apply(this, arguments);
            if (attackAnimationId1 > 0) {
                this.equips().forEach(equip => {
                    if (equip && equip.meta['AttackAnimation']) {
                        attackAnimationId1 = Number(equip.meta['AttackAnimation']);
                    }
                });
            }
            return attackAnimationId1;
        };
    })(Game_Actor.prototype.attackAnimationId1);

    // 武器宝珠アニメ適用
    (__attackAnimationId2 => {
        Game_Actor.prototype.attackAnimationId2 = function () {
            let attackAnimationId2 = __attackAnimationId2.apply(this, arguments);
            if (attackAnimationId2 > 0) {
                this.equips().forEach(equip => {
                    if (equip && equip.meta['AttackAnimation']) {
                        attackAnimationId2 = Number(equip.meta['AttackAnimation']);
                    }
                });
            }
            return attackAnimationId2;
        };
    })(Game_Actor.prototype.attackAnimationId2);

    // EXゲージ消費
    (__paySkillCost => {
        Game_Actor.prototype.paySkillCost = function (skill) {
            __paySkillCost.apply(this, arguments);
            if (skill.stypeId == 5) {
                BattleManager.resetExGauge();
            }
        };
    })(Game_Actor.prototype.paySkillCost);

    // EXスキル使用判定（Game_ActorのcanUseを完全上書きしているプラグインがいるので仕方なくGame_Battlerで対応）
    (__canUse => {
        Game_Battler.prototype.canUse = function (item) {
            if (item && item.stypeId == 5) {
                let alive = $gameParty.aliveBattleMembers().length;
                if (item.id - 4 > alive) {
                    return false;
                }
            }
            return __canUse.apply(this, arguments);
        };
    })(Game_Battler.prototype.canUse);

    // 絶頂メンバーリストに追加
    (__addState => {
        Game_Actor.prototype.addState = function (stateId) {
            __addState.apply(this, arguments);
            if (stateId == ORGASM_STATE) {
                $gameKonoha.battleInfo.orgasmMembers.push(this.actorId());
            }
        };
    })(Game_Actor.prototype.addState);

    // 戦闘関連データ初期化
    Game_Actor.prototype.initBattleData = function () {
        this._commandGauge = 0;
        this._orgasmDelay = 120;
        this._attackFrame = 0;
        this._damageFrame = 0;
        this._inputtingAction = null;
        this._reservedAction = null;
    };

    // コマンドゲージ設定
    Game_Actor.prototype.setCommandGauge = function (value) {
        this._commandGauge = Math.max(Math.min(value, 100), 0);
    };

    // コマンドゲージ増加
    Game_Actor.prototype.increaseCommandGauge = function (result) {
        let base = result.critical ? 40 : 20;
        let param = Math.floor(Math.random() * (result.critical ? 11 : 6));
        let agi = this.param(6);

        let value = base + param + ((agi / (300 + agi)) / 3);

        this._commandGauge = Math.min(this._commandGauge + value, 100);
    }

    // コマンドゲージ増加（自動）
    Game_Actor.prototype.autoIncreaseCommandGauge = function () {
        // コマンド実行待機中の場合は増やさない
        if (this._reservedAction ||
            (this.numActions() > 0 && !this.action(0).isAttack() && !this.action(0).isGuard())) {
            return;
        }

        // ウェイト設定に応じて増加量を設定
        // let value = 0.5 * ((80 + WAIT) / (80 + $gameKonoha.battleInfo.wait));
        let value = 9.0 / (40 + $gameKonoha.battleInfo.wait);

        this._commandGauge = Math.min(this._commandGauge + value, 100);
    }

    // コマンドゲージリセット
    Game_Actor.prototype.resetCommandGauge = function () {
        this._commandGauge = 0;
    }

    // 絶頂状態更新
    Game_Actor.prototype.updateOrgasm = function () {
        if (this.tp == 100) {
            this._orgasmDelay--;
            if (this._orgasmDelay == 0) {
                this.addState(ORGASM_STATE);
                this.gainTp(-100);
                this._orgasmDelay = 120;
            }
        }
    }

    // 拘束情報取得
    Game_Actor.prototype.getBindData = function () {
        if ($gameParty.inBattle()) {
            for (let enemy of $gameTroop._enemies) {
                let bindData = enemy._bindData;
                if (bindData && bindData.actorId == this.actorId()) {
                    return bindData;
                }
            }
        }
        return null;
    };

    // 行動チェック＆書き換え
    Game_Actor.prototype.inspectAction = function () {
        // 予約行動チェック
        if (this._reservedAction) {
            let action = this._reservedAction;
            let stypeId = action._item.isSkill() ? action._item.object().stypeId : -1;

            // 拘束状態と行動が一致していなければキャンセル
            if (this.getBindData() ? stypeId != 4 : stypeId == 4) {
                this._reservedAction = null;
            }
        }

        // 待機行動チェック
        if (this.numActions() > 0) {
            let action = this.action(0);
            let stypeId = action._item.isSkill() ? action._item.object().stypeId : -1;

            // 拘束状態と行動が一致していない場合
            if (this.getBindData() ? stypeId != 4 : stypeId == 4) {
                // 行動クリア
                this.clearActions();

                // 拘束中でなければ攻撃または防御に置き換え
                if (!this.getBindData()) {
                    // 戦闘モードと行動可否で切り替え
                    if (BattleManager.mode == 'attack' && this.canAttack()) {
                        // 攻撃
                        action = new Game_Action(this);
                        action.setAttack();
                        this.setAction(0, action);
                    } else if (BattleManager.mode == 'defence' && this.canGuard()) {
                        // 防御
                        action = new Game_Action(this);
                        action.setGuard();
                        this.setAction(0, action);
                    }
                }
            }
        }
    };

    // 拘束値を減らす（「振りほどく」コマンド用）
    Game_Actor.prototype.resist = function (value) {
        let bindData = this.getBindData();
        if (bindData) {
            bindData.value -= value;
            if (bindData.value <= 0) {
                this.removeState(bindData.stateId);
                for (let enemy of $gameTroop._enemies) {
                    if (enemy._bindData == bindData) {
                        enemy.removeState(INSERTING_STATE);
                        enemy._bindData = null;
                        break;
                    }
                }
            }
        }
    };

})();
