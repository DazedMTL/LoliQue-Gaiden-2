{
    'use strict';

    (__add => {
        Game_Message.prototype.add = function (text) {
            if (!$gameParty.inBattle() && this.faceName() == '') {
                this.setFaceImage('face_du', 0);
            }
            __add.apply(this, arguments);
        };
    })(Game_Message.prototype.add);
}