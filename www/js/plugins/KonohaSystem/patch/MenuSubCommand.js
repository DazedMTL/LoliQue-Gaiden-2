(() => {
    'use strict';

    //==============================================================================
    // Scene_Menu
    //==============================================================================

    (__create => {
        Scene_Menu.prototype.create = function () {
            let commandParent = this.commandParent;
            this.commandParent = () => {
                // Skill選択時はアクター選択へ
                var parentName = this._commandWindow.currentExt();
                if (parentName == 'Skill0' && !$gameTemp.getLastSubCommand().parent) {
                    this.commandPersonal();
                    return;
                }

                commandParent.call(this);

                // Skill選択時のサブコマンドは選択したアクターアイコンの近くに表示
                if (parentName == 'Skill0') {
                    let sprite = this._selection[this._statusWindow.index()]
                    this._subMenuWindow.x = sprite.x;
                    this._subMenuWindow.y = sprite.y + sprite.height / 2;
                }
            };

            __create.apply(this, arguments);
        };
    })(Scene_Menu.prototype.create);

    (__onPersonalOk => {
        Scene_Menu.prototype.onPersonalOk = function () {
            // Skill選択時のアクター選択はサブコマンド表示へ
            var parentName = this._commandWindow.currentExt();
            if (parentName == 'Skill0') {
                $gameTemp.setLastSubCommandParent(parentName);
                this.commandParent();
                return;
            }
            __onPersonalOk.apply(this, arguments);
        };
    })(Scene_Menu.prototype.onPersonalOk);

})();
