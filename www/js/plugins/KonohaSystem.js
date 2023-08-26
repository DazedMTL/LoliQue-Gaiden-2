//==============================================================================
// KonohaSystem.js
//==============================================================================

var KONOHA = {
    version: '0.54',
    utils: {},
    parameters: {}
};

var $gameKonoha = null;

(() => {
    'use strict';

    const $p = (p => ({
        pictures: eval(`(${p['pictures']})`),
        variables: eval(`(${p['variables']})`),
        switches: eval(`(${p['switches']})`),
        states: eval(`(${p['states']})`),
        battle: eval(`(${p['battle']})`),
        balloon: eval(`(${p['balloon']})`)
    }))(PluginManager.parameters('KonohaSystem'));

    KONOHA.parameters.pictures = {};
    for (let key in $p.pictures) {
        let picture = eval(`(${$p.pictures[key]})`);
        KONOHA.parameters.pictures[key] = {
            id: Number(picture['id']),
            image: picture['image'],
            x: Number(picture['x']),
            y: Number(picture['y']),
            scale: Number(picture['scale'])
        };
    }

    KONOHA.parameters.variables = {};
    for (let key in $p.variables) {
        KONOHA.parameters.variables[key] = Number($p.variables[key]);
    }

    KONOHA.parameters.switches = {};
    for (let key in $p.switches) {
        KONOHA.parameters.switches[key] = Number($p.switches[key]);
    }

    KONOHA.parameters.states = {};
    for (let key in $p.states) {
        KONOHA.parameters.states[key] = Number($p.states[key]);
    }

    KONOHA.parameters.battle = {};
    for (let key1 in $p.battle) {
        if (key1.match(/^home[1-4]$/)) {
            let position = eval(`(${$p.battle[key1]})`);
            KONOHA.parameters.battle[key1] = {};
            for (let key2 in position) {
                KONOHA.parameters.battle[key1][key2] = Number(position[key2]);
            }
        } else {
            KONOHA.parameters.battle[key1] = Number($p.battle[key1]);
        }
    }

    KONOHA.parameters.balloon = {
        default: Number($p.balloon['default']),
        variableId: Number($p.balloon['variableId'])
    };

    //==============================================================================
    // Game_Konoha
    //==============================================================================

    class Game_Konoha {
        constructor() {
            this.battleInfo = {
                selectedActorId: 0,
                wait: KONOHA.parameters.battle.wait,
                orgasmMembers: [],
                exMembers: null,
                combo: 0
            };
        }

        supply() {
            this.battleInfo = (info => {
                info.wait = info.wait || KONOHA.parameters.battle.wait;
                info.orgasmMembers = info.orgasmMembers || [];
                info.combo = info.combo || 0;
                return info;
            })(this.battleInfo || {});
        }

        update() {
        }
    }

    window.Game_Konoha = Game_Konoha;

    /* rpg_managers.js */

    //==============================================================================
    // DataManager
    //==============================================================================

    (__createGameObjects => {
        DataManager.createGameObjects = function () {
            __createGameObjects.apply(this, arguments);
            $gameKonoha = new Game_Konoha();
        };
    })(DataManager.createGameObjects);

    (__makeSaveContents => {
        DataManager.makeSaveContents = function () {
            let contents = __makeSaveContents.apply(this, arguments);
            contents.konoha = $gameKonoha;
            return contents;
        };
    })(DataManager.makeSaveContents);

    (__extractSaveContents => {
        DataManager.extractSaveContents = function (contents) {
            __extractSaveContents.apply(this, arguments);
            $gameKonoha = contents.konoha || new Game_Konoha();
            $gameKonoha.supply();
        };
    })(DataManager.extractSaveContents);

    /* rpg_objects.js */

    //==============================================================================
    // Game_Map
    //==============================================================================

    (__update => {
        Game_Map.prototype.update = function () {
            __update.apply(this, arguments);
            $gameKonoha.update();
        };
    })(Game_Map.prototype.update);

    /* rpg_scenes.js */

    //==============================================================================
    // Scene_Battle
    //==============================================================================

    (__update => {
        Scene_Battle.prototype.update = function () {
            __update.apply(this, arguments);
            $gameKonoha.update();
        };
    })(Scene_Battle.prototype.update);

})();

