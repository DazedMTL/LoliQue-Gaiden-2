(() => {
    'use strict';

    //==============================================================================
    // Window_Base
    //==============================================================================

    (__update => {
        Window_Base.prototype.update = function () {
            __update.apply(this, arguments);
            if (this.constructor.toString().indexOf('Window_Variable') > 0) {
                this._windowFrameSprite.visible = false;
            }
        };
    })(Window_Base.prototype.update);

})();
