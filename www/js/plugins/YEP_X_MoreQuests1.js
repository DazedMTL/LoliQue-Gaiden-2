//=============================================================================
// Yanfly Engine Plugins - Quest Journal System Extension - More Quests 1
// YEP_X_MoreQuests1.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_MoreQuests1 = true;

var Yanfly = Yanfly || {};
Yanfly.MoreQuests1 = Yanfly.MoreQuests1 || {};
Yanfly.MoreQuests1.version = 1.00;

//=============================================================================
/*:ja
* @plugindesc v1.00 (要YEP_QuestJournal.js)クエスト101から1000を追加します。
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
* YEP_QuestJournalプラグインには、
* 作成してゲームに挿入できる100個のクエストエントリが付属しています。
* RPGによっては、100個のクエストエントリーでは足りないかもしれません。
* このプラグインは、
* YEP_QuestJournal用に作られた一連の拡張プラグインの一部で、
* 100よりも多いクエスト量を可能にします。
*
* YEP_X_MoreQuests 1はクエスト 101から1000を追加します。
* YEP_X_MoreQuests 2はクエスト1001から2000を追加します。
* YEP_X_MoreQuests 3はクエスト2001から3000を追加します。
* YEP_X_MoreQuests 4はクエスト3001から4000を追加します。
* YEP_X_MoreQuests 5はクエスト4001から5000を追加します。
* YEP_X_MoreQuests 6はクエスト5001から6000を追加します。
* YEP_X_MoreQuests 7はクエスト6001から7000を追加します。
* YEP_X_MoreQuests 8はクエスト7001から8000を追加します。
* YEP_X_MoreQuests 9はクエスト8001から9000を追加します。
* YEP_X_MoreQuests10はクエスト9001から10000を追加します。
*
* これらの拡張プラグインには新機能、自動バッチデータもついてきます。
* 100個のクエストのセット毎に、
* デフォルトのタイプ、難易度、差出人、場所データを設定できます。
* |-=AUTO=-| を持つクエストエントリのフィールドには、
* バッチセットのデフォルトデータからデータが表示されます。
* これをどのように使うかはあなた次第です。
*
* ============================================================================
* Changelog
* ============================================================================
*
* Version BETA:
* - Started Plugin!
*
* ============================================================================
* End of Helpfile
* ============================================================================
*
* @param ---クエスト 101 から 200---
* @default
*
* @param Category: 101 to 200
* @text Auto Batch Category
* @parent ---クエスト 101 から 200---
* @type combo
* @option メイン
* @option サイド
* @option 人物
* @option 指導
* @desc |-=AUTO=-|タイプのデフォルトのクエストの種類。注:'Quest List Window'に新しいクエストタイプを追加してください
* @default メイン
*
* @param Difficulty: 101 to 200
* @text Auto Batch Difficulty
* @parent ---クエスト 101 から 200---
* @desc |-=AUTO=-|タイプのデフォルトの難易度。テキストコード使用可
* @default i[87]i[87]i[87]
*
* @param From: 101 to 200
* @text Auto Batch From
* @parent ---クエスト 101 から 200---
* @desc |-=AUTO=-|タイプのデフォルトの依頼者。テキストコード使用可
* @default NPCの名前
*
* @param Location: 101 to 200
* @text Auto Batch Location
* @parent ---クエスト 101 から 200---
* @desc |-=AUTO=-|タイプのデフォルトの場所。テキストコード使用可
* @default NPCの場所
*
* @param Quest 101
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 102
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。@default
*
* @param Quest 103
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 104
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 105
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 106
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 107
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 108
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 109
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 110
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 111
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 112
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 113
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 114
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 115
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 116
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 117
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 118
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 119
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 120
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 121
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 122
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 123
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 124
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 125
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 126
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 127
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 128
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 129
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 130
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 131
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 132
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 133
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 134
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 135
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 136
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 137
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 138
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 139
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 140
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 141
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 142
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 143
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 144
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 145
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 146
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 147
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 148
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 149
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 150
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 151
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 152
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 153
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 154
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 155
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 156
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 157
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 158
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 159
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 160
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 161
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 162
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 163
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 164
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 165
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 166
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 167
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 168
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 169
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 170
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 171
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 172
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 173
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 174
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 175
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 176
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 177
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 178
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 179
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 180
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 181
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 182
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 183
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 184
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 185
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 186
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 187
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 188
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 189
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 190
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 191
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 192
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 193
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 194
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 195
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 196
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 197
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 198
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 199
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 200
* @parent ---クエスト 101 から 200---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param ---クエスト 201 から 300---
* @default
*
* @param Category: 201 to 300
* @text Auto Batch Category
* @parent ---クエスト 201 から 300---
* @type combo
* @option メイン
* @option サイド
* @option 人物
* @option 指導
* @desc |-=AUTO=-|タイプのデフォルトのクエストの種類。注:'Quest List Window'に新しいクエストタイプを追加してください
* @default メイン
*
* @param Difficulty: 201 to 300
* @text Auto Batch Difficulty
* @parent ---クエスト 201 から 300---
* @desc |-=AUTO=-|タイプのデフォルトの難易度。テキストコード使用可
* @default i[87]i[87]i[87]
*
* @param From: 201 to 300
* @text Auto Batch From
* @parent ---クエスト 201 から 300---
* @desc |-=AUTO=-|タイプのデフォルトの依頼者。テキストコード使用可
* @default NPCの名前
*
* @param Location: 201 to 300
* @text Auto Batch Location
* @parent ---クエスト 201 から 300---
* @desc |-=AUTO=-|タイプのデフォルトの場所。テキストコード使用可
* @default NPCの場所
*
* @param Quest 201
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 202
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 203
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 204
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 205
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 206
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 207
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 208
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 209
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 210
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 211
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 212
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 213
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 214
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 215
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 216
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 217
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 218
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 219
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 220
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 221
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 222
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 223
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 224
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 225
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 226
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 227
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 228
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 229
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 230
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 231
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 232
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 233
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 234
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 235
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 236
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 237
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 238
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 239
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 240
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 241
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 242
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 243
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 244
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 245
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 246
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 247
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 248
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 249
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 250
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 251
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 252
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 253
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 254
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 255
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 256
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 257
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 258
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 259
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 260
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 261
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 262
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 263
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 264
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 265
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 266
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 267
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 268
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 269
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 270
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 271
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 272
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 273
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 274
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 275
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 276
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 277
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 278
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 279
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 280
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 281
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 282
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 283
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 284
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 285
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 286
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 287
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 288
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 289
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 290
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 291
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 292
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 293
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 294
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 295
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 296
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 297
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 298
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 299
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 300
* @parent ---クエスト 201 から 300---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param ---クエスト 301 から 400---
* @default
*
* @param Category: 301 to 400
* @text Auto Batch Category
* @parent ---クエスト 301 から 400---
* @type combo
* @option メイン
* @option サイド
* @option 人物
* @option 指導
* @desc |-=AUTO=-|タイプのデフォルトのクエストの種類。注:'Quest List Window'に新しいクエストタイプを追加してください
* @default メイン
*
* @param Difficulty: 301 to 400
* @text Auto Batch Difficulty
* @parent ---クエスト 301 から 400---
* @desc |-=AUTO=-|タイプのデフォルトの難易度。テキストコード使用可
* @default i[87]i[87]i[87]
*
* @param From: 301 to 400
* @text Auto Batch From
* @parent ---クエスト 301 から 400---
* @desc |-=AUTO=-|タイプのデフォルトの依頼者。テキストコード使用可
* @default NPCの名前
*
* @param Location: 301 to 400
* @text Auto Batch Location
* @parent ---クエスト 301 から 400---
* @desc |-=AUTO=-|タイプのデフォルトの場所。テキストコード使用可
* @default NPCの場所
*
* @param Quest 301
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 302
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 303
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 304
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 305
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 306
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 307
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 308
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 309
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 310
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 311
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 312
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 313
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 314
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 315
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 316
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 317
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 318
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 319
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 320
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 321
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 322
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 323
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 324
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 325
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 326
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 327
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 328
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 329
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 330
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 331
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 332
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 333
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 334
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 335
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 336
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 337
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 338
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 339
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 340
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 341
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 342
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 343
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 344
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 345
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 346
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 347
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 348
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 349
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 350
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 351
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 352
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 353
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 354
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 355
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 356
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 357
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 358
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 359
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 360
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 361
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 362
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 363
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 364
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 365
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 366
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 367
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 368
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 369
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 370
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 371
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 372
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 373
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 374
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 375
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 376
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 377
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 378
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 379
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 380
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 381
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 382
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 383
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 384
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 385
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 386
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 387
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 388
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 389
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 390
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 391
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 392
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 393
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 394
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 395
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 396
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 397
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 398
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 399
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 400
* @parent ---クエスト 301 から 400---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param ---クエスト 401 から 500---
* @default
*
* @param Category: 401 to 500
* @text Auto Batch Category
* @parent ---クエスト 401 から 500---
* @type combo
* @option メイン
* @option サイド
* @option 人物
* @option 指導
* @desc |-=AUTO=-|タイプのデフォルトのクエストの種類。注:'Quest List Window'に新しいクエストタイプを追加してください
* @default メイン
*
* @param Difficulty: 401 to 500
* @text Auto Batch Difficulty
* @parent ---クエスト 401 から 500---
* @desc |-=AUTO=-|タイプのデフォルトの難易度。テキストコード使用可
* @default i[87]i[87]i[87]
*
* @param From: 401 to 500
* @text Auto Batch From
* @parent ---クエスト 401 から 500---
* @desc |-=AUTO=-|タイプのデフォルトの依頼者。テキストコード使用可
* @default NPCの名前
*
* @param Location: 401 to 500
* @text Auto Batch Location
* @parent ---クエスト 401 から 500---
* @desc |-=AUTO=-|タイプのデフォルトの場所。テキストコード使用可
* @default NPCの場所
*
* @param Quest 401
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 402
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 403
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 404
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 405
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 406
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 407
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 408
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 409
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 410
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 411
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 412
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 413
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 414
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 415
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 416
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 417
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 418
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 419
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 420
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 421
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 422
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 423
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 424
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 425
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 426
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 427
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 428
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 429
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 430
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 431
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 432
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 433
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 434
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 435
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 436
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 437
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 438
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 439
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 440
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 441
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 442
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 443
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 444
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 445
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 446
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 447
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 448
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 449
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 450
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 451
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 452
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 453
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 454
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 455
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 456
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 457
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 458
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 459
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 460
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 461
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 462
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 463
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 464
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 465
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 466
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 467
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 468
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 469
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 470
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 471
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 472
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 473
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 474
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 475
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 476
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 477
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 478
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 479
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 480
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 481
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 482
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 483
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 484
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 485
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 486
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 487
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 488
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 489
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 490
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 491
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 492
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 493
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 494
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 495
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 496
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 497
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 498
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 499
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 500
* @parent ---クエスト 401 から 500---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param ---クエスト 501 から 600---
* @default
*
* @param Category: 501 to 600
* @text Auto Batch Category
* @parent ---クエスト 501 から 600---
* @type combo
* @option メイン
* @option サイド
* @option 人物
* @option 指導
* @desc |-=AUTO=-|タイプのデフォルトのクエストの種類。注:'Quest List Window'に新しいクエストタイプを追加してください
* @default メイン
*
* @param Difficulty: 501 to 600
* @text Auto Batch Difficulty
* @parent ---クエスト 501 から 600---
* @desc |-=AUTO=-|タイプのデフォルトの難易度。テキストコード使用可
* @default i[87]i[87]i[87]
*
* @param From: 501 to 600
* @text Auto Batch From
* @parent ---クエスト 501 から 600---
* @desc |-=AUTO=-|タイプのデフォルトの依頼者。テキストコード使用可
* @default NPCの名前
*
* @param Location: 501 to 600
* @text Auto Batch Location
* @parent ---クエスト 501 から 600---
* @desc |-=AUTO=-|タイプのデフォルトの場所。テキストコード使用可
* @default NPCの場所
*
* @param Quest 501
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 502
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 503
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 504
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 505
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 506
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 507
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 508
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 509
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 510
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 511
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 512
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 513
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 514
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 515
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 516
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 517
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 518
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 519
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 520
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 521
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 522
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 523
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 524
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 525
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 526
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 527
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 528
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 529
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 530
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 531
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 532
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 533
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 534
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 535
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 536
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 537
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 538
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 539
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 540
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 541
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 542
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 543
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 544
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 545
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 546
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 547
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 548
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 549
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 550
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 551
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 552
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 553
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 554
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 555
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 556
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 557
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 558
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 559
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 560
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 561
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 562
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 563
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 564
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 565
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 566
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 567
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 568
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 569
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 570
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 571
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 572
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 573
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 574
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 575
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 576
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 577
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 578
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 579
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 580
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 581
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 582
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 583
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 584
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 585
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 586
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 587
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 588
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 589
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 590
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 591
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 592
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 593
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 594
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 595
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 596
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 597
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 598
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 599
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 600
* @parent ---クエスト 501 から 600---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param ---クエスト 601 から 700---
* @default
*
* @param Category: 601 to 700
* @text Auto Batch Category
* @parent ---クエスト 601 から 700---
* @type combo
* @option メイン
* @option サイド
* @option 人物
* @option 指導
* @desc |-=AUTO=-|タイプのデフォルトのクエストの種類。注:'Quest List Window'に新しいクエストタイプを追加してください
* @default メイン
*
* @param Difficulty: 601 to 700
* @text Auto Batch Difficulty
* @parent ---クエスト 601 から 700---
* @desc |-=AUTO=-|タイプのデフォルトの難易度。テキストコード使用可
* @default i[87]i[87]i[87]
*
* @param From: 601 to 700
* @text Auto Batch From
* @parent ---クエスト 601 から 700---
* @desc |-=AUTO=-|タイプのデフォルトの依頼者。テキストコード使用可
* @default NPCの名前
*
* @param Location: 601 to 700
* @text Auto Batch Location
* @parent ---クエスト 601 から 700---
* @desc |-=AUTO=-|タイプのデフォルトの場所。テキストコード使用可
* @default NPCの場所
*
* @param Quest 601
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 602
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 603
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 604
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 605
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 606
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 607
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 608
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 609
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 610
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 611
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 612
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 613
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 614
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 615
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 616
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 617
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 618
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 619
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 620
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 621
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 622
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 623
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 624
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 625
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 626
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 627
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 628
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 629
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 630
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 631
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 632
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 633
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 634
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 635
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 636
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 637
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 638
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 639
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 640
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 641
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 642
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 643
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 644
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 645
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 646
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 647
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 648
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 649
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 650
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 651
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 652
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 653
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 654
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 655
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 656
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 657
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 658
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 659
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 660
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 661
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 662
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 663
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 664
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 665
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 666
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 667
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 668
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 669
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 670
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 671
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 672
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 673
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 674
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 675
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 676
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 677
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 678
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 679
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 680
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 681
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 682
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 683
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 684
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 685
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 686
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 687
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 688
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 689
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 690
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 691
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 692
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 693
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 694
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 695
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 696
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 697
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 698
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 699
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 700
* @parent ---クエスト 601 から 700---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param ---クエスト 701 から 800---
* @default
*
* @param Category: 701 to 800
* @text Auto Batch Category
* @parent ---クエスト 701 から 800---
* @type combo
* @option メイン
* @option サイド
* @option 人物
* @option 指導
* @desc |-=AUTO=-|タイプのデフォルトのクエストの種類。注:'Quest List Window'に新しいクエストタイプを追加してください
* @default メイン
*
* @param Difficulty: 701 to 800
* @text Auto Batch Difficulty
* @parent ---クエスト 701 から 800---
* @desc |-=AUTO=-|タイプのデフォルトの難易度。テキストコード使用可
* @default i[87]i[87]i[87]
*
* @param From: 701 to 800
* @text Auto Batch From
* @parent ---クエスト 701 から 800---
* @desc |-=AUTO=-|タイプのデフォルトの依頼者。テキストコード使用可
* @default NPCの名前
*
* @param Location: 701 to 800
* @text Auto Batch Location
* @parent ---クエスト 701 から 800---
* @desc |-=AUTO=-|タイプのデフォルトの場所。テキストコード使用可
* @default NPCの場所
*
* @param Quest 701
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 702
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 703
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 704
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 705
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 706
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 707
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 708
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 709
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 710
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 711
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 712
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 713
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 714
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 715
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 716
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 717
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 718
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 719
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 720
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 721
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 722
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 723
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 724
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 725
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 726
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 727
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 728
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 729
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 730
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 731
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 732
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 733
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 734
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 735
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 736
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 737
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 738
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 739
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 740
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 741
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 742
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 743
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 744
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 745
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 746
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 747
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 748
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 749
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 750
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 751
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 752
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 753
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 754
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 755
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 756
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 757
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 758
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 759
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 760
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 761
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 762
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 763
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 764
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 765
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 766
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 767
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 768
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 769
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 770
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 771
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 772
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 773
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 774
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 775
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 776
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 777
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 778
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 779
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 780
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 781
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 782
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 783
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 784
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 785
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 786
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 787
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 788
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 789
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 790
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 791
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 792
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 793
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 794
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 795
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 796
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 797
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 798
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 799
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 800
* @parent ---クエスト 701 から 800---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param ---クエスト 801 から 900---
* @default
*
* @param Category: 801 to 900
* @text Auto Batch Category
* @parent ---クエスト 801 から 900---
* @type combo
* @option メイン
* @option サイド
* @option 人物
* @option 指導
* @desc |-=AUTO=-|タイプのデフォルトのクエストの種類。注:'Quest List Window'に新しいクエストタイプを追加してください
* @default メイン
*
* @param Difficulty: 801 to 900
* @text Auto Batch Difficulty
* @parent ---クエスト 801 から 900---
* @desc |-=AUTO=-|タイプのデフォルトの難易度。テキストコード使用可
* @default i[87]i[87]i[87]
*
* @param From: 801 to 900
* @text Auto Batch From
* @parent ---クエスト 801 から 900---
* @desc |-=AUTO=-|タイプのデフォルトの依頼者。テキストコード使用可
* @default NPCの名前
*
* @param Location: 801 to 900
* @text Auto Batch Location
* @parent ---クエスト 801 から 900---
* @desc |-=AUTO=-|タイプのデフォルトの場所。テキストコード使用可
* @default NPCの場所
*
* @param Quest 801
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 802
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 803
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 804
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 805
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 806
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 807
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 808
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 809
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 810
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 811
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 812
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 813
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 814
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 815
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 816
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 817
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 818
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 819
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 820
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 821
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 822
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 823
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 824
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 825
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 826
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 827
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 828
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 829
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 830
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 831
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 832
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 833
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 834
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 835
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 836
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 837
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 838
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 839
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 840
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 841
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 842
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 843
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 844
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 845
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 846
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 847
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 848
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 849
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 850
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 851
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 852
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 853
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 854
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 855
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 856
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 857
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 858
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 859
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 860
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 861
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 862
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 863
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 864
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 865
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 866
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 867
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 868
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 869
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 870
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 871
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 872
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 873
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 874
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 875
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 876
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 877
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 878
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 879
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 880
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 881
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 882
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 883
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 884
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 885
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 886
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 887
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 888
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 889
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 890
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 891
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 892
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 893
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 894
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 895
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 896
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 897
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 898
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 899
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 900
* @parent ---クエスト 801 から 900---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param ---クエスト 901 から 1000---
* @default
*
* @param Category: 901 to 1000
* @text Auto Batch Category
* @parent ---クエスト 901 から 1000---
* @type combo
* @option メイン
* @option サイド
* @option 人物
* @option 指導
* @desc |-=AUTO=-|タイプのデフォルトのクエストの種類。注:'Quest List Window'に新しいクエストタイプを追加してください
* @default メイン
*
* @param Difficulty: 901 to 1000
* @text Auto Batch Difficulty
* @parent ---クエスト 901 から 1000---
* @desc |-=AUTO=-|タイプのデフォルトの難易度。テキストコード使用可
* @default i[87]i[87]i[87]
*
* @param From: 901 to 1000
* @text Auto Batch From
* @parent ---クエスト 901 から 1000---
* @desc |-=AUTO=-|タイプのデフォルトの依頼者。テキストコード使用可
* @default NPCの名前
*
* @param Location: 901 to 1000
* @text Auto Batch Location
* @parent ---クエスト 901 から 1000---
* @desc |-=AUTO=-|タイプのデフォルトの場所。テキストコード使用可
* @default NPCの場所
*
* @param Quest 901
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 902
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 903
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 904
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 905
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 906
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 907
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 908
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 909
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 910
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 911
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 912
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 913
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 914
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 915
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 916
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 917
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 918
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 919
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 920
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 921
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 922
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 923
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 924
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 925
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 926
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 927
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 928
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 929
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 930
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 931
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 932
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 933
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 934
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 935
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 936
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 937
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 938
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 939
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 940
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 941
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 942
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 943
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 944
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 945
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 946
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 947
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 948
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 949
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 950
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 951
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 952
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 953
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 954
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 955
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 956
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 957
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 958
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 959
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 960
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 961
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 962
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 963
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 964
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 965
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 966
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 967
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 968
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 969
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 970
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 971
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 972
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 973
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 974
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 975
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 976
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 977
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 978
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 979
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 980
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 981
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 982
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 983
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 984
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 985
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 986
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 987
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 988
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 989
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 990
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 991
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 992
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 993
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 994
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 995
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 996
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 997
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 998
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 999
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
* @param Quest 1000
* @parent ---クエスト 901 から 1000---
* @type struct<Quest>
* @desc このクエストエントリで使用されているデータを変更します。各設定の詳細については、ヘルプを参照してください。
* @default
*
*/
/* ----------------------------------------------------------------------------
 * Quest Parameter Structure
 * ---------------------------------------------------------------------------
 */
