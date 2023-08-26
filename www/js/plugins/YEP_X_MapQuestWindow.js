//=============================================================================
// Yanfly Engine Plugins - Quest Journal Extension - Map Quest Window
// YEP_X_MapQuestWindow.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_MapQuestWindow = true;

var Yanfly = Yanfly || {};
Yanfly.AMQW = Yanfly.AMQW || {};
Yanfly.AMQW.version = 1.01;

//=============================================================================
/*:ja
* @plugindesc v1.01 (要YEP_QuestJournal.js) マップ移動中に表示するクエストウィンドウをオプションメニューに追加
* @author Yanfly Engine Plugins
*
* @help
* 翻訳:ムノクラ
* https://munokura.tk/
* https://twitter.com/munokura/
*
* ============================================================================
* Introduction
* ============================================================================
*
* このプラグインはYEP_QuestJournalを必要とします。
* プラグイン管理のYEP_QuestJournalの下に
* このプラグインがあることを確認してください。
*
* このプラグインは、
* マップシーンに新しいウィンドウを追加します。
* 進行中クエストとその未完了の目的を表示するクエストウィンドウです。
* このようにして、
* プレイヤーは完了するのに必要な必要なクエスト目的を見ることができます。
* プレイヤーはQuestJournalSystemメニューから
* 進行中クエストを設定・クリアすることもできます。
*
* ============================================================================
* Instructions - Setting Up the Active Map Quest Window
* ============================================================================
*
* プラグインパラメータ'WindowSettings'もデフォルトで
* そのままにすることもできますが、
* それを変更したいのであれば、ここで知る必要があります。
*
* ---
*
* Word Wrap Objectives
* - YEP_MessageCore.jsがインストールされている場合、
* 目的をワードラップするかどうかを設定できます。
* これを有効にすると、クエストの目的がワードラップになります。
*
* Default Show
* - このウィンドウをデフォルトで表示するかどうかが決まります。
* プレイヤーの[オプション]メニューコマンドには関係ありませんが、
* ゲームのシステムからクエストマップウィンドウを
* 無効にすることができます。
*
* ---
*
* Window Settings
* - カテゴリウィンドウをカスタマイズしたい場合、
* ここでそのプロパティを調整できます。
* ただし、
* JavaScriptに精通していない限り、
* ここでエラーを発生させてウィンドウがゲーム内で
* 機能しなくなる可能性があることに注意してください。
*
* X: Graphics.boxWidth - width
* Y: 0
* Scale: 0.50
* Width: Graphics.boxWidth / 3
* Line Height: 36
* Font Face: GameFont
* Font Size: 28
* Standard Padding: 18
* Text Padding: 6
* Standard Opacity: 255
* Back Opacity: 192
* Window Skin: Window
*
* ============================================================================
* Plugin Commands
* ============================================================================
*
* クエストマップウィンドウの動作を変更するには、
* 次のプラグインコマンドを使用できます。
*
* プラグインコマンド
*
*   SetActiveQuest x
*  - 進行中クエストをxに設定します。
*
*   RefreshActiveQuestWindow
*  - クエストマップウィンドウを更新します。
*
*   ShowActiveQuestWindow
*   HideActiveQuestWindow
*   - クエストマップウィンドウを表示/非表示に変更します。
*   ウィンドウを隠すためのプレイヤーのオプションメニューの設定を
*   上書きしません。
*
* ============================================================================
* Options Core Settings - Adding the New Options
* ============================================================================
*
* YEP_OptionsCore.jsを使用している場合、
* このプラグインを使用して新しいオプションを追加できます。
* それと共に使用できる以下のコード/パラメータ設定です。
*
* ---------
* Settings:
* ---------
*
* Name:
* i[87]Quest Window
*
* Help Description:
* Show a window displaying the currently active
* quest on the screen while exploring.
*
* Symbol:
* mapQuestWindow
*
* Show/Hide:
* show = Imported.YEP_X_MapQuestWindow;
*
* Enable:
* enabled = true;
*
* Ext:
* ext = 0;
*
* ----------
* Functions:
* ----------
*
* Make Option Code:
* this.addCommand(name, symbol, enabled, ext);
*
* Draw Option Code:
* var rect = this.itemRectForText(index);
* var statusWidth = this.statusWidth();
* var titleWidth = rect.width - statusWidth;
* this.resetTextColor();
* this.changePaintOpacity(this.isCommandEnabled(index));
* this.drawOptionsName(index);
* this.drawOptionsOnOff(index);
*
* Process OK Code:
* var index = this.index();
* var symbol = this.commandSymbol(index);
* var value = this.getConfigValue(symbol);
* this.changeValue(symbol, !value);
*
* Cursor Right Code:
* var index = this.index();
* var symbol = this.commandSymbol(index);
* var value = this.getConfigValue(symbol);
* this.changeValue(symbol, true);
*
* Cursor Left Code:
* var index = this.index();
* var symbol = this.commandSymbol(index);
* var value = this.getConfigValue(symbol);
* this.changeValue(symbol, false);
*
* Default Config Code:
* // Empty. Provided by this plugin.
*
* Save Config Code:
* // Empty. Provided by this plugin.
*
* Load Config Code:
* // Empty. Provided by this plugin.
*
* ============================================================================
* Changelog
* ============================================================================
*
* Version 1.01:
* - Compatibility update for YEP_OptionsCore.js.
*
* Version 1.00:
* - Finished Plugin!
*
* ============================================================================
* End of Helpfile
* ============================================================================
*
* @param ---メイン---
* @default
*
* @param Window Settings
* @parent ---メイン---
* @type struct<WindowSettings>
* @desc クエストマップウィンドウのプロパティ設定
* @default {”---General---”:””,”Word Wrap Objectives”:”true”,”Default Show”:”true”,”---Window Settings---”:””,”X”:”Graphics.boxWidth - width”,”Y”:”0”,”Scale”:”0.50”,”Width”:”Graphics.boxWidth / 3”,”Line Height”:”36”,”Font Face”:”GameFont”,”Font Size”:”28”,”Standard Padding”:”18”,”Text Padding”:”6”,”Standard Opacity”:”255”,”Back Opacity”:”192”,”Window Skin”:”Window”}
*
* @param Set Active
* @parent ---メイン---
* @desc 'Set Active'オプションの表示テキスト。文字コード使用可
* @default i[189]地図窓へ追加
*
* @param Currently Active
* @parent ---メイン---
* @desc 'Currently Active'オプションの表示テキスト。文字コード使用可
* @default i[189]地図窓に表示中
*
* @param Clear Active
* @parent ---メイン---
* @desc 'Clear Active'オプションの表示テキスト。文字コード使用可
* @default i[186]地図窓から消去
*
* @param ---オプション---
* @default
*
* @param Options Command
* @parent ---オプション---
* @desc ActiveQuestWindowのオプションコマンド
* @default クエスト地図窓
*
* @param Options Enable
* @parent ---オプション---
* @type boolean
* @on 表示
* @off 非表示
* @desc ActiveQuestWindowのデフォルトオプションコマンド
*
* @default true
*
* @param ---自動更新---
* @default
*
* @param Quest Add
* @parent ---自動更新---
* @type boolean
* @on YES
* @off NO
* @desc 新しいクエストを追加する時、クエストウィンドウを更新しますか?最新の進行中クエストを今追加されたものに設定します。
* @default true
*
* @param Quest Complete
* @parent ---自動更新---
* @type boolean
* @on YES
* @off NO
* @desc 進行中クエストが完了すると、ウィンドウは次に利用可能な未完了のクエストを設定します。
* @default true
*
* @param Quest Failed
* @parent ---自動更新---
* @type boolean
* @on YES
* @off NO
* @desc 進行中クエストが失敗した場合、ウィンドウは次に利用可能な未完のクエストを設定します。
* @default true
*
* @param Change Objectives
* @parent ---自動更新---
* @type boolean
* @on YES
* @off NO
* @desc クエスト目的が変更された時、ウィンドウを更新します。
* @default true
*
* @param Event Update
* @parent ---自動更新---
* @type boolean
* @on YES
* @off NO
* @desc スイッチ、変数、パーティーメンバー、アイテム、武器、防具が変わった時、ウィンドウを更新します。
* @default true
*
*/
//=============================================================================
/* Plugin Parameter Structure Settings
 *=============================================================================
 */
