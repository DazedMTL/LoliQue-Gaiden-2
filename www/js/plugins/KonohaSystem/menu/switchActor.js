(() => {
    'use strict';

    //==============================================================================
    // Sprite_SwitchActor
    //==============================================================================

    class Sprite_SwitchActor extends Sprite {
        constructor() {
            super();
        }

        setActor(actor) {
            if (this._actorSprite) {
                this.removeChild(this._actorSprite);
            }

            this._actorSprite = new Sprite(ImageManager.loadMenusFaces2(`Actor_${actor.actorId()}`));
            this._actorSprite.anchor.x = 0.5;
            this._actorSprite.anchor.y = 0.5;
            this._actorSprite.y = -85;
            this.addChild(this._actorSprite);
        }

        setArrow(arrow) {
            this._arrowSprite = arrow == 'left' ? new Sprite(ImageManager.loadMenusMain('arrow_L'))
                : new Sprite(ImageManager.loadMenusMain('arrow_R'));
            this._arrowSprite.anchor.x = 0.5;
            this._arrowSprite.anchor.y = 0.5;
            this.addChild(this._arrowSprite);
        }

        getRect() {
            let [x1, y1, width1, height1, x2, y2, width2, height2] = [0, 0, 0, 0, 0, 0, 0, 0];

            if (this._actorSprite) {
                x1 = this._actorSprite.x - this._actorSprite.width / 2;
                y1 = this._actorSprite.y - this._actorSprite.height / 2;
                width1 = this._actorSprite.width;
                height1 = this._actorSprite.height;
            }
            if (this._arrowSprite) {
                x2 = this._arrowSprite.x - this._arrowSprite.width / 2;
                y2 = this._arrowSprite.y - this._arrowSprite.height / 2;
                width2 = this._arrowSprite.width;
                height2 = this._arrowSprite.height;
            }

            return {
                left: this.x + Math.min(x1, x2),
                top: this.y + Math.min(y1, y2),
                right: this.x + Math.max(x1 + width1, x2 + width2),
                bottom: this.y + Math.max(y1 + height1, y2 + height2)
            };
        }
    }

    /* rpg_scenes.js */

    //==============================================================================
    // Scene_MenuBase
    //==============================================================================

    (__start => {
        Scene_MenuBase.prototype.start = function () {
            __start.apply(this, arguments);
            if (this instanceof Scene_Skill || this instanceof Scene_SkillEquip || this instanceof Scene_STS) {
                let left = Infinity;
                let top = Infinity;
                let right = 0;
                let bottom = 0;

                this._windowLayer.children.forEach(window => {
                    if (window.visible && window.isOpen()) {
                        left = Math.min(left, window.x);
                        top = Math.min(top, window.y);
                        right = Math.max(right, window.x + window.width);
                        bottom = Math.max(bottom, window.y + window.height);
                    }
                });

                if (this instanceof Scene_Skill) {
                    this._actorSelectableWindow = this._skillTypeWindow;
                } else if (this instanceof Scene_SkillEquip) {
                    this._actorSelectableWindow = this._slotWindow;
                } else if (this instanceof Scene_STS) {
                    this._actorSelectableWindow = this._stsTreeTypeWindow;
                }

                this._switchActorSprite_L = new Sprite_SwitchActor();
                this._switchActorSprite_L.setArrow('left');
                this._switchActorSprite_L.x = left - 50;
                this._switchActorSprite_L.y = (top + bottom) / 2;
                this.addChild(this._switchActorSprite_L);

                this._switchActorSprite_R = new Sprite_SwitchActor();
                this._switchActorSprite_R.setArrow('right');
                this._switchActorSprite_R.x = right + 50;
                this._switchActorSprite_R.y = (top + bottom) / 2;
                this.addChild(this._switchActorSprite_R);

                this.refreshSwitchActorSprite();

                let onActorChange = this.onActorChange;
                this.onActorChange = () => {
                    onActorChange.call(this);
                    this.refreshSwitchActorSprite();
                };
            }
        };
    })(Scene_MenuBase.prototype.start);

    (__update => {
        Scene_MenuBase.prototype.update = function () {
            __update.apply(this, arguments);
            if (this._actorSelectableWindow) {
                if (this._actorSelectableWindow.active) {
                    this._switchActorSprite_L.visible = true;
                    this._switchActorSprite_R.visible = true;

                    if (TouchInput.isTriggered()) {
                        let tx = TouchInput.x;
                        let ty = TouchInput.y;
                        let rect;

                        // 左矢印クリック判定
                        rect = this._switchActorSprite_L.getRect();
                        if (tx >= rect.left && tx <= rect.right && ty >= rect.top && ty <= rect.bottom) {
                            SoundManager.playCursor();
                            this._actorSelectableWindow.callHandler('pageup');
                        }

                        // 右矢印クリック判定
                        rect = this._switchActorSprite_R.getRect();
                        if (tx >= rect.left && tx <= rect.right && ty >= rect.top && ty <= rect.bottom) {
                            SoundManager.playCursor();
                            this._actorSelectableWindow.callHandler('pagedown');
                        }
                    }
                } else {
                    this._switchActorSprite_L.visible = false;
                    this._switchActorSprite_R.visible = false;
                }
            }
        };
    })(Scene_MenuBase.prototype.update);

    Scene_MenuBase.prototype.refreshSwitchActorSprite = function () {
        let members = $gameParty.members();
        let index = members.indexOf(this.actor());
        let index_L = index > 0 ? index - 1 : members.length - 1;
        let index_R = index < members.length - 1 ? index + 1 : 0;

        this._switchActorSprite_L.setActor(members[index_L]);
        this._switchActorSprite_R.setActor(members[index_R]);
    };

})();