/*~struct~Quest:ja
 *
 * @param Title
 * @desc クエストのタイトル。テキストコード使用可
 * @default \i[87]無題のクエスト
 *
 * @param Type
 * @parent Title
 * @type combo
 * @option |-=AUTO=-|
 * @option メイン
 * @option サイド
 * @option 人物
 * @option 指導
 * @desc クエストの種類。|-=AUTO=-|を選択すると、バッチのデフォルト
 * @default |-=AUTO=-|
 *
 * @param Difficulty
 * @parent Title
 * @descクエストの難易度。テキストコード使用可。|-=AUTO=-|を選択すると、バッチのデフォルト
 * @default |-=AUTO=-|
 *
 * @param From
 * @parent Title
 * @desc NPCの名前。テキストコード使用可。|-=AUTO=-|を選択すると、バッチのデフォルト
 * @default |-=AUTO=-|
 *
 * @param Location
 * @parent Title
 * @desc NPCの場所。テキストコード使用可。|-=AUTO=-|を選択すると、バッチのデフォルト
 * @default |-=AUTO=-|
 *
 * @param Description
 * @parent Title
 * @type note[]
 * @desc クエストの説明。テキストコード使用可
 * @default ["\"\\\\c[4]デフォルト\\\\c[0]クエスト説明\"","\"\\\\c[4]デフォルト\\\\c[0]クエスト説明です。\\n\\nクエストの進行中に途中でクエストの説明を更新したい場合、\\複数の説明エントリを挿入できます。\""]
 *
 * @param Objectives List
 * @type note[]
 * @desc クエストの目標。テキストコード使用可
 * @default ["\"\\\\c[4]最初に\\\\c[0]クリアする目的\"","\"\\\\c[4]第2の\\\\c[0]隠された目的\"","\"他の目的を表示するには、\\nプラグインパラメータ\\n\\\\c[4]'Visible Objectives'\\\\c[0]を使用するか、\\nプラグインコマンドを使用します。\""]
 *
 * @param Visible Objectives
 * @parent Objectives List
 * @type number[]
 * @min 1
 * @desc 最初から見える目的。
 * @default ["1"]
 *
 * @param Rewards List
 * @type note[]
 * @desc クエストの報酬リスト。テキストコード使用可
 * @default ["\"\\\\i[176]ポーション x5\"","\"\\\\i[178]エーテル x3\"","\"他の報酬を表示するには、\\nプラグインパラメータ\\n\\\\c[4]'提示報酬'\\\\c[0]を使用するか、\\nプラグインコマンドを使用します。\""]
 *
 * @param Visible Rewards
 * @parent Rewards List
 * @type number[]
 * @min 1
 * @desc 最初から見える報酬。
 * @default ["1"]
 *
 * @param Subtext
 * @type note[]
 * @desc クエストのサブテキスト。
 * @default ["\"\"","\"サブテキストです。\\nクエストジャーナルに表示する説明文とは\\n別の付属文として表示されます。\""]
 */
