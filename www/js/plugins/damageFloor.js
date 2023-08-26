//=============================================================================
// 床ダメージ指定プラグイン
// floorDamageChange.js
// Copyright (c) 2018 村人Ａ
//=============================================================================

/*:ja
 * @plugindesc 床ダメージを変数により指定するプラグインです
 * @author 村人A
 *
 * @param ダメージ床変数
 * @desc ダメージ床に使用する変数を指定しますデフォルトは１
 * @default 1
 *
 * @help
 * ダメージ床のダメージ量を指定した変数により変更できます
 * ダメージを指定する変数はパラメータで指定してください
 * デフォルトは１です
 * ゼロのときはデフォルトの10ダメージとなります
 */

(function () {
	Game_Actor.prototype.basicFloorDamage = function () {
		var parameters = PluginManager.parameters('damageFloor');
		var damageFloorNum = $gameVariables.value(parameters['ダメージ床変数']) || 10;
		return damageFloorNum;
	};
})();