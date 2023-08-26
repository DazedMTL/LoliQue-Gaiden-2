//=============================================================================
// MPP_SmoothBattleLog.js
//=============================================================================
// Copyright (c) 2018 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 【ver.1.0】戦闘ログの表示方法や動作を変更し、戦闘の進行を早くしたりします。
 * @author 木星ペンギン
 *
 * @help ▼ 動作詳細
 * --------------------------------
 *  〇 戦闘ログの表示方法を蓄積型にすることで、ログ進行が早くても
 *    文章がすぐに消ることがなくなります。
 *  
 *  〇 通常、敵を倒した際の演出が終了するまでキャラクターは動きませんが、
 *    演出の終了を待たずにキャラクターが元の位置に戻ります。
 * 
 *  〇 通常、前に行動したキャラクターが元の位置に戻らないと
 *    次のキャラクターは行動しませんが、
 *    前のキャラクターが行動を終了した時点で次のキャラクターが行動します。
 * 
 *  〇 アニメーションの終了待ちの時間を短縮します。
 *    短縮する時間はプラグインパラメータ[Animation Short Count]にて変更可能です。
 * 
 *  〇 パーティコマンドから戦闘過去ログを確認することができます。
 * 
 * ================================================================
 * ▼ プラグインパラメータ 詳細
 * --------------------------------
 *  〇 Fast Forward Enabled? (戦闘ログの高速表示の有効/無効)
 *   「戦闘ログの高速表示」はツクールＭＶのデフォルトの機能です。
 *   決定キー長押しや長押しタッチなどでログ表示が早くなる機能の有無を
 *   変更します。
 *   
 * --------------------------------
 *  〇 Log Type (戦闘ログの消去タイプ)
 *   0:まとめて消去
 *    最後のログが表示されてから一定時間がたつと戦闘ログウィンドウが
 *    非表示となります。
 *    
 *   1:一行ずつ消去
 *    表示されてから一定時間経過したログから順に消去されます。
 *
 * --------------------------------
 *  〇 Not Display Skils (ログに表示しないスキルIDの配列)
 *   n-m と表記することで、nからmまでの数値を指定できます。
 *   (例 : 1-4,8 => 1,2,3,4,8)
 *  
 * --------------------------------
 *  〇 Log Command (戦闘過去ログを表示するコマンド名)
 *   コマンドはパーティコマンドに追加されます。
 *  
 * ================================
 * 制作 : 木星ペンギン
 * URL : http://woodpenguin.blog.fc2.com/
 * 
 * @param === Base ===
 * @default 【基本的な設定】
 * 
 * @param Fast Forward Enabled?
 * @type boolean
 * @desc 戦闘ログの高速表示の有効/無効
 * @default false
 * @parent === Base ===
 * 
 * @param Log Type
 * @type number
 * @max 1
 * @desc 戦闘ログの消去タイプ
 * (0:まとめて消去, 1:一行ずつ消去)
 * @default 1
 * @parent === Base ===
 * 
 * @param Message Speed
 * @type number
 * @desc 戦闘ログの表示速度
 * @default 8
 * @parent === Base ===
 * 
 * @param View Duration
 * @type number
 * @desc 戦闘ログの表示時間
 * (0:常時表示)
 * @default 150
 * @parent === Base ===
 * 
 * @param Start Messages On Log?
 * @type boolean
 * @desc 戦闘開始メッセージをログに表示するかどうか
 * @default false
 * @parent === Base ===
 * 
 * @param Log Command
 * @desc 戦闘過去ログを表示するコマンド名
 * @default 戦闘ログ
 * @parent === Base ===
 * 
 * @param Log Max Size
 * @type number
 * @desc 戦闘ログを保持する数
 * @default 100
 * @parent === Base ===
 * 
 * @param Item Name Only?
 * @type boolean
 * @desc アイテム/スキル名のみ表示
 * @default false
 * @parent === Base ===
 * 
 * @param Not Display Skils
 * @desc ログに表示しないスキルIDの配列
 * (範囲指定可)
 * @default 1,2
 * @parent === Base ===
 * 
 * 
 * @param === Window ===
 * @default 【ログウィンドウ】
 * 
 * @param Log Window Y
 * @type number
 * @min -1000
 * @desc ログウィンドウのY座標
 * @default 0
 * @parent === Window ===
 * 
 * @param Log Window Width
 * @type number
 * @desc ログウィンドウの幅
 * @default 816
 * @parent === Window ===
 * 
 * @param Line Height
 * @type number
 * @desc 戦闘ログの一行の高さ
 * @default 30
 * @parent === Window ===
 * 
 * @param Font Size
 * @type number
 * @desc 戦闘ログの文字サイズ
 * @default 24
 * @parent === Window ===
 * 
 * @param Max Lines
 * @type number
 * @min 1
 * @desc 戦闘ログの最大表示行数
 * @default 6
 * @parent === Window ===
 * 
 * 
 * @param === Advanced ===
 * @default 【高度な設定】
 * 
 * @param Indent Width
 * @type number
 * @desc インデント(字下げ)の幅
 * @default 12
 * @parent === Advanced ===
 * 
 * @param Animation Next Delay
 * @type number
 * @desc 複数の対象にアニメーションを表示する際の間隔
 * @default 12
 * @parent === Advanced ===
 * 
 * @param Animation Short Count
 * @type number
 * @desc アニメーション待ちを短縮する時間
 * @default 16
 * @parent === Advanced ===
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */

