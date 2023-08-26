'use strict';

{
    (__initialize => {
        Scene_Boot.prototype.initialize = function () {
            __initialize.apply(this, arguments);

            (__questSetCompleted => {
                Game_System.prototype.questSetCompleted = function (questId) {
                    __questSetCompleted.apply(this, arguments);
                    let w = new Window_QuestData();
                    w.setQuestId(questId);
                    let rewards = w.getQuestRewards(false, true);
                    rewards.replace(/< *(exp|lo|item|weapon|armor) *: *(\S+) *>/gi, (m, p1, p2) => {
                        let [p3, p4] = p2.split(/ *, */);
                        let number = Number(p4) || 1;
                        let popEnable = CommonPopupManager._popEnable;
                        CommonPopupManager._popEnable = CommonPopupManager.popEnable();
                        switch (p1.toLowerCase()) {
                            case 'exp':
                                $gameParty.allMembers().forEach(actor => actor.gainExp(Number(p3)));
                                break;
                            case 'lo':
                                $gameParty.gainGold(Number(p3));
                                break;
                            case 'item':
                                $gameParty.gainItem($dataItems[Number(p3)], number);
                                break;
                            case 'weapon':
                                $gameParty.gainItem($dataWeapons[Number(p3)], number);
                                break;
                            case 'armor':
                                $gameParty.gainItem($dataArmors[Number(p3)], number);
                                break;
                        }
                        CommonPopupManager._popEnable = popEnable;
                        return '';
                    });
                };
            })(Game_System.prototype.questSetCompleted);

            (__getQuestRewards => {
                Window_QuestData.prototype.getQuestRewards = function (wordwrap, noreplace) {
                    let getQuestRewards = __getQuestRewards.apply(this, arguments);
                    if (!noreplace) {
                        getQuestRewards = getQuestRewards.replace(/< *(exp|lo|item|weapon|armor) *: *(\S+) *>/gi, (m, p1, p2) => {
                            let [p3, p4] = p2.split(/ *, */);
                            let number = Number(p4) > 1 ? ` x${Number(p4)}` : '';
                            switch (p1.toLowerCase()) {
                                case 'exp':
                                    return `\\i[252]${p3} EXP`;
                                case 'lo':
                                    return `\\i[255]${p3} Lo`;
                                case 'item':
                                    return `\\i[234]${$dataItems[Number(p3)].name}${number}`;
                                case 'weapon':
                                    return `\\i[234]${$dataWeapons[Number(p3)].name}${number}`;
                                case 'armor':
                                    return `\\i[234]${$dataArmors[Number(p3)].name}${number}`;
                            }
                            return '';
                        });
                    }
                    return getQuestRewards;
                };
            })(Window_QuestData.prototype.getQuestRewards);
        };
    })(Scene_Boot.prototype.initialize);
}