/*:
 * @plugindesc 魔法少女コノハシステム
 * @author 奏ねこま（おとぶきねこま）
 * @url http://makonet.sakura.ne.jp/rpg_tkool
 * @target MZ
 * 
 * @param pictures
 * @text ピクチャ設定
 * @type struct<Pictures>
 * @default {"background":"{\"id\":\"70\",\"image\":\"T_win_d\",\"x\":\"865\",\"y\":\"0\",\"scale\":\"100\"}","foreground":"{\"id\":\"75\",\"image\":\"\",\"x\":\"0\",\"y\":\"0\",\"scale\":\"100\"}","nameField":"{\"id\":\"76\",\"image\":\"T_win_name\",\"x\":\"865\",\"y\":\"0\",\"scale\":\"100\"}","button":"{\"id\":\"77\",\"image\":\"Tatie_onoff\",\"x\":\"1227\",\"y\":\"670\",\"scale\":\"100\"}","spine":"{\"id\":\"72\",\"image\":\"\",\"x\":\"1100\",\"y\":\"1100\",\"scale\":\"80\"}","badState":"{\"id\":\"78\",\"image\":\"\",\"x\":\"0\",\"y\":\"0\",\"scale\":\"100\"}"}
 * 
 * @param variables
 * @text 変数設定
 * @type struct<Variables>
 * @default {"clothes":"287"}
 * 
 * @param switches
 * @text スイッチ設定
 * @type struct<Switches>
 * @default {"clothes":"173","tachieVisibility":"1","tachieControl":"2"}
 * 
 * @param states
 * @text ステート設定
 * @type struct<States>
 * @default {"down":"12","badStateMap1":"14","badStateMap2":"15","badStateMap3":"16","badStateMap4":"17","badStateMap5":"18","badStateMap6":"19","badStateMap7":"20","badStateMap8":"21","badStateMap9":"22","badStateMap10":"23","badStateMap11":"24","badStateMap12":"25","badStateMap13":"26","badStateMap14":"27","badStateMap15":"28","badStateMap16":"29","badStateMap17":"30","badStateMap18":"31","badStateMap19":"32","badStateMap20":"33","badStateMap21":"34","badStateMap22":"35","badStateMap23":"36","badStateBattle1":"49","badStateBattle2":"50","badStateBattle3":"51","badStateBattle4":"52","badStateBattle5":"53","badStateBattle6":"54","badStateBattle7":"55","badStateBattle8":"56","badStateBattle9":"57","badStateBattle10":"58","badStateBattle11":"59","badStateBattle12":"60","badStateBattle13":"61","badStateBattle14":"62","badStateBattle15":"63","badStateBattle16":"64","badStateBattle17":"65","badStateBattle18":"66","badStateBattle19":"67"}
 * 
 * @param battle
 * @text 戦闘設定
 * @type struct<Battle>
 * @default {"home1":"{\"x\":\"610\",\"y\":\"300\"}","home2":"{\"x\":\"710\",\"y\":\"250\"}","home3":"{\"x\":\"720\",\"y\":\"350\"}","home4":"{\"x\":\"820\",\"y\":\"300\"}","wait":"30"}
 * 
 * @param balloon
 * @text バルーン設定
 * @type struct<Balloon>
 * @default {"default":"8","variableId":"0"}
 * 
 * @param #include
 * @text モジュールリスト
 * @type string[]
 * @default ["KonohaSystem/common","KonohaSystem/patch","KonohaSystem/map/tachie/setup","KonohaSystem/map/tachie/control","KonohaSystem/map/tachie/spine","KonohaSystem/map/tachie/character","KonohaSystem/map/tachie/nameField","KonohaSystem/map/tachie/badState","KonohaSystem/battle/system","KonohaSystem/battle/setup","KonohaSystem/battle/actor","KonohaSystem/battle/enemy","KonohaSystem/battle/slipDamage","KonohaSystem/battle/tachie/spine","KonohaSystem/battle/tachie/nameField","KonohaSystem/old/Konoha_BattleSystem"]
 */

