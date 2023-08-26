//=============================================================================
// Plugin for RPG Maker MV
// BattleVoice.js
//=============================================================================
// [Update History]
// - BattleVoice.js
// 2015.Nov    Ver1.0.0 First Release
// 2016.Aug    Ver1.1.0 Strict Option Input
// 2019.Feb.27 Ver1.2.0 Random Play
// - BattkeVoiceMZ
// 2020.Jan    Ver1.0.0 First release: Add plugin commands
// 2020.Oct.06 Ver1.1.0 Add situations: on counter attack and on reflect magic
// 2020.Nov.09 Ver1.2.0 Add situations: on evade attack and on battle starts
// 2021.Feb.21 Ver1.3.0 Add situations: on receive recover magic from ally
// - BattleVoice.js again
// 2021.Feb.21 Ver1.4.0 forcedly adapt MV version(closed version)
// 2021.Feb.24 Ver2.0.0 Ver.up based on MZ Ver1.3.0
// 2021.Mar.25 Ver2.1.0 enables to set delay when recovery received

/*:
 * @target MV
 * @plugindesc [Ver2.1.0]Play voice SE at battle when actor does spcified action
 * @author Sasuke KANNAZUKI
 * 
 * @param ON switch ID
 * @desc play se only when the switch is ON.
 * This setting interlocks with option Battle Voice.
 * @type switch
 * @default 1
 * 
 * @param volume
 * @desc volume of SEs. this setting is common among all voice SEs.
 * (Default:90)
 * @type number
 * @min 0
 * @max 100000
 * @default 90
 * 
 * @param pitch
 * @desc pitch of SEs. this setting is common among all voice SEs.
 * (Default:100)
 * @type number
 * @min 10
 * @max 100000
 * @default 100
 *
 * @param pan
 * @desc pan of SEs. this setting is common among all voice SEs.
 * 0:center, <0:left, >0:right (Default:0)
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * 
 * @param Battle Voice Name at Option
 * @desc display name at option
 * @type text
 * @default Battle Voice
 *
 * @param waitForReceive
 * @text Delay Frames Of Receiver
 * @desc Set the frames from recover invoke to receive
 * @type number
 * @default 30
 *
 * @noteParam attackVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam recoverVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam friendMagicVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam magicVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam skillVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam damageVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam evadeVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam defeatedVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam firstVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 * 
 * @noteParam victoryVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 * 
 * @noteParam counterVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam reflectVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam fromAllyVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @help
 * This plugin runs under RPG Maker MV.
 *
 * This plugin enables to play SE (assumed battle voice) at
 *  various situations.
 *
 * [Summary]
 * Player can change voice ON/OFF by Option Scene (except Title).
 * This setting interlocks switch ID set at plugin parameter.
 *
 * [note specification]
 * write down each actor's note at following format to set SE filename.
 * [[Voices when an actor perform something]]
 * <attackVoice:filename>  plays when actor does normal attack.
 * <recoverVoice:filename>   plays when actor uses HP recovering magic.
 * <friendMagicVoice:filename> plays when actor spells magic for friend
 *  except HP recovering. if this is not set but <magicVoice:filename> is set,
 *  it plays <magicVoice:filename> setting file.
 * <magicVoice:filename>   plays when actor spells magic(except for friend).
 * <skillVoice:filename>   plays when actor uses special skill except magic.
 * [[Voices when an actor affected from any battler]]
 * <damageVoice:filename>    plays when actor takes damage.
 * <evadeVoice:filename>    plays when actor evades enemy attack.
 * <defeatedVoice:filename>   plays when actor is died.
 * <counterVoice:filename>   plays when counter attack invokes.
 * <reflectVoice:filename>   plays when actor reflects magic.
 * <fromAllyVoice:filename> plays when actor received HP recover magic.
 *   It doesn't play when magic user is the same as receiver.
 *   It assumes the phrase 'Thank you' and so on.
 * [[Voices when battle exceeds]]
 * if plural actors attend the battle, randomly selected actor's SE is adopted.  * <firstVoice:filename>   plays when battle starts except surprised.
 * <victoryVoice:filename>   plays when battle finishes.
 *
 * *NOTE* Here 'magic' skill means its 'Skill Type' is included in 
 *  '[SV]Magic Skills' on 'System '.
 *
 * [Advanced option 1]
 * If you want to play one of several voices randomly,
 * write filenames with colon as follows:
 * <attackVoice:atk1,atk2,atk3>
 * in this case, at attack, plays atk1 atk2, or atk3 randomly.
 *
 * If set no SE one of filenames, 
 * <attackVoice:atk1,atk2,$>
 * in this case, at attack, plays atk1 atk2, or doesn't play SE.
 *
 * You can set the same filename twice or more than.
 * <attackVoice:atk1,atk2,atk2,$>
 * in this case, 25% atk1, 50% atk2, 25% don't play.
 *
 * *NOTE* When set SEs at this notation, these files might be excluded at
 *  deployment with option 'Exclude unused files'.
 *  To prevent this, I recommend to make dummy event and set each SE to
 *  'Play SE' on the Contents.
 *
 * [Plugin Commands]
 * 
 * **Set voice on each situation**
 * BattleVoice set arg1 arg2 arg3
 *  - arg1 must be actor id.
 *  - arg2 must be a situation.
 *   attack , recover, friendMagic, magic, skill, damage, evaded,
 *   dead, counter, reflect, fromAlly, first or victory
 *  -arg3 must be voice file name. the same as note, by split comma,
 *   plural setting enables.
 * ex.
 * BattleVoice 1 attack attackVoice
 *  set actor whose id is 1 voice for attack.
 *
 * **Reset voice on each situation**
 * BattleVoice reset arg1 arg2
 *  - arg1 must be actor id.
 *  - arg2 must be a situation.
 * ex.
 * BattleVoice reset 2 attack
 *  reset actor whose id is 2 voice for attack.
 *
 * **Reset all situations' voice to default**
 * BattleVoice allReset arg1
 *  - arg1 must be actor id to reset all situation
 *   (note: voice for actor's each skill is not reset)
 *
 * **Assign actor voice to each skill**
 * BattleVoice skillSet arg1 arg2 arg3
 *  - arg1 must be actor id
 *  - arg2 must be skill id to set original voice
 *  - arg3 must be voice file name. the same as note, by split comma,
 *   plural setting enables.
 * ex.
 * BattleVoice skillSet 3 8 fire1
 *  sets fire1 when an actor whose id is 3 uses skill whose id is 8
 *
 * **Reset actor voice to each skill**
 * BattleVoice skillReset arg1 arg2
 *  - arg1 must be actor id
 *  - arg2 must be skill id to reset original voice
 * ex.
 * BattleVoice skillReset 2 15
 *  reset voice for an actor whose id is 2's skill whose id is 15.
 *
 * **Reset all voices assigned to skills**
 * BattleVoice skillAllReset arg1
 *  - arg1 must be actor id to reset all skill's voice.
 *  (note: voice for situations are not reset)
 *
 * [License]
 * this plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */
