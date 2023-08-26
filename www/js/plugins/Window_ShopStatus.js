//ショップ画面で装備アイテムの全情報を表示
/*:

@plugindesc
ショップで装備品を購入する際、詳細な情報を
表示することができます

@author
シトラス

*/
Window_ShopStatus.prototype.pageSize = function () {
    return 1;
};
Window_ShopStatus.prototype.drawParamName = function (x, y, paramId) {
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.param(paramId), x, y, 120);
};
Window_ShopStatus.prototype.drawActorEquipInfo = function (x, y, actor) {
    var enabled = actor.canEquip(this._item);
    this.changePaintOpacity(enabled);
    this.resetTextColor();

    //アクターの名前を表示
    this.drawText(actor.name(), x, y - 30, 168);

    //ステータスの名前を表示
    for (var i = 0; i < 8; i++) {
        this.drawParamName(x, 132 + i * 35, i);
    }


    var item1 = this.currentEquippedItem(actor, this._item.etypeId);
    if (enabled) {
        this.drawActorParamChange(x, y, actor, item1);
    }

    //現在装備しているアイテムの名前を表示
    this.drawItemName(item1, x, y + this.lineHeight() - 25);
    this.changePaintOpacity(true);
};

Window_ShopStatus.prototype.drawActorParamChange = function (x, y, actor, item1) {
    var width = this.contents.width - this.textPadding() - x;
    var changeParams = new Array(8);
    for (var i = 0; i < 8; i++) {
        changeParams[i] = this._item.params[i] - (item1 ? item1.params[i] : 0);
        console.log(changeParams[i]);
        this.changeTextColor(this.paramchangeTextColor(changeParams[i]));
        this.drawText((changeParams[i] > 0 ? '+' : '') + changeParams[i], x, 60 + y + i * 35, width, 'right');
    }
};

// added by nekoma. 2021/11/25
(__updatePage => {
    Window_ShopStatus.prototype.updatePage = function () {
        __updatePage.apply(this, arguments);
        if (this.isPageChangeEnabled()) {
            if (Input.isTriggered('pageup')) {
                this.previousPage();
            } else if (Input.isTriggered('pagedown')) {
                this.nextPage();
            }
        }
    };
})(Window_ShopStatus.prototype.updatePage);

// added by nekoma. 2021/11/25
Window_ShopStatus.prototype.previousPage = function () {
    this._pageIndex = (this.maxPages() + this._pageIndex - 1) % this.maxPages();
    this.refresh();
    SoundManager.playCursor();
};

// added by nekoma. 2021/11/25
Window_ShopStatus.prototype.nextPage = function () {
    this._pageIndex = (this._pageIndex + 1) % this.maxPages();
    this.refresh();
    SoundManager.playCursor();
};
