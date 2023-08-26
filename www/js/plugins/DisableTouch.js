(() => {
    'use strict';

    let switchId = 1;

    function isTouchEnabled() {
        let scene = SceneManager._scene;
        if (scene && (scene instanceof Scene_Map || scene instanceof Scene_Menu)) {
            return $gameSwitches.value(switchId);
        }
        return true;
    }

    (__isPressed => {
        TouchInput.isPressed = function () {
            return __isPressed.apply(this, arguments) && isTouchEnabled();
        };
    })(TouchInput.isPressed);

    (__isTriggered => {
        TouchInput.isTriggered = function () {
            return __isTriggered.apply(this, arguments) && isTouchEnabled();
        };
    })(TouchInput.isTriggered);

    (__isRepeated => {
        TouchInput.isRepeated = function () {
            return __isRepeated.apply(this, arguments) && isTouchEnabled();
        };
    })(TouchInput.isRepeated);

    (__isLongPressed => {
        TouchInput.isLongPressed = function () {
            return __isLongPressed.apply(this, arguments) && isTouchEnabled();
        };
    })(TouchInput.isLongPressed);

    (__isCancelled => {
        TouchInput.isCancelled = function () {
            return __isCancelled.apply(this, arguments) && isTouchEnabled();
        };
    })(TouchInput.isCancelled);

    (__isMoved => {
        TouchInput.isMoved = function () {
            return __isMoved.apply(this, arguments) && isTouchEnabled();
        };
    })(TouchInput.isMoved);

    (__isReleased => {
        TouchInput.isReleased = function () {
            return __isReleased.apply(this, arguments) && isTouchEnabled();
        };
    })(TouchInput.isReleased);
})();
