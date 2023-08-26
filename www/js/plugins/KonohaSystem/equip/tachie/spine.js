{
    'use strict';

    //==============================================================================
    // Game_SpineEquip
    //==============================================================================

    class Game_SpineEquip extends Game_SpineBattle {
        constructor(actor) {
            super(actor);
        }

        updateVisibility() {
            this.setVisible(true);
        }
    }

    //==============================================================================
    // Sprite_SpineEquip
    //==============================================================================

    class Sprite_SpineEquip extends Sprite_SpineBattle {
        constructor(...args) {
            super(...args);
        }
    }

    //==============================================================================
    // Scene_Equip
    //==============================================================================

    (__refreshActor => {
        Scene_Equip.prototype.refreshActor = function () {
            __refreshActor.apply(this, arguments);
            if (this._spineSprite) {
                this.removeChild(this._spineSprite.parent);
            }
            BattleManager._phase = 'equip';
            let spine = new Game_SpineEquip(this.actor());
            spine.setColor(1, 1, 1, 0.5);
            this._spineSprite = new Sprite_SpineEquip(spine);
            this._spineSprite.update();
            let sprite = new Sprite();
            sprite.x = 1170;
            sprite.y = 795;
            sprite.scale.x = 0.8;
            sprite.scale.y = 0.8;
            sprite.addChild(this._spineSprite);
            this.addChild(sprite);
        };
    })(Scene_Equip.prototype.refreshActor);
}