/*~struct~Pictures:
 * @param background
 * @text 背景ピクチャ
 * @type struct<PictureSetting>
 * @default {"id":"0","image":"","x":"0","y":"0","scale":"100"}
 * 
 * @param foreground
 * @text 前景ピクチャ
 * @type struct<PictureSetting>
 * @default {"id":"0","image":"","x":"0","y":"0","scale":"100"}
 * 
 * @param nameField
 * @text 名前欄ピクチャ
 * @type struct<PictureSetting>
 * @default {"id":"0","image":"","x":"0","y":"0","scale":"100"}
 * 
 * @param button
 * @text ボタンピクチャ
 * @type struct<PictureSetting>
 * @default {"id":"0","image":"","x":"0","y":"0","scale":"100"}
 * 
 * @param spine
 * @text Spineピクチャ
 * @type struct<PictureSetting>
 * @default {"id":"0","image":"","x":"0","y":"0","scale":"100"}
 * 
 * @param badState
 * @text バステピクチャ
 * @type struct<PictureSetting>
 * @default {"id":"0","image":"","x":"0","y":"0","scale":"100"}
 */

/*~struct~PictureSetting:
 * @param id
 * @text ピクチャ番号
 * @type number
 * @default 0
 * 
 * @param image
 * @text 画像名
 * @type string
 * @default
 * 
 * @param x
 * @text X座標
 * @type number
 * @default 0
 * 
 * @param y
 * @text Y座標
 * @type number
 * @default 0
 * 
 * @param scale
 * @text 拡大率
 * @type number
 * @default 100
 */

/*~struct~Variables:
 * @param clothes
 * @text 衣装変数
 * @type number
 * @default 0
 */

/*~struct~Switches:
 * @param clothes
 * @text 衣装スイッチ
 * @type number
 * @default 0
 * 
 * @param tachieVisibility
 * @text 立ち絵表示スイッチ
 * @type number
 * @default 0
 * 
 * @param tachieControl
 * @text 立ち絵制御スイッチ
 * @type number
 * @default 0
 */

