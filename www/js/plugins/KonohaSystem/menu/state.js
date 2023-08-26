{
    'use strict';

    //==============================================================================
    // Window_StateList
    //==============================================================================

    class Window_StateList extends Window_Selectable {
        constructor(x, y, width, height) {
            super(x, y, width, height);
            this._actor = null;
            this._isWindow = false;
            this.activate();
        }

        maxCols() {
            return 1;
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

        update() {
            super.update();
            this.opacity = 0;
        }
    }

    //==============================================================================
    // Scene_Status
    //==============================================================================

    (__create => {
        Scene_Status.prototype.create = function () {
            __create.apply(this, arguments);
            this.createStateListWindow();
        };
    })(Scene_Status.prototype.create);

    (__refreshActor => {
        Scene_Status.prototype.refreshActor = function () {
            __refreshActor.apply(this, arguments);
            this._stateListWindow.setActor((this.actor()));
        };
    })(Scene_Status.prototype.refreshActor);

    Scene_Status.prototype.createStateListWindow = function () {
        this._stateListWindow = new Window_StateList(891, 74, 388, 648);
        this.addWindow(this._stateListWindow);
        this._stateListHelpWindow = new Window_Help();
        this._stateListHelpWindow.move(75, 590, 720, 108);
        this._stateListHelpWindow._isWindow = false;
        this.addWindow(this._stateListHelpWindow);
        this._stateListWindow.setHelpWindow(this._stateListHelpWindow);
    };
}