(function () {

    var MPPlugin = {};

    (function () {

        var parameters = PluginManager.parameters('MPP_SmoothBattleLog');

        function convertParam(name) {
            var param = parameters[name];
            var result = [];
            if (param) {
                var data = param.split(',');
                for (var i = 0; i < data.length; i++) {
                    if (/(\d+)\s*-\s*(\d+)/.test(data[i])) {
                        for (var n = Number(RegExp.$1); n <= Number(RegExp.$2); n++) {
                            result.push(n);
                        }
                    } else {
                        result.push(Number(data[i]));
                    }
                }
            }
            return result;
        };

        MPPlugin.FastForwardEnabled = !!eval(parameters['Fast Forward Enabled?']);
        MPPlugin.LogType = Number(parameters['Log Type'] || 1);
        MPPlugin.MaxLines = Number(parameters['Max Lines'] || 6);
        MPPlugin.MessageSpeed = Number(parameters['Message Speed'] || 8);
        MPPlugin.ViewDuration = Number(parameters['View Duration'] || 150);
        MPPlugin.StartMessagesOnLog = !!eval(parameters['Start Messages On Log?']);
        MPPlugin.LogCommand = parameters['Log Command'] || '';
        MPPlugin.LogMaxSize = Number(parameters['Log Max Size'] || 100);
        MPPlugin.ItemNameOnly = !!eval(parameters['Item Name Only?']);
        MPPlugin.NotDisplaySkils = convertParam('Not Display Skils');

        MPPlugin.LogWindowY = Number(parameters['Log Window Y'] || 0);
        MPPlugin.LogWindowWidth = Number(parameters['Log Window Width'] || 816);
        MPPlugin.LineHeight = Number(parameters['Line Height'] || 30);
        MPPlugin.FontSize = Number(parameters['Font Size'] || 24);

        MPPlugin.IndentWidth = Number(parameters['Indent Width'] || 32);
        MPPlugin.AnimationNextDelay = Number(parameters['Animation Next Delay'] || 12);
        MPPlugin.AnimationShortCount = Number(parameters['Animation Short Count'] || 12);


    })();

    var Alias = {};

    //-----------------------------------------------------------------------------
    // BattleManager

    //164
    Alias.BaMa_isBusy = BattleManager.isBusy;
    BattleManager.isBusy = function () {
        if (Alias.BaMa_isBusy.apply(this, arguments)) {
            return true;
        }
        if (this.isBattleEnd() && this.waitBattleEnd()) {
            return true;
        }
        return false;
    };

    BattleManager.isBattleEnd = function () {
        return ($gameParty.isAllDead() || $gameTroop.isAllDead());
    };

    BattleManager.waitBattleEnd = function () {
        return (this._spriteset.isEffecting() || this._spriteset.isAnyoneMoving());
    };

    //229
    Alias.BaMa_displayStartMessages = BattleManager.displayStartMessages;
    BattleManager.displayStartMessages = function () {
        if (!MPPlugin.StartMessagesOnLog)
            Alias.BaMa_displayStartMessages.apply(this, arguments);
    };

    BattleManager.displayStartMessagesOnLog = function () {
        $gameTroop.enemyNames().forEach(function (name) {
            this._logWindow.push('addText', TextManager.emerge.format(name));
        }, this);
        if (this._preemptive) {
            this._logWindow.push('wait');
            this._logWindow.push('addText', TextManager.preemptive.format($gameParty.name()));
        } else if (this._surprise) {
            this._logWindow.push('wait');
            this._logWindow.push('addText', TextManager.surprise.format($gameParty.name()));
        }
        this._logWindow.push('clear');
    };

    //480
    Alias.BaMa_checkBattleEnd = BattleManager.checkBattleEnd;
    BattleManager.checkBattleEnd = function () {
        var result = Alias.BaMa_checkBattleEnd.apply(this, arguments);
        if (result) {
            this._logWindow.clear_mppSBL();
            this._logWindow.endSelect();
        }
        return result;
    };

    //-----------------------------------------------------------------------------
    // Window_Base

    //303
    Alias.WiBa_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
    Window_Base.prototype.processEscapeCharacter = function (code, textState) {
        if (code === 'PX') {
            textState.x += this.obtainEscapeParam(textState);
        } else {
            Alias.WiBa_processEscapeCharacter.apply(this, arguments);
        }
    };

    //-----------------------------------------------------------------------------
    // Window_BattleLog

    //14
    Alias.WiBaLo_initialize = Window_BattleLog.prototype.initialize;
    Window_BattleLog.prototype.initialize = function () {
        this._clearDuration = 0;
        this._logScrollYDuration = 0;
        this._logScrollY = this.lineHeight();
        this._logs = [];
        Alias.WiBaLo_initialize.apply(this, arguments);
        this.createLogSprites();
    };

    //34
    Window_BattleLog.prototype.windowWidth = function () {
        return MPPlugin.LogWindowWidth;
    };

    //
    Window_BattleLog.prototype.lineHeight = function () {
        return MPPlugin.LineHeight;
    };

    //
    Window_BattleLog.prototype.standardFontSize = function () {
        return MPPlugin.FontSize;
    };

    //
    Window_BattleLog.prototype.maxItems = function () {
        return this._logs.length;
    };

    //42
    Window_BattleLog.prototype.maxLines = function () {
        return MPPlugin.MaxLines;
    };

    //46
    Window_BattleLog.prototype.createBackBitmap = function () {
        this._backBitmap = new Bitmap(this.width, this.contentsHeight());
    };

    Window_BattleLog.prototype.createLogSprites = function () {
        this._logMainSprite = new Sprite();
        this.addChild(this._logMainSprite);
        this._logSprites = [];
        var max = this.maxLines() + 1;
        for (var i = 0; i < max; i++) {
            var sprite = new Sprite();
            sprite.bitmap = new Bitmap(this.contentsWidth(), this.lineHeight());
            this._logSprites[i] = sprite;
            this._logMainSprite.addChild(sprite);
        }
    };

    //61
    Window_BattleLog.prototype.messageSpeed = function () {
        return MPPlugin.MessageSpeed;
    };

    //
    if (Window_Message.prototype.hasOwnProperty('itemRectForText')) {
        Alias.WiBaLo_itemRectForText = Window_BattleLog.prototype.itemRectForText;
    }
    Window_BattleLog.prototype.itemRectForText = function (index) {
        var _super = Alias.WiBaLo_itemRectForText ||
            Window_Selectable.prototype.itemRectForText;
        var rect = _super.apply(this, arguments);
        if (!this.active) rect.y = 0;
        return rect;
    };

    //69
    Alias.WiBaLo_update = Window_BattleLog.prototype.update;
    Window_BattleLog.prototype.update = function () {
        Window_Selectable.prototype.update.call(this);
        Alias.WiBaLo_update.apply(this, arguments);
        this.updateLogSprites();
    };

    //
    if (Window_Selectable.prototype.hasOwnProperty('updateArrows')) {
        Alias.WiSe_updateArrows = Window_Selectable.prototype.updateArrows;
    }
    Window_BattleLog.prototype.updateArrows = function () {
        if (Alias.WiSe_updateArrows) {
            Alias.WiSe_updateArrows.apply(this, arguments);
        } else {
            Window_Selectable.prototype.updateArrows.apply(this, arguments);
        }
        if (!this.active) {
            this.downArrowVisible = false;
            this.upArrowVisible = false;
        }
    };

    Window_BattleLog.prototype.updateLogSprites = function () {
        var lineHeight = this.lineHeight();
        if (this._logScrollYDuration > 0) {
            this._logScrollYDuration--;
            this._logScrollY = this.step(this._logScrollYDuration,
                lineHeight, this._logScrollY);
        }
        for (var i = 0; i < this._logSprites.length; i++) {
            var sprite = this._logSprites[i];
            var rect = this.itemRect(i);
            rect.y = i * lineHeight - this._logScrollY;
            if (sprite.logScrollXDuration > 0) sprite.logScrollXDuration--;
            sprite.x = Math.round(Math.pow(sprite.logScrollXDuration, 2) / 2);
            sprite.y = rect.y.clamp(0, (this.maxLines() - 1) * lineHeight);
            var y = Math.max(-rect.y, 0);
            sprite.setFrame(0, y, rect.width, rect.height - y);
            sprite.opacity = 255 - sprite.logScrollXDuration * 20;
            if (sprite.viewDuration > 0)
                sprite.viewDuration--;
        }
        if (this._clearDuration > 0) {
            this._clearDuration--;
            var max = Math.min(16, MPPlugin.ViewDuration);
            if (this._clearDuration < max) {
                this._logMainSprite.opacity = 255 * this._clearDuration / max;
                this._backSprite.opacity = 255 * this._clearDuration / max;
            }
            if (this._clearDuration === 0)
                this.clear_mppSBL();
        } else if (this.numLines() > 0) {
            if (this._logSprites[1].viewDuration === 0)
                this.shiftLine();
        }
        this._logMainSprite.x = this.padding;
        this._logMainSprite.y = this.padding;
        this._backSprite.y = this.padding;
        var height = (this.numLines() + 1) * lineHeight - this._logScrollY;
        height = Math.min(height, this.maxLines() * lineHeight);
        var y = this.maxLines() * lineHeight - height;
        this._backSprite.setFrame(0, y, this.width, height);
    };

    Window_BattleLog.prototype.step = function (d, t, n) {
        return Math.round(t + (n - t) * Math.pow(d, 2) / Math.pow(d + 1, 2));
    };

    Window_BattleLog.prototype.shiftLine = function () {
        this._lines.shift();
        var sprite = this._logSprites.shift();
        sprite.bitmap.clear();
        this._logSprites.push(sprite);
        this._logScrollY -= this.lineHeight();
        this._logScrollYDuration = 16;
    };

    //121
    Alias.WiBaLo_isFastForward = Window_BattleLog.prototype.isFastForward;
    Window_BattleLog.prototype.isFastForward = function () {
        return MPPlugin.FastForwardEnabled && Alias.WiBaLo_isFastForward.apply(this, arguments);
    };

    //131
    Alias.WiBaLo_clear = Window_BattleLog.prototype.clear;
    Window_BattleLog.prototype.clear = function () {
        if (MPPlugin.ItemNameOnly) {
            this.clear_mppSBL();
            return;
        }
        this._baseLineStack = [];
        if (MPPlugin.LogType === 0)
            this._clearDuration = MPPlugin.ViewDuration;
    };
    Window_BattleLog.prototype.clear_mppSBL = function () {
        Alias.WiBaLo_clear.call(this);
        for (var i = 0; i < this._logSprites.length; i++) {
            this._logSprites[i].bitmap.clear();
        }
        this._logScrollYDuration = 0;
        this._logScrollY = this.lineHeight();
    };

    //141
    Window_BattleLog.prototype.waitForEffect = function () {
        //this.setWaitMode('effect');
    };

    //149
    Window_BattleLog.prototype.addText = function (text) {
        if (this._isNotDisplay) return;
        var indent = this._baseLineStack.length;
        if (indent > 0) {
            text = '\\px[%1]'.format(indent * MPPlugin.IndentWidth) + text;
        }
        if (!MPPlugin.ItemNameOnly) {
            this._lines.push(text);
            if (this.numLines() > this.maxLines()) this.shiftLine();
        }
        this._logs.push(text);
        if (this.maxItems() > MPPlugin.LogMaxSize) this._logs.shift();

        if (this.active) {
            this.refresh();
        } else if (!MPPlugin.ItemNameOnly) {
            var index = this.numLines() - 1;
            var sprite = this._logSprites[index + 1];
            sprite.logScrollXDuration = 12;
            if (MPPlugin.LogType === 1)
                sprite.viewDuration = MPPlugin.ViewDuration || -1;

            this.drawLineText(index);
        }
        this.wait();
        this._clearDuration = 0;
        this._logMainSprite.opacity = 255;
        this._backSprite.opacity = 255;
    };

    Window_BattleLog.prototype.addItemName = function (name) {
        this._lines.push(name);
        var index = this.numLines() - 1;
        var sprite = this._logSprites[index + 1];
        sprite.logScrollXDuration = 0;
        sprite.viewDuration = -1;

        this.drawLineText(index);
    };

    //159
    Window_BattleLog.prototype.popBaseLine = function () {
        var baseLine = this._baseLineStack.pop();
        //    while (this._lines.length > baseLine) {
        //        this._lines.pop();
        //    }
    };

    //269
    Window_BattleLog.prototype.animationNextDelay = function () {
        return MPPlugin.AnimationNextDelay;
    };

    //273
    Alias.WiBaLo_refresh = Window_BattleLog.prototype.refresh;
    Window_BattleLog.prototype.refresh = function () {
        if (this.active) {
            Window_Selectable.prototype.refresh.apply(this, arguments);
        } else {
            Alias.WiBaLo_refresh.apply(this, arguments);
        }
    };

    //290
    Window_BattleLog.prototype.backRect = function () {
        return {
            x: 0,
            y: 0,
            width: this.width,
            height: this.contentsHeight()
        };
    };

    Window_BattleLog.prototype.backPaintOpacity = function () {
        return 0;
    };

    //307
    Alias.WiBaLo_drawLineText = Window_BattleLog.prototype.drawLineText;
    Window_BattleLog.prototype.drawLineText = function (index) {
        var sprite = this._logSprites[index + 1];
        var baseContents = this.contents;
        this.contents = sprite.bitmap;

        if (MPPlugin.ItemNameOnly) {
            var rect = this.itemRectForText(index);
            this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
            this.drawText(this._lines[index], rect.x, rect.y, rect.width, 'center');
        } else {
            Alias.WiBaLo_drawLineText.apply(this, arguments);
        }

        this.contents = baseContents;
    };

    //326
    Window_BattleLog.prototype.endAction = function (subject) {
        //this.push('waitForNewLine');
        this.push('clear');
        this.push('performActionEnd', subject);
    };

    //345
    Alias.WiBaLo_displayAction = Window_BattleLog.prototype.displayAction;
    Window_BattleLog.prototype.displayAction = function (subject, item) {
        if (MPPlugin.ItemNameOnly) {
            if (!DataManager.isSkill(item) || !MPPlugin.NotDisplaySkils.contains(item.id)) {
                this.push('addItemName', item.name);
            }
        }
        this._isNotDisplay = (MPPlugin.NotDisplaySkils.contains(item.id));
        Alias.WiBaLo_displayAction.apply(this, arguments);
    };

    Window_BattleLog.prototype.drawItem = function (index) {
        var rect = this.itemRectForText(index);
        this.drawTextEx(this._logs[index], rect.x, rect.y, rect.width);
    };

    Window_BattleLog.prototype.startSelect = function (height) {
        // this.activate();
        // this.opacity = 255;
        // this.height = height;
        // this.createContents();
        // this.openness = 0;
        // this.open();
        // this._logMainSprite.visible = false;
        // this._backSprite.visible = false;
        // this.select(Math.max(this.maxItems() - 1, 0));
        // this.refresh();
    };

    //
    Window_BattleLog.prototype.endSelect = function () {
        // this.deactivate();
        // this.opacity = 0;
        // this.height = this.windowHeight();
        // this._logMainSprite.visible = true;
        // this._backSprite.visible = true;
        // this.downArrowVisible = false;
        // this.upArrowVisible = false;
        // this.deselect();
        // this.refresh();
    };

    //-----------------------------------------------------------------------------
    // Window_PartyCommand

    //28
    Alias.WiPaCo_makeCommandList = Window_PartyCommand.prototype.makeCommandList;
    Window_PartyCommand.prototype.makeCommandList = function () {
        Alias.WiPaCo_makeCommandList.apply(this, arguments);
        if (MPPlugin.LogCommand)
            this.addCommand(MPPlugin.LogCommand, 'battleLog');
    };

    //-----------------------------------------------------------------------------
    // Sprite_Battler

    //
    Sprite_Battler.prototype.isAnimationPlaying = function () {
        return this._animationSprites.some(function (animation) {
            return animation._duration > MPPlugin.AnimationShortCount;
        });
    };

    //-----------------------------------------------------------------------------
    // Spriteset_Battle

    //271
    Spriteset_Battle.prototype.isBusy = function () {
        return this.isAnimationPlaying();// || this.isAnyoneMoving();
    };

    //-----------------------------------------------------------------------------
    // Scene_Battle

    //46
    Alias.ScBat_isAnyInputWindowActive = Scene_Battle.prototype.isAnyInputWindowActive;
    Scene_Battle.prototype.isAnyInputWindowActive = function () {
        return (Alias.ScBat_isAnyInputWindowActive.apply(this, arguments) ||
            this._logWindow.active);
    };

    //127
    Alias.ScBat_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
    Scene_Battle.prototype.createDisplayObjects = function () {
        Alias.ScBat_createDisplayObjects.apply(this, arguments);
        if (MPPlugin.StartMessagesOnLog)
            BattleManager.displayStartMessagesOnLog();
    };

    //156
    Alias.ScBat_createLogWindow = Scene_Battle.prototype.createLogWindow;
    Scene_Battle.prototype.createLogWindow = function () {
        Alias.ScBat_createLogWindow.apply(this, arguments);
        this._logWindow.y = MPPlugin.LogWindowY;
        this._logWindow.setHandler('cancel', this.onLogCancel.bind(this));
    };

    //166
    Alias.ScBat_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
    Scene_Battle.prototype.createPartyCommandWindow = function () {
        Alias.ScBat_createPartyCommandWindow.apply(this, arguments);
        this._partyCommandWindow.setHandler('battleLog', this.commandLog.bind(this));
    };

    Scene_Battle.prototype.commandLog = function () {
        this._logWindow.startSelect(this._statusWindow.y);
    };

    Scene_Battle.prototype.onLogCancel = function () {
        this._logWindow.endSelect();
        this._partyCommandWindow.activate();
    };

    //400
    Alias.ScBat_endCommandSelection = Scene_Battle.prototype.endCommandSelection;
    Scene_Battle.prototype.endCommandSelection = function () {
        Alias.ScBat_endCommandSelection.call(this);
        this._logWindow.endSelect();
    };



})();
