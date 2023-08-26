//==============================================================================
// Konoha_BattleSystem.js
//==============================================================================

/*:
 * @plugindesc 魔法少女コノハ 戦闘システム
 * @author 奏ねこま（おとぶきねこま）
 * 
 * @param メンバー1人目の位置
 * @type struct<position>
 * @default {"X座標":"600","Y座標":"280"}
 * @desc
 * 
 * @param メンバー2人目の位置
 * @type struct<position>
 * @default {"X座標":"632","Y座標":"328"}
 * @desc
 * 
 * @param メンバー3人目の位置
 * @type struct<position>
 * @default {"X座標":"664","Y座標":"376"}
 * @desc
 * 
 * @param メンバー4人目の位置
 * @type struct<position>
 * @default {"X座標":"696","Y座標":"424"}
 * @desc
 * 
 * @help
 * img/systemフォルダの中にbattleフォルダを作り
 * 戦闘シーン関連の画像は全部その中に入れること。
 * 
 * サイドビュー戦闘の設定はツクールのデータベースでやってください。
 * アクターの自動戦闘設定も同様にデータベースでやってください。
 * 
 * 拘束有りのステートはメモ欄に <拘束値:100> など値を設定。
 * 拘束中は敵に攻撃されないように狙われ率を0%に設定すること。
 * 
 * --------------------------------------------------------------------------------
 *   本プラグインの利用はRPGツクールMV/RPGMakerMVの正規ユーザーに限られます。
 *   商用、非商用、有償、無償、一般向け、成人向けを問わず利用可能です。
 *   ご利用の際に連絡や報告は必要ありません。また、製作者名の記載等も不要です。
 *   プラグインを導入した作品に同梱する形以外での再配布、転載はご遠慮ください。
 *   本プラグインにより生じたいかなる問題についても一切の責任を負いかねます。
 * --------------------------------------------------------------------------------
 *                                                Copylight (c) 2020 Nekoma Otobuki
 *                                           http://makonet.sakura.ne.jp/rpg_tkool/
 *                                                    https://twitter.com/koma_neko
 */

/*~struct~position:
 * @param X座標
 * @type number
 * @default 0
 * @desc
 * 
 * @param Y座標
 * @type number
 * @default 0
 * @desc
 */