/*:ja
 * @target MV
 * @plugindesc [Ver2.1.0]アクターの戦闘時の行動にボイスSEを設定します。
 * @author 神無月サスケ
 * 
 * @param ON switch ID
 * @text ボイス演奏スイッチID
 * @desc このスイッチが ON の時のみ、ボイスSEを演奏します。
 * オプション「バトルボイス」と連動します。
 * @type switch
 * @default 1
 *
 * @param volume
 * @text 共通ボリューム
 * @desc ボイスSEのボリュームです。この設定が全てのボイスSEの
 * 共通となります。(既定値:90)
 * @type number
 * @min 0
 * @max 100000
 * @default 90
 *
 * @param pitch
 * @text 共通ピッチ
 * @desc ボイスSEのピッチです。この設定が全てのボイスSEの
 * 共通となります。(既定値:100)
 * @type number
 * @min 10
 * @max 100000
 * @default 100
 *
 * @param pan
 * @text 共通位相
 * @desc ボイスSEの位相。この設定が全てのボイスSE共通になります。
 * 0:中央, 負数:左寄り, 正数:右寄り (既定値:0)
 * @type number
 * @min -100
 * @max 100
 * @default 0
 *
 * @param Battle Voice Name at Option
 * @text バトルボイス表示名
 * @desc オプション画面での表示名です。
 * @type string
 * @default バトルボイス
 *
 * @param waitForReceive
 * @text 被回復時ウェイト
 * @desc 回復魔法が使われてから受け取ったアクターが発声するまでのフレーム数
 * @type number
 * @default 30
 *
 * @noteParam attackVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam recoverVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam friendMagicVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam magicVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam skillVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam damageVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam evadeVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam defeatedVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam firstVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 * 
 * @noteParam victoryVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 * 
 * @noteParam counterVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam reflectVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 * @noteParam fromAllyVoice
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData actors
 *
 @help
 * このプラグインは、RPGツクールMVに対応しています。
 * 
 * 戦闘中のシチュエーションに応じてにバトルボイスを演奏可能にします。
 *
 * ■概要
 * ゲーム中のオプション画面(タイトル画面以外)でON/OFFが可能です。
 * この設定は、このプラグインのパラメータで指定したスイッチと連動しています。
 * デフォルトではOFFになっています。
 *
 * ■メモ設定方法
 * それぞれのアクターのメモに以下の書式で書いてください。
 * filename はボイスSEのファイル名にしてください。
 * ◆アクター行動時
 * <attackVoice:filename>  通常攻撃の時に再生されるボイスです。
 * <recoverVoice:filename>   HP回復魔法を使用した時に再生されるボイスです。
 * <friendMagicVoice:filename>   HP回復以外の味方向け魔法を使用した時に
 *  再生されるボイスです。省略された場合で<magicVoice:filename>が
 *  設定されている場合は、そちらが再生されます。
 * <magicVoice:filename> 味方向け以外の魔法を使用した時に再生されるボイスです。
 * <skillVoice:filename>   必殺技を使用した時に再生されるボイスです。
 * ◆アクターが対象になった時
 * <damageVoice:filename>    ダメージを受けた時に再生されるボイスです。
 * <evadeVoice:filename>    攻撃を回避した時に再生されるボイスです。
 * <defeatedVoice:filename>   戦闘不能になった時に再生されるボイスです。
 * <counterVoice:filename>   カウンター攻撃発動時に再生されるボイスです。
 * <reflectVoice:filename>   魔法を反射する時に再生されるボイスです。
 * <fromAllyVoice:filename> HP回復魔法を受けた時に再生されるボイスです。
 *  自分自身に使った場合は再生されません
 *  「ありがとう」など感謝の言葉を想定しています。
 * ◆バトルの進捗に応じて
 * アクターが複数いる場合、生きているアクターの中からランダムで再生されます。
 * <firstVoice:filename>    戦闘開始時に再生されるボイスです。
 *  ただし、不意打ちの際は再生されません。
 * <victoryVoice:filename>   戦闘勝利時に再生されるボイスです。
 *
 * 注意：ここでいう「魔法」の定義は、そのスキルのスキルタイプが、
 * 「システム2」タブの「[SV]魔法スキル」に含まれているものです。
 *
 * ■拡張機能１
 * 上記のメモのfilename を、コロンで複数指定すると、その中からランダムで
 * 再生されます。例えば、以下のように指定した場合、
 * <attackVoice:atk1,atk2,atk3>
 * atk1 atk2 atk3 のいずれかのボイスがランダムで再生されます。
 *
 * 無音を指定したい場合は、$ を入れてください。
 * <attackVoice:atk1,atk2,$>
 * この場合、atk1, atk2, 無音の中から選ばれます。
 * 
 * 同じファイル名を複数回指定可能です。
 * <attackVoice:atk1,atk2,atk2,$>
 * この場合、25%でatk1、50%でatk2、25%で演奏なしになります。
 *
 * 注意：この形式で設定を行った場合、デプロイメントの「不要ファイルの削除」で
 *  削除される可能性があります。例えばダミーイベントを作り、これらのSEを
 *  演奏するなどして、適宜対処してください。
 * 
 * ■プラグインコマンド
 * ◆各シチュエーションでのボイスの変更
 * BattleVoice set arg1 arg2 arg3
 *  - arg1 は対象のアクターID
 *  - arg2 はシチュエーション文字列。以下から選んでください
 *   attack (通常攻撃時), recover (回復魔法使用時),
 *   friendMagic (味方対象魔法使用時) magic (通常魔法使用時)
 *   skill (非魔法スキル使用時), damage (被ダメージ時), evaded (攻撃回避時),
 *   dead (戦闘不能時), counter (カウンター発動時), reflect (魔法反射発動時),
 *   fromAlly (回復魔法を受けた時),
 *   first (戦闘開始時) or victory (戦闘勝利時).
 *  -arg3 はボイスSE名。セミコロンで複数指定可能
 * 例.
 * BattleVoice 1 attack attackVoice
 *  アクターID1の攻撃時(attack)にattackVoiceというSEを再生します。
 *
 * ◆各シチュエーションでのボイスのリセット
 * BattleVoice reset arg1 arg2
 *  - arg1 は対象のアクターID
 *  - arg2 はシチュエーション文字列。上記を参考に。
 * 例.
 * BattleVoice reset 2 attack
 *  アクターID2の攻撃時ボイスをリセットしメモ設定に戻します。
 *
 * ◆全シチュエーションのボイスの一括リセット
  * BattleVoice allReset arg1
 *   - arg1 は対象のアクターID
 *   (注: スキル毎に設定されたボイスはリセットされません)
 *
 * ◆スキル番号にボイスを割り当てる
 * BattleVoice skillSet arg1 arg2 arg3
 *  - arg1 は対象のアクターID
 *  - arg2 はスキルID
 *  - arg3 は演奏するSE名
 * 例.
 * BattleVoice skillSet 3 8 fire1
 *   アクターID3がスキルID8を使用した時にfire1を演奏します
 *
 * ◆スキル番号に割り当てたボイスを解除
 * BattleVoice skillReset arg1 arg2
 *  - arg1 は対象のアクターID
 *  - arg2 はスキルID
 * 例.
 * BattleVoice skillReset 2 15
 *  アクターID2がスキルID15を使用した時のボイスをなくします。
 *
 * ◆スキル番号に割り当てられた全ボイスを一括リセット
 * BattleVoice skillAllReset arg1
 *  - arg1 は対象のアクターID
 *  (注意: シチュエーションに割り当てられたボイスはリセットされません。)
 *
 * ■ライセンス表記
 * このプラグインは MIT ライセンスで配布されます。
 * ご自由にお使いください。
 * http://opensource.org/licenses/mit-license.php
 */
