//===========================================================================
// MPI_OperateVariableInfo.js
//===========================================================================

/*:
 * @plugindesc イベントコマンド「変数の操作...」実行時にテキストウインドウを表示します。
 * @author 奏ねこま（おとぶき ねこま）
 *
 * @param 始点X座標
 * @desc スライドイン開始点のX座標を指定してください。
 * @default 816
 *
 * @param 始点Y座標
 * @desc スライドイン開始点のY座標を指定してください。
 * @default 500
 *
 * @param 表示X座標
 * @desc テキストを表示する位置のX座標を指定してください。
 * @default 576
 *
 * @param 表示Y座標
 * @desc テキストを表示する位置のY座標を指定してください。
 * @default 500
 *
 * @param 終点X座標
 * @desc スライドアウト終了点のX座標を指定してください。
 * @default 576
 *
 * @param 終点Y座標
 * @desc スライドアウト終了点のY座標を指定してください。
 * @default 480
 *
 * @param 幅
 * @desc ウインドウの幅を指定してください。
 * @default 240
 *
 * @param 高さ
 * @desc ウインドウの高さを指定してください。
 * @default 36
 *
 * @param 背景不透明度
 * @desc テキストの背景の不透明度を指定してください。（0～255）
 * @default 192
 *
 * @param 余白（左）
 * @desc テキストの左側の余白サイズを指定してください。
 * @default 8
 *
 * @param 余白（上）
 * @desc テキストの上側の余白サイズを指定してください。
 * @default 1
 *
 * @param フォントサイズ
 * @desc テキストのフォントサイズを指定してください。
 * @default 20
 *
 * @param スライドインのフレーム数
 * @desc スライドインの時間を、フレーム数で指定して下さい。
 * @default 15
 *
 * @param 表示フレーム数
 * @desc テキストを表示する時間を、フレーム数で指定してください。
 * @default 90
 *
 * @param スライドアウトのフレーム数
 * @desc スライドアウトの時間を、フレーム数で指定してください。
 * @default 10
 *
 * @param 代入テキスト
 * @desc 代入を実行したときに表示するテキストを指定してください。
 * @default _name_  = _operand_
 *
 * @param 加算テキスト
 * @desc 加算を実行したときに表示するテキストを指定してください。
 * @default _name_ += _operand_
 *
 * @param 減算テキスト
 * @desc 減算を実行したときに表示するテキストを指定してください。
 * @default _name_ -= _operand_
 *
 * @param 乗算テキスト
 * @desc 乗算を実行したときに表示するテキストを指定してください。
 * @default _name_ *= _operand_
 *
 * @param 除算テキスト
 * @desc 除算を実行したときに表示するテキストを指定してください。
 * @default _name_ /= _operand_
 *
 * @param 余剰テキスト
 * @desc 余剰を実行したときに表示するテキストを指定してください。
 * @default _name_ %= _operand_
 *
 * @param テキスト表示対象変数
 * @desc テキスト表示を行う変数の番号を指定してください。カンマ区切りで複数指定できます。
 * @default 
 *
 * @param テキスト非表示スイッチ番号
 * @desc テキスト非表示の制御を行うスイッチの番号を指定してください。
 * @default 0
 *
 * @help
 * [ 概要 ] ...
 *  イベントコマンド「変数の操作...」実行時に、テキストウインドウを表示します。
 *  プラグインパラメータで指定した始点座標から表示座標までスライドインし、
 *  表示座標でしばらく停止、その後、終点座標までスライドアウトします。
 *
 * [ テキストについて ] ...
 *  テキストに「_name_」と書くと、その部分は変数名に置き換えれます。
 *  テキストに「_operand_」と書くと、その部分はオペランドに置き換えられます。
 *  テキストに「_value_」と書くと、その部分は変数の値に置き換えれます。
 *  イベントコマンド「文章の表示...」で使用できる制御文字が、一部使用できます。
 *
 * [ プラグインコマンド ] ...
 *  プラグインコマンドはありません。
 *
 * [ 利用規約 ] ................................................................
 *  ・本プラグインの利用は、RPGツクールMV/RPGMakerMVの正規ユーザーに限られます。
 *  ・商用、非商用、有償、無償、一般向け、成人向けを問わず、利用可能です。
 *  ・利用の際、連絡や報告は必要ありません。また、製作者名の記載等も不要です。
 *  ・プラグインを導入した作品に同梱する形以外での再配布、転載はご遠慮ください。
 *  ・不具合対応以外のサポートやリクエストは、基本的に受け付けておりません。
 *  ・本プラグインにより生じたいかなる問題についても、一切の責任を負いかねます。
 * [ 改訂履歴 ] ................................................................
 *   Version 1.00  2016/11/11  First edition.
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 *  Web Site: http://makonet.sakura.ne.jp/rpg_tkool/
 *  Twitter : https://twitter.com/koma_neko
 *  Copylight (c) 2016 Nekoma Otobuki
 */

