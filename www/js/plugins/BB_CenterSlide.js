//=============================================================================
// BB_CenterSlide.js
//=============================================================================

/*:
 * @plugindesc 画面の中心点をずらすプラグイン
 * @author ビービー
 * 
 * @param Switch ID
 * @desc 指定したスイッチIDがONの時に中心点をずらします。デフォルト：1
 * @default 1
 * 
 * @param Center X
 * @desc 画面中心点をX方向にずらす数値です。デフォルト：0
 * @default 0
 * 
 * @param Center Y
 * @desc 画面中心点をY方向にずらす数値です。デフォルト：0
 * @default 0
 * 
 * @help 画面の中心点をずらすプラグインです。
 * ※スイッチをＯＮにしただけでは中心点をずらすことはできません。
 * 場所移動などでマップがリロードされるタイミングで中心点をずらします。
 * 画面切り替えなしでずらしたい場合は、場所移動を向きそのまま、フェードなしで
 * 今いる場所を指定していただけるのがベストかと思います。
 * 
 * パラメータ
 * Switch ID：指定したスイッチIDがONの時に中心点をずらします。デフォルト：1
 * Center X：画面中心点をX方向にずらす数値です。マイナス値で逆にずらせます。
 * Center Y：画面中心点をY方向にずらす数値です。マイナス値で逆にずらせます。
 * 
 */

(function () {

    // プラグインパラメータ管理
    var parameters = PluginManager.parameters('BB_CenterSlide');
    var BBcenterX = Number(parameters['Center X'] || 0);
    var BBcenterY = Number(parameters['Center Y'] || 0);
    var BBCSswitch = Number(parameters['Switch ID'] || 1);

    Game_Player.prototype.centerX = function () {
        var x = BBcenterX;
        if ($gameSwitches.value(BBCSswitch)) {
            return (Graphics.width / $gameMap.tileWidth() - 1) / 2.0 - x;
        } else {
            return (Graphics.width / $gameMap.tileWidth() - 1) / 2.0;
        }
    };

    Game_Player.prototype.centerY = function () {
        var y = BBcenterY;
        if ($gameSwitches.value(BBCSswitch)) {
            return (Graphics.height / $gameMap.tileHeight() - 1) / 2.0 + y;
        } else {
            return (Graphics.height / $gameMap.tileHeight() - 1) / 2.0;
        }
    };

})();