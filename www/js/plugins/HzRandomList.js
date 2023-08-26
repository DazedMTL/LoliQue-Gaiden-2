/**
/*:
 *
 * @plugindesc 重複の無いランダム値を作成するプラグイン
 * @author hiz
 * 
 *  @help
 *   特定の整数範囲の重複の無いランダム値を作成し、一つずつ取得することができます。
 *   例えば１〜６のランダム値を作成した場合、１〜６の値を重複なくランダムな順番で取得することができます。
 *   夜店のくじ等の（店がズルしてなければ）引き続ければいつかは当たるくじや、
 *   ランダム値を使いたいけど同じ値が重複することは避けたい場合等に使えます。
 *   ※ ランダム値の状態はセーブファイルに保存されます。
 *  
 * プラグイン コマンド:
 *   HZRANDOM CREATE id min max loop             # min~max(max含む)のID[id]の乱数リストを作成します
 *                                               # loopは任意設定です。（1:LOOP ON それ以外：LOOP OFF）
 *                                               
 *   HZRANDOM NEXT id varNo                      # ID[id]の乱数リストの次の要素を取得して、、変数[varNo]にセットします。
 *                                               # 乱数リストの要素を全て取得した場合、
 *                                               # LOOP ONの場合、最初の要素から取得し直します。
 *                                               # LOOP OFFの場合、乱数リストをシャッフルします。
 *                                               
 *   HZRANDOM SHUFFLE id                         # ID[id]の乱数リストをシャッフルします。
 *   
 *   ※ プラグインコマンドの引数には、文章の表示と同様の特殊記号を使用できます。
 *   
 * 使用例）
 *   HZRANDOM CREATE 1 1 3 false    -> 1~3の乱数リスト（ID=1）を作成（LOOP OFF）
 *                                     例） [3, 1, 2]
 *   HZRANDOM NEXT 1 1              -> 乱数リストの次の要素（上記例では3）を取得し、変数1に代入
 *   HZRANDOM NEXT 1 1              -> 乱数リストの次の要素（上記例では1）を取得し、変数1に代入
 *   HZRANDOM NEXT 1 1              -> 乱数リストの次の要素（上記例では2）を取得し、変数1に代入
 *   HZRANDOM NEXT 1 1              -> 乱数リストの要素を全て取得したため、乱数リストをシャッフル
 *                                     例） [2, 1, 3]
 *                                     乱数リストの次の要素（上記例では2）を取得し、変数1に代入
 *   HZRANDOM NEXT 1 1              -> 乱数リストの次の要素（上記例では1）を取得し、変数1に代入
 *   HZRANDOM SHUFFLE 1             -> 乱数リストをシャッフル
 *                                     例） [1, 3, 2]
 *   HZRANDOM NEXT 1 1              -> 乱数リストの次の要素（上記例では1）を取得し、変数1に代入
 */

(function () {
    function convertEscape(txt) { return Window_Base.prototype.convertEscapeCharacters(txt) };

    var _Game_Interpreter_pluginCommand =
        Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        // スクリプトコマンド「HZRANDOM」
        if (command.toUpperCase() === 'HZRANDOM') {
            var type = String(args[0]);
            if (type.toUpperCase() === 'CREATE') {
                // 「HZRANDOM CREATE」：ランダムリストの作成
                var id = Number(convertEscape(args[1]));
                var min = Number(convertEscape(args[2]));
                var max = Number(convertEscape(args[3]));
                var loop = args[4] != null ? Number(convertEscape(args[4])) == 1 : false;
                $gameSystem.putHzRandomList(id, new HzRandomList(min, max, loop));
            } else if (type.toUpperCase() === 'NEXT') {
                // 「HZRANDOM NEXT」：ランダムリストの次の要素を取得
                var id = Number(convertEscape(args[1]));
                var varNo = Number(convertEscape(args[2]));
                var nextValue = $gameSystem.getNextHzRandomList(id);
                if (nextValue != null) {
                    $gameVariables.setValue(varNo, nextValue);
                }
            } else if (type.toUpperCase() === 'SHUFFLE') {
                // 「HZRANDOM NEXT」：ランダムリストの再シャッフル
                var id = Number(convertEscape(args[1]));
                $gameSystem.shuffleHzRandomList(id);
            }
        }
    };

    //
    // ランダムリストはGame_Systemに保管。（セーブファイルに保存するため）
    //
    Game_System.prototype.putHzRandomList = function (id, list) {
        if (!this._hzrandomList) {
            this._hzrandomList = [];
        }
        this._hzrandomList[id] = list;
    };

    Game_System.prototype.getNextHzRandomList = function (id) {
        if (!this._hzrandomList) {
            this._hzrandomList = [];
        }
        if (!this._hzrandomList[id]) {
            return null;
        }
        return HzRandomList.next(this._hzrandomList[id]);
    };

    Game_System.prototype.shuffleHzRandomList = function (id) {
        if (!this._hzrandomList) {
            this._hzrandomList = [];
        }
        if (!this._hzrandomList[id]) {
            return;
        }
        HzRandomList.shuffle(this._hzrandomList[id]);
    };

    function HzRandomList() {
        this.initialize.apply(this, arguments);
    }

    /**
     * 初期化処理
     * @returns {Array|HzRandomList_L1.HzRandomList._list}
     */
    HzRandomList.prototype.initialize = function (min, max, loop) {
        this._min = min;
        this._max = max;
        this._loop = loop;
        if (this._min > this._max) {
            var tmp = this._min;
            this._min = this._max;
            this._max = tmp;
        }
        // min~max（max含む）の配列を作成
        this._list = new Array(this._max - this._min + 1);
        for (var i = 0; i < this._max - this._min + 1; i++) {
            this._list[i] = this._min + i;
        }
        // 配列のシャッフル
        shuffle(this._list);
        // 次回取得時の配列のINDEX設定
        this._index = 0;
    };

    /**
     * ランダムリストの次の要素を返す
     * @returns {Array}
     */
    HzRandomList.next = function (list) {
        if (list._index >= list._list.length) {
            if (!list._loop) {
                // ループ設定OFFの場合、配列を再シャッフル
                shuffle(list._list);
            }
            // INDEXを0に戻す
            list._index = 0;
        }
        // ランダムリストの要素を取得
        var value = list._list[list._index];
        // インデックスをカウントアップ
        list._index++;
        return value;
    };

    /**
     * 配列を再度シャッフルする
     * @returns {undefined}
     */
    HzRandomList.shuffle = function (list) {
        // 配列を再シャッフル
        shuffle(list._list);
        // INDEXを0に戻す
        list._index = 0;
    };

    /**
     * 配列のシャッフル用関数
     * @param {type} array
     * @returns {unresolved}
     */
    function shuffle(array) {
        var n = array.length, t, i;

        while (n) {
            i = Math.floor(Math.random() * n--);
            t = array[n];
            array[n] = array[i];
            array[i] = t;
        }

        return array;
    }

})();
