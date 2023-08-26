//=============================================================================
// SoR_NPC_LoopRouteMaker.js
// MIT License (C) 2020 蒼竜 @soryu_rpmaker
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Latest version v1.02 (2020/08/11)
//=============================================================================

/*:ja
* @plugindesc ＜イベントループ経路設定＞
* @author 蒼竜　@soryu_rpmaker
* @help　イベントの自立移動の中でも、指定ルートを巡回する機能を
* 強力にサポートします。移動コマンドの多用も、具体的な座標指定も不要で 
* コピー＆ペーストによる類似イベントの量産化がしやすいように
* リージョンIDを用いた直感的なルート指定を行う形式になっています。
*
* 基本的な導入は以下の3ステップで可能です。
* 1. 適当なリージョンIDでマップ上に経路を作成する
* 2. 対象イベントのメモ欄に <LoopRoute> タグを入れる
* 3. 対象イベントの実行内容に「注釈」で "TraceRegion: 指定したリージョンID" と書く
*
* 動作を細かく指定するために、注釈に記述する他のコマンドも提供されています。
* 使い方によっては、幅広い応用例が見込まれます。
*
* 詳細な用例は
* http://dragonflare.dip.jp/dcave/
* にあるドキュメントを参照してください。
*
* -----------------------------------------------------------
* バージョン情報
* -----------------------------------------------------------
* v1.02 (2020/08/11)       単方向ワープ巡回の挙動調整
* v1.01 (2020/08/08)       タグ処理変更，単方向ワープ巡回実装
* v1.00 (2020/07/31)       公開
*/
/*:
* @plugindesc <Loop Traverse for Events>
* @author @soryu_rpmaker
* @help　This enforces autonomouse movement feature for events 
* which easily implements to traverse specific loops.
* In this plugin, neither many set move route commands nor 
* specification of coordinates are required.
* By using Region ID as you paint routes on the map,
* you can easily manipulate the event movement on designated route. 
*
* Basically, just following 3 steps for usage
* 1. Create a route by specific Region ID on your map.
* 2. Put <LoopRoute> tag into the note for events which you want to manipulate.
* 3. In the contents for the event, write a Comment "TraceRegion: [your specified RegionID]".
*
* For those who want to specify the behavior more detail,
* other commands to write in the comment are provided.
*
* Also see
* http://dragonflare.dip.jp/dcave/index_e.php
* for more detail.
*
* -----------------------------------------------------------
* Version info.
* -----------------------------------------------------------
* v1.02 (2020/08/11)       Modification for Warp on the route
* v1.01 (2020/08/08)       Modification for Tag process / Implementation of Warp on the route
* v1.00 (2020/07/31)       released!
*/

