(() => {
    'use strict';

    const $p = {
        pictures: KONOHA.parameters.pictures,
    };

    //==============================================================================
    // Game_SpineMap
    //==============================================================================

    class Game_SpineMap extends Game_Spine {
        constructor() {
            super();
        }

        init() {
            super.init();
            this._actorId = 0;
            this._standData = [];
            this._currentIndex = -1;
        }

        setActor(id) {
            this._actorId = id;
            this._standData = [];
            let meta = $dataActors[id].meta['spine'];
            if (meta) {
                let list = meta.replace(/( +|\n)/g, '').match(/(?<={).+?(?=})/g);
                if (list) {
                    for (let item of list) {
                        let [spine, condition] = item.split(/:/);
                        let data = { skeleton: '', skin: '', vl: [], vg: [], sw: [], st: [], am: [], default: false };
                        [data.skeleton, data.skin] = spine.split(/,/);
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
            return this;
        }

        getStandIndex() {
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
                if (result) {
                    return index;
                }
            }
            return -1;
        }

        update() {
            if (this._actorId > 0) {
                let index = this.getStandIndex();
                if (this._currentIndex != index) {
                    this._currentIndex = index;
                    this.refresh();
                }
            }
        }

        refresh() {
            if (this._currentIndex >= 0) {
                let index = this._currentIndex;
                let data = this._standData;
                let skeleton = data[index].skeleton;
                let skin = data[index].skin;
                if (skeleton != this._skeleton.replace(/_\d+$/, '')) {
                    let actorId = this._actorId;
                    let standData = this._standData;
                    let currentIndex = this._currentIndex;
                    let track = this._track;
                    this.setSkeleton(skeleton);
                    this._actorId = actorId;
                    this._standData = standData;
                    this._currentIndex = currentIndex;
                    this._track = track;
                }
                this.setSkin(skin);
            }
        }
    }

    window.Game_SpineMap = Game_SpineMap;

    //==============================================================================
    // Sprite_SpineMap
    //==============================================================================

    class Sprite_SpineMap extends Sprite_Spine {
        constructor(...args) {
            super(...args);
            this._spine = args[0] instanceof Game_SpineMap ? args[0] : null;
        }

        spine() {
            if (this._spine) {
                return this._spine;
            }
            let picture = $gameScreen.picture(this._pictureId);
            return picture ? picture._spineMap : null;
        }

        update() {
            if (this.spine()) {
                this.spine().update();
            }
            super.update.apply(this, arguments);
        }
    }

    /* rpg_objects.js */

    //==============================================================================
    // Game_Screen
    //==============================================================================

    (__spine => {
        Game_Screen.prototype.spine = function (id) {
            if (!$gameParty.inBattle() && id == $p.pictures.spine.id) {
                let picture = this.picture(id);
                if (!picture._spineMap) {
                    picture._spineMap = new Game_SpineMap();
                }
                return picture._spineMap;
            }
            return __spine.apply(this, arguments);
        };
    })(Game_Screen.prototype.spine);

    //==============================================================================
    // Game_Picture
    //==============================================================================

    (__initialize => {
        Game_Picture.prototype.initialize = function () {
            __initialize.apply(this, arguments);
            this._spineMap = null;
        };
    })(Game_Picture.prototype.initialize);

    (__erase => {
        Game_Picture.prototype.erase = function () {
            __erase.apply(this, arguments);
            this._spineMap = null;
        };
    })(Game_Picture.prototype.erase);

    /* rpg_sprites.js */

    //==============================================================================
    // Sprite_Picture
    //==============================================================================

    (__initialize => {
        Sprite_Picture.prototype.initialize = function (pictureId) {
            __initialize.apply(this, arguments);

            if (SceneManager._scene instanceof Scene_Map) {
                let picture = $gameScreen.picture(pictureId);
                if (picture && picture._spineMap) {
                    this.addChild(new Sprite_SpineMap(pictureId))
                }
            }
        };
    })(Sprite_Picture.prototype.initialize);

})();
