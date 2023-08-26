//===========================================================================
// MPI_SetVariableRange.js
//===========================================================================

/*:
 * @plugindesc 変数に設定できる値の下限と上限を設定します。
 * @author 奏ねこま（おとぶき ねこま）
 *
 * @help
 * [ 概要 ] ...
 *  プラグインコマンドにて、変数に設定できる下限と上限を設定します。
 *
 * [ プラグインコマンド ] ...
 *  SetVariableRange <variableId> <min value> <max value>
 *
 *  下限のみを指定することもできます（上限のみは不可）。
 *  下限、上限ともに指定を省略した場合、制限を解除します。
 *
 *  例：変数#0002の下限を10に設定（上限は省略）
 *   SetVariableRange 2 10
 *
 *  例：変数#0004の下限を20、上限を50に設定
 *   SetVariableRange 4 20 50
 *
 *  例：変数#0006の下限と上限を解除
 *   SetVariableRange 6
 *
 * [ 利用規約 ] ................................................................
 *  ・本プラグインの利用は、RPGツクールMV/RPGMakerMVの正規ユーザーに限られます。
 *  ・商用、非商用、有償、無償、一般向け、成人向けを問わず、利用可能です。
 *  ・利用の際、連絡や報告は必要ありません。また、製作者名の記載等も不要です。
 *  ・プラグインを導入した作品に同梱する形以外での再配布、転載はご遠慮ください。
 *  ・不具合対応以外のサポートやリクエストは、基本的に受け付けておりません。
 *  ・本プラグインにより生じたいかなる問題についても、一切の責任を負いかねます。
 * [ 改訂履歴 ] ................................................................
 *   Version 1.00  2017/01/01  First edition.
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 *  Web Site: http://makonet.sakura.ne.jp/rpg_tkool/
 *  Twitter : https://twitter.com/koma_neko
 *  Copylight (c) 2017 Nekoma Otobuki
 */

var Imported = Imported || {};
Imported.MPI_SetVariableRange = true;

var Makonet = Makonet || {};
Makonet.SVR = {};

(function () {
    'use strict';

    var SVR = Makonet.SVR;
    SVR.product = 'MPI_SetVariableRange';
    SVR.parameters = PluginManager.parameters(SVR.product);

    var _ = SVR.product;

    //==============================================================================
    // Game_System
    //==============================================================================

    Object.defineProperty(Game_System.prototype, _, {
        get: function () {
            return this['_' + _] = this['_' + _] || { range: [] };
        },
        set: function (value) {
            this['_' + _] = value;
        },
        configurable: true
    });

    //==============================================================================
    // Game_Interpreter
    //==============================================================================

    (function (o, p) {
        var f = o[p]; o[p] = function (command, args) {
            f.apply(this, arguments);
            if (command === 'SetVariableRange') {
                var id = +args[0];
                var min = +args[1];
                var max = +args[2];
                if (!min && !max) {
                    delete $gameSystem[_].range[id];
                } else {
                    $gameSystem[_].range[id] = { min: min, max: max };
                }
            }
        };
    }(Game_Interpreter.prototype, 'pluginCommand'));

    //==============================================================================
    // Game_Variables
    //==============================================================================

    (function (o, p) {
        var f = o[p]; o[p] = function (variableId, value) {
            var _value = value;
            if ($gameSystem[_].range[variableId]) {
                var min = $gameSystem[_].range[variableId].min || 0;
                var max = $gameSystem[_].range[variableId].max || Number.MAX_VALUE;
                _value = value.clamp(min, max);
            }
            f.call(this, variableId, _value);
        };
    }(Game_Variables.prototype, 'setValue'));
}());