(function () {
  var pluginName = 'BattleVoice';

  //
  // process parameters
  //
  var parameters = PluginManager.parameters(pluginName);
  var pitch = Number(parameters['pitch'] || 100);
  var volume = Number(parameters['volume'] || 90);
  var pan = Number(parameters['pan'] || 0);
  var playSwitchId = Number(parameters['ON switch ID'] || 1);
  var strBattleVoice = parameters['Battle Voice Name at Option'] ||
    'Battle Voice';
  var waitForReceive = Number(parameters['waitForReceive'] || 30);

  //
  // process plugin commands
  //
  var _Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === pluginName) {
      var actor = $gameActors.actor(+args[1]);
      if (!actor) {
        return;
      }
      actor.battleVoices = actor.battleVoices || {};
      actor.skillVoices = actor.skillVoices || {};
      switch (args[0]) {
        case 'set':
          actor.battleVoices[args[2]] = args[3];
          break;
        case 'reset':
          actor.battleVoices[args[2]] = null;
          break;
        case 'allReset':
          actor.battleVoices = {};
          break;
        case 'skillSet':
          actor.skillVoices[+args[2]] = args[3];
          break;
        case 'skillReset':
          actor.skillVoices[+args[2]] = null;
          break;
        case 'skillAllReset':
          actor.skillVoices = {};
          break;
      }
    }
  };

  //
  // set play options (interlock with switch)
  //
  var doesDisplaySpecialOptions = function () {
    return !SceneManager.isPreviousScene(Scene_Title);
  };

  var _Window_Options_makeCommandList =
    Window_Options.prototype.makeCommandList;
  Window_Options.prototype.makeCommandList = function () {
    if (doesDisplaySpecialOptions()) {
      this.addCommand(strBattleVoice, 'battleVoice');
    }
    _Window_Options_makeCommandList.call(this);
  };

  var _Window_Options_getConfigValue =
    Window_Options.prototype.getConfigValue;
  Window_Options.prototype.getConfigValue = function (symbol) {
    switch (symbol) {
      case 'battleVoice':
        return $gameSwitches.value(playSwitchId);
      default:
        return _Window_Options_getConfigValue.call(this, symbol);
    }
  };

  var _Window_Options_setConfigValue =
    Window_Options.prototype.setConfigValue;
  Window_Options.prototype.setConfigValue = function (symbol, volume) {
    switch (symbol) {
      case 'battleVoice':
        return $gameSwitches.setValue(playSwitchId, volume);
      default:
        return _Window_Options_setConfigValue.call(this, symbol, volume);
    }
  };

  var _Scene_Options_maxCommands = Scene_Options.prototype.maxCommands;
  Scene_Options.prototype.maxCommands = function () {
    var rowNum = _Scene_Options_maxCommands.call(this);
    return doesDisplaySpecialOptions() ? rowNum + 1 : rowNum;
  };

  //
  // play actor voice
  //
  var canPlayActorVoice = function () {
    return $gameSwitches.value(playSwitchId);
  };

  var split = function (name) {
    if (!name) {
      return name;
    }
    var names = name.split(',');
    return names[Math.randomInt(names.length)];
  };

  var createAudioByFileName = function (name) {
    var audio = {};
    audio.name = name;
    audio.pitch = pitch;
    audio.volume = volume;
    audio.pan = pan
    return audio;
  };

  var playActorVoice = function (actor, type) {
    if (!canPlayActorVoice()) {
      return;
    }
    var name = '';
    var a = actor.battleVoices || {};
    var m = actor.actor().meta;
    var loop = false;
    var channel = 10;
    switch (type) {
      case 'attack':
        name = split(a.attack || m.attackVoice);
        break;
      case 'recover':
        name = split(a.recover || m.recoverVoice);
        break;
      case 'friendmagic':
        name = split(a.friendMagic || m.friendMagicVoice || m.magicVoice);
        break;
      case 'magic':
        name = split(a.magic || m.magicVoice);
        break;
      case 'skill':
        name = split(a.skill || m.skillVoice);
        break;
      case 'damage':
        name = split(a.damage || m.damageVoice);
        break;
      case 'evade':
        name = split(a.evade || m.evadeVoice);
        break;
      case 'dead':
        name = split(a.dead || m.defeatedVoice);
        break;
      case 'counter':
        name = split(a.counter || m.counterVoice);
        break;
      case 'reflect':
        name = split(a.reflect || m.reflectVoice);
        break;
      case 'fromAlly':
        name = split(a.fromAlly || m.fromAllyVoice);
        break;
      case 'first':
        name = split(a.first || m.firstVoice);
        break;
      case 'victory':
        name = split(a.victory || m.victoryVoice);
        break;
      case 'state':
        name = split(m['stateVoice' + arguments[2]]);
        loop = true;
        channel = 100 + arguments[2];
        break;
    }
    if (name && name !== "$") {
      var audio = createAudioByFileName(name);
      // AudioManager.playSe(audio);
      AudioManager.playVoice(audio, loop, channel);
    }
  };

  var isSkillVoice = function (actor, action) {
    if (!actor.skillVoices || !action.isSkill()) {
      return false;
    }
    return !!actor.skillVoices[action._item.itemId()];
  };

  var playSkillVoice = function (actor, action) {
    if (!canPlayActorVoice()) {
      return;
    }
    var name = split(actor.skillVoices[action._item.itemId()]);
    if (name && name !== "$") {
      var audio = createAudioByFileName(name);
      // AudioManager.playSe(audio);
      AudioManager.playVoice(audio, false, 10);
    }
  };

  //
  // functions for call actor voice.
  //
  var _Game_Actor_performAction = Game_Actor.prototype.performAction;
  Game_Actor.prototype.performAction = function (action) {
    _Game_Actor_performAction.call(this, action);
    if (isSkillVoice(this, action)) {
      playSkillVoice(this, action);
    } else if (action.isAttack()) {
      playActorVoice(this, 'attack');
    } else if (action.isMagicSkill() && action.isHpRecover()) {
      playActorVoice(this, 'recover');
    } else if (action.isMagicSkill() && action.isForFriend()) {
      playActorVoice(this, 'friendmagic');
    } else if (action.isMagicSkill()) {
      playActorVoice(this, 'magic');
    } else if (action.isSkill() && !action.isGuard()) {
      playActorVoice(this, 'skill');
    }
  };

  var _Game_Actor_performDamage = Game_Actor.prototype.performDamage;
  Game_Actor.prototype.performDamage = function () {
    _Game_Actor_performDamage.call(this);
    playActorVoice(this, 'damage');
  };

  var _Game_Actor_performEvasion = Game_Actor.prototype.performEvasion;
  Game_Actor.prototype.performEvasion = function () {
    _Game_Actor_performEvasion.call(this);
    playActorVoice(this, 'evade');
  };

  var _Game_Actor_performCollapse = Game_Actor.prototype.performCollapse;
  Game_Actor.prototype.performCollapse = function () {
    _Game_Actor_performCollapse.call(this);
    if ($gameParty.inBattle()) {
      playActorVoice(this, 'dead');
    }
  };

  var _BattleManager_invokeCounterAttack = BattleManager.invokeCounterAttack;
  BattleManager.invokeCounterAttack = function (subject, target) {
    1
    if (target.isActor()) {
      playActorVoice(target, 'counter');
    }
    _BattleManager_invokeCounterAttack.call(this, subject, target);
  };

  var _BattleManager_invokeMagicReflection =
    BattleManager.invokeMagicReflection;
  BattleManager.invokeMagicReflection = function (subject, target) {
    if (target.isActor()) {
      playActorVoice(target, 'reflect');
    }
    _BattleManager_invokeMagicReflection.call(this, subject, target);
  };

  var _Game_System_onBattleStart = Game_System.prototype.onBattleStart;
  Game_System.prototype.onBattleStart = function () {
    _Game_System_onBattleStart.call(this);
    var candidates = $gameParty.aliveMembers().filter(function (actor) {
      return actor.actor().meta.firstVoice ||
        (actor.battleVoices && actor.battleVoices.first);
    });
    if (candidates.length > 0) {
      var index = Math.randomInt(candidates.length);
      var actor = candidates[index];
      if (!BattleManager._surprise) {
        playActorVoice(actor, 'first');
      }
    }
  };

  var _BattleManager_processVictory = BattleManager.processVictory;
  BattleManager.processVictory = function () {
    var candidates = $gameParty.aliveMembers().filter(function (actor) {
      return actor.actor().meta.victoryVoice ||
        (actor.battleVoices && actor.battleVoices.victory);
    });
    if (candidates.length > 0) {
      var index = Math.randomInt(candidates.length);
      var actor = candidates[index];
      playActorVoice(actor, 'victory');
    }
    _BattleManager_processVictory.call(this);
  };

  var _Game_Actor_addNewState = Game_Actor.prototype.addNewState;
  Game_Actor.prototype.addNewState = function (stateId) {
    if ($gameParty.inBattle()) {
      playActorVoice(this, 'state', stateId);
    }
    _Game_Actor_addNewState.apply(this, arguments);
  }

  var _Game_Battler_removeState = Game_Battler.prototype.removeState;
  Game_Battler.prototype.removeState = function (stateId) {
    if ($gameParty.inBattle()) {
      AudioManager.stopVoice(null, 100 + stateId);
    }
    _Game_Battler_removeState.apply(this, arguments);
  };

  //
  // When recover received, wait some frames until play.
  //
  Game_Battler.prototype.doesPlayFromAlly = function () {
    return false;
  };

  Game_Actor.prototype.doesPlayFromAlly = function () {
    // not play voice if target is the same as magic user
    return this !== BattleManager._subject;
  };

  Window_BattleLog.prototype.waitAlly = function () {
    this._waitCount = waitForReceive;
  };

  Window_BattleLog.prototype.playReceiveVoice = function (target) {
    playActorVoice(target, 'fromAlly');
  };

  var _Window_BattleLog_performRecovery =
    Window_BattleLog.prototype.performRecovery;
  Window_BattleLog.prototype.performRecovery = function (target) {
    if (target.doesPlayFromAlly()) {
      this.push('waitAlly');
      this.push('playReceiveVoice', target);
    }
    _Window_BattleLog_performRecovery.call(this, target);
  };
})();