(() => {
    'use strict';

    let $p = {
        states: KONOHA.parameters.states,
        battle: KONOHA.parameters.battle
    };

    for (let i = 0; i < 4; i++) {
        let key = `home${i + 1}`;
        $p[key] = {
            'X座標': $p.battle[key].x,
            'Y座標': $p.battle[key].y
        };
    }

    let BADSTATES_MAP = [];
    let BADSTATES_BATTLE = [];

    for (let key in $p.states) {
        if (key.includes('badStateMap')) {
            BADSTATES_MAP.push($p.states[key]);
        }
        if (key.includes('badStateBattle')) {
            BADSTATES_BATTLE.push($p.states[key]);
        }
    }

    let ORGASM_STATE = $p.states.badStateBattle2;

    //==============================================================================
    // Sprite_BattleStart
    //==============================================================================

    class Sprite_BattleStart extends Sprite {
        constructor() {
            super();
            this._maxDistance = 1240;
            this._inoutFrame = 20;
            this._stopFrame = 50;
            this._frameCount = 0;
            this.createBattleSprite();
            this.createStartSprite();
        }

        createBattleSprite() {
            this._battleSprite = new Sprite(ImageManager.loadSystem('battle/btui_BATTLE'));
            this._battleSprite.x = 45;
            this._battleSprite.y = 137;
            this._battleSprite.anchor.x = this._maxDistance / this._battleSprite.width;
            this.addChild(this._battleSprite);
        }

        createStartSprite() {
            this._startSprite = new Sprite(ImageManager.loadSystem('battle/btui_START'));
            this._startSprite.x = 167;
            this._startSprite.y = 323;
            this._startSprite.anchor.x = this._maxDistance / this._startSprite.width * -1;
            this.addChild(this._startSprite);
        }

        isActive() {
            return !!this.parent;
        }

        update() {
            let distance = this._maxDistance - this._maxDistance * Math.sin(90 / this._inoutFrame * this._frameCount / 180 * Math.PI);
            let nextFrame = this._inoutFrame * (this._stopFrame > 0 ? 1 : 2);
            let direction = this._stopFrame > 0 ? 1 : -1;
            if (this._frameCount <= nextFrame) {
                this._battleSprite.anchor.x = distance / this._battleSprite.width * direction;
                this._startSprite.anchor.x = distance / this._startSprite.width * -direction;
            }
            if (this._frameCount < nextFrame) {
                this._frameCount++;
            } else if (this._stopFrame > 0) {
                this._stopFrame--;
            } else {
                this.parent.removeChild(this);
            }
            super.update();
        }
    }

    //==============================================================================
    // Sprite_BattleCursor
    //==============================================================================

    class Sprite_BattleCursor extends Sprite {
        constructor(x, y) {
            super();
            this._frameCount = 15;
            this.bitmap = ImageManager.loadSystem('battle/btui_cursor');
            this.x = x;
            this.y = y;
            this.anchor.x = 0.5;
            this.anchor.y = 0.5;
            this.visible = false;
        }

        update() {
            this.updatePosition();
            super.update();
        }

        updatePosition() {
            if (this.visible) {
                this.anchor.y = 0.5 + 0.1 * Math.sin(360 * (this._frameCount % 60 / 60) / 180 * Math.PI);
                this._frameCount++;
            } else {
                this._frameCount = 15;
            }
        }
    }

    //==============================================================================
    // Sprite_KonohaStateIcon
    //==============================================================================

    class Sprite_KonohaStateIcon extends Sprite_StateIcon {
        constructor() {
            super();
            this._animationCount = this.animationWait();
        }

        updateIcon() {
            var icons = [];
            if (this._battler && this._battler.isAlive()) {
                let states = this._battler._states.filter(state => (
                    !BADSTATES_MAP.includes(state) &&
                    !BADSTATES_BATTLE.includes(state)
                ));
                icons = states.map(state => $dataStates[state].iconIndex);
            }
            if (icons.length > 0) {
                this._animationIndex++;
                if (this._animationIndex >= icons.length) {
                    this._animationIndex = 0;
                }
                this._iconIndex = icons[this._animationIndex];
            } else {
                this._animationIndex = 0;
                this._iconIndex = 0;
            }
        }
    }

    //==============================================================================
    // Sprite_Status
    //==============================================================================

    class Sprite_Status extends Sprite {
        constructor(actor, x, y) {
            super();
            this._actor = actor;
            this._tp = this._actor.tp;
            this._frameCount = 45;
            this._heartCount = 0;
            this._isSelected = false;
            this.createGaugeSprite();
            this.createBackSprite();
            this.createRingSprite();
            this.createFaceSprite();
            this.createFrameSprite();
            this.createHeartSprite();
            this.createStateSprite();
            this.createHpSprite();
            this.createMpSprite();
            this.createWhiteSprite();
            this.createCursorSprite();
            this.x = x;
            this.y = y;
            this.width = this._frameSprite.width;
            this.height = this._frameSprite.height;
        }

        createGaugeSprite() {
            this._gaugeSprite = new Sprite(ImageManager.loadSystem('battle/bt_ac3_w_gauge'));
            this.addChild(this._gaugeSprite);
        }

        createBackSprite() {
            this._backSprite = new Sprite(ImageManager.loadSystem('battle/bt_ac4_w_back'));
            this._backSprite.setFrame(0, 0, this._backSprite.bitmap.width, 170 - 152 * this._actor.commandGauge / 100);
            this.addChild(this._backSprite);
        }

        createRingSprite() {
            this._ringSprite = new Sprite(ImageManager.loadSystem('battle/bt_ac2_w_ring'));
            this.addChild(this._ringSprite);
        }

        createFaceSprite() {
            this._faceSprite = new Sprite(ImageManager.loadFace(this._actor.faceName()));
            let index = this._actor.faceIndex();
            let fw = Window_Base._faceWidth;
            let fh = Window_Base._faceHeight;
            let fx = index % 4 * fw;
            let fy = Math.floor(index / 4) * fh;
            this._faceSprite.setFrame(fx, fy, fw, fh);
            this._faceSprite.x = 35;
            this._faceSprite.y = 22;
            this.addChild(this._faceSprite);
        }

        createFrameSprite() {
            this._frameSprite = new Sprite(ImageManager.loadSystem('battle/bt_ac1_w'));
            this.addChild(this._frameSprite);
        }

        createHeartSprite() {
            this._heartSprite1 = new Sprite(ImageManager.loadSystem('battle/bt_ac0_w_heart'));
            this._heartSprite1.alpha = this._tp / 100;
            this.addChild(this._heartSprite1);
            this._heartSprite2 = new Sprite(ImageManager.loadSystem('battle/bt_ac0_w_heart'));
            let width = this._heartSprite2.width;
            let height = this._heartSprite2.height;
            this._heartSprite2.x = 171;
            this._heartSprite2.y = 47;
            this._heartSprite2.anchor.x = 171 / width;
            this._heartSprite2.anchor.y = 47 / height;
            this._heartSprite2.visible = false;
            this.addChild(this._heartSprite2);
        }

        createStateSprite() {
            this._stateSprite = new Sprite_KonohaStateIcon();
            this._stateSprite.setup(this._actor);
            this._stateSprite.x = 180;
            this._stateSprite.y = 137;
            this.addChild(this._stateSprite);
        }

        createHpSprite() {
            this._hpSprite = new Sprite(ImageManager.loadSystem('battle/HPMeter'));
            this._hpSprite.x = 60;
            this._hpSprite.y = 171;
            this._hpSprite.setFrame(0, 0, this._hpSprite.bitmap.width * (this._actor.hp / this._actor.mhp), this._hpSprite.height);
            this.addChild(this._hpSprite);
        }

        createMpSprite() {
            this._mpSprite = new Sprite(ImageManager.loadSystem('battle/MPMeter'));
            this._mpSprite.x = 60;
            this._mpSprite.y = 192;
            this._mpSprite.setFrame(0, 0, this._mpSprite.bitmap.width * (this._actor.mp / this._actor.mmp), this._mpSprite.height);
            this.addChild(this._mpSprite);
        }

        createWhiteSprite() {
            let width = this._frameSprite.width;
            let height = this._frameSprite.height;
            this._whiteSprite = new Sprite(new Bitmap(width, height));
            let context = this._whiteSprite.bitmap.context;
            context.drawImage(this._frameSprite.bitmap.canvas, 0, 0, width, height, 0, 0, width, height);
            context.drawImage(this._ringSprite.bitmap.canvas, 0, 0, width, height, 0, 0, width, height);
            context.drawImage(this._gaugeSprite.bitmap.canvas, 0, 0, width, height, 0, 0, width, height);
            context.drawImage(this._faceSprite.bitmap.canvas, 0, 0, Window_Base._faceWidth, Window_Base._faceHeight, this._faceSprite.x, this._faceSprite.y, Window_Base._faceWidth, Window_Base._faceHeight);
            context.globalCompositeOperation = 'source-atop';
            let white = new Bitmap(width, height);
            white.fillAll('#ffffff');
            context.drawImage(white.canvas, 0, 0, width, height, 0, 0, width, height);
            this._whiteSprite.alpha = 0;
            this.addChild(this._whiteSprite);
        }

        createCursorSprite() {
            this._cursorSprite = new Sprite_BattleCursor(this._frameSprite.width / 2, 0);
            this.addChild(this._cursorSprite);
        }

        update() {
            this.updateTp();
            this.updateStatus();
            this.updateSelectedEffect();
            this.updateHeartEffect();
            super.update();
        }

        updateTp() {
            if (this._actor.tp > this._tp) {
                this._tp = Math.min(this._tp + 5, this._actor.tp);
            } else if (this._actor.tp < this._tp) {
                this._tp = Math.max(this._tp - 5, 0);
            }
        }

        updateStatus() {
            this._heartSprite1.alpha = this._tp / 100;
            this._hpSprite.setFrame(0, 0, this._hpSprite.bitmap.width * (this._actor.hp / this._actor.mhp), this._hpSprite.height);
            this._mpSprite.setFrame(0, 0, this._mpSprite.bitmap.width * (this._actor.mp / this._actor.mmp), this._mpSprite.height);
            this._backSprite.setFrame(0, 0, this._backSprite.bitmap.width, 170 - 152 * this._actor.commandGauge / 100);

            /* ゲージMAX吹き出し */
            if (this._actor.commandGauge >= 100) {
                if (!this._balloonSprite) {
                    this._balloonSprite = new Sprite_Balloon();
                    this._balloonSprite.x = 70;
                    this._balloonSprite.y = 60;
                    this._balloonSprite.setup(1);
                    this.addChild(this._balloonSprite);
                }
            } else if (this._balloonSprite && !this._balloonSprite.isPlaying()) {
                this.removeChild(this._balloonSprite);
                this._balloonSprite = null;
            }
        }

        updateSelectedEffect() {
            if (this._isSelected) {
                this._whiteSprite.alpha = (Math.sin(360 * (this._frameCount % 60 / 60) / 180 * Math.PI) + 1) / 2 * 0.45;
                this._frameCount++;
            } else {
                this._whiteSprite.alpha = 0;
                this._frameCount = 45;
            }
        }

        updateHeartEffect() {
            if (this._actor.tp == 100) {
                let rate = (this._heartCount % 60) / 20;
                if (rate <= 1.0) {
                    this._heartSprite2.scale.x = 1.0 + 0.5 * rate;
                    this._heartSprite2.scale.y = 1.0 + 0.5 * rate;
                    this._heartSprite2.alpha = this._heartSprite1.alpha * Math.sin(90 * (1 - rate) / 180 * Math.PI);
                    this._heartSprite2.visible = true;
                } else {
                    this._heartSprite2.visible = false;
                }
                this._heartCount++;
            } else {
                this._heartCount = 0;
                this._heartSprite2.visible = false;
            }
        }

        select() {
            this._cursorSprite.visible = true;
            this._isSelected = true;
        }

        deselect() {
            this._cursorSprite.visible = false;
            this._isSelected = false;
        }

        isSelected() {
            return this._isSelected;
        }
    }

    //==============================================================================
    // Spriteset_Status
    //==============================================================================

    class Spriteset_Status extends Sprite {
        constructor(x, y) {
            super();
            this._tx = 0;
            this._ty = 0;
            this._statusSprites = [];
            this.createStatusSprite();
            this.x = x;
            this.y = y;
        }

        createStatusSprite() {
            $gameParty.battleMembers().forEach((actor, index) => {
                let sprite = new Sprite_Status(actor, 214 * index, 0);
                this._statusSprites.push(sprite);
                this.addChild(sprite);
            });
        }

        selectedItem() {
            let index = this._statusSprites.findIndex(sprite => sprite.isSelected());
            if (index >= 0) {
                return `member${index}`;
            }
            return null;
        }

        changeSelection(key) {
            if (['up', 'down'].includes(key)) {
                if (this.selectedItem()) {
                    this._statusSprites.forEach(sprite => sprite.deselect());
                } else {
                    this._statusSprites[0].select();
                    $gameKonoha.battleInfo.selectedActorId = $gameParty.battleMembers()[0].actorId();
                }
            } else if (this.selectedItem()) {
                let index = this._statusSprites.findIndex(sprite => sprite.isSelected());
                let length = this._statusSprites.length;
                this._statusSprites[index].deselect();
                index = (index + (key == 'left' ? length - 1 : 1)) % length;
                this._statusSprites[index % length].select();
                $gameKonoha.battleInfo.selectedActorId = $gameParty.battleMembers()[index % length].actorId();
            }
        }

        update() {
            this.updateSelect();
            super.update();
        }

        updateSelect() {
            if (this.parent.parent.isAnyInputWindowActive() || BattleManager.isAborting() || BattleManager.isBattleEnd()) {
                return;
            }
            if (![null, undefined, 'init', 'start', 'battleEnd'].includes(BattleManager._phase)) {
                let tx = TouchInput._moveX;
                let ty = TouchInput._moveY;
                if (tx != this._tx || ty != this._ty) {
                    this._statusSprites.forEach((sprite, index) => {
                        let left = this.x + sprite.x;
                        let top = this.y + sprite.y;
                        let right = left + sprite.width;
                        let bottom = top + sprite.height;
                        if (tx >= left && ty >= top && tx <= right && ty <= bottom) {
                            sprite.select();
                            $gameKonoha.battleInfo.selectedActorId = $gameParty.battleMembers()[index].actorId();
                        } else {
                            sprite.deselect();
                        }
                    });
                    this._tx = tx;
                    this._ty = ty;
                }
            } else {
                this._statusSprites.forEach(sprite => sprite.deselect());
            }
        }
    }

    //==============================================================================
    // Sprite_ModeButton
    //==============================================================================

    class Sprite_ModeButton extends Sprite {
        constructor(on_bitmap, off_bitmap, x, y, cursorOffsetX = 0) {
            super();
            this._on = false;
            this._isSelected = false;
            this.x = x;
            this.y = y;
            this.width = on_bitmap.width;
            this.height = on_bitmap.height;
            this.createOnSprite(on_bitmap);
            this.createOffSprite(off_bitmap);
            this.createCursorSprite(cursorOffsetX);
        }

        createOnSprite(bitmap) {
            this._onSprite = new Sprite(bitmap);
            this._onSprite.visible = false;
            this.addChild(this._onSprite);
        }

        createOffSprite(bitmap) {
            this._offSprite = new Sprite(bitmap);
            this._offSprite.visible = true;
            this.addChild(this._offSprite);
        }

        createCursorSprite(cursorOffsetX = 0) {
            this._cursorSprite = new Sprite_BattleCursor(this.width / 2 + cursorOffsetX, -22);
            this.addChild(this._cursorSprite);
        }

        setDescriptionSprite(sprite) {
            sprite.x = this.parent.x + this.x + this.width / 2;
            sprite.y = this.parent.y + this.y + this.height + 4;
            sprite.anchor.x = 0.5;
            this._descriptionSprite = sprite;
        }

        select() {
            if (this._descriptionSprite) {
                this._descriptionSprite.visible = true;
            }
            this._cursorSprite.visible = true;
            this._isSelected = true;
        }

        deselect() {
            if (this._descriptionSprite) {
                this._descriptionSprite.visible = false;
            }
            this._cursorSprite.visible = false;
            this._isSelected = false;
        }

        isSelected() {
            return this._isSelected;
        }

        on() {
            this._onSprite.visible = true;
            this._offSprite.visible = false;
            this._on = true;
        }

        off() {
            this._onSprite.visible = false;
            this._offSprite.visible = true;
            this._on = false;
        }
    }

    //==============================================================================
    // Spriteset_ModeButton
    //==============================================================================

    class Spriteset_Button extends Sprite {
        constructor(x, y) {
            super();
            this.x = x;
            this.y = y;
            this._tx = 0;
            this._ty = 0;
            this._buttonSprites = [];
            this.createAttackSprite();
            this.createDefenceSprite();
            this.createEscapeSprite();
        }

        createAttackSprite() {
            this._attackSprite = new Sprite_ModeButton(ImageManager.loadSystem('battle/btui_ATON'),
                ImageManager.loadSystem('battle/btui_ATOFF'), 0, 0, 12);
            this._attackSprite.on();
            this._buttonSprites.push(this._attackSprite);
            this.addChild(this._attackSprite);
        }

        createDefenceSprite() {
            this._defenceSprite = new Sprite_ModeButton(ImageManager.loadSystem('battle/btui_DFON'),
                ImageManager.loadSystem('battle/btui_DFOFF'), 75, 0);
            this._buttonSprites.push(this._defenceSprite);
            this.addChild(this._defenceSprite);
        }

        createEscapeSprite() {
            this._escapeSprite = new Sprite_ModeButton(ImageManager.loadSystem('battle/btui_ESON'),
                ImageManager.loadSystem(`battle/btui_ES${BattleManager.canEscape() ? 'OFF' : 'NG'}`), 125, 0, -12);
            this._buttonSprites.push(this._escapeSprite);
            this.addChild(this._escapeSprite);

            this._escapeSpriteNG = new Sprite(ImageManager.loadSystem('battle/btui_ESNG'));
            this._escapeSpriteNG.visible = false;
            this._escapeSprite.addChildAt(this._escapeSpriteNG, 2);
        }

        createDescriptionSprite() {
            this._attackDescriptionSprite = new Sprite(ImageManager.loadSystem('battle/btui_ATTU'));
            this._defenceDescriptionSprite = new Sprite(ImageManager.loadSystem('battle/btui_DFTU'));
            this._escapeDescriptionSprite = new Sprite(ImageManager.loadSystem('battle/btui_ESTU'));
            this._attackSprite.setDescriptionSprite(this._attackDescriptionSprite);
            this._defenceSprite.setDescriptionSprite(this._defenceDescriptionSprite);
            this._escapeSprite.setDescriptionSprite(this._escapeDescriptionSprite);
            this.parent.addChild(this._attackDescriptionSprite);
            this.parent.addChild(this._defenceDescriptionSprite);
            this.parent.addChild(this._escapeDescriptionSprite);
        }

        selectedItem() {
            return ['attack', 'defence', 'escape'].find(item => this[`_${item}Sprite`].isSelected());
        }

        changeSelection(key) {
            if (['up', 'down'].includes(key)) {
                if (this.selectedItem()) {
                    this._buttonSprites.forEach(sprite => sprite.deselect());
                } else {
                    this._buttonSprites[0].select();
                }
            } else if (this.selectedItem()) {
                let index = this._buttonSprites.findIndex(sprite => sprite.isSelected());
                let length = this._buttonSprites.length;
                this._buttonSprites[index].deselect();
                index = (index + (key == 'left' ? length - 1 : 1)) % length;
                this._buttonSprites[index % length].select();
            }
        }

        update() {
            this.updateEscape();
            this.updateSelect();
            this.updateSwitch();
            super.update();
        }

        updateSelect() {
            if (this.parent.parent.isAnyInputWindowActive() || BattleManager.isAborting() || BattleManager.isBattleEnd()) {
                return;
            }
            if (![null, undefined, 'init', 'start', 'battleEnd'].includes(BattleManager._phase)) {
                let tx = TouchInput._moveX;
                let ty = TouchInput._moveY;
                if (tx != this._tx || ty != this._ty) {
                    this._buttonSprites.forEach(sprite => {
                        let left = this.x + sprite.x;
                        let top = this.y + sprite.y;
                        let right = left + sprite.width;
                        let bottom = top + sprite.height;
                        if (tx >= left && ty >= top && tx <= right && ty <= bottom) {
                            sprite.select();
                        } else {
                            sprite.deselect();
                        }
                    });
                    this._tx = tx;
                    this._ty = ty;
                }
            } else {
                this._buttonSprites.forEach(sprite => sprite.deselect());
            }
        }

        updateSwitch() {
            this._buttonSprites.forEach((sprite, index) => {
                if (sprite.isSelected()) {
                    if (TouchInput.isTriggered() || Input.isTriggered('ok')) {
                        if (index != 2 || BattleManager.canEscape()) {
                            this._attackSprite.off();
                            this._defenceSprite.off();
                            this._escapeSprite.off();
                        }
                        switch (index) {
                            case 0:
                                this._attackSprite.on();
                                break;
                            case 1:
                                this._defenceSprite.on();
                                break;
                            case 2:
                                if (BattleManager.canEscape()) {
                                    this._escapeSprite.on();
                                }
                                break;
                        }
                    }
                }
            });
        }

        updateEscape() {
            this._escapeSpriteNG.visible = BattleManager.isSuspendEscape();
        }
    }

    //==============================================================================
    // Spriteset_KonohaBattle
    //==============================================================================

    class Spriteset_KonohaBattle extends Sprite {
        constructor() {
            super();
            this.createFrameSprite();
            this.createLogSprite();
            this.createGaugeSprite();
            this.createButtonSpriteset();
            this.createStatusSpriteset();
            this._buttonSpriteset.createDescriptionSprite();
        }

        createFrameSprite() {
            // this._frameSprite = new Sprite(ImageManager.loadSystem('battle/btui_back'));
            // this.addChild(this._frameSprite);
        }

        createLogSprite() {
            this._logSprite = new Sprite(ImageManager.loadSystem('battle/btui_win'));
            this._logSprite.x = 91;
            this._logSprite.y = 17;
            this.addChild(this._logSprite);
        }

        createGaugeSprite() {
            this._gaugeSprite = new Sprite_ExGauge(673, 404);
            this.addChild(this._gaugeSprite);
        }

        createButtonSpriteset() {
            this._buttonSpriteset = new Spriteset_Button(673, 456);
            this.addChild(this._buttonSpriteset);
        }

        createStatusSpriteset() {
            this._statusSpriteset = new Spriteset_Status(0, 506);
            this.addChild(this._statusSpriteset);
        }

        selectedItem() {
            return this._buttonSpriteset.selectedItem() || this._statusSpriteset.selectedItem();
        }

        update() {
            if (!this.parent.isAnyInputWindowActive() && !BattleManager.isAborting() && !BattleManager.isBattleEnd()) {
                if (![null, undefined, 'init', 'start', 'battleEnd'].includes(BattleManager._phase)) {
                    let key = Input.isTriggered('up') ? 'up' :
                        Input.isTriggered('down') ? 'down' :
                            Input.isTriggered('left') ? 'left' :
                                Input.isTriggered('right') ? 'right' : '';
                    if (key) {
                        if (this.selectedItem()) {
                            this._statusSpriteset.changeSelection(key);
                            this._buttonSpriteset.changeSelection(key);
                        } else {
                            this._statusSpriteset.changeSelection('up');
                        }
                    }
                }
            }
            super.update();
        }
    }

    //==============================================================================
    // Sprite_ExGauge
    //==============================================================================

    class Sprite_ExGauge extends Sprite {
        constructor(x, y) {
            super();
            this.x = x;
            this.y = y;
            this._blinkFrame = 15;
            this.createGaugeSprite();
            this.createFrameSprite();
        }

        createGaugeSprite() {
            this._gauge1Sprite = new Sprite(ImageManager.loadSystem('battle/btui_EX02'));
            this._gauge1Sprite.setFrame(0, 0, 19 + 160 * BattleManager.exGauge / 100, this._gauge1Sprite.height);
            this.addChild(this._gauge1Sprite);
            this._gauge2Sprite = new Sprite(ImageManager.loadSystem('battle/btui_EX03'));
            this._gauge2Sprite.setFrame(0, 0, 19 + 160 * BattleManager.exGauge / 100, this._gauge2Sprite.height);
            this._gauge2Sprite.alpha = BattleManager.exGauge / 100;
            this.addChild(this._gauge2Sprite);
        }

        createFrameSprite() {
            this._frameSprite = new Sprite(ImageManager.loadSystem('battle/btui_EX01'));
            this.addChild(this._frameSprite);
        }

        update() {
            this.updateFrame();
            this.updateAlpha();
            super.update();
        }

        updateFrame() {
            this._gauge1Sprite.setFrame(0, 0, 19 + 160 * BattleManager.exGauge / 100, this._gauge1Sprite.height);
            this._gauge2Sprite.setFrame(0, 0, 19 + 160 * BattleManager.exGauge / 100, this._gauge2Sprite.height);
        }

        updateAlpha() {
            if (BattleManager.exGauge < 100) {
                this._gauge2Sprite.alpha = BattleManager.exGauge / 100;
                this._blinkFrame = 15;
            } else {
                this._gauge2Sprite.alpha = (Math.sin(360 * this._blinkFrame / 60 / 180 * Math.PI) + 1) / 2;
                this._blinkFrame++;
            }
        }
    }

    //==============================================================================
    // Sprite_EnemyStateIcon
    //==============================================================================

    class Sprite_EnemyStateIcon extends Sprite {
        constructor(battler) {
            super();
            this._battler = battler;
            this._states = [];
            this.bitmap = new Bitmap(Window_Base._iconWidth * 4, Window_Base._iconHeight * 4);
        }

        update() {
            this.updateIcon();
            super.update();
        }

        updateIcon() {
            if (String(this._states) != String(this._battler._states)) {
                this._states = [...this._battler._states];
                this.bitmap.clear();
                let row = 0;
                let column = 0;
                let iconWidth = Window_Base._iconWidth;
                let iconHeight = Window_Base._iconHeight;
                for (let state of this._states) {
                    let bitmap = ImageManager.loadSystem('IconSet');
                    let iconIndex = $dataStates[state].iconIndex;
                    let pw = iconWidth;
                    let ph = iconHeight;
                    let sx = iconIndex % 16 * pw;
                    let sy = Math.floor(iconIndex / 16) * ph;
                    this.bitmap.blt(bitmap, sx, sy, pw, ph, row * iconWidth, column * iconHeight);
                    row++;
                    if (row >= 4) {
                        row = 0;
                        column++;
                    }
                }
            }
        }
    }

    //==============================================================================
    // Sprite_EnemyStatus
    //==============================================================================

    class Sprite_EnemyStatus extends Sprite {
        constructor(x, y, battler) {
            super();
            this._battler = battler;
            this.createHpFrameSprite();
            this.createHpSprite();
            this.createBindFrameSprite();
            this.createBindSprite();
            this.createBindIconSprite();
            this.createNameSprite();
            this.createIconSprite();
            this.createStateSprite();
            this.width = this._hpFrameSprite.width;
            this.height = this._hpFrameSprite.height;
            this.x = x - this.width / 2;
            this.y = y - 40;
        }

        createHpFrameSprite() {
            this._hpFrameSprite = new Sprite(ImageManager.loadSystem('battle/btui_enm01'));
            this.addChild(this._hpFrameSprite);
        }

        createHpSprite() {
            this._hpSprite = new Sprite(ImageManager.loadSystem('battle/btui_enm02'));
            this._hpSprite.x = 21;
            this._hpSprite.y = 8;
            this.addChild(this._hpSprite);
        }

        createBindFrameSprite() {
            this._bindFrameSprite = new Sprite(ImageManager.loadSystem('battle/btui_bind01'));
            this._bindFrameSprite.x = (this._hpFrameSprite.width - this._bindFrameSprite.width) / 2;
            this._bindFrameSprite.y = -54;
            this._bindFrameSprite.visible = !!this._battler._bindData;
            this.addChild(this._bindFrameSprite);
        }

        createBindSprite() {
            this._bindSprite = new Sprite(ImageManager.loadSystem('battle/btui_bind02'));
            this._bindSprite.x = (this._hpFrameSprite.width - this._bindSprite.width) / 2;
            this._bindSprite.y = -54;
            this._bindSprite.visible = !!this._battler._bindData;
            this.addChild(this._bindSprite);
        }

        createBindIconSprite() {
            $gameParty.members().forEach(actor => {
                let sprite = new Sprite(ImageManager.loadSystem('battle/Bi_ac_' + actor.actorId().padZero(2)));
                sprite.x = 85;
                sprite.y = -65;
                sprite.update = () => {
                    let bindData = this._battler._bindData;
                    sprite.visible = !!bindData && bindData.actorId == actor.actorId();
                    Sprite.prototype.update.call(sprite);
                };
                this.addChild(sprite);
            });
        }

        createNameSprite() {
            this._nameSprite = new Sprite(new Bitmap(200, 50));
            this._nameSprite.bitmap.fontSize = 12;
            this._nameSprite.bitmap.outlineColor = 'rgba(0, 0, 0, 1)';
            this._nameSprite.bitmap.drawText(this._battler.enemy().name, 0, 0, 200, 14);
            this._nameSprite.x = this._battler.hasBindingSkill() ? 37 : 22;
            this._nameSprite.y = -14;
            this.addChild(this._nameSprite);
        }

        createIconSprite() {
            if (this._battler.hasBindingSkill()) {
                this._iconSprite = new Sprite(ImageManager.loadSystem('IconSet'));
                let pw = Window_Base._iconWidth;
                let ph = Window_Base._iconHeight;
                let sx = 1578 % 16 * pw;
                let sy = Math.floor(1578 / 16) * ph;
                this._iconSprite.setFrame(sx, sy, pw, ph);
                this._iconSprite.x = 2;
                this._iconSprite.y = -29;
                this.addChild(this._iconSprite);
            }
        }

        createStateSprite() {
            this._stateSprite = new Sprite_EnemyStateIcon(this._battler);
            this._stateSprite.x = 19;
            this._stateSprite.y = 22;
            this.addChild(this._stateSprite);
        }

        update() {
            this.updateStatus();
            super.update();
        }

        updateStatus() {
            this._hpSprite.setFrame(0, 0, this._hpSprite.bitmap.width * (this._battler.hp / this._battler.mhp), this._hpSprite.height);
            if (this._battler._bindData) {
                let bindData = this._battler._bindData;
                this._bindSprite.setFrame(0, 0, 8 + 128 * (bindData.value / bindData.max), this._bindSprite.height);
                this._bindFrameSprite.visible = true;
                this._bindSprite.visible = true;
            } else {
                this._bindFrameSprite.visible = false;
                this._bindSprite.visible = false;
            }
        }
    }

    //==============================================================================
    // BattleManager
    //==============================================================================

    (__initMembers => {
        BattleManager.initMembers = function () {
            __initMembers.apply(this, arguments);
            this._mode = 'attack';
            this._exGauge = 0;
        };
    })(BattleManager.initMembers);

    Object.defineProperty(BattleManager, 'mode', { get: function () { return this._mode } });
    Object.defineProperty(BattleManager, 'exGauge', { get: function () { return this._exGauge } });

    (__setup => {
        BattleManager.setup = function (troopId, canEscape, canLose) {
            __setup.apply(this, arguments);
            $gameParty.battleMembers().forEach(actor => {
                actor.initBattleData();
            });
        };
    })(BattleManager.setup);

    (__isBusy => {
        BattleManager.isBusy = function () {
            return __isBusy.apply(this, arguments) || this._startSprite.isActive();
        };
    })(BattleManager.isBusy);

    BattleManager.setMode = function (mode) {
        this._mode = mode;
        $gameParty.battleMembers().forEach(actor => {
            // 現在設定されている行動が攻撃か防御だったら新しいモードで再設定
            if (actor.numActions() > 0 && (
                actor.action(0).isAttack() ||
                actor.action(0).isGuard())) {
                actor.clearActions();
                actor.makeActions();
            }
        });
    };

    BattleManager.setStartSprite = function (sprite) {
        this._startSprite = sprite;
    };

    BattleManager.resetCommandGauge = function () {
        if (this._actorIndex >= 0) {
            $gameParty.battleMembers()[this._actorIndex].resetCommandGauge();
        }
    };

    BattleManager.increaseExGauge = function (value) {
        this._exGauge = Math.min(this._exGauge + value, 100);
    };

    BattleManager.resetExGauge = function () {
        this._exGauge = 0;
    }

    BattleManager.displayStartMessages = function () {
    };

    //==============================================================================
    // Scene_Battle
    //==============================================================================

    (__createSpriteset => {
        Scene_Battle.prototype.createSpriteset = function () {
            __createSpriteset.apply(this, arguments);
            this._spriteset2 = new Spriteset_KonohaBattle();
            this.addChild(this._spriteset2);
            this._startSprite = new Sprite_BattleStart();
            this.addChild(this._startSprite);
            BattleManager.setStartSprite(this._startSprite);
        };
    })(Scene_Battle.prototype.createSpriteset);

    (__createActorCommandWindow => {
        Scene_Battle.prototype.createActorCommandWindow = function () {
            __createActorCommandWindow.apply(this, arguments);
            this._actorCommandWindow.setHandler('extract', this.commandBind.bind(this));
            this._actorCommandWindow.setHandler('bear', this.commandBind.bind(this));
            this._actorCommandWindow.setHandler('cancel', () => {
                this._actorCommandWindow.deactivate();
                this._actorCommandWindow.close();
            });
            this._actorCommandWindow.close();
        };
    })(Scene_Battle.prototype.createActorCommandWindow);

    (__createStatusWindow => {
        Scene_Battle.prototype.createStatusWindow = function () {
            __createStatusWindow.apply(this, arguments);
            this._statusWindow.visible = false;
        };
    })(Scene_Battle.prototype.createStatusWindow);

    (__update => {
        Scene_Battle.prototype.update = function () {
            __update.apply(this, arguments);

            // コマンド選択中に拘束状態が変わったらウインドウを閉じる
            if (this.isAnyInputWindowActive()) {
                let actor = $gameParty.battleMembers()[BattleManager._actorIndex];
                let symbol = this._actorCommandWindow.commandSymbol(0);
                if (!!actor.getBindData() != (symbol == 'extract')) {
                    [this._actorCommandWindow,
                    this._helpWindow,
                    this._skillWindow,
                    this._itemWindow,
                    this._actorWindow,
                    this._enemyWindow].forEach(wnd => {
                        wnd == this._actorCommandWindow ? wnd.close() : wnd.hide();
                        wnd.deactivate();
                    });
                }
            }

            // ウインドウが開かれていたら以降の処理は行わない
            if (this.isAnyInputWindowActive() || BattleManager.isAborting() || BattleManager.isBattleEnd()) {
                return;
            }

            // アクターコマンド・戦闘モード判定
            this.processActorCommand();
            this.updateBattleMode();
        };
    })(Scene_Battle.prototype.update);

    (__selectNextCommand => {
        Scene_Battle.prototype.selectNextCommand = function () {
            BattleManager.resetCommandGauge();
            __selectNextCommand.apply(this, arguments);
        };
    })(Scene_Battle.prototype.selectNextCommand);

    (__createMessageWindow => {
        Scene_Battle.prototype.createMessageWindow = function () {
            __createMessageWindow.apply(this, arguments);
            this._messageWindow._windowContentsSprite.x = 180;
        };
    })(Scene_Battle.prototype.createMessageWindow);

    (__startActorCommandSelection => {
        Scene_Battle.prototype.startActorCommandSelection = function () {
            __startActorCommandSelection.apply(this, arguments);
            this._actorCommandWindow.show();
            this._actorCommandWindow.open();
        };
    })(Scene_Battle.prototype.startActorCommandSelection);

    (__commandSkill => {
        Scene_Battle.prototype.commandSkill = function () {
            __commandSkill.apply(this, arguments);
            this._actorCommandWindow.hide();
        };
    })(Scene_Battle.prototype.commandSkill);

    (__commandItem => {
        Scene_Battle.prototype.commandItem = function () {
            __commandItem.apply(this, arguments);
            this._actorCommandWindow.hide();
        };
    })(Scene_Battle.prototype.commandItem);

    (__selectNextCommand => {
        Scene_Battle.prototype.selectNextCommand = function () {
            __selectNextCommand.apply(this, arguments);
            this._actorCommandWindow.close();
            this._actorCommandWindow.deactivate();
        };
    })(Scene_Battle.prototype.selectNextCommand);

    (__onSkillCancel => {
        Scene_Battle.prototype.onSkillCancel = function () {
            __onSkillCancel.apply(this, arguments);
            this._actorCommandWindow.show();
        };
    })(Scene_Battle.prototype.onSkillCancel);

    (__onItemCancel => {
        Scene_Battle.prototype.onItemCancel = function () {
            __onItemCancel.apply(this, arguments);
            this._actorCommandWindow.show();
        };
    })(Scene_Battle.prototype.onItemCancel);

    Scene_Battle.prototype.processActorCommand = function () {
        if (['turn', 'turnEnd', 'action'].includes(BattleManager._phase)) {
            if (TouchInput.isTriggered() || Input.isTriggered('ok')) {
                let item = this._spriteset2.selectedItem();
                if (item && item.match(/^member(\d+)/)) {
                    let index = Number(RegExp.$1);
                    if ($gameParty.battleMembers()[index].commandGauge == 100) {
                        BattleManager._actorIndex = index;
                        this.startActorCommandSelection();
                    }
                }
            }
        }
    };

    Scene_Battle.prototype.updateBattleMode = function () {
        if (TouchInput.isTriggered() || Input.isTriggered('ok')) {
            let item = this._spriteset2.selectedItem();
            switch (item) {
                case 'attack':
                    BattleManager.setMode('attack');
                    break;
                case 'defence':
                    BattleManager.setMode('defence');
                    break;
                case 'escape':
                    if (BattleManager.canEscape()) {
                        BattleManager.processEscape();
                    }
                    break;
            }
        }
    };

    Scene_Battle.prototype.commandBind = function () {
        let symbol = this._actorCommandWindow.currentSymbol();
        let skill = $dataSkills[symbol == 'extract' ? 271 : 272];
        var action = BattleManager.inputtingAction();
        action.setSkill(skill.id);
        BattleManager.actor().setLastBattleSkill(skill);
        this.onSelectAction();
    };

    //==============================================================================
    // Sprite_Actor
    //==============================================================================

    (__setHome => {
        Sprite_Actor.prototype.setHome = function (x, y) {
            let number = this._actor.index() + 1;
            x = Number($p[`home${number}`]['X座標']);
            y = Number($p[`home${number}`]['Y座標']);
            __setHome.call(this, x, y);
        };
    })(Sprite_Actor.prototype.setHome);

    (__updatePosition => {
        Sprite_Actor.prototype.updatePosition = function () {
            if ($gameTemp.isPlaytest()) {
                if (TouchInput.isTriggered()) {
                    let left = this.x - this.children[2].width * this.anchor.x;
                    let top = this.y - this.children[2].height * this.anchor.y;
                    let right = left + this.children[2].width
                    let bottom = top + this.children[2].height
                    if (TouchInput.x >= left && TouchInput.x <= right && TouchInput.y >= top && TouchInput.y <= bottom) {
                        this._offsetTouchX = TouchInput.x - this.x;
                        this._offsetTouchY = TouchInput.y - this.y;
                        this._isRelocate = true;
                    }
                }
                if (!TouchInput.isPressed()) {
                    if (this._isRelocate) {
                        console.log(`${this._battler.index() + 1}:(${this.x},${this.y})`);
                        this._isRelocate = false;
                    }
                }
                if (this._isRelocate) {
                    this._homeX = TouchInput.x - this._offsetTouchX;
                    this._homeY = TouchInput.y - this._offsetTouchY;
                }
            }
            __updatePosition.apply(this, arguments);
        };
    })(Sprite_Actor.prototype.updatePosition);

    //==============================================================================
    // Sprite_Enemy
    //==============================================================================

    (__setBattler => {
        Sprite_Enemy.prototype.setBattler = function (battler) {
            __setBattler.apply(this, arguments);
            this._statusSprite = new Sprite_EnemyStatus(this.width / 2, this.height, battler);
            this.addChild(this._statusSprite);
            this._stateIconSprite.visible = false;
        };
    })(Sprite_Enemy.prototype.setBattler);

})();
