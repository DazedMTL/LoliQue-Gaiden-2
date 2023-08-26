{
    'use strict';

    //==============================================================================
    // Window_StateList
    //==============================================================================

    class Window_StateList extends Window_Selectable {
        constructor(x, y, width, height) {
            super(x, y, width, height);
            this._actor = null;
            this.hide();
        }

        show() {
            super.show();
            if (this._helpWindow) {
                this._helpWindow.show();
            }
        }

        hide() {
            super.hide();
            if (this._helpWindow) {
                this._helpWindow.hide();
            }
        }

        maxCols() {
            return 2;
        }

        maxItems() {
            return this._actor ? this._actor.states().length : 0;
        }

        select(index) {
            super.select(index);
            if (this._helpWindow) {
                if (this._actor && this._actor.states().length > 0) {
                    let state = this._actor.states()[index];
                    let text = `\\I[${state.iconIndex}]${state.name}`;
                    this._helpWindow.setText(text);
                    this._helpWindow.drawText(state.meta.help || '', 8, this.lineHeight(), 720);
                } else {
                    this._helpWindow.setText('');
                }
            }
        }

        drawItem(index) {
            let rect = this.itemRectForText(index);
            let state = this._actor.states()[index];
            let text = `\\I[${state.iconIndex}]${state.name}`;
            this.drawTextEx(text, rect.x, rect.y);
        }

        setActor(actor) {
            this._actor = actor;
            this.select(0);
            this.refresh();
        }
    }

    //==============================================================================
    // Scene_Battle
    //==============================================================================

    (__createAllWindows => {
        Scene_Battle.prototype.createAllWindows = function () {
            __createAllWindows.apply(this, arguments);
            this.createStateListWindow();
        };
    })(Scene_Battle.prototype.createAllWindows);

    (__isAnyInputWindowActive => {
        Scene_Battle.prototype.isAnyInputWindowActive = function () {
            return __isAnyInputWindowActive.apply(this, arguments) || this._stateListWindow.active;
        };
    })(Scene_Battle.prototype.isAnyInputWindowActive);

    Scene_Battle.prototype.createStateListWindow = function () {
        this._stateListWindow = new Window_StateList(96, 144, 720, 370);
        this.addWindow(this._stateListWindow);
        this._stateListHelpWindow = new Window_Help();
        this._stateListHelpWindow.move(96, 36, 720, 108);
        this._stateListHelpWindow.hide();
        this.addWindow(this._stateListHelpWindow);
        this._stateListWindow.setHelpWindow(this._stateListHelpWindow);
        this._stateListWindow.setHandler('cancel', this.onStateListCancel.bind(this));
        this._actorCommandWindow.setHandler('state', this.commandStateList.bind(this));
    };

    Scene_Battle.prototype.commandStateList = function () {
        this._stateListWindow.setActor($gameActors.actor($gameKonoha.battleInfo.selectedActorId));
        this._stateListWindow.show();
        this._stateListWindow.activate();
    };

    Scene_Battle.prototype.onStateListCancel = function () {
        this._stateListWindow.hide();
        this._stateListWindow.deactivate();
        this._actorCommandWindow.activate();
    };
}