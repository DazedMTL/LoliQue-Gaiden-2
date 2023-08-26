
//=============================================================================
// EasyLongMessage.js
// ver1.00 2017/11/23
//=============================================================================

/*:
 * @plugindesc 簡易長文表示プラグイン
 * @author KPoal
 *
 * 
 * @param ELMswitchId
 * @type number
 * @desc 「文章のスクロール表示」を一括表示モードに切り替えるスイッチ番号です。
 * @default 10
 * 
 * @param ELMVersion
 * @type boolean
 * @desc ver1.3.1のツクールMVで作成されたプロジェクトに用いる場合、trueにして下さい。
 * @default false
 *
 * @help 
 * 指定のスイッチをＯＮにしている間、
 * 「文章のスクロール表示」で入力した文章を画面に一括表示する
 * 長文表示モードに切り替わります。
 * 
 * スクロール速度の数字を変える事で、
 * 文章の表示位置を変更できます。
 * 1:上側表示
 * 2:中央表示
 * 3:下側表示
 * 
 * また、『早送りなし』にチェックを入れる事で、
 * 決定キー長押しの早送りで飛ばされなくなります。
 * 
 * 
 * ・プラグインコマンド
 * ELM FixLines    長文表示ウィンドウのウィンドウサイズを固定します。
 * 　　　　　　　　 0にすると内容に合わせてサイズが変動するようになります。
 * 
 * ELM Backtype   長文表示ウィンドウの背景を指定します。
 * 　　　　　　　　 0:ウィンドウ
 * 　　　　　　　　 1:暗くする
 * 　　　　　　　　 2:透明
 * 例）
 * ELM FixLines 5 :ウィンドウサイズを5行で固定する場合
 * ELM Backtype 2 :次の長文表示でウィンドウを透明にする場合
 * 
 * 
 * ※注意
 * 使用前に、必ず適用するプロジェクトの作成バージョンを確認し、
 * それに応じてELMVersionのパラメータを設定してください。
 * バージョンはrpg_core.jsをテキストエディタで開いて2行目で確認できます。
 * 
 * このプラグインはMITライセンスです。
 * 
 */


