/*---------------------------------------------------------------------------*
 * 2018/07/04 kido
 * https://kido0617.github.io/
 * Ver.1.1
 *---------------------------------------------------------------------------*/

/*:
 * @plugindesc デバッグウィンドウにショートカットキーを追加するプラグイン
 * @author kido
 * @help
 * 以下を参照
 * https://kido0617.github.io/rpgmaker/2018-07-04-debug-shortcut/
 * 
*/



(function () {

  Input.keyMapper[83] = 'S';
  Input.keyMapper[86] = 'V';
  Input.keyMapper[8] = 'BackSpace';
  for (var i = 0; i <= 9; i++) {
    Input.keyMapper[48 + i] = String(i);
  }
  Scene_Debug.prototype.update = function () {
    Scene_Base.prototype.update.call(this);
    if (Input.isTriggered('S')) {
      this.shortCutType = 'S';
      this.strNum = "";
      this.jump();
    } else if (Input.isTriggered('V')) {
      this.shortCutType = 'V';
      this.strNum = "";
      this.jump();
    } else if (Input.isTriggered('BackSpace')) {
      if (this.strNum && this.strNum.length > 0) this.strNum = this.strNum.substr(0, this.strNum.length - 1);
      this.jump();
    }
    for (var i = 0; i <= 9; i++) {
      if (Input.isTriggered(String(i))) {
        if (this.strNum == "" && i == 0) return; "いきなり0は無し"
        this.strNum += String(i);
        this.jump();
      }
    }
  };

  Scene_Debug.prototype.jump = function () {
    if (!this.shortCutType) return;
    var rangeIndex = this.shortCutType == 'S' ? 0 : this._rangeWindow._maxSwitches;
    if (this.strNum != '') {
      var num = parseInt(this.strNum);
      if ((this.shortCutType == 'S' && num > $dataSystem.switches.length - 1) ||
        (this.shortCutType == 'V' && num > $dataSystem.variables.length - 1)) {
        SoundManager.playBuzzer();
        //最大超えたら最大値にしておく
        num = this.shortCutType == 'S' ? $dataSystem.switches.length - 1 : $dataSystem.variables.length - 1;
      }
      rangeIndex += Math.floor((num - 1) / 10);
      this._rangeWindow.select(rangeIndex);
      this._rangeWindow.deactivate();
      this._editWindow.activate();
      this._editWindow.select((num - 1) % 10);
    } else {
      this._rangeWindow.select(rangeIndex);
      this._rangeWindow.activate();
      this._editWindow.deactivate();
    }
    this.refreshHelpWindow();
  }

  var refreshHelpWindow = Scene_Debug.prototype.refreshHelpWindow;
  Scene_Debug.prototype.refreshHelpWindow = function () {
    refreshHelpWindow.call(this);
    var str = this.shortCutType + this.strNum;
    this._debugHelpWindow.drawTextEx(str, 450, this._debugHelpWindow.lineHeight() * 4);
  };
})();