//=============================================================================
// Yanfly Engine Plugins - Item Core Extension - Item Menu Categories
// YEP_X_ItemCategories.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_ItemCategories = true;

var Yanfly = Yanfly || {};
Yanfly.ItemCat = Yanfly.ItemCat || {};
Yanfly.ItemCat.version = 1.01;

//=============================================================================
/*:ja
* @plugindesc v1.01 (要YEP_ItemCore) アイテムメニューのカテゴリを設定し、アイテムを割り当てます
* @author Yanfly Engine Plugins + Sylvester Collaboration
*
* @param ---一般---
* @text ---一般---
* @default
*
* @param Category Order
* @text カテゴリ順
* @parent ---一般---
* @desc アイテムメニューに表示される全てのカテゴリの順序。詳細はプラグインのヘルプファイルを見てください。
* @default Items, Weapons, Armors, KeyItems
*
* @param ---名付---
* @text ---名付---
* @default
*
* @param Hidden Item A
* @text 隠しアイテムA
* @parent ---名付---
* @desc 隠しアイテムAの表示名
* @default 特別アイテム
*
* @param Hidden Item B
* @text 隠しアイテムB
* @parent ---名付---
* @desc 隠しアイテムBの表示名
* @default 独自アイテム
*
* @param Consumable
* @text 消耗品
* @parent ---名付---
* @desc 消耗するアイテムの表示名
* @default 消耗品
*
* @param Nonconsumable
* @text 非消耗品
* @parent ---名付---
* @desc 消耗しないアイテムの表示名
* @default 非消耗品
*
* @param Always Usable
* @text 常時使用可能
* @parent ---名付---
* @desc 常時使用可能アイテムの表示名
* @default 常用品
*
* @param Battle Usable
* @text バトル使用可能
* @parent ---名付---
* @desc バトル画面で使用可能アイテムの表示名
* @default 戦闘用
*
* @param Field Usable
* @text メニュー使用可能
* @parent ---名付---
* @desc メニュー画面で使用可能アイテムの表示名
* @default 移動用
*
* @param Never Usable
* @text 使用不可
* @parent ---名付---
* @desc 使用不可アイテムの表示名
* @default 使用不可
*
* @help
* 翻訳:ムノクラ
* https://fungamemake.com/
* https://twitter.com/munokura/
*
* ===========================================================================
* 導入
* ===========================================================================
*
* このプラグインはYEP_ItemCoreを必要とします。
* プラグイン管理の YEP_ItemCore の下に
* このプラグインがあることを確認してください。
*
* RPGツクールMVでは、アイテムメニューにはアイテム、
* 武器、防具、重要アイテムの4つのカテゴリーしかありません。
* このプラグインは、ItemCoreの助けを借りて、
* 武器の種類、防具の種類、装備の種類、
* アイテムの使い方などに基づいて自動的に追加され、
* 事前に作成されたものに加えて、さらに多くのカテゴリを追加できます。
*
* YanflyEnginePluginsライブラリとの互換性を保証するための
* SylvesterとYanflyによる共同作業プラグインです。
*
* ===========================================================================
* 説明
* ===========================================================================
*
* アイテムメニューに表示されるアイテムカテゴリを変更するには、
* プラグインパラメータでリストを変更します。
* 各カテゴリはカンマ(,)で区切ります。
* 各カテゴリは、次の形式で正しく記入する必要があります。
*
* -----------------------   -------------------------------------------------
* パラメータ構文            説明
* -----------------------   -------------------------------------------------
*
* Items                     通常アイテムタイプのみを表示
* AllItems                  大事なものを含む全てのアイテムを表示
*
* RegularItems              通常アイテムのみを表示
* KeyItems                  大事なもののみを表示
* HiddenItemA               隠しアイテムAタイプのみを表示
* HiddenItemB               隠しアイテムBタイプのみを表示
* Consumable                消耗品のみを表示
* Nonconsumable             非消耗品のみを表示
* AlwaysUsable              常時使用可能アイテムのみを表示
* BattleUsable              バトル画面で使用可能アイテムのみを表示
* FieldUsable               メニュー画面で使用可能アイテムのみを表示
* NeverUsable               使用不可アイテムのみを表示
*
* Weapons                   全ての武器を表示
* WType:x                   タイプxの武器を表示(xをIDに置換)
*
* Armors                    全ての防具を表示
* AType:x                   防具タイプxの防具を表示(xをIDに置換)
*
* EType:x                   装備タイプxのアイテムを表示(xをIDに置換)
*
* Category:x                カテゴリーxのアイテムを表示(xをテキストに置換)     *
* 次を表示するリストの例
*   Items
*   Key Items
*   Dagger
*   Sword
*   Bodygear
*   Accessory
*   Herbs
*
* プラグインパラメータは次になります。
*
*   Items, KeyItems, WType:1, WType2, AType1, AType2, Category:Herbs
*
* カテゴリはリストされている順に並ぶので、それに従って計画してください。
*
* ===========================================================================
* メモタグ
* ===========================================================================
*
* カスタムカテゴリをアイテムに追加するには、次のメモタグを使用します。
*
* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*
* アイテム、武器、防具のメモタグ
*
*   <Menu Category: x>
*   <Menu Category: x, x, x>
*   - 'x'を、アイテムに付けたいカテゴリ名に置き換えます。
*   カテゴリをさらに挿入するには、このタグを複数を挿入してください。
*   これらのカテゴリは、Category:x
*   プラグインパラメータのsyntaxと組み合わせて使用されます。
*
*   例:
*
*     <Menu Category: Herbs>
*
*   プラグインパラメータにsyntaxが必要です。
*
*     Category:Herbs
*
*   あなたが複数のカテゴリでメモタグのバージョンを使うならば、
*   それはこのような動作をするでしょう。
*
*     <Menu Category: Herbs, Potions, Elixirs>
*
*   プラグインパラメーター
*
*     Category:Herbs, Category:Potions, Category:Elixirs
*
*   *注* メモタグは既成のカテゴリには適用されません。
*
* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
*
* ===========================================================================
* Changelog
* ===========================================================================
*
* Version 1.01:
* - Updated for RPG Maker MV version 1.5.0.
*
* Version 1.00:
* - Finished Plugin!
*/
//=============================================================================

