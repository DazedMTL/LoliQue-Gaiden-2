'use strict';

{
    (__initialize => {
        Scene_Boot.prototype.initialize = function () {
            __initialize.apply(this, arguments);

            (__gainItem => {
                Game_Party.prototype.gainItem = function (item, amount, includeEquip) {
                    if (SceneManager._scene.constructor.name == 'Scene_Warehouse') {
                        return __gainItem.call(this, item, amount, includeEquip);
                    }
                    let store = 0;
                    if (amount > 0) {
                        let num = this.numItems(item);
                        let max = this.maxItems(item);
                        let free = max - num;
                        store = amount - free;
                        amount = Math.min(free, amount);
                    }
                    __gainItem.call(this, item, amount, includeEquip);
                    if (store > 0) {
                        var itembox = PHPlugins.PHWarehouse._warehouses['itembox'];
                        var currentCapacity = itembox.currentCapacity;
                        var maxCapacity = itembox.maxCapacity;
                        var free = maxCapacity - currentCapacity;
                        if (free > 0) {
                            store = Math.min(store, free);
                            CommonPopupManager.showInfo(item, `_SE[SO_collect_item_07]\\I[2267] ←「\\I[_icon]_name」 を\\C[14]${store}個\\C[24]アイテムボックスに格納した！\\n\\C[6]_desc1`);
                            let type = DataManager.isWeapon(item) ? 'weapon' : DataManager.isArmor(item) ? 'armor' : (item.itypeId == 1) ? 'item' : 'keyItem';
                            PHPlugins.PHWarehouse.addItems(`<itembox:${item.id}:${store}>`, type);
                        }
                    }
                };
            })(Game_Party.prototype.gainItem);
        };
    })(Scene_Boot.prototype.initialize);
}
