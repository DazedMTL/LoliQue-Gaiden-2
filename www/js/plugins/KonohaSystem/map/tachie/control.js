(() => {
    'use strict';

    const $p = {
        pictures: KONOHA.parameters.pictures,
        switches: KONOHA.parameters.switches
    };

    //==============================================================================
    // Control
    //==============================================================================

    class Control {
        // 立ち絵表示切り替え操作
        static switching() {
            // 立ち絵表示スイッチ
            let visible = $gameSwitches.value($p.switches.tachieVisibility);

            // ボタンクリック判定
            if (TouchInput.isTriggered()) {
                let picture = $gameScreen.picture($p.pictures.button.id);
                if (picture) {
                    let name = picture.name();
                    let bitmap = ImageManager.loadPicture(name);
                    let x = picture.x();
                    let y = picture.y();
                    let width = bitmap.width;
                    let height = bitmap.height;
                    if (TouchInput.x >= x && TouchInput.x <= x + width &&
                        TouchInput.y >= y && TouchInput.y <= y + height) {
                        visible = !visible;
                        $gameTemp.clearDestination();
                    }
                }
            }

            // Wキー押下判定
            if (Input.isTriggered('pagedown')) {
                visible = !visible;;
            }

            // 立ち絵表示スイッチ切り替え
            if (visible != $gameSwitches.value($p.switches.tachieVisibility)) {
                $gameSwitches.setValue($p.switches.tachieVisibility, visible);
            }
        }

        static update() {
            // 立ち絵制御スイッチ
            let control = $gameSwitches.value($p.switches.tachieControl);

            if (control) {
                // 立ち絵表示切り替え操作
                this.switching();
            } else {
                // 立ち絵制御OFFなら立ち絵表示もOFF
                if ($gameSwitches.value($p.switches.tachieVisibility)) {
                    $gameSwitches.setValue($p.switches.tachieVisibility, false);
                }
            }

            // 立ち絵表示スイッチ
            let visibility = $gameSwitches.value($p.switches.tachieVisibility);

            // 立ち絵・ボタン表示切り替え
            for (let key in $p.pictures) {
                let picture = $gameScreen.picture($p.pictures[key].id);
                if (picture) {
                    if (key != 'button') {
                        // 立ち絵
                        picture._opacity = visibility ? 255 : 0;
                    } else {
                        // ボタン
                        picture._opacity = control ? 255 : 0;
                    }
                }
            }
        }
    }

    //==============================================================================
    // Game_Konoha
    //==============================================================================

    (__update => {
        Game_Konoha.prototype.update = function () {
            __update.apply(this, arguments);

            if (!$gameParty.inBattle()) {
                Control.update();
            }
        };
    })(Game_Konoha.prototype.update);

})();