/*~struct~States:
 * @param down
 * @text ダウン
 * @type number
 * @default 0
 * 
 * @param badStateMap1
 * @text 妊娠
 * @type number
 * @default 0
 * 
 * @param badStateMap2
 * @text 堕胎後遺症
 * @type number
 * @default 0
 * 
 * @param badStateMap3
 * @text 発情
 * @type number
 * @default 0
 * 
 * @param badStateMap4
 * @text 精液まみれ
 * @type number
 * @default 0
 * 
 * @param badStateMap5
 * @text 淫紋
 * @type number
 * @default 0
 * 
 * @param badStateMap6
 * @text 薬物中毒（ドーピング）
 * @type number
 * @default 0
 * 
 * @param badStateMap7
 * @text 薬物中毒（快楽依存症）
 * @type number
 * @default 0
 * 
 * @param badStateMap8
 * @text 母乳噴出体質
 * @type number
 * @default 0
 * 
 * @param badStateMap9
 * @text 寄生
 * @type number
 * @default 0
 * 
 * @param badStateMap10
 * @text 奴隷刻印
 * @type number
 * @default 0
 * 
 * @param badStateMap11
 * @text トラウマ
 * @type number
 * @default 0
 * 
 * @param badStateMap12
 * @text バイブ挿入
 * @type number
 * @default 0
 * 
 * @param badStateMap13
 * @text 乳首ピアス
 * @type number
 * @default 0
 * 
 * @param badStateMap14
 * @text クリピアス
 * @type number
 * @default 0
 * 
 * @param badStateMap15
 * @text 感度3000倍
 * @type number
 * @default 0
 * 
 * @param badStateMap16
 * @text 精液漏れ
 * @type number
 * @default 0
 * 
 * @param badStateMap17
 * @text 催眠
 * @type number
 * @default 0
 * 
 * @param badStateMap18
 * @text 強制排卵
 * @type number
 * @default 0
 * 
 * @param badStateMap19
 * @text 泥酔
 * @type number
 * @default 0
 * 
 * @param badStateMap20
 * @text 精神崩壊
 * @type number
 * @default 0
 * 
 * @param badStateMap21
 * @text 魔法少女抹消
 * @type number
 * @default 0
 * 
 * @param badStateMap22
 * @text 苗床化
 * @type number
 * @default 0
 * 
 * @param badStateMap23
 * @text 金剛膜化
 * @type number
 * @default 0
 * 
 * @param badStateBattle1
 * @text 乳吸付き
 * @type number
 * @default 0
 * 
 * @param badStateBattle2
 * @text 絶頂
 * @type number
 * @default 0
 * 
 * @param badStateBattle3
 * @text [タッチ]触手
 * @type number
 * @default 0
 * 
 * @param badStateBattle4
 * @text [タッチ]人型
 * @type number
 * @default 0
 * 
 * @param badStateBattle5
 * @text [口淫]触手
 * @type number
 * @default 0
 * 
 * @param badStateBattle6
 * @text [口淫]人型
 * @type number
 * @default 0
 * 
 * @param badStateBattle7
 * @text [拘束]触手
 * @type number
 * @default 0
 * 
 * @param badStateBattle8
 * @text [拘束]人型
 * @type number
 * @default 0
 * 
 * @param badStateBattle9
 * @text [拘束]スライム
 * @type number
 * @default 0
 * 
 * @param badStateBattle10
 * @text [拘束]巨人
 * @type number
 * @default 0
 * 
 * @param badStateBattle11
 * @text [挿入1]触手
 * @type number
 * @default 0
 * 
 * @param badStateBattle12
 * @text [挿入1]人型
 * @type number
 * @default 0
 * 
 * @param badStateBattle13
 * @text [挿入1]スライム
 * @type number
 * @default 0
 * 
 * @param badStateBattle14
 * @text [挿入2]人型バック
 * @type number
 * @default 0
 * 
 * @param badStateBattle15
 * @text [挿入2]獣バック
 * @type number
 * @default 0
 * 
 * @param badStateBattle16
 * @text [挿入3]巨人駅弁挿入
 * @type number
 * @default 0
 * 
 * @param badStateBattle17
 * @text [挿入3]人型駅弁挿入
 * @type number
 * @default 0
 * 
 * @param badStateBattle18
 * @text 時間停止
 * @type number
 * @default 0
 * 
 * @param badStateBattle19
 * @text 睡姦
 * @type number
 * @default 0
 * 
 */

/*~struct~Battle:
 * @param home1
 * @text メンバー1人目の位置
 * @type struct<Position>
 * @default {"x":"0","y":"0"}
 * 
 * @param home2
 * @text メンバー2人目の位置
 * @type struct<Position>
 * @default {"x":"0","y":"0"}
 * 
 * @param home3
 * @text メンバー3人目の位置
 * @type struct<Position>
 * @default {"x":"0","y":"0"}
 * 
 * @param home4
 * @text メンバー4人目の位置
 * @type struct<Position>
 * @default {"x":"0","y":"0"}
 * 
 * @param wait
 * @text 行動後ウェイト
 * @type numbet
 * @default 0
 */

/*~struct~Position:
 * @param x
 * @text X座標
 * @type number
 * @default 0
 * 
 * @param y
 * @text Y座標
 * @type number
 * @default 0
 */

/*~struct~Balloon:
 * @param default
 * @text 標準速度
 * @type number
 * @default 8
 * 
 * @param variableId
 * @text 変数番号
 * @type number
 * @default 0
 */

