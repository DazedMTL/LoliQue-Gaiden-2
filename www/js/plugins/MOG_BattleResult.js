//=============================================================================
// MOG_BattleResult.js
//=============================================================================

/*:ja
 * @plugindesc (v1.3) 戦闘結果画面を装飾します。
 * @author Moghunter
 *
 * @param Exp X-Axis
 * @text 経験値のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @default 760
 *
 * @param Exp Y-Axis
 * @text 経験値のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @default 160
 *
 * @param Gold X-Axis
 * @text 所持金のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @default 760
 *
 * @param Gold Y-Axis
 * @text 所持金のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @default 230
 *
 * @param Treasure X-Axis
 * @text ドロップアイテムのX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @default 32
 *
 * @param Treasure Y-Axis
 * @text ドロップアイテムのY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @default 330
 *
 * @param Actor X-Axis
 * @text アクター画像のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @default 250
 *
 * @param Actor Y-Axis
 * @text アクター画像のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 *
 * @param Parameter Real X-Axis
 * @text 能力値のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 *
 * @param Parameter Real Y-Axis
 * @text 能力値のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 *
 * @param Parameter 1 X-Axis
 * @text レベルアップ前能力値のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @default 550
 *
 * @param Parameter 1 Y-Axis
 * @text レベルアップ前能力値のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @default 140
 *
 * @param Parameter 2 X-Axis
 * @text レベルアップ後能力値のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @default 700
 *
 * @param Parameter 2 Y-Axis
 * @text レベルアップ後能力値のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @default 140
 *
 * @param New Skill X-Axis
 * @text 新しいスキルのX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @default 570
 *
 * @param New Skill Y-Axis
 * @text 新しいスキルのY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @default 520
 *
 * @param Name X-Axis
 * @text アクター名のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @default 155
 *
 * @param Name Y-Axis
 * @text アクター名のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @default 540
 *
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 * ===========================================================================
 * +++ MOG - Battle Result (v1.3) +++
 * By Moghunter
 * https://atelierrgss.wordpress.com/
 * ===========================================================================
 * 戦闘結果画面を装飾します。
 * ===========================================================================
 * 下記の画像が必要です。
 * 画像は下記フォルダに保存してください。
 * /img/system/
 *
 * Result_A.png
 * Result_B.png
 * Result_C.png
 * Result_D.png
 * Result_E.png
 *
 * ===========================================================================
 * アクター画像
 * ===========================================================================
 * 下記の画像が必要です。
 * 画像は下記フォルダに保存してください。
 * /img/picture/
 *
 * 下記のように画像に名前を付けます。
 *
 * Actor_ ActorID
 *
 * 例
 *
 * Actor_1.png
 * Actor_2.png
 * Actor_3.png
 * ...
 *
 * ===========================================================================
 * 更新履歴
 * ===========================================================================
 * (v1.3) - 値が24より大きい場合のアイテムの表示の修正
 * (v1.2) - プラグインパラメータが機能しなかったのを修正
 * (v1.1) - 次のバトルでステータスウィンドウを表示しないように修正
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================

var Imported = Imported || {};
Imported.MOG_BattleResult = true;
var Moghunter = Moghunter || {};
Moghunter.parameters = PluginManager.parameters('MOG_BattleResult');
Moghunter.bresult_exp_x = Number(Moghunter.parameters['Exp X-Axis'] || 760);
Moghunter.bresult_exp_y = Number(Moghunter.parameters['Exp Y-Axis'] || 160);
Moghunter.bresult_gold_x = Number(Moghunter.parameters['Gold X-Axis'] || 760);
Moghunter.bresult_gold_y = Number(Moghunter.parameters['Gold Y-Axis'] || 230);
Moghunter.bresult_treasure_x = Number(Moghunter.parameters['Treasure X-Axis'] || 32);
Moghunter.bresult_treasure_y = Number(Moghunter.parameters['Treasure Y-Axis'] || 330);
Moghunter.bresult_actor_x = Number(Moghunter.parameters['Actor X-Axis'] || 250);
Moghunter.bresult_actor_y = Number(Moghunter.parameters['Actor Y-Axis'] || 0);
Moghunter.bresult_par0_x = Number(Moghunter.parameters['Parameter Real X-Axis'] || 0);
Moghunter.bresult_par0_y = Number(Moghunter.parameters['Parameter Real Y-Axis'] || 0);
Moghunter.bresult_par1_x = Number(Moghunter.parameters['Parameter 1 X-Axis'] || 550);
Moghunter.bresult_par1_y = Number(Moghunter.parameters['Parameter 1 Y-Axis'] || 140);
Moghunter.bresult_par2_x = Number(Moghunter.parameters['Parameter 2 X-Axis'] || 700);
Moghunter.bresult_par2_y = Number(Moghunter.parameters['Parameter 2 Y-Axis'] || 140);
Moghunter.bresult_skill_x = Number(Moghunter.parameters['New Skill X-Axis'] || 570);
Moghunter.bresult_skill_y = Number(Moghunter.parameters['New Skill Y-Axis'] || 520);
Moghunter.bresult_name_x = Number(Moghunter.parameters['Name X-Axis'] || 155);
Moghunter.bresult_name_y = Number(Moghunter.parameters['Name Y-Axis'] || 540);

//==============================================================================
// MogEasing
//==============================================================================

class MogEasing extends KONOHA.utils.Easing {
	constructor(amount, frames) {
		super(amount, frames, MogEasing.TYPE.Cubic);
	}

	get distance() { return this._amount; }
	get duration() { return this._frames; }

	previous() {
		return this.prev();
	}

	position() {
		return this.pos();
	}

	setMode(mode) {
		this._mode = mode == 'in' ? MogEasing.MODE.In
			: mode == 'out' ? MogEasing.MODE.Out
				: mode == 'inout' ? MogEasing.MODE.Inout
					: this._mode;
	}
}

//=============================================================================
// ** Game Temp
//=============================================================================

//==============================
// ** Initialize
//==============================
var _mog_bresult_gtemp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function () {
	_mog_bresult_gtemp_initialize.call(this);
	this.battleResultClear()
};

//==============================
// ** battle Result Clear
//==============================
Game_Temp.prototype.battleResultClear = function () {
	this._bResult = [false, [], 0, 0, []];
	this._battleEnd = false;
};

//=============================================================================
// ** Game Actor
//=============================================================================

//==============================
// ** display LevelUP
//==============================
var _mog_bresult_gact_displayLevelUp = Game_Actor.prototype.displayLevelUp;
Game_Actor.prototype.displayLevelUp = function (newSkills) {
	if ($gameTemp._bResult[0]) {
		$gameTemp._bResult[4] = newSkills;
		return;
	};
	_mog_bresult_gact_displayLevelUp.call(this, newSkills);
};


//=============================================================================
// ** BattleManager
//=============================================================================

//==============================
// ** setup
//==============================
var _mog_brt_bmngr_setup = BattleManager.setup;
BattleManager.setup = function (troopId, canEscape, canLose) {
	_mog_brt_bmngr_setup.call(this, troopId, canEscape, canLose);
	$gameTemp.battleResultClear();
};

//==============================
// ** process Victory
//==============================
BattleManager.processVictory = function () {
	if (Imported.MOG_BattleCry) {
		var actor = this.randomActor();
		if (actor) { SoundManager.selectVoice(actor._v_victory) };
	};
	AudioManager.fadeOutBgm(1);
	$gameTemp._battleEnd = true;
	$gameTemp._battleResult = true;
	this.getResultData();
	$gameParty.removeBattleStates();
	$gameParty.performVictory();
	this.endBattle(0);
};


//==============================
// ** get Result Data
//==============================
BattleManager.getResultData = function () {
	this.makeRewards();
	$gameTemp._bResult[0] = true;
	$gameTemp._bResult[1] = this._rewards.exp;
	$gameTemp._bResult[2] = this._rewards.gold;
	$gameTemp._bResult[3] = this._rewards.items;
	$gameTemp._bResult[4] = [];
};

//==============================
// ** Update
//==============================
var _mog_bresult_update = BattleManager.update;
BattleManager.update = function () {
	if ($gameTemp._bResult[0]) { return };
	_mog_bresult_update.call(this);
};

//=============================================================================
// ** Scene Battle
//=============================================================================

//==============================
// ** Terminate
//==============================
var _mog_bresult_terminate = Scene_Battle.prototype.terminate;
Scene_Battle.prototype.terminate = function () {
	_mog_bresult_terminate.call(this);
	$gameTemp._bResult = [false, [], 0, 0, []];
};

//==============================
// ** Update
//==============================
var _mog_bresult_sbat_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function () {
	_mog_bresult_sbat_update.call(this);
	if ($gameTemp._bResult[0]) { this.updateBResult() };
};

//==============================
// ** updateWindow Position
//==============================
var _mog_bresult_updateWindowPositions = Scene_Battle.prototype.updateWindowPositions;
Scene_Battle.prototype.updateWindowPositions = function () {
	_mog_bresult_updateWindowPositions.call(this);
	if ($gameTemp._battleEnd) {
		this._statusWindow.opacity -= 10;
		this._statusWindow.contentsOpacity -= 10;
	};
};

//==============================
// ** Update BResult
//==============================
Scene_Battle.prototype.updateBResult = function () {
	if (!this._bresult) { this.createBResult() };
};

//==============================
// ** createBresult
//==============================
Scene_Battle.prototype.createBResult = function () {
	this._bresult = new BattleResult();
	this.addChild(this._bresult);
};

//=============================================================================
// * Battle Result
//=============================================================================
function BattleResult() {
	this.initialize.apply(this, arguments);
};

BattleResult.prototype = Object.create(Sprite.prototype);
BattleResult.prototype.constructor = BattleResult;

BattleResult.imageSize = {};

//==============================
// * Initialize
//==============================
BattleResult.prototype.initialize = function () {
	Sprite.prototype.initialize.call(this);
	if (BattleManager._spriteset && BattleManager._spriteset.combo_sprite_data) {
		BattleManager._spriteset.combo_sprite_data[0] = 1;
	};
	this._phase = -1;
	this._actorIndex = 0;
	this._skillIndex = 0;
	this.z = 50;
	this._actor = null;
	this._actopar = [];
	this._playME = 10;
	this.phaseAniClear();
	this._phaseAnime[0] = 1;
	this._phaseAnime[1] = 60;
	this._numbeData = [-1, -1];
	this.loadImages();

	let images = [
		this._icon_img,
		this._layout_img,
		this._number_img1,
		this._number_img2,
		this._layout2_img,
		this._vict_img
	];
	for (let key in this._actor_img) {
		images.push(this._actor_img[key]);
	}
	function createObjectsAfterImageLoad() {
		let image = images.find(image => !image.isReady());
		if (image) {
			image.addLoadListener(createObjectsAfterImageLoad.bind(this));
		} else {
			this.createObjects();
			this._phase = 0;
		}
	}
	images[0].addLoadListener(createObjectsAfterImageLoad.bind(this));
};

//==============================
// * Phase Ani Clear
//==============================
BattleResult.prototype.phaseAniClear = function () {
	this._phaseAnime = [0, 0, 0];
};


//==============================
// * loadImages
//==============================
BattleResult.prototype.loadImages = function () {
	this._icon_img = ImageManager.loadSystem("IconSet");
	this._layout_img = ImageManager.loadSystem("Result_A");
	this._number_img1 = ImageManager.loadSystem("Result_B");
	this._number_img2 = ImageManager.loadSystem("Result_C");
	this._layout2_img = ImageManager.loadSystem("Result_D");
	this._vict_img = ImageManager.loadSystem("Result_E");
	this._actor_img = {};
	for (let actor of $gameParty.battleMembers()) {
		this._actor_img[actor.actorId()] = ImageManager.loadPicture(`Actor_${actor.actorId()}`);
	}
};

//==============================
// * Press Any Key
//==============================
BattleResult.prototype.pressAnyKey = function () {
	if (TouchInput.isTriggered()) { return true };
	if (TouchInput.isCancelled()) { return true };
	if (Input.isTriggered("ok")) { return true };
	if (Input.isTriggered("cancel")) { return true };
	return false;
};

//==============================
// * Create Objects
//==============================
BattleResult.prototype.createObjects = function () {
	this.createVict();
	this.createLayout();
	this.createExp();
	this.createGold();
	this.createTreasures();
};

//==============================
// * Create Vict
//==============================
BattleResult.prototype.createVict = function () {
	this._vict = new Sprite(this._vict_img);
	this._vict.anchor.x = 0.5;
	this._vict.anchor.y = 0.5;
	this._vict.x = Graphics.width + this._vict_img.width / 2;
	this._vict.y = Graphics.height / 2;
	this._vict_easing = new MogEasing((Graphics.width + this._vict_img.width) / 2, 24);
	this._vict_easing.setMode('out');
	this.addChild(this._vict);
};

//==============================
// * Create Layout
//==============================
BattleResult.prototype.createLayout = function () {
	this._layout = new Sprite(this._layout_img);
	this._layout.opacity = 200;
	this._layout.anchor.x = 0.5;
	this._layout.x = -1 * this._layout_img.width / 2;
	this._layout_easing = new MogEasing(490, 12);
	this._layout_easing.setMode('out');
	this.addChild(this._layout);
};

//==============================
// * Create Exp
//==============================
BattleResult.prototype.createExp = function () {
	this._expNumber = [];
	this._expOld = 0;
	this._expOrg = [Moghunter.bresult_exp_x, Moghunter.bresult_exp_y];
	for (var i = 0; i < 8; i++) {
		this._expNumber[i] = new Sprite(this._number_img1);
		this._expNumber[i].visible = false;
		this._expNumber[i].x = this._expOrg[0];
		this._expNumber[i].y = this._expOrg[1];
		this.addChild(this._expNumber[i]);
	};

};

//==============================
// * Create Gold
//==============================
BattleResult.prototype.createGold = function () {
	this._goldNumber = [];
	this._goldNumber = [];
	this._goldOld = 0;
	this._goldOrg = [Moghunter.bresult_gold_x, Moghunter.bresult_gold_y];
	for (var i = 0; i < 8; i++) {
		this._goldNumber[i] = new Sprite(this._number_img1);
		this._goldNumber[i].visible = false;
		this._goldNumber[i].x = this._goldOrg[0];
		this._goldNumber[i].y = this._goldOrg[1];
		this.addChild(this._goldNumber[i]);
	};
};

//==============================
// * Add ICon
//==============================
BattleResult.prototype.addIcon = function (sprite, data) {
	var icon = new Sprite(this._icon_img);
	var w = Window_Base._iconWidth;
	var h = Window_Base._iconHeight;
	var sx = data.iconIndex % 16 * w;
	var sy = Math.floor(data.iconIndex / 16) * h;
	icon.setFrame(sx, sy, w, h);
	sprite.addChild(icon);
	var name = new Sprite(new Bitmap(160, 32));
	name.bitmap.drawText(data.name, 0, 0, 160, 32);
	name.x = w + 4;
	sprite.addChild(name);
};

//==============================
// * Create Treasures
//==============================
BattleResult.prototype.createTreasures = function () {
	this._treasures = [];
	var x = Moghunter.bresult_treasure_x;
	var y = Moghunter.bresult_treasure_y;
	var s = Graphics.boxWidth - 480;
	var w = (s / 3);
	var h = Window_Base._iconHeight + 4;
	for (var i = 0; i < $gameTemp._bResult[3].length; i++) {
		if (i > 23) {
			break
		}
		this._treasures[i] = new Sprite();
		this._treasures[i].opacity = 0;
		this.addChild(this._treasures[i]);
		var l = Math.floor(i / 3);
		this._treasures[i].x = x + (w * i) - Math.floor(l * s);
		this._treasures[i].y = y + (l * h);
		this.addIcon(this._treasures[i], $gameTemp._bResult[3][i]);
	};
};

//==============================
// * getData
//==============================
BattleResult.prototype.getData = function () {
	this._numbeData[0] = this._number_img1.width / 10;
	this._numbeData[1] = this._number_img1.height;
};

//==============================
// * Update Dif
//==============================
BattleResult.prototype.update_dif = function (value, real_value, speed) {
	if (value == real_value) { return value };
	var dnspeed = 1 + (Math.abs(value - real_value) / speed);
	if (value > real_value) {
		value -= dnspeed;
		if (value < real_value) { value = real_value };
	}
	else if (value < real_value) {
		value += dnspeed;
		if (value > real_value) { value = real_value };
	};
	return Math.floor(value);
};

//==============================
// * Refresh Number
//==============================
BattleResult.prototype.refresh_number = function (sprites, value, img_data, x, center) {
	numbers = Math.abs(value).toString().split("");
	for (var i = 0; i < sprites.length; i++) {
		sprites[i].visible = false;
		if (i > numbers.length) { return };
		var n = Number(numbers[i]);
		sprites[i].setFrame(n * img_data[0], 0, img_data[0], img_data[1]);
		sprites[i].visible = true;
		if (center === 0) {
			var nx = -(img_data[0] * i) + (img_data[0] * numbers.length);
		} else {
			var nx = -(img_data[0] * i) + ((img_data[0] / 2) * numbers.length);
		};
		sprites[i].x = x - nx;
	};
};

//==============================
// * Update
//==============================
BattleResult.prototype.update = function () {
	Sprite.prototype.update.call(this);
	if (this._numbeData[0] === -1 && this._number_img1.isReady() && this._number_img2.isReady()) { this.getData() };
	if (this._numbeData[0] === -1) { return };
	if (this._phaseAnime[1] > 0) { this._phaseAnime[1]--; return };
	if (this._playME > 0) { this.updateME() };
	switch (this._phase) {
		case 0:
			this.updateStart();
			break;
		case 1:
			this.updateExp();
			break;
		case 2:
			this.updateGold();
			break;
		case 3:
			this.updateTreasure();
			break;
		case 4:
			this.updateLevel();
			break;
		case 5:
			this.updateEnd();
			break;
	};
};


//==============================
// * update ME
//==============================
BattleResult.prototype.updateME = function () {
	this._playME--
	if (this._playME === 0) {
		BattleManager.playVictoryMe();
		BattleManager.replayBgmAndBgs();
	};
};

//==============================
// * Update Start
//==============================
BattleResult.prototype.updateStart = function () {
	if (this._phaseAnime[0] > 0) {
		this.updateVictAnimation();
	} else {
		this.updateLayoutAnimation();
	};
};


//==============================
// * Update Layout Animation
//==============================
BattleResult.prototype.updateLayoutAnimation = function () {
	if (this._layout.x < 490) {
		this._layout.x = this._layout_easing.next();
		if (this._layout.x > 490) { this._layout.x = 490 };
	} else {
		this.phaseAniClear();
		this._phase = 1;
	};
};

//==============================
// * Update Vict Animation
//==============================
BattleResult.prototype.updateVictAnimation = function () {
	if (this._phaseAnime[0] === 1) {
		if (this._vict.x > Graphics.width / 2) {
			this._vict.x = Graphics.width / 2 + this._vict_easing.distance - this._vict_easing.next();
			if (this._vict.x <= Graphics.width / 2) {
				this._vict.x = Graphics.width / 2;
				this._vict_easing.init();
				this._vict_easing.setMode('in');
				this._phaseAnime[0] = 2;
				this._phaseAnime[1] = 40;
			};
		};
	} else {
		if (this._vict.x > -this._vict_img.width / 2) {
			this._vict.x = Graphics.width / 2 - this._vict_easing.next();
			if (this._vict.x <= -this._vict_img.width / 2) {
				this._vict.x = -this._vict_img.width / 2;
				this._phaseAnime[0] = 0;
			};
		};
	};
};

//==============================
// * Update Exp
//==============================
BattleResult.prototype.updateExp = function () {
	if (this.pressAnyKey() && $gameTemp._bResult[1] > 0) {
		this._expOld = $gameTemp._bResult[1] - 1;
	};
	var dif_number = this.update_dif(this._expOld, $gameTemp._bResult[1], 15);
	if (this._expOld != dif_number) {
		this._expOld = dif_number;
		this.refresh_number(this._expNumber, this._expOld, this._numbeData, this._expOrg[0], 0)
	};
	if (this._expOld === $gameTemp._bResult[1]) {
		this.phaseAniClear();
		this._phase = 2;
		SoundManager.playCursor();
	};
};

//==============================
// * Update Gold
//==============================
BattleResult.prototype.updateGold = function () {
	if (this.pressAnyKey() && $gameTemp._bResult[1] > 0) {
		this._goldOld = $gameTemp._bResult[2] - 1;
	};
	var dif_number = this.update_dif(this._goldOld, $gameTemp._bResult[2], 15);
	if (this._goldOld != dif_number) {
		this._goldOld = dif_number;
		this.refresh_number(this._goldNumber, this._goldOld, this._numbeData, this._goldOrg[0], 0)
	};
	if (this._goldOld === $gameTemp._bResult[2]) {
		BattleManager.gainGold();
		this.phaseAniClear();
		this._phase = 3;
		SoundManager.playCursor();
	};
};

//==============================
// * Update Treasure
//==============================
BattleResult.prototype.updateTreasure = function () {
	if (this._treasures.length > 0) {
		for (var i = 0; i < this._treasures.length; i++) {
			this._treasures[i].opacity += 10;
		};
		if (this._treasures[0].opacity >= 255 && this._phaseAnime[0] === 0) {
			this._phaseAnime[0] = 1;
		};
	} else {
		this._phaseAnime[0] = 1;
	};
	if (this._phaseAnime[0] === 1 && this.pressAnyKey()) {
		BattleManager.gainDropItems();
		this.phaseAniClear();
		this._phase = 4;
	};
};

//==============================
// * Update Level
//==============================
BattleResult.prototype.updateLevel = function () {
	if (this._layout.opacity > 0) { this.updateFade() };
	if (!this._actor && this._actorIndex >= $gameParty.battleMembers().length) {
		this._phase = 5;
		SoundManager.playCursor();
	} else {
		if (this._actor) {
			this.updateLevelAnimation();
		} else {
			this.gainEXP();
		};
	};
};

//==============================
// * Create Level Sprites
//==============================
BattleResult.prototype.createLevelSprites = function () {
	this.disposeLevel();
	this._phaseAnime[0] = 0;
	this._phaseAnime[1] = 10;
	this.createActorSprite();
	this.createLevelLayout();
	this.createParameters();
	this.createActorName();
	this.playVoice();
};

//==============================
// * Play Voice
//==============================
BattleResult.prototype.playVoice = function () {
	if (Imported.MOG_BattleCry) { SoundManager.selectVoice(this._actor._v_levelup) };
};

//==============================
// * Create Level Layout
//==============================
BattleResult.prototype.createLevelLayout = function () {
	this._levelLayout = new Sprite(this._layout2_img);
	this._levelLayout.anchor.x = 0.5;
	this._levelLayout.anchor.y = 0.5;
	this._levelLayout.y = 330;
	this._levelLayout.x = -1 * this._layout2_img.width / 2;
	this._levelLayout_easing = new MogEasing(490, 12);
	this._levelLayout_easing.setMode('out');
	this.addChild(this._levelLayout);
};

//==============================
// * Create Actor Name
//==============================
BattleResult.prototype.createActorName = function () {
	this._name = new Sprite(new Bitmap(140, 32));
	this._name.opacity = 0;
	this._name.bitmap.drawText(this._actor._name, 0, 0, 140, 32);
	this._name.x = Moghunter.bresult_name_x;
	this._name.y = Moghunter.bresult_name_y;
	this.addChild(this._name);
};

//==============================
// * Create Actor Sprite
//==============================
BattleResult.prototype.createActorSprite = function () {
	var img = this._actor_img[this._actor.actorId()];
	this._spriteActor = new Sprite(img);
	this._spriteActor.anchor.x = 0.5;
	this._spriteActor.x = -1 * img.width / 2;
	this._spriteActor.y = Graphics.boxHeight - img.height + Moghunter.bresult_actor_y
	this._spriteActor_easing = new MogEasing(Moghunter.bresult_actor_x, 12);
	this._spriteActor_easing.setMode('out');
	this.addChild(this._spriteActor);
};

//==============================
// * Create Parameters
//==============================
BattleResult.prototype.createParameters = function () {
	var x = Moghunter.bresult_par1_x;
	var y = Moghunter.bresult_par1_y;
	this._par = new Sprite(new Bitmap(Graphics.boxWidth, Graphics.boxHeight));
	this._par.opacity = 0;
	var charlen = this._par.bitmap.measureTextWidth('9');
	this._actopar.forEach((actopar, index) => {
		var tx = x + (4 - String(actopar).length) * charlen;
		this._par.bitmap.drawText(actopar, tx, y + 32 * index, 100, 32);
	});
	var x = Moghunter.bresult_par2_x;
	var y = Moghunter.bresult_par2_y;
	[this._actor._level, this._actor.mhp, this._actor.mmp, this._actor.atk, this._actor.def, this._actor.mat, this._actor.mdf, this._actor.agi, this._actor.luk].forEach((actopar, index) => {
		var tx = x + (4 - String(actopar).length) * charlen;
		this._par.bitmap.drawText(actopar, tx, y + 32 * index, 100, 32);
	});
	this.addChild(this._par);
};

//==============================
// * Refresh New Skill
//==============================
BattleResult.prototype.refreshNewSkill = function () {
	SoundManager.playUseSkill();
	this.removeChild(this._skill);
	this._skill = new Sprite();
	this._skill.x = Moghunter.bresult_skill_x;
	this._skill.y = Moghunter.bresult_skill_y;
	this._skill.opacity = 0;
	this.addChild(this._skill);
	this.addIcon(this._skill, $gameTemp._bResult[4][this._skillIndex]);
	this._skillIndex += 1;
	this._skillAnime = [0, 0];
};

//==============================
// * dispose Level
//==============================
BattleResult.prototype.disposeLevel = function () {
	this.removeChild(this._spriteActor);
	this.removeChild(this._par);
	this.removeChild(this._levelLayout);
	this.removeChild(this._name);
	this.removeChild(this._skill);
	this._skill = null;
};

//==============================
// * Update Animation
//==============================
BattleResult.prototype.updateLevelAnimation = function () {
	this.updateLevelPosition();
	this._name.opacity += 10;
	this._par.opacity += 10;
	if (this._skill) { this.updateSkillAnimation() };
	if (this.pressAnyKey()) {
		if (this._skillIndex >= $gameTemp._bResult[4].length) {
			this.clearParData();
		} else {
			this.refreshNewSkill();
		};
	};
};

//==============================
// * Update Level Position
//==============================
BattleResult.prototype.updateLevelPosition = function () {
	if (this._phaseAnime[0] === 0) {
		this._phaseAnime[0] = 1;
		this._par.x = this._spriteActor.width + Moghunter.bresult_actor_x;
	};
	if (this._spriteActor.x < Moghunter.bresult_actor_x) {
		this._spriteActor.x = this._spriteActor_easing.next();
		if (this._spriteActor.x > Moghunter.bresult_actor_x) { this._spriteActor.x = Moghunter.bresult_actor_x };
	}
	if (this._levelLayout.x < 490) {
		this._levelLayout.x = this._levelLayout_easing.next();
		if (this._levelLayout.x > 490) { this._levelLayout.x = 490 };
	}
	this._par.x = this.sprite_move_to(this._par.x, Moghunter.bresult_par0_x, 6);
	this._par.y = Moghunter.bresult_par0_y;
};

//==============================
// * Update Skill Animation
//==============================
BattleResult.prototype.updateSkillAnimation = function () {
	this._skill.opacity += 10;
	this._skillAnime[0]++;
	if (this._skillAnime[0] < 20) {
		this._skill.y -= 2;
	} else if (this._skillAnime[0] < 40) {
		this._skill.y += 2;
	};
};

//==============================
// * Sprite Move To
//==============================
BattleResult.prototype.sprite_move_to = function (value, real_value, speed) {
	if (value == real_value) { return value };
	var dnspeed = 5 + (Math.abs(value - real_value) / speed);
	if (value > real_value) {
		value -= dnspeed;
		if (value < real_value) { value = real_value };
	}
	else if (value < real_value) {
		value += dnspeed;
		if (value > real_value) { value = real_value };
	};
	return Math.floor(value);
};

//==============================
// * clear Par DAta
//==============================
BattleResult.prototype.clearParData = function () {
	this._actor = null;
	this.disposeLevel();
	this._skillIndex = 0;
	$gameTemp._bResult[4] = [];
};

//==============================
// * Gain EXP
//==============================
BattleResult.prototype.gainEXP = function () {
	var actor = $gameParty.battleMembers()[this._actorIndex];
	this._actopar = [actor._level, actor.mhp, actor.mmp, actor.atk, actor.def, actor.mat, actor.mdf, actor.agi, actor.luk];
	var lvOld = actor._level
	actor.gainExp($gameTemp._bResult[1]);
	this._actorIndex += 1;
	if (actor._level > lvOld) {
		this._actor = actor;
		this.createLevelSprites();
		SoundManager.playCursor();
	} else {
		this.clearParData();
	};
};

//==============================
// * Update Fade
//==============================
BattleResult.prototype.updateFade = function () {
	this._layout.opacity -= 10;
	for (var i = 0; i < this._expNumber.length; i++) {
		this._expNumber[i].opacity = this._layout.opacity;
	};
	for (var i = 0; i < this._goldNumber.length; i++) {
		this._goldNumber[i].opacity = this._layout.opacity;
	};
	for (var i = 0; i < this._treasures.length; i++) {
		this._treasures[i].opacity = this._layout.opacity;
	};
	if (this._phase === 5 && this._layout.opacity <= 0) {
		$gameTemp._bResult = [false, [], 0, 0, []];;
	};
};

//==============================
// * Update End
//==============================
BattleResult.prototype.updateEnd = function () {
	if (this._layout.opacity <= 0) {
		$gameTemp._bResult = [false, [], 0, 0, []];;
	} else {
		this.updateFade();
	};
};
