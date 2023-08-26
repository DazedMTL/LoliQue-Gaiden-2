(() => {
    'use strict';

    const $p = {
        states: KONOHA.parameters.states,
        battle: KONOHA.parameters.battle
    };

    const WAIT = $p.battle.wait;

    const CUM_INSIDE_KONOHA = 872;    // コノハ中出し
    const CUM_OUTSIDE_KONOHA = 873;    // コノハ外出し
    const CUM_INSIDE_LOLIMON = 822;    // ロリモン中出し
    const CUM_OUTSIDE_LOLIMON = 823;    // ロリモン外出し

    const ORGASM_STATE = $p.states.badStateBattle2;

    const CUM_STATE = 46; // 射精ステート
    const INSERTING_STATE = 47; // 挿入中ステート

    // 中出しありステート
    const CUM_INSIDE_STATE = [
        $p.states.badStateBattle5,
        $p.states.badStateBattle6,
        $p.states.badStateBattle11,
        $p.states.badStateBattle12,
        $p.states.badStateBattle13,
        $p.states.badStateBattle14,
        $p.states.badStateBattle15,
        $p.states.badStateBattle16,
        $p.states.badStateBattle17
    ];

    /* rpg_objects.js */

    //==============================================================================
    // Game_Action
    //==============================================================================

    (__makeTargets => {
        Game_Action.prototype.makeTargets = function () {
            if (this.subject().isEnemy()) {
                if (![CUM_INSIDE_KONOHA, CUM_OUTSIDE_KONOHA, CUM_INSIDE_LOLIMON, CUM_OUTSIDE_LOLIMON].includes(this.item().id)) {
                    // アクター全員が拘束状態または戦闘不能だったら空振り
                    if ($gameParty.battleMembers().every(actor => !!actor.getBindData() || actor.isDead())) {
                        return [];
                    }
                }
            }
            return __makeTargets.apply(this, arguments);
        };
    })(Game_Action.prototype.makeTargets);

    (__apply => {
        Game_Action.prototype.apply = function (target) {
            __apply.apply(this, arguments);

            let subject = this.subject();
            let result = target.result();
            if (result.isHit()) {
                if (subject.isEnemy() && target.isActor()) {
                    // 拘束判定＆処理
                    if (!target.getBindData()) {
                        for (let stateId of result.addedStates) {
                            let value = $dataStates[stateId].meta['拘束値'];
                            if (value) {
                                let bind = value.trim().split(/ *, */);
                                subject._bindData = {
                                    value: Number(bind[0]) || 0,
                                    max: Number(bind[0]) || 0,
                                    auto: Number(bind[1]) || 0,
                                    reduce: Number(bind[2]) || 10,
                                    stateId: stateId,
                                    actorId: target.actorId(),
                                    cumInside: 0
                                };
                                target.setCommandGauge(100);
                                target._actions = [];
                                break;
                            }
                        }
                    }
                    // 変数更新スキル判定＆処理
                    let skillSetting = subject._variableUpdateSkill[this.item().id];
                    if (skillSetting) {
                        for (let id in skillSetting) {
                            $gameVariables.setValue(Number(id), skillSetting[id]);
                        }
                    }
                    // 射精ステートセット＆TPリセット
                    if ([CUM_INSIDE_KONOHA,
                        CUM_OUTSIDE_KONOHA,
                        CUM_INSIDE_LOLIMON,
                        CUM_OUTSIDE_LOLIMON].includes(this.item().id)) {
                        subject.addState(CUM_STATE);
                        subject.gainTp(-100);
                    }
                    // 中出し回数セット
                    if ([CUM_INSIDE_KONOHA, CUM_INSIDE_LOLIMON].includes(this.item().id)) {
                        if (subject._bindData) {
                            subject._bindData.cumInside++;
                        }
                    }
                }
            }
        };
    })(Game_Action.prototype.apply);

    //==============================================================================
    // Game_Enemy
    //==============================================================================

    (__initialize => {
        Game_Enemy.prototype.initialize = function (enemyId, x, y) {
            __initialize.apply(this, arguments);
            this._bindData = null;
            // 変数更新スキル設定
            this._variableUpdateSkill = {};
            for (let tag in this.enemy().meta) {
                let match = tag.match(/^variable_update_skill\[(\d+)\]/);
                if (match) {
                    let skillId = Number(match[1]);
                    let setting = {};
                    for (let line of this.enemy().meta[tag].split(/\n/)) {
                        match = line.trim().match(/^(\d+) *: *(.+)/);
                        if (match) {
                            let id = Number(match[1]);
                            let value = Number(match[2]);
                            if (Number.isNaN(value)) {
                                value = match[2];
                            }
                            setting[id] = value;
                        }
                    }
                    this._variableUpdateSkill[skillId] = setting;
                }
            }
        };
    })(Game_Enemy.prototype.initialize);

    (__makeActions => {
        Game_Enemy.prototype.makeActions = function () {
            __makeActions.apply(this, arguments);
            // 拘束中は自動行動不可
            if (this._bindData) {
                this._actions = [];
            }
            // アクター全員が拘束状態または戦闘不能だったら何もしない
            if ($gameParty.battleMembers().every(actor => !!actor.getBindData() || actor.isDead())) {
                this._actions = [];
            }
            // 射精判定（拘束スキルを持っている＆TPがMAX＆射精ステート中でない）
            if (this.hasBindingSkill() && this.tp >= 100 && !this.isStateAffected(CUM_STATE)) {
                if (this._bindData && CUM_INSIDE_STATE.includes(this._bindData.stateId)) {
                    let actorId = this._bindData.actorId;
                    let index = $gameActors.actor(actorId).index();
                    let action = new Game_Action(this);
                    if (actorId < 10) {
                        action.setSkill(CUM_INSIDE_KONOHA);
                    } else {
                        action.setSkill(CUM_INSIDE_LOLIMON);
                    }
                    action.setTarget(index);
                    this.setAction(0, action);
                } else {
                    let list = $gameParty.aliveBattleMembers().map(member => member.actorId());
                    let actorId = list[Math.floor(Math.random() * list.length)];
                    let index = $gameActors.actor(actorId).index();
                    let action = new Game_Action(this);
                    if (actorId < 10) {
                        action.setSkill(CUM_OUTSIDE_KONOHA);
                    } else {
                        action.setSkill(CUM_OUTSIDE_LOLIMON);
                    }
                    action.setTarget(index);
                    this.setAction(0, action);
                }
            }
        };
    })(Game_Enemy.prototype.makeActions);

    // 敵を倒したら拘束解除
    (__performCollapse => {
        Game_Enemy.prototype.performCollapse = function () {
            __performCollapse.apply(this, arguments);
            if (this._bindData) {
                $gameActors.actor(this._bindData.actorId).removeState(this._bindData.stateId);
                this._bindData = null;
            }
        };
    })(Game_Enemy.prototype.performCollapse);

    // 拘束のあるスキルを持っているか
    Game_Enemy.prototype.hasBindingSkill = function () {
        for (let action of this.enemy().actions) {
            for (let effect of $dataSkills[action.skillId].effects) {
                if (effect.code == 21 && effect.dataId > 0 && $dataStates[effect.dataId].meta['拘束値']) {
                    return true;
                }
            }
        }
        return false;
    };

    // 拘束状態更新
    Game_Enemy.prototype.updateBind = function () {
        if (this._bindData) {
            // ウェイト設定に応じて減少量を設定
            let value = this._bindData.auto * ((80 + WAIT) / (80 + $gameKonoha.battleInfo.wait));
            this._bindData.value -= value;

            let actor = $gameActors.actor(this._bindData.actorId);

            // 拘束値がゼロ
            // 拘束対象が絶頂ステート
            // 拘束対象が戦闘不能
            if (this._bindData.value <= 0 || actor.isStateAffected(ORGASM_STATE) || actor.isDead()) {
                // 拘束、対象のエロステート、自身の挿入ステート解除
                actor.removeState(this._bindData.stateId);
                this.removeState(INSERTING_STATE);
                this._bindData = null;
            }
        }
    };

})();