/*
 * @help
 * ------------------------------------------------------------------------------
 *  マップ立ち絵Spine説明
 * ------------------------------------------------------------------------------
 * i) アクター1番のメモ欄に↓のタグを貼る
 * ↓↓↓ここから↓↓↓
 * <spine:
 * { T_konoha_b, zamen:     vl(287, 0),  st(29), st(30), am(1) },
 * { T_konoha_b:            vl(287, 0),          st(30), am(1) },
 * { T_konoha_b, isyou50Z:  vl(287, 50), st(29), st(30), am(1) },
 * { T_konoha_b, isyou50:   vl(287, 50),         st(30), am(1) },
 * { T_konoha_b, isyou100Z:              st(29), st(30), am(1) },
 * { T_konoha_b, isyou100:                       st(30), am(1) },
 * 
 * { T_konoha_h, zamen:     vl(287, 0),  st(29), vl(261, 299), am(1) },
 * { T_konoha_h:            vl(287, 0),          vl(261, 299), am(1) },
 * 
 * { T_konoha  , zamen:     vl(287, 0),  st(29), am(1) },
 * { T_konoha  :            vl(287, 0),          am(1) },
 * { T_konoha  , isyou50Z:  vl(287, 50), st(29), am(1) },
 * { T_konoha  , isyou50:   vl(287, 50),         am(1) },
 * { T_konoha  , isyou100Z:              st(29), am(1) },
 * { T_konoha  , isyou100:                       am(1) },
 * 
 * { T_konoha_b, zamen:                  st(29), st(30) },
 * { T_konoha_b:                                 st(30) },
 * 
 * { T_konoha_h, zamen:                  st(29), vl(261, 299) },
 * { T_konoha_h:                                 vl(261, 299) },
 * 
 * { T_konoha  , zamen:                  st(29) },
 * { T_konoha  :            default             }
 * >
 * ↑↑↑ここまで↑↑↑
 * 
 * ii) setSkeleton('T_konoha') の代わりに setActor(1) を実行する
 * 
 * 　$gameScreen.spine(92).setActor(1)
 *                        .setAnimation(0, 'taiki1');
 * 
 * iii) 衣服（変数287番）、淫乱（変数261番）の値を増減させてみる
 * 
 * iv) 精液やられ（ステート29番）、孕み（ステート30番）をつけ外ししてみる
 * 
 * 【メモ欄の説明】
 * 
 *   { スケルトン名, スキン名: 条件 }
 * 
 *   上のほうから条件判定して、条件適合したスケルトンとスキンに切り替え
 *   スキン名を省略するとスキンなし
 * 
 * 【条件の説明】
 * 
 *   vl(287, 0)   変数287番が0以下だったら
 *   vl(287, 50)  変数287番が50以下だったら
 *   vl(261, 299) 変数261番が299以下だったら
 *   st(29)       ステート29番にかかっていたら
 *   st(30)       ステート30番にかかっていたら
 *   am(1)        防具1番を装備していたら
 *   default      一番下の条件はdefaultにしておいてください
 * 
 * 【他の条件】
 * 
 *   vg(1, 100) 変数1番が100以上だったら
 *   sw(1)      スイッチ1番がONだったら
 * 
 * ------------------------------------------------------------------------------
 *  キャラチップ説明
 * ------------------------------------------------------------------------------
 *  i) アクター1番のメモ欄に↓のタグを貼る
 *  ↓↓↓ここから↓↓↓
 *  <image:
 *  { hokou_konoha1_swim_Rs30, 3: vl(287, 0),  st(30),               am(1), rg(6) },
 *  { hokou_konoha1_swim_Rs30, 1: vl(287, 50), st(30),               am(1), rg(6) },
 *  { hokou_konoha1_swim_Rs30, 0:              st(30),               am(1), rg(6) },
 *  
 *  { hokou_konoha0_swim, 0:      vl(287, 0),          vl(261, 299), am(1), rg(6) },
 *  
 *  { hokou_konoha1_swim, 3:      vl(287, 0),                        am(1), rg(6) },
 *  { hokou_konoha1_swim, 1:      vl(287, 50),                       am(1), rg(6) },
 *  { hokou_konoha1_swim, 0:                                         am(1), rg(6) },
 *  
 *  { hokou_konoha1_swim_Rs30, 3:              st(30),                      rg(6) },
 *  
 *  { hokou_konoha0_swim, 0:                           vl(261, 299),        rg(6) },
 *  
 *  { hokou_konoha1_swim, 3:                                                rg(6) },
 *  
 *  { hokou_konoha1_Rs30, 3:      vl(287, 0),  st(30),               am(1) },
 *  { hokou_konoha1_Rs30, 1:      vl(287, 50), st(30),               am(1) },
 *  { hokou_konoha1_Rs30, 0:                   st(30),               am(1) },
 *  
 *  { hokou_konoha0, 0:           vl(287, 0),          vl(261, 299), am(1) },
 *  
 *  { hokou_konoha1, 3:           vl(287, 0),                        am(1) },
 *  { hokou_konoha1, 1:           vl(287, 50),                       am(1) },
 *  { hokou_konoha1, 0:                                              am(1) },
 *  
 *  { hokou_konoha1_Rs30, 3:                   st(30)                      },
 *  
 *  { hokou_konoha0, 0:                                vl(261, 299)        },
 *  
 *  { hokou_konoha1, 3:           default                                  }
 *  >
 *  ↑↑↑ここまで↑↑↑
 *  
 *  ii) 衣服（変数287番）、淫乱（変数261番）の値を増減させてみる
 *  
 *  iii) 孕み（ステート30番）をつけ外ししてみる
 *  
 *  【メモ欄の説明】
 *  
 *    { キャラチップ画像名, 画像番号: 条件 }
 *  
 *    上のほうから条件判定して、条件適合したキャラクター画像に切り替え
 *  
 *  【条件の説明】
 *  
 *    vl(287, 0)   変数287番が0以下だったら
 *    vl(287, 50)  変数287番が50以下だったら
 *    vl(261, 299) 変数261番が299以下だったら
 *    st(29)       ステート29番にかかっていたら
 *    st(30)       ステート30番にかかっていたら
 *    am(1)        防具1番を装備していたら
 *    rg(6)        リージョンが6番だったら
 *    default      一番下の条件はdefaultにしておいてください
 *  
 *  【他の条件】
 *  
 *    vg(1, 100) 変数1番が100以上だったら
 *    sw(1)      スイッチ1番がONだったら
 *  
 * ------------------------------------------------------------------------------
 *  戦闘システム説明
 * ------------------------------------------------------------------------------
 *  img/systemフォルダの中にbattleフォルダを作り
 *  戦闘シーン関連の画像は全部その中に入れること。
 *  
 *  サイドビュー戦闘の設定はツクールのデータベースでやってください。
 *  アクターの自動戦闘設定も同様にデータベースでやってください。
 *  
 *  拘束有りのステートはメモ欄に <拘束値:100> など値を設定。
 *  拘束中は敵に攻撃されないように狙われ率を0%に設定すること。
 * 
 * ------------------------------------------------------------------------------
 *   本プラグインの利用はRPGツクール/RPG Makerの正規ユーザーに限られます。
 *   商用、非商用、有償、無償、一般向け、成人向けを問わず利用可能です。
 *   ご利用の際に連絡や報告は必要ありません。また、製作者名の記載等も不要です。
 *   プラグインを導入した作品に同梱する形以外での再配布、転載はご遠慮ください。
 *   本プラグインにより生じたいかなる問題についても一切の責任を負いかねます。
 * ------------------------------------------------------------------------------
 *                                              Copylight (c) 2021 Nekoma Otobuki
 *                                         http://makonet.sakura.ne.jp/rpg_tkool/
 *                                                  https://twitter.com/koma_neko
 */