/* ----------------------------------------------------------------------------
 * CategoryWindow Parameter Structure
 * ---------------------------------------------------------------------------
 */
/*~struct~WindowSettings:ja
 * @param ---一般---
 * @default
 *
 * @param Word Wrap Objectives
 * @parent ---一般---
 * @type boolean
 * @on YES
 * @off NO
 * @desc YEP_MessageCoreを入れているならば、目的にワードラップを適用しますか?
 * @default true
 *
 * @param Default Show
 * @parent ---一般---
 * @type boolean
 * @on 表示
 * @off 非表示
 * @desc デフォルトで進行中クエストウィンドウを表示しますか?
 * @default true
 *
 * @param ---ウィンドウ設定---
 * @default
 *
 * @param X
 * @parent ---ウィンドウ設定---
 * @type combo
 * @option 0
 * @option Graphics.boxWidth - width
 * @desc ウィンドウのX位置の式
 * @default Graphics.boxWidth - width
 *
 * @param Y
 * @parent ---ウィンドウ設定---
 * @type combo
 * @option 0
 * @option Graphics.boxHeight - height
 * @desc ウィンドウのY位置の式
 * @default 0
 *
 * @param Scale
 * @parent ---ウィンドウ設定---
 * @type combo
 * @option 1.00
 * @option 0.75
 * @option 0.66
 * @option 0.50
 * @option 0.33
 * @option 0.25
 * @desc ウィンドウを小さくしますか?
 * @default 0.50
 *
 * @param Width
 * @parent ---ウィンドウ設定---
 * @type combo
 * @option Graphics.boxWidth
 * @option Graphics.boxWidth / 2
 * @option Graphics.boxWidth / 3
 * @option Graphics.boxWidth2 / 3
 * @option Graphics.boxWidth / 4
 * @option Graphics.boxWidth3 / 4
 * @option Graphics.boxWidth / 5
 * @option Graphics.boxWidth4 / 5
 * @desc ウィンドウ幅の式
 * @default Graphics.boxWidth / 3
 *
 * @param Line Height
 * @parent ---ウィンドウ設定---
 * @type number
 * @min 1
 * @desc 各エントリの行高
 * @default 36
 *
 * @param Font Face
 * @parent ---ウィンドウ設定---
 * @type combo
 * @option GameFont
 * @option Arial
 * @option Courier New
 * @option SimHei
 * @option Heiti TC
 * @option Dotum
 * @option AppleGothic
 * @desc 使用フォント
 * @default GameFont
 *
 * @param Font Size
 * @parent ---ウィンドウ設定---
 * @type combo
 * @option 20
 * @option 28
 * @option Window_Base.prototype.standardFontSize.call(this);
 * @desc フォントサイズ
 * @default 28
 *
 * @param Standard Padding
 * @parent ---ウィンドウ設定---
 * @type combo
 * @option 0
 * @option 10
 * @option 18
 * @option 24
 * @desc ウィンドウ余白の式
 * @default 18
 *
 * @param Text Padding
 * @parent ---ウィンドウ設定---
 * @type combo
 * @option 0
 * @option 6
 * @option 12
 * @desc テキスト表示する前に使用される余白の式
 * @default 6
 *
 * @param Standard Opacity
 * @parent ---ウィンドウ設定---
 * @type combo
 * @option 0
 * @option 128
 * @option 192
 * @option 255
 * @desc ウィンドウの標準的な不透明度の式
 * @default 255
 *
 * @param Back Opacity
 * @parent ---ウィンドウ設定---
 * @type combo
 * @option 0
 * @option 128
 * @option 192
 * @option 255
 * @desc ウィンドウの不透明度の式
 * @default 192
 *
 * @param Window Skin
 * @parent ---ウィンドウ設定---
 * @type file
 * @dir img/system/
 * @desc ウィンドウスキン
 * @default Window
 *
 */