var Imported = Imported || {};
Imported.MPI_OperateVariableInfo = true;

var Makonet = Makonet || {};
Makonet.OVI = {};

(function () {
    'use strict';

    var OVI = Makonet.OVI;
    OVI.product = 'MPI_OperateVariableInfo';
    OVI.parameters = PluginManager.parameters(OVI.product);
    OVI.init_x = +OVI.parameters['始点X座標'];
    OVI.init_y = +OVI.parameters['始点Y座標'];
    OVI.disp_x = +OVI.parameters['表示X座標'];
    OVI.disp_y = +OVI.parameters['表示Y座標'];
    OVI.end_x = +OVI.parameters['終点X座標'];
    OVI.end_y = +OVI.parameters['終点Y座標'];
    OVI.width = +OVI.parameters['幅'];
    OVI.height = +OVI.parameters['高さ'];
    OVI.opacity = +OVI.parameters['背景不透明度'];
    OVI.padding = {
        left: +OVI.parameters['余白（左）'],
        top: +OVI.parameters['余白（上）']
    };
    OVI.font_size = +OVI.parameters['フォントサイズ'];
    OVI.frame = {
        slide_in: +OVI.parameters['スライドインのフレーム数'],
        display: +OVI.parameters['表示フレーム数'],
        slide_out: +OVI.parameters['スライドアウトのフレーム数']
    };
    OVI.text = [OVI.parameters['代入テキスト'],
    OVI.parameters['加算テキスト'],
    OVI.parameters['減算テキスト'],
    OVI.parameters['乗算テキスト'],
    OVI.parameters['除算テキスト'],
    OVI.parameters['余剰テキスト']];
    OVI.variableId = OVI.parameters['テキスト表示対象変数'].trim().split(/ *, */).map(function (value) { return +value; });
    OVI.switchId = +OVI.parameters['テキスト非表示スイッチ番号'] || 0;

    function _(object) {
        return object[OVI.product] = object[OVI.product] || {};
    }

    //==============================================================================
    // Window_Variable
    //==============================================================================

    function Window_Variable() {
        this.initialize.apply(this, arguments);
    }

    Window_Variable.prototype = Object.create(Window_Base.prototype);
    Window_Variable.prototype.constructor = Window_Variable;

    Window_Variable.prototype.initialize = function (variableId, operationType, value) {
        this._param = {
            init_x: OVI.init_x,
            init_y: OVI.init_y,
            disp_x: OVI.disp_x,
            disp_y: OVI.disp_y,
            end_x: OVI.end_x,
            end_y: OVI.end_y,
            width: OVI.width,
            height: OVI.height,
            opacity: OVI.opacity,
            disp_text: OVI.text[operationType].replace(/_name_/, $dataSystem.variables[variableId]
            ).replace(/_operand_/, value
            ).replace(/_value_/, $gameVariables.value(variableId)),
            padding_l: OVI.padding.left,
            padding_t: OVI.padding.top,
            font_size: OVI.font_size,
            duration: [OVI.frame.slide_in,
            OVI.frame.display,
            OVI.frame.slide_out,
                0]
        };

        Window_Base.prototype.initialize.call(this, 0, 0, 0, 0);

        this.margin = 0;
        this.padding = 0;
        this.move(this._param.init_x, this._param.init_y, this._param.width, this._param.height);
        this.contents = new Bitmap(this._param.width, this._param.height);
        this._windowFrameSprite.visible = false;
        this.drawTextEx(this._param.disp_text, this._param.padding_l, this._param.padding_t);

        this._move_x = [parseInt((this._param.disp_x - this._param.init_x) / this._param.duration[0]),
        parseInt((this._param.end_x - this._param.disp_x) / this._param.duration[2])];
        this._move_y = [parseInt((this._param.disp_y - this._param.init_y) / this._param.duration[0]),
        parseInt((this._param.end_y - this._param.disp_y) / this._param.duration[2])];
        this._phase = 0;
        this._duration = this._param.duration.slice();
        this._shift_y = (this._param.height + 2) / this._param.duration[0] * ((this._param.disp_y > this._param.end_y) ? -1 : 1);

        this.opacity = 0;
        this.contentsOpacity = 0;
        this.backOpacity = this._param.opacity;
    };

    Window_Variable.prototype.standardFontSize = function () {
        return this._param.font_size;
    };

    Window_Variable.prototype.update = function () {
        Window_Base.prototype.update.call(this);
        var x, y;
        switch (this._phase) {
            case 0:
                this.x += this._move_x[0];
                this.y += this._move_y[0];
                this._duration[0]--;
                this.opacity = this.contentsOpacity = parseInt(255 * (1 - this._duration[0] / this._param.duration[0]));
                if (!this._duration[0]) {
                    this.opacity = this.contentsOpacity = 255;
                    this._phase = 1;
                }
                break;
            case 1:
                this._duration[1]--;
                if (!this._duration[1]) {
                    this._phase = 2;
                }
                break;
            case 2:
                this.x += this._move_x[1];
                this.y += this._move_y[1];
                this._duration[2]--;
                this.opacity = this.contentsOpacity = parseInt(255 * (this._duration[2] / this._param.duration[2]));
                if (!this._duration[2]) {
                    this.opacity = this.contentsOpacity = 0;
                    this._phase = 3;
                }
                break;
            case 3:
                this.parent.removeChild(this);
                break;
        }
        if (this._phase < 3 && this._duration[3]) {
            this.y += this._shift_y;
            this._duration[3]--;
        }
    };

    Window_Variable.prototype.shift = function () {
        this._duration[3] += this._param.duration[0];
    };

    //==============================================================================
    // Spriteset_Base
    //==============================================================================

    (function (p, c) {
        var f = p[c]; p[c] = function () {
            f.apply(this, arguments);
            var width = Graphics.boxWidth;
            var height = Graphics.boxHeight;
            var x = (Graphics.width - width) / 2;
            var y = (Graphics.height - height) / 2;
            var _this = _(this);
            _this._container = new Sprite();
            _this._container.setFrame(x, y, width, height);
            this.addChild(_this._container);
        };
    }(Spriteset_Base.prototype, 'createPictures'));

    //==============================================================================
    // Game_Interpreter
    //==============================================================================

    (function (p, c) {
        var f = p[c]; p[c] = function (variableId, operationType, value) {
            f.apply(this, arguments);
            if (OVI.switchId && $gameSwitches.value(OVI.switchId)) { return; }
            if (!OVI.variableId.contains(variableId)) { return; }
            var container = _(SceneManager._scene._spriteset)._container;
            container.children.forEach(function (child) {
                child.shift();
            });
            container.addChild(new Window_Variable(variableId, operationType, value));
        };
    }(Game_Interpreter.prototype, 'operateVariable'));
}());
