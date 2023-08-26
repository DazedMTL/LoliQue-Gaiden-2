(() => {
    'use strict';

    //==============================================================================
    // Easing
    //==============================================================================

    class Easing {
        constructor(amount, frames, type = 0, mode = 0) {
            this._amount = amount;
            this._frames = frames;
            this._elapsed = 0;
            this._type = type;
            this._mode = mode;
            this._pos = 0;
        }

        get amount() { return this._amount; }
        get frames() { return this._frames; }

        set type(value) { this._type = value; }
        set mode(value) { this._mode = value; }

        init() {
            this._elapsed = 0;
        }

        next() {
            this._elapsed = this._elapsed < this._frames ? this._elapsed + 1 : this._frames;
            this._pos = this.calc();
            return this._pos;
        }

        prev() {
            this._elapsed = this._elapsed > 0 ? this._elapsed - 1 : 0;
            this._pos = this.calc();
            return this._pos;
        }

        pos() {
            return this._pos;
        }

        calc() {
            let k;
            switch (this._type) {
                case Easing.TYPE.Quadratic:
                    k = this.quadratic();
                    break;
                case Easing.TYPE.Cubic:
                    k = this.cubic();
                    break;
                case Easing.TYPE.Quartic:
                    k = this.quartic();
                    break;
                case Easing.TYPE.Quintic:
                    k = this.quintic();
                    break;
                case Easing.TYPE.Sinusoidal:
                    k = this.sinusoidal();
                    break;
                case Easing.TYPE.Exponential:
                    k = this.exponential();
                    break;
                case Easing.TYPE.Circular:
                    k = this.circular();
                    break;
                default:
                    k = 0;
            }
            return this._amount * k;
        }

        linear() {
            return this._elapsed / this._frames;
        }

        quadratic() {
            let t = this._elapsed / this._frames;
            switch (this._mode) {
                case Easing.MODE.In:
                    return t * t;
                case Easing.MODE.Out:
                    return -t * (t - 2);
                case Easing.MODE.Inout:
                    t *= 2;
                    if (t < 1) {
                        return t * t / 2;
                    }
                    return (t * (t - 2) - 1) / -2;
            }
            return 0;
        }

        cubic() {
            let t = this._elapsed / this._frames;
            switch (this._mode) {
                case Easing.MODE.In:
                    return t * t * t;
                case Easing.MODE.Out:
                    t--;
                    return t * t * t + 1;
                case Easing.MODE.Inout:
                    t *= 2;
                    if (t < 1) {
                        return t * t * t / 2;
                    }
                    t -= 2;
                    return (t * t * t + 2) / 2;
            }
            return 0;
        }

        quartic() {
            let t = this._elapsed / this._frames;
            switch (this._mode) {
                case Easing.MODE.In:
                    return t * t * t * t;
                case Easing.MODE.Out:
                    t--;
                    return -(t * t * t * t - 1);
                case Easing.MODE.Inout:
                    t *= 2;
                    if (t < 1) {
                        return t * t * t * t / 2;
                    }
                    t -= 2;
                    return (t * t * t * t - 2) / -2;
            }
            return 0;
        }

        quintic() {
            let t = this._elapsed / this._frames;
            switch (this._mode) {
                case Easing.MODE.In:
                    return t * t * t * t * t;
                case Easing.MODE.Out:
                    t--;
                    return (t * t * t * t * t + 1);
                case Easing.MODE.Inout:
                    t *= 2;
                    if (t < 1) {
                        return t * t * t * t * t / 2;
                    }
                    t -= 2;
                    return (t * t * t * t * t + 2) / 2;
            }
            return 0;
        }

        sinusoidal() {
            let t = this._elapsed / this._frames;
            switch (this._mode) {
                case Easing.MODE.In:
                    return -Math.cos(t * (Math.PI / 2)) + 1;
                case Easing.MODE.Out:
                    return Math.sin(t * (Math.PI / 2));
                case Easing.MODE.Inout:
                    return (Math.cos(Math.PI * t) - 1) / -2;
            }
            return 0;
        }

        exponential() {
            let t = this._elapsed / this._frames;
            switch (this._mode) {
                case Easing.MODE.In:
                    return Math.pow(2, 10 * (t - 1));
                case Easing.MODE.Out:
                    return -Math.pow(2, -10 * t) + 1;
                case Easing.MODE.Inout:
                    t *= 2;
                    if (t < 1) {
                        return Math.pow(2, 10 * (t - 1)) / 2;
                    }
                    t--;
                    return (-Math.pow(2, -10 * t) + 2) / 2;
            }
            return 0;
        }

        circular() {
            let t = this._elapsed / this._frames;
            switch (this._mode) {
                case Easing.MODE.In:
                    return -(Math.sqrt(1 - t * t) - 1);
                case Easing.MODE.Out:
                    t--;
                    return Math.sqrt(1 - t * t);
                case Easing.MODE.Inout:
                    t *= 2;
                    if (t < 1) {
                        return (Math.sqrt(1 - t * t) - 1) / -2;
                    }
                    t -= 2;
                    return (Math.sqrt(1 - t * t) + 1) / 2;
            }
            return 0;
        }
    }

    Easing.MODE = { In: 0, Out: 1, Inout: 2 };
    Easing.TYPE = { Quadratic: 0, Cubic: 1, Quartic: 2, Quintic: 3, Sinusoidal: 4, Exponential: 5, Circular: 6 };

    KONOHA.utils.Easing = Easing;

    /* rpg_objects.js */

    //==============================================================================
    // Game_Interpreter
    //==============================================================================

    (__setupChild => {
        Game_Interpreter.prototype.setupChild = function (list, eventId) {
            __setupChild.apply(this, arguments);
            this._childInterpreter._parentInterpreter = this;
        };
    })(Game_Interpreter.prototype.setupChild);

    (__pluginCommand => {
        Game_Interpreter.prototype.pluginCommand = function (command, args) {
            __pluginCommand.apply(this, arguments);
            // 呼び出し元イベントにさかのぼってジャンプ
            if (command.toLowerCase() == 's_lbljmp') {
                let labelName = args[0];
                let interpreter = this;
                do {
                    let list = interpreter._list;
                    if (list) {
                        for (let i = 0; i < list.length; i++) {
                            let command = list[i];
                            if (command.code === 118 && command.parameters[0] === labelName) {
                                interpreter.jumpTo(i);
                                if (interpreter._childInterpreter) {
                                    interpreter._childInterpreter.terminate();
                                }
                                return;
                            }
                        }
                    }
                    interpreter = interpreter._parentInterpreter;
                } while (interpreter);
            }
            // 実行中のマップイベントからラベルを探してジャンプ
            if (command.toLowerCase() == 'm_lbljmp') {
                let labelName = args[0];
                let interpreter = $gameMap._interpreter;
                while (interpreter) {
                    let list = interpreter._list;
                    if (list) {
                        for (let i = 0; i < list.length; i++) {
                            let command = list[i];
                            if (command.code === 118 && command.parameters[0] === labelName) {
                                interpreter.jumpTo(i);
                                if (interpreter._childInterpreter) {
                                    interpreter._childInterpreter.terminate();
                                }
                                return;
                            }
                        }
                    }
                    interpreter = interpreter._childInterpreter;
                }
            }
        };
    })(Game_Interpreter.prototype.pluginCommand);

    /* rpg_sprites.js */

    //==============================================================================
    // Sprite_Balloon
    //==============================================================================

    Sprite_Balloon.prototype.speed = function () {
        let id = KONOHA.parameters.balloon['variableId'];
        let speed = ((id > 0) ? $gameVariables.value(id) : 0) || KONOHA.parameters.balloon['default'];
        return speed;
    };

    Sprite_Balloon.prototype.waitTime = function () {
        return 60;
    };

})();