(function () {

    var parameters = PluginManager.parameters('EasyLongMessage');
    var ELMsId = Number(parameters.ELMswitchId);
    var ELMVersionselect = String(parameters.ELMVersion);
    var nextEvScroll = false;
    var FixedLineNumber = 0;
    var ELMBackGroundtype = 0;


    var _Game_Interpreter_pluginCommand =
        Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'ELM') {
            if (args[0] == 'FixLines') {
                FixedLineNumber = Number(args[1]);
            } else if (args[0] == 'Backtype') {
                ELMBackGroundtype = Number(args[1]);
            } else {
                FixedLineNumber = 0;
                ELMBackGroundtype = 0;
            }
        }
    };

    var _Window_ScrollText_prototype_startMessage = Window_ScrollText.prototype.startMessage;
    Window_ScrollText.prototype.startMessage = function () {
        _Window_ScrollText_prototype_startMessage.call(this);
        this.open();
    };

    var _Window_ScrollText_prototype_updateMessage = Window_ScrollText.prototype.updateMessage;
    Window_ScrollText.prototype.updateMessage = function () {
        if ($gameSwitches.value(ELMsId) == true) {
            this._windowContentsSprite.y = 0;
            this.origin.y = 0;
            // if (this.isFastForward()) {  // deleted by nekoma
            this.terminateMessage();
            // }                            // deleted by nekoma
        } else {
            if (eval(ELMVersionselect)) {
                this._windowContentsSprite.y -= this.scrollSpeed();
                if (this._windowContentsSprite.y <= -this.contents.height) {
                    this.terminateMessage();
                }
            } else {
                _Window_ScrollText_prototype_updateMessage.call(this);
            }
        }
    };

    var _Window_ScrollText_prototype_isFastForward = Window_ScrollText.prototype.isFastForward;
    Window_ScrollText.prototype.isFastForward = function () {
        if ($gameSwitches.value(ELMsId) == true) {
            if (!$gameMessage.scrollNoFast()) {
                return (Input.isRepeated('ok') || Input.isRepeated('cancel') ||
                    TouchInput.isRepeated());
            } else {
                return (Input.isTriggered('ok') || Input.isTriggered('cancel') ||
                    TouchInput.isTriggered());
            }
        } else {
            return _Window_ScrollText_prototype_isFastForward.apply(this);
        }
    };

    var _Window_ScrollText_prototype_refresh = Window_ScrollText.prototype.refresh;
    Window_ScrollText.prototype.refresh = function () {
        if ($gameSwitches.value(ELMsId) == true) {
            var textState = { index: 0 };
            textState.text = this.convertEscapeCharacters(this._text);
            this.resetFontSettings();
            this._allTextHeight = this.calcTextHeight(textState, true) + this.standardPadding() * 2;
            this.createContents();
            this.height = this._allTextHeight;
            switch (ELMBackGroundtype) {
                case 1:
                    this.showBackgroundDimmer();
                    this.opacity = 0;
                    break;
                case 2:
                    this.hideBackgroundDimmer();
                    this.opacity = 0;
                    break;
                default:
                    this.hideBackgroundDimmer();
                    this.opacity = 255;
                    break;
            }
            if (FixedLineNumber == 0) {
                var newy = Graphics.boxHeight - this.contents.height - this.standardPadding();
            } else {
                var newy = Graphics.boxHeight - (FixedLineNumber + 2) * 32 - this.standardPadding();
            }
            if ($gameMessage.scrollSpeed() == 1) {
                newy = 0;
            } else if ($gameMessage.scrollSpeed() == 2) {
                newy /= 2;
            }
            if (FixedLineNumber == 0) {
                // this.move(0,newy,this.width,this._allTextHeight + this.standardPadding())        // modified by nekoma from
                this.move(this.x, this.y, this.width, this._allTextHeight + this.standardPadding())    // modified by nekoma to
            } else {
                // this.move(0,newy,this.width,(FixedLineNumber+2)*32+ this.standardPadding())      // modified by nekoma from
                this.move(this.x, this.y, this.width, (FixedLineNumber + 2) * 32 + this.standardPadding())  // modified by nekoma to
            }
            // this._windowContentsSprite.y = Graphics.boxHeight;   // modified by nekoma from
            this._windowContentsSprite.y = 0;                       // modified by nekoma to
            this.origin.y = 0;
            this.drawTextEx(this._text, this.textPadding(), this.standardPadding());
        } else {
            this.hideBackgroundDimmer();
            this.opacity = 0;
            if (!eval(ELMVersionselect)) {
                _Window_ScrollText_prototype_refresh.call(this);
                this.move(0, 0, this.width, Graphics.boxHeight);
                this.origin.y = -this.height;
            } else {
                var textState = { index: 0 };
                textState.text = this.convertEscapeCharacters(this._text);
                this.resetFontSettings();
                this._allTextHeight = this.calcTextHeight(textState, true);
                this.createContents();
                this.move(0, 0, this.width, this._allTextHeight + this.standardPadding() * 2)
                this._windowContentsSprite.y = Graphics.boxHeight;
                this.drawTextEx(this._text, this.textPadding(), 1);
            }
        }
    };


    var _Window_ScrollText_prototype_terminateMessage = Window_ScrollText.prototype.terminateMessage;
    Window_ScrollText.prototype.terminateMessage = function () {
        if ($gameSwitches.value(ELMsId) == true) {
            this._text = null;
            $gameMessage.clear();
            // if(nextEvScroll==false){         // deleted by nekoma from
            //  this.hideBackgroundDimmer();
            //  this.close();
            // }                                // deleted by nekoma to
        } else {
            _Window_ScrollText_prototype_terminateMessage.call(this);
        }
    };

    // Show Scrolling Text
    var _Game_Interpreter_prototype_command105 = Game_Interpreter.prototype.command105;
    Game_Interpreter.prototype.command105 = function () {
        if ($gameSwitches.value(ELMsId) == true) {
            if (!$gameMessage.isBusy()) {
                $gameMessage.setScroll(this._params[0], this._params[1]);
                while (this.nextEventCode() === 405) {
                    this._index++;
                    $gameMessage.add(this.currentCommand().parameters[0]);
                }
                if (this.nextEventCode() === 105) {
                    nextEvScroll = true;
                } else {
                    nextEvScroll = false;
                }
                this._index++;
                this.setWaitMode('message');
            }
            return false;
        } else {
            nextEvScroll = false;
            _Game_Interpreter_prototype_command105.call(this);
        }
    };

})();