//=============================================================================

if (Imported.YEP_QuestJournal) {

  //=============================================================================
  // Parameter Variables
  //=============================================================================

  Yanfly.Parameters = PluginManager.parameters('YEP_X_MoreQuests1');
  Yanfly.Param = Yanfly.Param || {};

  DataManager.questDatabaseCreate = function () {
    $dataQuests = $dataQuests || [null];
    var index1 = [101, 201, 301, 401, 501, 601, 701, 801, 901];
    var index2 = [200, 300, 400, 500, 600, 700, 800, 900, 1000];
    var length = index1.length;
    for (var n = 0; n < length; ++n) {
      var a = index1[n];
      var b = index2[n];
      var str = a + ' to ' + b;

      for (var i = a; i <= b; ++i) {
        var questData = JSON.parse(Yanfly.Parameters['Quest ' + i] || 'null');
        if (!questData) continue;
        if (questData['Type'] === '|-=AUTO=-|') {
          questData['Type'] = Yanfly.Parameters['Category: ' + str];
        }
        if (questData['Difficulty'] === '|-=AUTO=-|') {
          questData['Difficulty'] = Yanfly.Parameters['Difficulty: ' + str];
        }
        if (questData['From'] === '|-=AUTO=-|') {
          questData['From'] = Yanfly.Parameters['From: ' + str];
        }
        if (questData['Location'] === '|-=AUTO=-|') {
          questData['Location'] = Yanfly.Parameters['Location: ' + str];
        }
        this.questDatabaseAdd(i, questData);
      }
    }
  };

  DataManager.questDatabaseCreate();

  //=============================================================================
  // End of File
  //=============================================================================
} else {

  var text = '';
  text += 'You are getting this error because you are trying to run ';
  text += 'YEP_X_MoreQuests1 without YEP_QuestJournal. Please visit Yanfly.moe ';
  text += 'and install YEP_QuestJournal in your game project before you can use ';
  text += 'this plugin.';
  console.log(text);
  require('nw.gui').Window.get().showDevTools();

}; // Imported.YEP_QuestJournal