(function () {

	var SoR_RLM_GE_setupPage = Game_Event.prototype.setupPage;
	Game_Event.prototype.setupPage = function () {
		SoR_RLM_GE_setupPage.call(this);
		this.InitRouteLoopMaker();
	}
	Game_Event.prototype.InitRouteLoopMaker = function () {
		this.traceRegionID = 0;
		this.traceRegionID_2 = -1;
		this.traceRegionID_3 = -1;
		this.RouteLoopFlow = this._direction;
		this.RFS = false;
		this.isFloating = false;
		this.isFloating2 = false;
		this.isEnableReverse = false;
		this.isColliding = false;
		this.RouteWarp = { id: 0, x: 0, y: 0, dir: 0 };

		if (this.event().meta.LoopRoute) {
			var p_idx = this.findProperPageIndex();
			for (var i = 0; i < this.event().pages[p_idx].list.length; i++) {
				if (this.event().pages[p_idx].list[i].code == 108 || this.event().pages[p_idx].list[i].code == 408) {
					var com = this.event().pages[p_idx].list[i].parameters;
					this.SetRouteLoopMakeTags(com[0]);
				}
			}
		}
	}
	Game_Event.prototype.SetRouteLoopMakeTags = function (com) {
		if (com.match(/(?:TraceRegion):[ ]*(\d+)/i)) this.traceRegionID = parseInt(RegExp.$1);
		else if (com.match(/(?:Trace_ADDRegion2):[ ]*(\d+)/i)) this.traceRegionID_3 = parseInt(RegExp.$1);
		else if (com.match(/(?:Trace_ADDRegion):[ ]*(\d+)/i)) this.traceRegionID_2 = parseInt(RegExp.$1);
		else if (com.match(/(?:InitialDir):[ ]*(\d+)/i)) {
			var d = parseInt(RegExp.$1);
			if (d != 0 && Math.floor(d / 10) == 0 && d % 2 == 0) this.RouteLoopFlow = parseInt(RegExp.$1);
		}
		else if (com.match(/(?:RightFirstSearch)[ ]*/i)) this.RFS = true;
		else if (com.match(/(?:Floating2)[ ]*/i)) this.isFloating2 = true;
		else if (com.match(/(?:Floating)[ ]*/i)) this.isFloating = true;
		else if (com.match(/(?:CollisionReverse)[ ]*/i)) this.isEnableReverse = true;
		else if (com.match(/(?:Warp(\d+)):[ ]*(\d+),[ ]*(\d+),[ ]*(up|down|left|right)/i)) {
			this.RouteWarp.id = parseInt(RegExp.$1);
			this.RouteWarp.x = parseInt(RegExp.$2);
			this.RouteWarp.y = parseInt(RegExp.$3);
			switch (RegExp.$4) {
				case 'up':
					this.RouteWarp.dir = 8;
					break;
				case 'down':
					this.RouteWarp.dir = 2;
					break;
				case 'left':
					this.RouteWarp.dir = 4;
					break;
				case 'right':
					this.RouteWarp.dir = 6;
					break;
			}
		}

	}

	var SoR_RLM_GE_updateSelfMovement = Game_Event.prototype.updateSelfMovement;
	Game_Event.prototype.updateSelfMovement = function () {

		SoR_RLM_GE_updateSelfMovement.call(this);

		if (this.event().meta.LoopRoute) {
			if (!this._locked && this.isNearTheScreen() && this.checkStop(this.stopCountThreshold())) {

				if (this.traceRegionID != 0 && this.RouteLoopFlow != 0) {
					var x = this.x;
					var y = this.y;

					if ($gameMap.regionId(x, y) == this.traceRegionID || $gameMap.regionId(x, y) == this.traceRegionID_2 || $gameMap.regionId(x, y) == this.traceRegionID_3) {

						if (this.RouteWarp.id == $gameMap.regionId(x, y)) {
							this.WarpOnRegion();
							return;
						}

						if (this.isColliding) {//intersect to other regions
							this.isColliding = false;
							this.RouteLoopFlow = 10 - this.RouteLoopFlow;
							this.LRM_move1step(this.RouteLoopFlow);
						}
						else {
							var d = this.RouteLoopFlow;
							var x2 = $gameMap.roundXWithDirection(x, d);
							var y2 = $gameMap.roundYWithDirection(y, d);

							if (this.LoopRouteNPC_Passable(x, y, d) && ($gameMap.regionId(x2, y2) == this.traceRegionID || $gameMap.regionId(x2, y2) == this.traceRegionID_2 || $gameMap.regionId(x2, y2) == this.traceRegionID_3)) {
								this.LRM_move1step(d);
							}
							else {
								var dir = d;
								var i;
								var keepdir = 0;
								for (i = 0; i < 5; i++) {
									dir = (dir * 2) % 10;
									if ((!this.RFS && (i == 2 || i == 4)) || (this.RFS && (i == 0 || i == 2))) {//search left 90
										var xn = $gameMap.roundXWithDirection(this.x, dir);
										var yn = $gameMap.roundYWithDirection(this.y, dir);
										if (this.LoopRouteNPC_Passable(x, y, dir) && $gameMap.regionId(xn, yn) == this.traceRegionID) {
											this.RouteLoopFlow = dir;
											this.LRM_move1step(this.RouteLoopFlow);
											break;
										}
										else if (this.LoopRouteNPC_Passable(x, y, dir) && ($gameMap.regionId(xn, yn) == this.traceRegionID_2 || $gameMap.regionId(xn, yn) == this.traceRegionID_3)) {
											keepdir = dir;
										}
									}
								}
								if (i == 5) { // no route?
									if (keepdir != 0) {//intersect to other regions
										this.RouteLoopFlow = keepdir;
										this.LRM_move1step(this.RouteLoopFlow);
									}
									else {
										this.checkEventTriggerTouchFront(this.RouteLoopFlow);
										if (this.isEnableReverse) {//reverse
											var r_dir = 10 - d;
											var xr = $gameMap.roundXWithDirection(this.x, r_dir);
											var yr = $gameMap.roundYWithDirection(this.y, r_dir);
											if (this.LoopRouteNPC_Passable(x, y, r_dir) && $gameMap.regionId(xr, yr) == this.traceRegionID) {
												this.RouteLoopFlow = r_dir;
												this.LRM_move1step(this.RouteLoopFlow);
											}
										}

									}

								}
							}
						}


					}
				}
			}


		}//LoopRouteTag

	}

	Game_Event.prototype.LoopRouteNPC_Passable = function (x, y, d) {

		if (this.isFloating) return true;
		else if (this.isFloating2) {
			var x2 = $gameMap.roundXWithDirection(x, d);
			var y2 = $gameMap.roundYWithDirection(y, d);
			return (!this.isCollidedE2E(x2, y2) && !this.isCollidedWithVehicles(x2, y2));
		}
		else return this.canPass(x, y, d);
	}



	Game_Event.prototype.isCollidedE2E = function (x, y) {
		var events = $gameMap.LRM_eventsXyNt(x, y, this);
		for (var i = 0; i < events.length; i++) {
			if (events[i].event().meta.LoopRoute) events[i].isColliding = true;
		}
		return events.length > 0;
	}

	Game_Map.prototype.LRM_eventsXyNt = function (x, y, ev) {
		return this.events().filter(function (event) {
			if (event != ev) return event.posNt(x, y);
		});
	}


	Game_Event.prototype.LRM_move1step = function (d) {
		this.setMovementSuccess(true);
		this.setDirection(d);
		this._x = $gameMap.roundXWithDirection(this._x, d);
		this._y = $gameMap.roundYWithDirection(this._y, d);
		this._realX = $gameMap.xWithDirection(this._x, this.reverseDir(d));
		this._realY = $gameMap.yWithDirection(this._y, this.reverseDir(d));
		this.increaseSteps();
		this.checkEventTriggerTouch(this._realX, this._realY);
	}

	Game_Event.prototype.LoopReversalSwitch = function () {
		var d = this.RouteLoopFlow;
		for (var i = 0; i < 2; i++) d = (d * 2) % 10;
		this.RouteLoopFlow = d;
	}

	//warp
	Game_Event.prototype.WarpOnRegion = function () {
		if (this.LoopRouteNPC_Passable(this.RouteWarp.x, this.RouteWarp.y, this.RouteWarp.dir)) {
			this.locate(this.RouteWarp.x, this.RouteWarp.y);
			this.setDirection(this.RouteWarp.dir);
			this.RouteLoopFlow = this.RouteWarp.dir;
			return true;
		}
		return false;
	}

})();