if (Imported.YEP_ItemCore) {

  //=============================================================================
  // Parameter Variables
  //=============================================================================

  Yanfly.Parameters = PluginManager.parameters('YEP_X_ItemCategories');
  Yanfly.Param = Yanfly.Param || {};

  Yanfly.SetupParameters = function () {
    Yanfly.Param.ItemCatOrder = String(Yanfly.Parameters['Category Order']);
    Yanfly.Param.ItemCatOrder = Yanfly.Param.ItemCatOrder.split(',');
    //---
    var length = Yanfly.Param.ItemCatOrder.length;
    for (var i = 0; i < 0; i++) {
      Yanfly.Param.ItemCatOrder[i] = Yanfly.Param.ItemCatOrder[i].trim();
    }
    Yanfly.Param.ItemCatNames = {
      HiddenItemA: String(Yanfly.Parameters['Hidden Item A']),
      HiddenItemB: String(Yanfly.Parameters['Hidden Item B']),
      Consumable: String(Yanfly.Parameters['Consumable']),
      Nonconsumable: String(Yanfly.Parameters['Nonconsumable']),
      AlwaysUsable: String(Yanfly.Parameters['Always Usable']),
      BattleUsable: String(Yanfly.Parameters['Battle Usable']),
      FieldUsable: String(Yanfly.Parameters['Field Usable']),
      NeverUsable: String(Yanfly.Parameters['Never Usable'])
    }
  };
  Yanfly.SetupParameters();

  //=============================================================================
  // DataManager
  // ----------------------------------------------------------------------------
  // Notetags added by Yanfly
  //=============================================================================

  Yanfly.ItemCat.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
  DataManager.isDatabaseLoaded = function () {
    if (!Yanfly.ItemCat.DataManager_isDatabaseLoaded.call(this)) return false;

    if (!Yanfly._loaded_YEP_X_ItemCategories) {
      this.processItemCategoriesNotetags1($dataItems);
      this.processItemCategoriesNotetags1($dataWeapons);
      this.processItemCategoriesNotetags1($dataArmors);
      Yanfly._loaded_YEP_X_ItemCategories = true;
    }

    return true;
  };

  DataManager.processItemCategoriesNotetags1 = function (group) {
    for (var n = 1; n < group.length; n++) {
      var obj = group[n];
      var notedata = obj.note.split(/[\r\n]+/);

      obj.itemCategory = [];

      for (var i = 0; i < notedata.length; i++) {
        var line = notedata[i];
        if (line.match(/<MENU[ ](?:CATEGORY|CATEGORIES):[ ](.*)>/i)) {
          var str = String(RegExp.$1).split(',');
          var length = str.length;
          for (var s = 0; s < length; s++) {
            obj.itemCategory.push(str[s].trim());
          }
        }
      }
    }
  };

  //=============================================================================
  // Window_ItemCategory
  //=============================================================================

  Yanfly.ItemCat.Window_ItemCategory_update =
    Window_ItemCategory.prototype.update;
  Window_ItemCategory.prototype.update = function () {
    Yanfly.ItemCat.Window_ItemCategory_update.call(this);
    if (this._itemWindow) {
      this._itemWindow.setExt(this.currentExt());
    }
  };

  Window_ItemCategory.prototype.makeCommandList = function () {
    var data = Yanfly.Param.ItemCatOrder;
    var length = data.length;
    for (var i = 0; i < length; i++) {
      var category = data[i].trim();
      this.addItemCategory(category);
    }
  };

  Window_ItemCategory.prototype.addItemCategory = function (category) {
    var text = Yanfly.Param.ItemCatNames[category];
    if (category.match(/Category:(.*)/i)) {
      var type = String(RegExp.$1);
      return this.addCommand(type, 'Category', true, type);
    }
    if (category.match(/AllItems/i)) {
      return this.addCommand(TextManager.item, 'AllItems');
    }
    if (category.match(/RegularItems/i)) {
      return this.addCommand(text, 'item');
    }
    if (category.match(/KeyItems/i)) {
      return this.addCommand(TextManager.keyItem, 'keyItem');
    }
    if (category.match(/HiddenItemA/i)) {
      return this.addCommand(text, 'HiddenItemA');
    }
    if (category.match(/HiddenItemB/i)) {
      return this.addCommand(text, 'HiddenItemB');
    }
    if (category.match(/Nonconsumable/i)) {
      return this.addCommand(text, 'Nonconsumable');
    }
    if (category.match(/Consumable/i)) {
      return this.addCommand(text, 'Consumable');
    }
    if (category.match(/AlwaysUsable/i)) {
      return this.addCommand(text, 'AlwaysUsable');
    }
    if (category.match(/BattleUsable/i)) {
      return this.addCommand(text, 'BattleUsable');
    }
    if (category.match(/FieldUsable/i)) {
      return this.addCommand(text, 'FieldUsable');
    }
    if (category.match(/NeverUsable/i)) {
      return this.addCommand(text, 'NeverUsable');
    }
    if (category.match(/Items/i)) {
      return this.addCommand(TextManager.item, 'item');
    }
    if (category.match(/Weapons/i)) {
      return this.addCommand(TextManager.weapon, 'weapon');
    }
    if (category.match(/WType:(\d+)/i)) {
      var id = parseInt(RegExp.$1);
      return this.addCommand($dataSystem.weaponTypes[id], 'WType', true, id);
    }
    if (category.match(/Armors/i)) {
      return this.addCommand(TextManager.armor, 'armor');
    }
    if (category.match(/AType:(\d+)/i)) {
      var id = parseInt(RegExp.$1);
      return this.addCommand($dataSystem.armorTypes[id], 'AType', true, id);
    }
    if (category.match(/EType:(\d+)/i)) {
      var id = parseInt(RegExp.$1);
      return this.addCommand($dataSystem.equipTypes[id], 'EType', true, id);
    }
  };

  //=============================================================================
  // Window_ItemList
  //=============================================================================

  Yanfly.ItemCat.Window_ItemList_initialize =
    Window_ItemList.prototype.initialize;
  Window_ItemList.prototype.initialize = function (x, y, width, height) {
    Yanfly.ItemCat.Window_ItemList_initialize.call(this, x, y, width, height);
    this._ext = 'none';
  };

  Window_ItemList.prototype.setExt = function (ext) {
    if (this._ext !== ext) {
      this._ext = ext;
      this.refresh();
      this.resetScroll();
    }
  };

  Window_ItemList.prototype.includes = function (item) {
    switch (this._category) {
      case 'AllItems':
        return DataManager.isItem(item);
        break;
      case 'item':
        return DataManager.isItem(item) && item.itypeId === 1;
        break;
      case 'RegularItems':
        return DataManager.isItem(item) && item.itypeId === 1;
        break;
      case 'keyItem':
        return DataManager.isItem(item) && item.itypeId === 2;
        break;
      case 'HiddenItemA':
        return DataManager.isItem(item) && item.itypeId === 3;
        break;
      case 'HiddenItemB':
        return DataManager.isItem(item) && item.itypeId === 4;
        break;
      case 'Consumable':
        return DataManager.isItem(item) && item.consumable;
        break;
      case 'Nonconsumable':
        return DataManager.isItem(item) && !item.consumable;
        break;
      case 'AlwaysUsable':
        return DataManager.isItem(item) && [0].contains(item.occasion);
        break;
      case 'BattleUsable':
        return DataManager.isItem(item) && [0, 1].contains(item.occasion);
        break;
      case 'FieldUsable':
        return DataManager.isItem(item) && [0, 2].contains(item.occasion);
        break;
      case 'NeverUsable':
        return DataManager.isItem(item) && [3].contains(item.occasion);
        break;
      case 'weapon':
        return DataManager.isWeapon(item);
        break;
      case 'WType':
        return DataManager.isWeapon(item) && item.wtypeId === this._ext;
        break;
      case 'armor':
        return DataManager.isArmor(item);
        break;
      case 'AType':
        return DataManager.isArmor(item) && item.atypeId === this._ext;
        break;
      case 'EType':
        return item && item.etypeId === this._ext;
        break;
      case 'Category':
        return item && item.itemCategory.contains(this._ext);
        break;
      default:
        return false;
    }
  };

  //=============================================================================
  // End of File
  //=============================================================================
} else {

  var text = '================================================================\n';
  text += 'YEP_X_ItemCategories requires YEP_ItemCore and to be at the latest '
  text += 'version to run properly. '
  text += '\n\nPlease go to www.yanfly.moe and update to the latest version for ';
  text += 'the YEP_ItemCore plugin.\n';
  text += '================================================================\n';
  console.log(text);
  require('nw.gui').Window.get().showDevTools();

}