//=============================================================================

if (Imported.YEP_QuestJournal) {

  //=============================================================================
  // Parameter Variables
  //=============================================================================

  Yanfly.Parameters = PluginManager.parameters('YEP_X_MapQuestWindow');
  Yanfly.Param = Yanfly.Param || {};

  Yanfly.Param.MQWSettings =
    JSON.parse(Yanfly.Parameters['Window Settings']);
  Yanfly.Param.MQWSetActive = String(Yanfly.Parameters['Set Active']);
  Yanfly.Param.MQWCurActive = String(Yanfly.Parameters['Currently Active']);
  Yanfly.Param.MQWClearActive = String(Yanfly.Parameters['Clear Active']);

  Yanfly.Param.MQWOptionCmd = String(Yanfly.Parameters['Options Command']);
  Yanfly.Param.MQWOptionSetting = eval(Yanfly.Parameters['Options Enable']);

  Yanfly.Param.MQWAddQuest = eval(Yanfly.Parameters['Quest Add']);
  Yanfly.Param.MQWQuestComplete = eval(Yanfly.Parameters['Quest Complete']);
  Yanfly.Param.MQWQuestFailed = eval(Yanfly.Parameters['Quest Failed']);
  Yanfly.Param.MQWChangeObj = eval(Yanfly.Parameters['Change Objectives']);
  Yanfly.Param.MQWEventUpdate = eval(Yanfly.Parameters['Event Update']);

  //=============================================================================
  // ConfigManager
  //=============================================================================

  Yanfly.getDefaultMapQuestWindowOption = function () {
    if (Yanfly.Param.MQWOptionSetting) {
      return true;
    } else {
      return false;
    }
  };

  ConfigManager.mapQuestWindow = Yanfly.getDefaultMapQuestWindowOption();

  Yanfly.AMQW.ConfigManager_makeData = ConfigManager.makeData;
  ConfigManager.makeData = function () {
    var config = Yanfly.AMQW.ConfigManager_makeData.call(this);
    config.mapQuestWindow = this.mapQuestWindow;
    return config;
  };

  Yanfly.AMQW.ConfigManager_applyData = ConfigManager.applyData;
  ConfigManager.applyData = function (config) {
    Yanfly.AMQW.ConfigManager_applyData.call(this, config);
    this.mapQuestWindow = this.readConfigMapQuestWindow(config, 'mapQuestWindow');
  };

  ConfigManager.readConfigMapQuestWindow = function (config, name) {
    var value = config[name];
    if (value !== undefined) {
      return value;
    } else {
      return Yanfly.getDefaultMapQuestWindowOption();
    }
  };

  //=============================================================================
  // Game_System
  //=============================================================================

  Yanfly.AMQW.Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function () {
    Yanfly.AMQW.Game_System_initialize.call(this);
    this.initMapQuestWindowSettings();
  };

  Game_System.prototype.initMapQuestWindowSettings = function () {
    this._showMapQuestWindow =
      eval(Yanfly.Param.MQWSettings['Default Show'] || 'true');
    this._activeQuestId = 0;
  };

  Game_System.prototype.isShowMapQuestWindow = function () {
    if (this._showMapQuestWindow === undefined) this.initMapQuestWindowSettings();
    return this._showMapQuestWindow;
  };

  Game_System.prototype.setShowMapQuestWindow = function (value) {
    if (this._showMapQuestWindow === undefined) this.initMapQuestWindowSettings();
    this._showMapQuestWindow = value;
  };

  Game_System.prototype.getActiveQuestId = function () {
    if (this._activeQuestId === undefined) this.initMapQuestWindowSettings();
    return this._activeQuestId;
  };

  Game_System.prototype.setActiveQuestId = function (questId) {
    if (this._activeQuestId === undefined) this.initMapQuestWindowSettings();
    if (questId === 0 || $dataQuests[questId]) this._activeQuestId = questId;
    this.refreshActiveQuestWindow();
  };

  Game_System.prototype.refreshActiveQuestWindow = function () {
    if (SceneManager._scene instanceof Scene_Map) {
      SceneManager._scene.refreshActiveQuestWindow();
    }
  };

  if (Yanfly.Param.MQWAddQuest) {

    Yanfly.AMQW.Game_System_questAdd = Game_System.prototype.questAdd;
    Game_System.prototype.questAdd = function (questId) {
      Yanfly.AMQW.Game_System_questAdd.call(this, questId);
      this.setActiveQuestId(questId);
    };

  }; // Yanfly.Param.MQWAddQuest

  Yanfly.AMQW.Game_System_questRemove = Game_System.prototype.questRemove;
  Game_System.prototype.questRemove = function (questId) {
    Yanfly.AMQW.Game_System_questRemove.call(this, questId);
    if (this.getActiveQuestId() === questId) {
      this.setActiveQuestId(0);
      this.refreshActiveQuestWindow();
    }
  };

  Game_System.prototype.setNextAvailableQuestActive = function (condition) {
    if (condition) {
      var questId = this.getQuestsAvailable()[0];
      if (questId) {
        this.setActiveQuestId(questId);
      } else {
        this.setActiveQuestId(0);
      }
    } else {
      this.setActiveQuestId(0);
    }
    this.refreshActiveQuestWindow();
  };

  Yanfly.AMQW.Game_System_questSetCompleted =
    Game_System.prototype.questSetCompleted;
  Game_System.prototype.questSetCompleted = function (questId) {
    Yanfly.AMQW.Game_System_questSetCompleted.call(this, questId);
    if (this.getActiveQuestId() === questId) {
      this.setNextAvailableQuestActive(Yanfly.Param.MQWQuestComplete);
    };
  };

  Yanfly.AMQW.Game_System_questSetFailed =
    Game_System.prototype.questSetFailed;
  Game_System.prototype.questSetFailed = function (questId) {
    Yanfly.AMQW.Game_System_questSetFailed.call(this, questId);
    if (this.getActiveQuestId() === questId) {
      this.setNextAvailableQuestActive(Yanfly.Param.MQWQuestComplete);
    };
  };

  if (Yanfly.Param.MQWChangeObj) {

    Yanfly.AMQW.Game_System_questObjectivesShow =
      Game_System.prototype.questObjectivesShow;
    Game_System.prototype.questObjectivesShow = function (questId, objId) {
      Yanfly.AMQW.Game_System_questObjectivesShow.call(this, questId, objId);
      if (this.getActiveQuestId() === questId) {
        this.refreshActiveQuestWindow();
      };
    };

    Yanfly.AMQW.Game_System_questObjectivesHide =
      Game_System.prototype.questObjectivesHide;
    Game_System.prototype.questObjectivesHide = function (questId, objId) {
      Yanfly.AMQW.Game_System_questObjectivesHide.call(this, questId, objId);
      if (this.getActiveQuestId() === questId) {
        this.refreshActiveQuestWindow();
      };
    };

    Yanfly.AMQW.Game_System_questObjectivesNormal =
      Game_System.prototype.questObjectivesNormal;
    Game_System.prototype.questObjectivesNormal = function (questId, objId) {
      Yanfly.AMQW.Game_System_questObjectivesNormal.call(this, questId, objId);
      if (this.getActiveQuestId() === questId) {
        this.refreshActiveQuestWindow();
      };
    };

    Yanfly.AMQW.Game_System_questObjectivesComplete =
      Game_System.prototype.questObjectivesComplete;
    Game_System.prototype.questObjectivesComplete = function (questId, objId) {
      Yanfly.AMQW.Game_System_questObjectivesComplete.call(this, questId, objId);
      if (this.getActiveQuestId() === questId) {
        this.refreshActiveQuestWindow();
      };
    };

    Yanfly.AMQW.Game_System_questObjectivesFail =
      Game_System.prototype.questObjectivesFail;
    Game_System.prototype.questObjectivesFail = function (questId, objId) {
      Yanfly.AMQW.Game_System_questObjectivesFail.call(this, questId, objId);
      if (this.getActiveQuestId() === questId) {
        this.refreshActiveQuestWindow();
      };
    };

  }; // Yanfly.Param.MQWChangeObj

  //=============================================================================
  // Game_Map
  //=============================================================================

  if (Yanfly.Param.MQWEventUpdate) {

    Yanfly.AMQW.Game_Map_requestRefresh = Game_Map.prototype.requestRefresh;
    Game_Map.prototype.requestRefresh = function (mapId) {
      Yanfly.AMQW.Game_Map_requestRefresh.call(this, mapId);
      if (SceneManager._scene instanceof Scene_Map) {
        SceneManager._scene.refreshActiveQuestWindow();
      }
    };

  }; // Yanfly.Param.MQWEventUpdate

  //=============================================================================
  // Game_Interpreter
  //=============================================================================

  Yanfly.AMQW.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    Yanfly.AMQW.Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'SetActiveQuest') {
      $gameSystem.setActiveQuestId(parseInt(args[0]));
    } else if (command === 'RefreshActiveQuestWindow') {
      this.refreshActiveQuestWindow();
    } else if (command === 'ShowActiveQuestWindow') {
      $gameSystem.setShowMapQuestWindow(true);
    } else if (command === 'HideActiveQuestWindow') {
      $gameSystem.setShowMapQuestWindow(false);
    }
  };

  Game_Interpreter.prototype.refreshActiveQuestWindow = function () {
    if (SceneManager._scene instanceof Scene_Map) {
      SceneManager._scene.refreshActiveQuestWindow();
    }
  };

  //=============================================================================
  // Window_Options
  //=============================================================================

  Yanfly.AMQW.Window_Options_addGeneralOptions =
    Window_Options.prototype.addGeneralOptions;
  Window_Options.prototype.addGeneralOptions = function () {
    Yanfly.AMQW.Window_Options_addGeneralOptions.call(this);
    if (Imported.YEP_OptionsCore) return;
    this.addCommand(Yanfly.Param.MQWOptionCmd, 'mapQuestWindow');
  };

  //=============================================================================
  // Window_QuestList
  //=============================================================================

  Yanfly.AMQW.Window_QuestList_makeExtraListC =
    Window_QuestList.prototype.makeExtraListC;
  Window_QuestList.prototype.makeExtraListC = function () {
    Yanfly.AMQW.Window_QuestList_makeExtraListC.call(this);
    this.addSetActiveCommand();
    this.addClearActiveCommand();
  };

  Window_QuestList.prototype.addSetActiveCommand = function () {
    var questId = this._forcedExt;
    if (questId === $gameSystem.getActiveQuestId()) {
      var text = String(Yanfly.Param.MQWCurActive);
      this.addCommand(text, 'curActive', false);
    } else {
      var text = String(Yanfly.Param.MQWSetActive);
      var enable = this.canBeMadeActive(questId);
      this.addCommand(text, 'setActive', enable);
    }
  };

  Window_QuestList.prototype.canBeMadeActive = function (questId) {
    return $gameSystem.getQuestsAvailable().contains(questId);
  };

  Window_QuestList.prototype.addClearActiveCommand = function () {
    var text = String(Yanfly.Param.MQWClearActive);
    var enable = $gameSystem.getActiveQuestId() > 0;
    this.addCommand(text, 'clearActive', enable);
  };

  //=============================================================================
  // Window_MapActiveQuest
  //=============================================================================

  function Window_MapActiveQuest() {
    this.initialize.apply(this, arguments);
  };

  Window_MapActiveQuest.prototype = Object.create(Window_Base.prototype);
  Window_MapActiveQuest.prototype.constructor = Window_MapActiveQuest;

  Window_MapActiveQuest.prototype.initialize = function () {
    this._windowHeight = this.standardPadding() * 2 + this.lineHeight() * 2;
    var scale = parseFloat(this.settings('Scale'));
    var width = this.windowWidth();
    var height = this.windowHeight();
    var x = Math.round(eval(this.settings('X')));
    var y = Math.round(eval(this.settings('Y')));
    width = Math.ceil(width / scale);
    this._allTextHeight = 0;
    this._requestRefresh = false;
    this._visibleCounter = 0;
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.scale.x = scale;
    this.scale.y = scale;
    this.refresh();
    if (!this.activeQuest()) this.visible = false;
  };

  Window_MapActiveQuest.prototype.settings = function (key) {
    return Yanfly.Param.MQWSettings[key];
  };

  Window_MapActiveQuest.prototype.wordWrap = function () {
    if (!Imported.YEP_MessageCore) return false;
    if (this._wordWrapSetting === undefined) {
      this._wordWrapSetting = eval(this.settings('Word Wrap Objectives'));
    }
    return this._wordWrapSetting;
  };

  Window_MapActiveQuest.prototype.windowWidth = function () {
    if (this._windowWidth === undefined) {
      this._windowWidth = Math.round(eval(this.settings('Width')));
    }
    return this._windowWidth;
  };

  Window_MapActiveQuest.prototype.windowHeight = function () {
    return this._windowHeight;
  };

  Window_MapActiveQuest.prototype.lineHeight = function () {
    if (this._windowLineHeight === undefined) {
      this._windowLineHeight = parseInt(this.settings('Line Height'));
    }
    return this._windowLineHeight;
  };

  Window_MapActiveQuest.prototype.standardFontFace = function () {
    if (this._windowFontFace === undefined) {
      this._windowFontFace = this.settings('Font Face');
    }
    return this._windowFontFace;
  };

  Window_MapActiveQuest.prototype.standardFontSize = function () {
    if (this._windowFontSize === undefined) {
      this._windowFontSize = Math.round(eval(this.settings('Font Size')));
    }
    return this._windowFontSize;
  };

  Window_MapActiveQuest.prototype.standardPadding = function () {
    if (this._windowStandardPadding === undefined) {
      this._windowStandardPadding =
        Math.round(eval(this.settings('Standard Padding')));
    }
    return this._windowStandardPadding;
  };

  Window_MapActiveQuest.prototype.textPadding = function () {
    if (this._windowTextPadding === undefined) {
      this._windowTextPadding = Math.round(eval(this.settings('Text Padding')));
    }
    return this._windowTextPadding;
  };

  Window_MapActiveQuest.prototype.standardBackOpacity = function () {
    if (this._windowBackOpacity === undefined) {
      this._windowBackOpacity = Math.round(eval(this.settings('Back Opacity')));
    }
    return this._windowBackOpacity;
  };

  Window_MapActiveQuest.prototype.loadWindowskin = function () {
    this.windowskin = ImageManager.loadSystem(this.settings('Window Skin'));
  };

  Window_MapActiveQuest.prototype.activeQuest = function () {
    return $dataQuests[$gameSystem.getActiveQuestId()];
  };

  Window_MapActiveQuest.prototype.refresh = function () {
    this.contents.clear();
    if (!this.activeQuest()) return;
    this.drawQuestData();
  };

  Window_MapActiveQuest.prototype.textWidthEx = function (text) {
    return this.drawTextEx(text, 0, this.contents.height);
  };

  Window_MapActiveQuest.prototype.drawHorzLine = function (y) {
    var lineY = y;
    this.contents.paintOpacity = 128;
    this.contents.fillRect(0, lineY, this.contentsWidth(), 2, this.normalColor());
    this.contents.paintOpacity = 255;
  };

  Window_MapActiveQuest.prototype.drawQuestData = function () {
    this.resetFontSettings();
    this.height = Graphics.boxHeight;
    this._windowHeight = this.height;
    this.createContents();
    this.drawQuestDataName();
    this.drawHorzLine(this.lineHeight());
    this.drawQuestDataObjectives();
    this.height = this._allTextHeight + this.lineHeight() +
      this.standardPadding() * 2;
    this._windowHeight = this.height;
  };

  Window_MapActiveQuest.prototype.drawQuestDataName = function () {
    var text = this.activeQuest().name;
    var ww = this.textWidthEx(text);
    var wx = (this.contents.width - ww) / 2;
    this.drawTextEx(text, wx, 0);
  };

  Window_MapActiveQuest.prototype.drawQuestDataObjectives = function () {
    var text = this.wordWrap() ? '<WordWrap>' : '';
    var questId = this.activeQuest().id;
    var lineData = this.activeQuest().objectives;
    var objectives = $gameSystem.getQuestObjectives(questId);
    var length = objectives.length;
    var first = false;
    for (var i = 0; i < length; ++i) {
      var objId = objectives[i];
      var key = $gameSystem.getQuestObjectiveStatus(questId, objId);
      var status = $gameSystem.getQuestObjectiveStatus(questId, objId)
      if (status !== 'Uncleared Objective') continue;
      if (first) text += this.wordWrap() ? '<br>' : '\n';
      first = true;
      var fmt = Yanfly.Param.QuestDataWindow[key];
      text += fmt.format(JSON.parse(lineData[objId]));
    }
    this.drawQuestTextEx(text, 0, this.lineHeight());
  };

  Window_MapActiveQuest.prototype.drawQuestTextEx = function (text, x, y) {
    if (text) {
      var textState = { index: 0, x: x, y: y, left: x };
      textState.text = this.convertEscapeCharacters(text);
      textState.height = this.calcTextHeight(textState, false);
      this.resetFontSettings();
      while (textState.index < textState.text.length) {
        this.processCharacter(textState);
      }
      this._allTextHeight = textState.y - y + this.lineHeight();
      return textState.x - x;
    } else {
      return 0;
    }
  };

  Window_MapActiveQuest.prototype.update = function () {
    this.updateRefresh();
    Window_Base.prototype.update.call(this);
    this.updateVisible();
  };

  Window_MapActiveQuest.prototype.updateRefresh = function () {
    if (this._requestRefresh) {
      this.refresh()
      this._requestRefresh = false;
    }
  };

  Window_MapActiveQuest.prototype.updateVisible = function () {
    var visible = this.isWindowVisible();
    if (visible && this._visibleCounter <= 0) {
      this.visible = true;
    } else if (visible) {
      this._visibleCounter -= 1;
      this.visible = false;
    } else {
      this._visibleCounter = 10;
      this.visible = false;
    }
  };

  Window_MapActiveQuest.prototype.isWindowVisible = function () {
    if (!ConfigManager.mapQuestWindow) return false;
    if (!this.activeQuest()) return false;
    if ($gameMessage.isBusy()) return false;
    if (SceneManager.isSceneChanging()) return false;
    return $gameSystem.isShowMapQuestWindow();
  };

  Window_MapActiveQuest.prototype.requestRefresh = function (value) {
    this._requestRefresh = value;
  };

  //=============================================================================
  // Scene_Map
  //=============================================================================

  Yanfly.AMQW.Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
  Scene_Map.prototype.createAllWindows = function () {
    Yanfly.AMQW.Scene_Map_createAllWindows.call(this);
    this.createMapQuestWindow();
  };

  Scene_Map.prototype.createMapQuestWindow = function () {
    this._activeQuestWindow = new Window_MapActiveQuest();
    this.addWindow(this._activeQuestWindow);
  };

  Scene_Map.prototype.refreshActiveQuestWindow = function () {
    if (this._activeQuestWindow) this._activeQuestWindow.requestRefresh(true);
  };

  //=============================================================================
  // Scene_Quest
  //=============================================================================

  Yanfly.AMQW.Scene_Quest_createListWindow =
    Scene_Quest.prototype.createListWindow;
  Scene_Quest.prototype.createListWindow = function () {
    Yanfly.AMQW.Scene_Quest_createListWindow.call(this);
    this._listWindow.setHandler('setActive', this.onListSetActive.bind(this));
    this._listWindow.setHandler('clearActive', this.onListClearActive.bind(this));
  };

  Yanfly.AMQW.Scene_Quest_isQuestExtraCommand =
    Scene_Quest.prototype.isQuestExtraCommand;
  Scene_Quest.prototype.isQuestExtraCommand = function () {
    return true;
  };

  Scene_Quest.prototype.onListSetActive = function () {
    this._listWindow.activate();
    $gameSystem.setActiveQuestId(this._listWindow.currentExt());
    this._listWindow.refresh();
  };

  Scene_Quest.prototype.onListClearActive = function () {
    this._listWindow.activate();
    $gameSystem.setActiveQuestId(0);
    this._listWindow.refresh();
  };

  //=============================================================================
  // End of Main Functions
  //=============================================================================
} else {

  var text = '';
  text += 'You are getting this error because you are trying to run ';
  text += 'YEP_X_MapQuestWindow without YEP_QuestJournal. Please visit Yanfly.moe ';
  text += 'and install YEP_QuestJournal in your game project before you can use ';
  text += 'this plugin.';
  console.log(text);
  require('nw.gui').Window.get().showDevTools();

}
//=============================================================================
// End of File
//=============================================================================