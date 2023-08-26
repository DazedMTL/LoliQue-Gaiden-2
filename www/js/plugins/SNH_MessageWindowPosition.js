//=============================================================================
// SNH_MessageWindowPosition.js
//=============================================================================

/*:
 * @plugindesc Change something.
 * @author SotoNoHito
 *
 * @help OMG! Sory. I can not write a English. Because I am Japanese! 
 *
 * This plugin is released under the MIT License.
 */

/*:ja
 * @plugindesc メッセージウィンドウの位置調整プラグイン
 * @author ガバチョ（そとの人）(https://star-write-dream.com)
 * @help プラグインコマンドはありません。
 * このプラグインはMITライセンスです。
 *  ----------------------------------------------------------------------------
 *
 * メッセージウィンドウの位置を調整します。
 *
 * ----------------------------------------------------------------------------
 * パラメータ
 * 
 * ■上ウィンドウ調整X（初期値：0）
 * メッセージウィンドウの横位置を調整する値をピクセル数で指定。
 * ウィンドウ位置が「上」の時に影響します。
 * プラスで右、マイナスで左に動きます。
 * 
 * ■上ウィンドウ調整Y（初期値：0）
 * メッセージウィンドウの縦位置を調整する値をピクセル数で指定。
 * ウィンドウ位置が「上」の時に影響します。
 * プラスで下、マイナスで上に動きます。
 * 
 * ■中ウィンドウ調整X（初期値：0）
 * メッセージウィンドウの横位置を調整する値をピクセル数で指定。
 * ウィンドウ位置が「中」の時に影響します。
 * プラスで右、マイナスで左に動きます。
 * 
 * ■中ウィンドウ調整Y（初期値：0）
 * メッセージウィンドウの縦位置を調整する値をピクセル数で指定。
 * ウィンドウ位置が「中」の時に影響します。
 * プラスで下、マイナスで上に動きます。
 * 
 * ■下ウィンドウ調整X（初期値：0）
 * メッセージウィンドウの横位置を調整する値をピクセル数で指定。
 * ウィンドウ位置が「下」の時に影響します。
 * プラスで右、マイナスで左に動きます。
 * 
 * ■下ウィンドウ調整Y（初期値：0）
 * メッセージウィンドウの縦位置を調整する値をピクセル数で指定。
 * ウィンドウ位置が「下」の時に影響します。
 * プラスで下、マイナスで上に動きます。
 * 
 * 
 * @param 上ウィンドウ調整X
 * @type number
 * @desc メッセージウィンドウの横位置を調整する値をピクセル数で指定。ウィンドウ位置が「上」の時に影響します。（初期値：0）
 * @default 0
 * @min -999
 * 
 * @param 上ウィンドウ調整Y
 * @type number
 * @desc メッセージウィンドウの縦位置を調整する値をピクセル数で指定。ウィンドウ位置が「上」の時に影響します。（初期値：0）
 * @default 0
 * @min -999
 *
 * @param 中ウィンドウ調整X
 * @type number
 * @desc メッセージウィンドウの横位置を調整する値をピクセル数で指定。ウィンドウ位置が「中央」の時に影響します。（初期値：0）
 * @default 0
 * @min -999
 *
 * @param 中ウィンドウ調整Y
 * @type number
 * @desc メッセージウィンドウの縦位置を調整する値をピクセル数で指定。ウィンドウ位置が「中央」の時に影響します。（初期値：0）
 * @default 0
 * @min -999
 *
 * @param 下ウィンドウ調整X
 * @type number
 * @desc メッセージウィンドウの横位置を調整する値をピクセル数で指定。ウィンドウ位置が「下」の時に影響します。（初期値：0）
 * @default 0
 * @min -999
 *
 * @param 下ウィンドウ調整Y
 * @type number
 * @desc メッセージウィンドウの縦位置を調整する値をピクセル数で指定。ウィンドウ位置が「下」の時に影響します。（初期値：0）
 * @default 0
 * @min -999
 *
 *
*/

(function () {

    var parameters = PluginManager.parameters('SNH_MessageWindowPosition');
    var uX = Number(parameters['上ウィンドウ調整X'] || 0);
    var uY = Number(parameters['上ウィンドウ調整Y'] || 0);
    var mX = Number(parameters['中ウィンドウ調整X'] || 0);
    var mY = Number(parameters['中ウィンドウ調整Y'] || 0);
    var dX = Number(parameters['下ウィンドウ調整X'] || 0);
    var dY = Number(parameters['下ウィンドウ調整Y'] || 0);

    var adjust = function (target) {
        //マップシーンに限定
        if (SceneManager._scene.constructor != Scene_Map) {
            return;
        }
        target.x = 0;
        switch (target._positionType) {
            case 0:
                target.x += uX;
                target.y += uY;
                break;
            case 1:
                target.x += mX;
                target.y += mY;
                break;
            case 2:
                target.x += dX;
                target.y += dY;
                break;
            default:
                break;

        }
    }

    var _Window_Message_updatePlacement = Window_Message.prototype.updatePlacement;
    Window_Message.prototype.updatePlacement = function () {
        _Window_Message_updatePlacement.call(this);
        adjust(this);
    };

})();


