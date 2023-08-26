'use strict';

{
    (__shouldDisplayLevelUp => {
        Game_Actor.prototype.shouldDisplayLevelUp = function () {
            __shouldDisplayLevelUp.apply(this, arguments);
            return false;
        };
    })(Game_Actor.prototype.shouldDisplayLevelUp);
}
