//=============================================================================
/*:
 * @plugindesc 条件分岐：パーティメンバーの誰かが……ＭＶ 1.00
 *ヘルプに使い方が載っています。
 * @author mo-to
 *
 * @help 
 *ベントコマンド条件分岐：スクリプトに記入する
 *$gameParty.～(id)または(name)
 *
 *例）メンバーの誰かの名前がハロルドか？
 *$gameParty.membersName('ハロルド')
 *''でくぐるのを忘れずに！
 *
 *例）メンバーの職業に僧侶(デフォルト時)がいるか？
 *$gameParty.membersClass(4)
 *
 *例）メンバーの誰かがスキル『ヒール』(デフォルト時)を覚えているか？
 *$gameParty.membersLeSkill(8)
 *
 *例）メンバーの誰かが武器『剣』(デフォルト時)を装備しているか？
 *$gameParty.membersEqWeapon(1)
 *
 *例）メンバーの誰かが防具『服』(デフォルト時)を装備しているか？
 *$gameParty.membersEqArmor(3)
 *
 *例）メンバーの誰かが『戦闘不能』か？
 *$gameParty.membersState(1)  
 */
//=============================================================================

(function () {


    //★　指定の名前がメンバーに含まれているかを判定
    Game_Party.prototype.membersName = function (name) {
        return this.members().some(function (actor) {
            return (actor._name === name);
        });
    };

    //★　指定職業がメンバーに含まれているかを判定
    Game_Party.prototype.membersClass = function (classid) {
        return this.members().some(function (actor) {
            return (actor._classId === classid);
        });
    };

    //★　指定スキルをメンバーが覚えているかを判定
    Game_Party.prototype.membersLeSkill = function (skillid) {
        return this.battleMembers().some(function (actor) {
            return (actor.isLearnedSkill(skillid));
        });
    };

    //★　指定武器をメンバーが装備しているかを判定
    Game_Party.prototype.membersEqWeapon = function (weaponid) {
        return this.members().some(function (actor) {
            return (actor.hasWeapon($dataWeapons[weaponid]));
        });
    };

    //★　指定防具をメンバーが装備しているかを判定
    Game_Party.prototype.membersEqArmor = function (armorid) {
        return this.members().some(function (actor) {
            return (actor.hasArmor($dataArmors[armorid]));
        });
    };

    //★　指定ステートがメンバーに付加されているかを判定
    Game_Party.prototype.membersState = function (stateid) {
        return this.members().some(function (actor) {
            return (actor.isStateAffected(stateid));
        });
    };

})();
