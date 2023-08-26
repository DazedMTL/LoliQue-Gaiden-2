(() => {
    'use strict';

    const $p = {
        pictures: KONOHA.parameters.pictures,
        variables: KONOHA.parameters.variables,
        switches: KONOHA.parameters.switches
    };

    //==============================================================================
    // Character
    //==============================================================================

    class Character {
        static update() {
            this.updateActor();
            this.updateIsyouSwitch();
            if (this._actorId > 0) {
                let index = this.getStandIndex();
                if (this._currentIndex != index) {
                    this._currentIndex = index;
                    this.refresh();
                }
            }
        }

        static updateActor() {
            if (this._actorId != $gameParty.leader().actorId()) {
                this._actorId = $gameParty.leader().actorId();
                this._standData = [];
                let meta = $dataActors[this._actorId].meta['image'];
                if (meta) {
                    let list = meta.replace(/( +|\n)/g, '').match(/(?<={).+?(?=})/g);
                    if (list) {
                        for (let item of list) {
                            let [image, condition] = item.split(/:/);
                            let data = { name: '', index: 0, vl: [], vg: [], sw: [], st: [], am: [], rg: [], default: false };
                            [data.name, data.index] = image.split(/,/);
                            data.index = Number(data.index);
                            if (condition == 'default') {
                                data.default = true;
                            } else {
                                let regexp = /([a-z]+)\((.+?)\)/g;
                                while (regexp.exec(condition)) {
                                    let name = RegExp.$1;
                                    let value = RegExp.$2;
                                    if (['vl', 'vg'].includes(name)) {
                                        value = value.split(/,/).map(v => Number(v));
                                        data[name].push(value);
                                    } else {
                                        data[name].push(Number(value));
                                    }
                                }
                            }
                            this._standData.push(data);
                        }
                    }
                }
                this._currentIndex = this.getStandIndex();
                this.refresh();
            }
            let picture = $gameScreen.picture($p.pictures.spine.id);
            if (picture) {
                if (this._spineActorId != this._actorId) {
                    this._spineActorId = this._actorId;
                    $gameScreen.spine($p.pictures.spine.id).setActor(this._spineActorId)
                        .setAnimation(0, 'taiki1');
                }
            }
        }

        static updateIsyouSwitch() {
            let vIsyou = $gameVariables.value($p.variables.clothes);
            let sIsyou = !(vIsyou > 0 && $gameActors.actor(this._actorId).equips()[3]);
            $gameSwitches.setValue($p.switches.clothes, sIsyou);
        }

        static getStandIndex() {
            let data = this._standData;
            for (let index of data.keys()) {
                if (data[index].default) {
                    return index;
                }
                let result = true;
                for (let value of data[index].vl) {
                    result = result && ($gameVariables.value(value[0]) <= value[1]);
                }
                for (let value of data[index].vg) {
                    result = result && ($gameVariables.value(value[0]) >= value[1]);
                }
                for (let value of data[index].sw) {
                    result = result && $gameSwitches.value(value);
                }
                for (let value of data[index].st) {
                    result = result && !!$gameActors.actor(this._actorId).states().find(s => s.id == value);
                }
                for (let value of data[index].am) {
                    result = result && !!$gameActors.actor(this._actorId).equips().find(e => e && e.atypeId && e.id == value);
                }
                for (let value of data[index].rg) {
                    result = result && ($gamePlayer.regionId() == value);
                }
                if (result) {
                    return index;
                }
            }
            return -1;
        }

        static refresh() {
            if (this._currentIndex >= 0) {
                let index = this._currentIndex;
                let data = this._standData;
                let image_name = data[index].name;
                let image_index = data[index].index;
                $gameActors.actor(this._actorId).setCharacterImage(image_name, image_index);
                $gamePlayer.refresh();
            }
        }
    }

    Character._actorId = 0;
    Character._spineActorId = 0;
    Character._standData = [];
    Character._currentIndex = -1;

    //==============================================================================
    // Game_Konoha
    //==============================================================================

    (__update => {
        Game_Konoha.prototype.update = function () {
            __update.apply(this, arguments);

            if (!$gameParty.inBattle()) {
                Character.update();
            }
        };
    })(Game_Konoha.prototype.update);

})();
