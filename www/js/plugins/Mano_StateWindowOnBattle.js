//============================================================================
// Mano_StateWindowOnBattle.js
// ---------------------------------------------------------------------------
// Copyright (c) Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ---------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
//============================================================================
/*:
 * @plugindesc 戦闘中にステート一覧を画面へ表示します。
 * 
 * 
 * @author しぐれん(https://github.com/Sigureya/RPGmakerMV)
 * 
 * @param width
 * @desc ウィンドウの幅です。
 * @type number
 * @default 240
 * 
 * @param rows
 * @desc 縦方向の要素数です。
 * @type number
 * @default 8
 * 
 * @param commandName
 * @desc 戦闘時のコマンド名です
 * @type string
 * @default ステート詳細
 * 
 * @param showTurn
 * @desc 残りターン数の表示です。
 * アイコンの右下に表示されます。
 * @type boolean
 * @default true
 * 
 * @help
 * 表示の切り替えはパーティコマンドから行います。
 * 任意タイミングで表示もできるんですが、制御が少し面倒なので分かる人が自力でやってください。
 * （直前にフォーカスされていたウィンドウがわからないため）
 * Scene_Battle._windowBattleState_MAにwindowが入っているので、begin()で初期化してあげてください。
 * 必要であれば、activate()もしてください。
 */




(function () {
    "use strict";
    const setting = (function () {
        const param = PluginManager.parameters("Mano_StateWindowOnBattle");
        const result = {
            commandName: String(param.commandName),
            width: Number(param.width) || 300,
            rows: Number(param.rows) || 10,
            showTurn: (param.showTurn) === "true",
            positionMode: 'right',
            /**
             * @type {Numebr} 0(open/close)
             * 1(show/hide)
             * 2(activate/deactivate)
             * */
            activateMode: 2,
        };
        return result;
    })();


    class Window_BattleState extends Window_Selectable {

        static positionXatRight() {
            return Graphics.boxWidth - setting.width;
        }
        begin() {
            if (this._helpWindow) {
                this._helpWindow.show();
            }
            this.activate();
            switch (setting.activateMode) {
                case 0:
                    this.open();
                    break;
                case 1:
                    this.show();
                    break;
                case 2:
                    this.select(0);
                    break;
            }
        }
        end() {
            this.deactivate();
            this.deselect();
            if (this._helpWindow) {
                this._helpWindow.hide();
            }
            switch (setting.activateMode) {
                case 0:
                    this.close();
                    break;
                case 1:
                    this.hide();
                    break;
                case 2:
                    this.deselect();
                    break;
            }
        }

        static positionX() {
            if (setting.positionMode === 'right') {
                return Window_BattleState.positionXatRight()
            }

            return 0;
        }


        /**
         * 
         * @param {Number} x 
         * @param {Number} y 
         */
        constructor(x, y, w, h) {
            super(x, y, w, h);
            this.setBattler(null);
        }
        initialize(x, y, w, h) {
            this._list = [];
            // const heigth =this.fittingHeight(setting.rows) ;
            // const width = setting.width;
            super.initialize(x, y, w, h);
            this.end();
        }

        updateBattler() {
            this.makeItemList();
            this.refresh();
        }
        /**
         * @param {Game_Battler} battler
         */
        setBattler(battler) {
            this._battler = battler;
            if (battler) {
                this._unit = battler.friendsUnit();
            } else {
                this._unit = null;
            }
            this.updateBattler();
        }
        isVisibleState(state) {
            return true;
        }
        makeItemList() {
            const list = (this._battler) ? this._battler.states() : [];

            this._list = list.filter(function (state) {
                return this.isVisibleState(state);
            }, this);
        }
        /**
         * @return {RPG.State}
         * @param {Number} index
         */
        state(index) {
            return this._list[index];
        }
        maxItems() {
            return this._list.length;
        }
        drawItem(index) {
            const state = this.state(index);
            if (state) {
                const turnWidth = this.turnWidth();
                const rect = this.itemRectForText(index);
                const nameWidth = rect.width - turnWidth;
                this.drawItemName(state, rect.x, rect.y, nameWidth);
                if (setting.showTurn) {
                    this.drawStateTurn(state, rect.x + nameWidth + 4, rect.y, turnWidth);
                }
            }
        }
        /**
         * @return {String}
         * @param {Number} index 
         */
        itemDescription(index) {

            const state = this.state(index);
            if (state) {
                const desc = state.meta["説明"];
                if (desc) {
                    return desc;
                }
            }

            return "";
        }
        updateHelp() {
            this._helpWindow.setText(this.itemDescription(this._index));
        }
        turnWidth() {
            return 10;
        }
        /**
         * @param {RPG.State} state
         * @param {Number} x 
         * @param {Number} y
         * @param {Number} width
         */

        drawStateTurn(state, x, y, width) {
            const turn = this._battler._stateTurns[state.id];
            if (turn) {
                this.drawText(turn, x, y, width, 'right');
            }
        }
    }

    Window_PartyCommand.prototype.addStateCommand = function () {
        this.addCommand(setting.commandName, "stateMA");
    };

    const Window_PartyCommand_makeCommandList = Window_PartyCommand.prototype.makeCommandList;
    Window_PartyCommand.prototype.makeCommandList = function () {
        Window_PartyCommand_makeCommandList.call(this);
        this.addStateCommand();
    };
    const Scene_Battle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
    Scene_Battle.prototype.createPartyCommandWindow = function () {
        Scene_Battle_createPartyCommandWindow.call(this);
        this._partyCommandWindow.setHandler("stateMA", this.activateStateWindow.bind(this));

    };

    Scene_Battle.prototype.activateStateWindow = function () {
        this._windowBattleState_MA.begin();
    };

    Scene_Battle.prototype.onBattleStateCancel = function () {
        this._windowBattleState_MA.end();

    };
    const Scene_Battle_createHelpWindow = Scene_Battle.prototype.createHelpWindow;
    Scene_Battle.prototype.createHelpWindow = function () {
        Scene_Battle_createHelpWindow.call(this);
        this.createStateWindow();
    };

    const Scene_Battle_isAnyInputWindowActive = Scene_Battle.prototype.isAnyInputWindowActive;
    Scene_Battle.prototype.isAnyInputWindowActive = function () {
        if (this._windowBattleState_MA.active) {
            return true;
        }
        return Scene_Battle_isAnyInputWindowActive.call(this);
    };

    Scene_Battle.prototype.onStateWindowCancel = function () {
        this._windowBattleState_MA.end();
        this._partyCommandWindow.activate();

    };
    Scene_Battle.prototype.createStateWindow = function () {
        var wy = this._helpWindow.y + this._helpWindow.height;
        var wh = this._statusWindow.y - wy;
        const width = setting.width;
        const x = Window_BattleState.positionX();
        const window = new Window_BattleState(x, wy, width, wh);
        window.setBattler($gameParty.members()[0]);
        window.setHelpWindow(this._helpWindow);
        window.setHandler("cancel", this.onStateWindowCancel.bind(this));
        this._windowBattleState_MA = window;
        this.addWindow(window);
    };



    // const Scene_Battle_selectNextCommand =Scene_Battle.prototype.selectNextCommand;
    // Scene_Battle.prototype.selectNextCommand = function(){
    //     Scene_Battle_selectNextCommand.call(this);
    //     this._windowBattleState_MA.hide();
    // };

    const Scene_Battle_refreshStatus = Scene_Battle.prototype.refreshStatus;
    Scene_Battle.prototype.refreshStatus = function () {
        Scene_Battle_refreshStatus.call(this);
        this._windowBattleState_MA.updateBattler();
    };


})();


