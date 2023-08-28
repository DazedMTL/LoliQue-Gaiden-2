(() => {
    'use strict';

    //==============================================================================
    // Window_ActorCommand
    //==============================================================================

    (__initialize => {
        Window_ActorCommand.prototype.initialize = function () {
            this._numVsibleRows = 2;
            __initialize.apply(this, arguments);
        };
    })(Window_ActorCommand.prototype.initialize);

    Window_ActorCommand.prototype.numVisibleRows = function () {
        return this._numVsibleRows;
    };

    Window_ActorCommand.prototype.addResistCommands = function () {
        this.addCommand('振りほどく', 'extract');
        this.addCommand('耐える', 'bear');
        this.addCommand('受け入れる', 'skill', true, 4);
    };

    Window_ActorCommand.prototype.makeCommandList = function () {
        if (this._actor) {
            if (!this._actor.getBindData()) {
                this.addSkillCommands();
                this.addItemCommand();
                this._numVsibleRows = this.canExSkill() ? 4 : 3;
            } else {
                this.addResistCommands();
                this._numVsibleRows = 4;
            }
            this.addStateListCommands();
            this.height = this.windowHeight();
            this.x = 107 + 214 * $gameParty.battleMembers().indexOf(this._actor) - this.width / 2;
            this.y = Graphics.height - 200 - this.height;
        }
    };

    Window_ActorCommand.prototype.addSkillCommands = function () {
        this.addCommand($dataSystem.skillTypes[1], 'skill', true, 1);
        if (this.canExSkill()) {
            this.addCommand($dataSystem.skillTypes[5], 'skill', true, 5);
        }
    };

    Window_ActorCommand.prototype.canExSkill = function () {
        if (BattleManager.exGauge < 100) return false;
        for (let actor of $gameParty.aliveBattleMembers()) {
            if (actor == this._actor) continue;
            let actions = [...actor._actions, actor._inputtingAction, actor._reservedAction].filter(action => action);
            for (let action of actions) {
                if (action.isSkill() && action.item().stypeId == 5) {
                    return false;
                }
            }
        }
        return true;
    };

    Window_ActorCommand.prototype.addStateListCommands = function () {
        this.addCommand('States', 'state', true);
    };

})();
