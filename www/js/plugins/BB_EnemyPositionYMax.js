//============================================================================
// BB_EnemyPositionYMax.js
// Copyright (c) 2017 BB ENTERTAINMENT
//============================================================================

/*:
 * @plugindesc 戦闘時の敵グラフィック配置範囲を画面下端まで拡大or移動できるようにするプラグイン。
 * @author ビービー
 *
 * @param Fit_or_Slide
 * @type boolean
 * @desc 敵配置範囲の高さを拡大するか移動する(ずらす)か。
 * true(ON) = 配置範囲拡大  false(OFF) = 配置範囲移動
 * @default true
 *
 * @help 【プラグインの説明】
 * 戦闘時の敵グラフィック配置範囲を画面下端まで
 * 拡大or移動できるようにするプラグイン。
 *
 * 拡大：
 * エディター上で配置した位置の高さを1.42倍した位置に敵を配置します。
 * エディター上で配置した敵同士の感覚が変わりますが、
 * 画面最上部まで敵を配置できます。
 *
 * 移動：
 * エディター上で配置した位置の高さに180pxを足した位置に敵を配置します。
 * 画面最上部への配置ができなくなりますが、
 * エディター上で設定した敵同士の配置間隔は変わりません。
 *
 * 【パラメータ】
 * ◆Fit_or_Slide
 * 敵配置範囲の高さを拡大するか移動する(ずらす)かを選択できます。
 * true(ON) = 配置範囲拡大  false(OFF) = 配置範囲移動
 *
 *
 * 【利用規約】
 * このプラグインは、MITライセンスのもとで公開されています。
 * Copyright (c) 2017 BB ENTERTAINMENT
 * Released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 *
 * コンタクト：
 * BB ENTERTAINMENT Twitter: https://twitter.com/BB_ENTER/
 * BB ENTERTAINMENT BLOG   : http://bb-entertainment-blog.blogspot.jp/
 */


(function () {
    'use strict';
    //----------------------------------------------------------------------------
    // プラグインパラメータ管理
    var parameters = PluginManager.parameters('BB_EnemyPositionYMax');
    var BBEPYM = (parameters['Fit_or_Slide'] == "true");

    var _Sprite_Enemy_updatePosition = Sprite_Enemy.prototype.updatePosition;
    Sprite_Enemy.prototype.updatePosition = function () {
        _Sprite_Enemy_updatePosition.apply(this);
        if (BBEPYM) {
            this.y = this.y * 1.42;
        } else {
            this.y += 180;
        }
    };

})();