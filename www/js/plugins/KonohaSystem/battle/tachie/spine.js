(() => {
    'use strict';

    const $p = {
        pictures: KONOHA.parameters.pictures,
        variables: KONOHA.parameters.variables,
        switches: KONOHA.parameters.switches,
        states: KONOHA.parameters.states
    };

    const ISYOU_VARIABLE = $p.variables.clothes;
    const DOWN_STATE = $p.states.down;
    const NINSHIN_STATE = $p.states.badStateMap1;
    const ZAMEN_STATE = $p.states.badStateMap4;

    const ORGASM_STATE = $p.states.badStateBattle2;

    const TOUCH_SYOKUSYU_STATE = $p.states.badStateBattle3;
    const TOUCH_HITOGATA_STATE = $p.states.badStateBattle4;
    const KOUIN_SYOKUSYU_STATE = $p.states.badStateBattle5;
    const KOUIN_HITOGATA_STATE = $p.states.badStateBattle6;
    const KOUSOKU_SYOKUSYU_STATE = $p.states.badStateBattle7;
    const KOUSOKU_HITOGATA_STATE = $p.states.badStateBattle8;
    const KOUSOKU_SLIME_STATE = $p.states.badStateBattle9;
    const KOUSOKU_KYOJIN_STATE = $p.states.badStateBattle10;
    const SOUNYU_SYOKUSYU_STATE = $p.states.badStateBattle11;
    const SOUNYU_HITOGATA_STATE = $p.states.badStateBattle12;
    const SOUNYU_SLIME_STATE = $p.states.badStateBattle13;
    const SOUNYU_HITOGATAB_STATE = $p.states.badStateBattle14;
    const SOUNYU_KEMONOB_STATE = $p.states.badStateBattle15;
    const SOUNYU_KYOJINE_STATE = $p.states.badStateBattle16;
    const SOUNYU_HITOGATAE_STATE = $p.states.badStateBattle17;

    const KONOHA_ERO_STATE_DATA = [
        { id: TOUCH_SYOKUSYU_STATE, skeleton: 'bt_h_touch_w', x: 0, y: 100, scale: 0.7 },
        { id: TOUCH_HITOGATA_STATE, skeleton: 'bt_h_touch_m', x: 0, y: 100, scale: 0.7 },
        { id: KOUIN_SYOKUSYU_STATE, skeleton: 'bt_h_fera_w', x: -50, y: 0, scale: 0.8 },
        { id: KOUIN_HITOGATA_STATE, skeleton: 'bt_h_fera_m', x: -50, y: 0, scale: 0.8 },
        { id: KOUSOKU_SYOKUSYU_STATE, skeleton: 'bt_h_hold_w', x: -50, y: 100, scale: 0.7 },
        { id: KOUSOKU_HITOGATA_STATE, skeleton: 'bt_h_hold_m', x: -50, y: 100, scale: 0.7 },
        { id: KOUSOKU_SLIME_STATE, skeleton: 'bt_h_hold_s', x: -50, y: 100, scale: 0.7 },
        { id: KOUSOKU_KYOJIN_STATE, skeleton: 'bt_h_hold_t', x: -50, y: 100, scale: 0.7 },
        { id: SOUNYU_SYOKUSYU_STATE, skeleton: 'bt_h_sou01_w', x: 0, y: 100, scale: 0.7 },
        { id: SOUNYU_HITOGATA_STATE, skeleton: 'bt_h_sou01_m', x: 0, y: 100, scale: 0.7 },
        { id: SOUNYU_SLIME_STATE, skeleton: 'bt_h_sou01_s', x: 0, y: 100, scale: 0.7 },
        { id: SOUNYU_HITOGATAB_STATE, skeleton: 'bt_h_sou02_m', x: -150, y: -100, scale: 0.7 },
        { id: SOUNYU_KEMONOB_STATE, skeleton: 'bt_h_sou02_j', x: -150, y: -100, scale: 0.7 },
        { id: SOUNYU_KYOJINE_STATE, skeleton: 'bt_h_sou03_t', x: -30, y: 150, scale: 0.8 },
        { id: SOUNYU_HITOGATAE_STATE, skeleton: 'bt_h_sou03_m', x: -30, y: 150, scale: 0.8 },
    ];

    const KOUIN_STATE = [
        KOUIN_SYOKUSYU_STATE,
        KOUIN_HITOGATA_STATE
    ];

    const INSERT_STATE = [
        SOUNYU_SYOKUSYU_STATE,
        SOUNYU_HITOGATA_STATE,
        SOUNYU_SLIME_STATE,
        SOUNYU_HITOGATAB_STATE,
        SOUNYU_KEMONOB_STATE,
        SOUNYU_KYOJINE_STATE,
        SOUNYU_HITOGATAE_STATE
    ];

    const $spines = {}

    // コノハ
    $spines[1] = {};
    $spines[1].normal = {};
    $spines[1].normal.default = {
        skeleton: 'BT_konoha_defo',
        skin: ['isyou100', 'isyou50', 'default', 'z_isyou100', 'z_isyou50', 'zamen'],
        animation: [
            ['bt_taiki100_1', 'bt_taiki60_1', 'bt_taiki30_1'],
            ['bt_taiki100_2', 'bt_taiki60_2', 'bt_taiki30_2'],
            ['bt_taiki100_3', 'bt_taiki60_3', 'bt_taiki30_3'],
            ['bt_taiki100_3', 'bt_taiki60_3', 'bt_taiki30_3']
        ],
        x: 0,
        y: 0,
        scale: 0.65,
        slide: null
    };
    $spines[1].normal.down = JsonEx.makeDeepCopy($spines[1].normal.default);
    $spines[1].normal.down.skeleton = 'BT_ko_down';
    $spines[1].normal.down.animation = (a => (b => [b, b, b, b])([a, a, a]))('Down');
    $spines[1].normal.down.x = -100;
    $spines[1].normal.down.y = -100;
    $spines[1].normal.down.scale = 0.8;
    $spines[1].normal.attack = {
        skeleton: 'BT_ko_attack',
        skin: (a => a.concat(a))(['isyou100', 'isyou50', 'default']),
        animation: (a => (b => [b, b, b, b])([a, a, a]))('Attack01'),
        x: -90,
        y: 50,
        scale: 0.7,
        slide: { amount: 300, direction: 4, frames: 24 }
    };
    $spines[1].normal.damage = JsonEx.makeDeepCopy($spines[1].normal.attack);
    $spines[1].normal.damage.skeleton = 'BT_ko_dame';
    $spines[1].normal.damage.animation = (a => (b => [b, b, b, b])([a, a, a]))('dame');
    $spines[1].normal.damage.scale = 0.65;
    $spines[1].normal.damage.slide = { amount: 300, direction: 6, frames: 16 };
    $spines[1].normal.ero = {};
    $spines[1].normal.ero['base'] = {
        skeleton: '',
        skin: (a => a.concat(a))(['isyou100', 'isyou50', 'default']),
        animation: (a => [0, 1, 2, 3].map(i => [0, 0, 0].map(() => a[i])))(['ero1', 'ero2', 'ero3', 'ero4']),
        x: 0,
        y: 0,
        scale: 1.0,
        slide: null
    };
    for (let data of KONOHA_ERO_STATE_DATA) {
        $spines[1].normal.ero[data.id] = JsonEx.makeDeepCopy($spines[1].normal.ero['base']);
        $spines[1].normal.ero[data.id].skeleton = data.skeleton;
        $spines[1].normal.ero[data.id].x = data.x;
        $spines[1].normal.ero[data.id].y = data.y;
        $spines[1].normal.ero[data.id].scale = data.scale;
        if ([KOUIN_HITOGATA_STATE, KOUIN_SYOKUSYU_STATE].includes(data.id)) {
            $spines[1].normal.ero[data.id].animation = (a => [0, 1, 2, 3].map(i => [0, 0, 0].map(() => a[i])))(['ero1', 'ero2', 'ero3', 'ero3']);
        }
    }
    $spines[1].bote = JsonEx.makeDeepCopy($spines[1].normal);
    $spines[1].bote.default.skeleton = 'BT_konoha_b';
    $spines[1].bote.down.skeleton = 'BT_ko_b_down';
    $spines[1].bote.attack.skeleton = 'BT_ko_b_attack';
    $spines[1].bote.damage.skeleton = 'BT_ko_b_dame';
    for (let data of KONOHA_ERO_STATE_DATA) {
        $spines[1].bote.ero[data.id].skeleton = data.skeleton + '_b';
    }

    // コノハ（堕）
    $spines[2] = JsonEx.makeDeepCopy($spines[1]);
    $spines[2].normal.default.skeleton = 'BT_dw_defo';
    $spines[2].normal.down.skeleton = 'BT_dw_down';
    $spines[2].normal.attack.skeleton = 'BT_dw_attack';
    $spines[2].normal.damage.skeleton = 'BT_dw_dame';
    for (let data of KONOHA_ERO_STATE_DATA) {
        $spines[2].normal.ero[data.id].skeleton = data.skeleton.replace(/^bt_h/, 'bt_h_dw');
    }
    $spines[2].bote.default.skeleton = 'BT_dw_b';
    $spines[2].bote.down.skeleton = 'BT_dw_b_down';
    $spines[2].bote.attack.skeleton = 'BT_dw_b_attack';
    $spines[2].bote.damage.skeleton = 'BT_dw_b_dame';
    for (let data of KONOHA_ERO_STATE_DATA) {
        $spines[2].bote.ero[data.id].skeleton = data.skeleton.replace(/^bt_h/, 'bt_h_dw') + '_b';
    }

    // インプ
    $spines[10] = {};
    $spines[10].normal = {};
    $spines[10].normal.default = {
        skeleton: 'bt_inp_defo',
        skin: ((a, b) => [a, a, a, b, b, b])('default', 'zamen'),
        animation: (a => (b => [b, b, b, b])([a, a, a]))('00defo'),
        x: 0,
        y: 100,
        scale: 1.2,
        slide: null
    };
    $spines[10].normal.down = JsonEx.makeDeepCopy($spines[10].normal.default);
    $spines[10].normal.down.skeleton = 'bt_inp_down';
    $spines[10].normal.down.animation = (a => (b => [b, b, b, b])([a, a, a]))('down');
    $spines[10].normal.down.y = 0;
    $spines[10].normal.down.scale = 1.0;
    $spines[10].normal.attack = JsonEx.makeDeepCopy($spines[10].normal.default);
    $spines[10].normal.attack.animation = (a => (b => [b, b, b, b])([a, a, a]))('03okori');
    $spines[10].normal.attack.slide = { amount: 300, direction: 4, frames: 24 };
    $spines[10].normal.damage = JsonEx.makeDeepCopy($spines[10].normal.default);
    $spines[10].normal.damage.animation = (a => (b => [b, b, b, b])([a, a, a]))('02komari');
    $spines[10].normal.damage.slide = { amount: 300, direction: 6, frames: 16 };
    $spines[10].normal.ero = {};
    $spines[10].normal.ero[INSERT_STATE[0]] = {
        skeleton: 'bt_inp_ero',
        skin: ((a, b) => [a, a, a, b, b, b])('default', 'zamen'),
        animation: (a => [0, 1, 2, 3].map(i => [0, 0, 0].map(() => a[i])))(['ero1', 'ero2', 'ero3', 'ero4']),
        x: 0,
        y: -50,
        scale: 1.2,
        slide: null
    };
    for (let stateId of INSERT_STATE) {
        if (stateId != INSERT_STATE[0]) {
            $spines[10].normal.ero[stateId] = $spines[10].normal.ero[INSERT_STATE[0]];
        }
    }
    $spines[10].bote = {};
    $spines[10].bote.ero = {};

    // ロリモン
    for (let i = 11; i <= 24; i++) {
        let index = i - 11;
        $spines[i] = JsonEx.makeDeepCopy($spines[10]);
        $spines[i].normal.default.skeleton = ['bt_gob_defo', 'bt_dor_defo', 'bt_dhu_defo', 'bt_ket_defo', 'bt_hap_defo', 'bt_mam_defo', 'bt_ghu_defo', 'bt_mdu_defo', 'bt_sah_defo', 'bt_pix_defo', 'bt_sla_defo', 'bt_kum_defo', 'bt_ten_defo', 'bt_oro_defo'][index];
        $spines[i].normal.default.y = [100, 100, 100, 100, 100, 300, 100, 300, 150, 100, 150, 200, 200, 150][index];
        $spines[i].normal.default.scale = [1.2, 1.0, 1.0, 0.85, 0.85, 0.9, 0.8, 1.2, 1.0, 1.2, 1.0, 1.2, 1.2, 1.0][index];
        $spines[i].normal.down.skeleton = ['bt_gob_down', 'bt_dor_down', 'bt_dhu_down', 'bt_ket_down', 'bt_hap_down', 'bt_mam_down', 'bt_ghu_down', 'bt_mdu_down', 'bt_sah_down', 'bt_pix_down', 'bt_sla_down', 'bt_kum_down', 'bt_ten_down', 'bt_oro_down'][index];
        $spines[i].normal.down.scale = [1.0, 1.0, 1.0, 0.8, 0.8, 1.2, 0.8, 0.85, 1.0, 0.9, 1.2, 1.0, 1.0, 0.8][index];
        $spines[i].normal.attack.skeleton = $spines[i].normal.default.skeleton;
        $spines[i].normal.attack.y = $spines[i].normal.default.y;
        $spines[i].normal.attack.scale = $spines[i].normal.default.scale;
        $spines[i].normal.damage.skeleton = $spines[i].normal.default.skeleton;
        $spines[i].normal.damage.y = $spines[i].normal.default.y;
        $spines[i].normal.damage.scale = $spines[i].normal.default.scale;
        $spines[i].normal.ero[INSERT_STATE[0]].skeleton = ['bt_gob_ero', 'bt_dor_ero', 'bt_dhu_ero', 'bt_ket_ero', 'bt_hap_ero', 'bt_mam_ero', 'bt_ghu_ero', 'bt_mdu_ero', 'bt_sah_ero', 'bt_pix_ero', 'bt_sla_ero', 'bt_kum_ero', 'bt_ten_ero', 'bt_oro_ero'][index];
        $spines[i].normal.ero[INSERT_STATE[0]].x = [0, 0, 0, -30, -25, 0, 0, 0, 0, 0, 0, -50, 0, 0][index];
        $spines[i].normal.ero[INSERT_STATE[0]].y = [-50, -50, -50, -25, -25, 150, 25, 0, 0, 0, 50, 0, 0, 0][index];
        $spines[i].normal.ero[INSERT_STATE[0]].scale = [1.0, 1.0, 1.35, 0.85, 0.85, 1.2, 0.8, 1.0, 1.0, 1.0, 0.85, 0.8, 1.0, 1.0][index];
    }

    class ChromaFilter extends PIXI.Filter {
        constructor(ratio = 1.0) {
            let fragment = 'precision mediump float;varying vec2 vTextureCoord;uniform float ratio;uniform sampler2D uSampler;void main(void){vec4 c=texture2D(uSampler,vTextureCoord);float r=c.r,g=c.g,b=c.b,rr=1.0-ratio;c.r=(0.701*ratio+0.299)*r+rr*0.587*g+rr*0.114*b;c.g=rr*0.299*r+(0.413*ratio+0.587)*g+rr*0.114*b;c.b=rr*0.299*r+rr*0.587*g+(0.886*ratio+0.114)*b;gl_FragColor=c;}';
            super(null, fragment);
            this.uniforms.ratio = ratio;
        }
    }

    PIXI.filters.ChromaFilter = ChromaFilter;

    //==============================================================================
    // Game_SpineBattle
    //==============================================================================

    class Game_SpineBattle extends Game_Spine {
        constructor(actor) {
            super();
            this._actor = actor;
            this._actorId = actor.actorId();
            this._spine = null;
            this._spines = $spines[this._actorId];
            this._gion = new Game_Spine();
            this._prevCumInside = 0;
            this._priorityAnimating = false;
            this.update();
        }

        get actor() { return this._actor; }
        get chroma() { return this._chroma; }
        get visible() { return this._visible; }
        get x() { return this._x; }
        get y() { return this._y; }
        get scale() { return this._scale; }
        get slide() { return this._slide; }
        get gion() { return this._gion; }

        get priorityAnimating() { return this._priorityAnimating; }
        set priorityAnimating(value) { this._priorityAnimating = value; }

        init() {
            super.init();
            this._chroma = {};
            this._visible = false;
            this._x = 0;
            this._y = 0;
            this._scale = 1.0;
            this._slide = {};
        }

        setChroma(...args) {
            this._chroma = Object.assign({}, this._chroma);
            let image, ratio;
            if (args.length == 1) {
                image = '/default/';
                ratio = args[0];
            } else {
                image = args[0];
                ratio = args[1];
            }
            if (ratio < 1) {
                this._chroma[image] = ratio;
            } else {
                delete this._chroma[image];
            }
            return this;
        }

        setSlide(amount, direction, frames) {
            this._slide = {
                amount: amount,
                direction: direction,
                frames: frames
            };
            return this;
        }

        update() {
            // 戦闘終了後は更新しない
            if (!BattleManager._phase) {
                return;
            }

            let spine = this.currentSpine();

            // Spineが変わった場合実行
            if (this._spine != spine) {
                this._spine = spine;
                this.updateSkeleton();
                this.updateSlide();
            }

            // 常に実行
            this.updateSkin();
            this.updateAnimation();
            this.updateChroma();
            this.updateVisibility();
            this.updatePosition();
            this.updateScale();
            this.updateTimeScale();
        }

        currentSpine() {
            let spine;

            // 戦闘エロステート番号を取得
            let eroStateIndex = this.eroStateIndex();

            if (!this.isNinshin()) {
                if (eroStateIndex in this._spines.normal.ero) {
                    // 戦闘エロ
                    spine = this._spines.normal.ero[eroStateIndex];
                } else if (!this.isDown()) {
                    if (this._actor.attackFrame > 0) {
                        // 攻撃
                        spine = this._spines.normal.attack;
                    } else if (this._actor.damageFrame > 0) {
                        // 被ダメージ
                        spine = this._spines.normal.damage;
                    } else {
                        // 通常
                        spine = this._spines.normal.default;
                    }
                } else {
                    // ダウン
                    spine = this._spines.normal.down;
                }
            } else {
                if (eroStateIndex in this._spines.bote.ero) {
                    // 戦闘エロ
                    spine = this._spines.bote.ero[eroStateIndex];
                } else if (!this.isDown()) {
                    if (this._actor.attackFrame > 0) {
                        // 攻撃（ボテ）
                        spine = this._spines.bote.attack;
                    } else if (this._actor.damageFrame > 0) {
                        // 被ダメージ（ボテ）
                        spine = this._spines.bote.damage;
                    } else {
                        // 通常（ボテ）
                        spine = this._spines.bote.default;
                    }
                } else {
                    // ダウン（ボテ）
                    spine = this._spines.bote.down;
                }
            }

            // 攻撃フレーム更新
            if ([this._spines.normal.attack, this._spines.bote.attack].includes(spine)) {
                this._actor.attackFrame--;
            } else {
                this._actor.attackFrame = 0;
            }

            // 被ダメージフレーム更新
            if ([this._spines.normal.damage, this._spines.bote.damage].includes(spine)) {
                this._actor.damageFrame--;
            } else {
                this._actor.damageFrame = 0;
            }

            return spine;
        }

        updateSkeleton() {
            // 現在のスケルトンと違う場合
            if (this._skeleton.replace(/_\d+$/, '') != this._spine.skeleton) {
                let skeleton = this._spine.skeleton;

                // 防具ID:3を装備している
                if (this._actor.armors().some(armor => armor.id == 3)) {
                    // exモデルがある
                    if (Game_Spine.fullName(`${skeleton}_ex`)) {
                        skeleton = skeleton + '_ex';
                    }
                }

                this.setSkeleton(skeleton);

                // 擬音Spineがあったら設定
                let gion = Game_Spine.fullName(`gion_${skeleton}`);
                if (gion) {
                    this._gion.setSkeleton(gion);
                } else {
                    this._gion.setSkeleton();
                }

                // 優先アニメフラグOFF
                this._priorityAnimating = false;
            }
        }

        updateSkin() {
            let skin;
            let isyou = $gameVariables.value(ISYOU_VARIABLE);
            let zamen = this.isZamen();

            // 服を装備していないときは衣装を0扱いにする
            if (!this._actor.equips()[3]) {
                isyou = 0;
            }

            // 衣装と精液の状態からスキンを決定
            if (isyou > 50) {
                skin = this._spine.skin[zamen ? 3 : 0];
            } else if (isyou > 0) {
                skin = this._spine.skin[zamen ? 4 : 1];
            } else {
                skin = this._spine.skin[zamen ? 5 : 2];
            }

            // 現在のスキンと違う場合
            if (skin != this._skin) {
                this.setSkin(skin);
            }
        }

        updateAnimation() {
            if (this._priorityAnimating) return;

            let animation;
            let continuance = 'continue';
            let hp = this._actor.hp;
            let mhp = this._actor.mhp;
            let tp = this._actor.tp;
            let bindData = this._actor.getBindData();

            if (bindData) {
                // 現状、コノハのみ
                if ([1, 2].includes(this._actorId)) {
                    // 中出し判定
                    if (bindData.cumInside != this._prevCumInside && bindData.cumInside > 0) {
                        // 口淫
                        if (KOUIN_STATE.includes(bindData.stateId)) {
                            animation = 'ero4';
                            continuance = 'none';
                        }
                        // 挿入
                        if (INSERT_STATE.includes(bindData.stateId)) {
                            animation = 'ero5';
                            continuance = 'none';
                        }
                        // 優先アニメフラグON
                        if (animation) {
                            this._priorityAnimating = true;
                        }
                    }
                }
                // 中出し回数記録
                this._prevCumInside = bindData.cumInside;
            } else {
                // 中出し回数リセット
                this._prevCumInside = 0;
            }

            if (!animation) {
                // 絶頂ステート、絶頂ゲージ、HPの状態からアニメーション名を決定
                let index1 = this._actor.isStateAffected(ORGASM_STATE) || tp == 100 ? 3 : tp >= 66 ? 2 : tp >= 33 ? 1 : 0;
                let index2 = hp > Math.floor(mhp * 0.6) ? 0 : hp > Math.floor(mhp * 0.3) ? 1 : 2;
                animation = this._spine.animation[index1][index2];
            }

            // 現在のアニメーションと違う場合
            if (!this._track[0] || animation != this._track[0].list[0].name) {
                this.setAnimation(0, animation, continuance, true);

                // 擬音Spineがあったらアニメーション設定
                if (this._gion.skeleton.replace(/_\d+$/, '')) {
                    this._gion.setAnimation(0, animation, continuance, true);
                }
            }
        }

        updateSlide() {
            let slide = this._spine.slide;
            if (slide) {
                this.setSlide(slide.amount, slide.direction, slide.frames);
            }
        }

        updateChroma() {
            let chroma;

            // アクターの状態から彩度を決定
            if (!this.isDead()) {
                chroma = 1.0;
            } else {
                chroma = 0.3;
            }

            // 現在の彩度と違う場合
            if (chroma == 1.0 && this._chroma['/default/'] > 0 ||
                chroma < 1.0 && chroma != this._chroma['/default/']) {
                this.setChroma(chroma);
            }
        }

        updateVisibility() {
            this.setVisible($gameKonoha.battleInfo.selectedActorId == this._actorId);
            this._gion.setVisible(this.visible);
        }

        updatePosition() {
            this._x = this._spine.x;
            this._y = this._spine.y;

            this._gion.setOffset(this._x, this._y);
        }

        updateScale() {
            this._scale = this._spine.scale;

            this._gion.setScale(this._scale, this._scale);
        }

        updateTimeScale() {
            if (this._track[0] && this._track[0].list[0].name.match(/^ero[1-4]/)) {
                let tp = this._actor.tp;
                let timeScale = tp <= 25 ? 1.0 :
                    tp <= 50 ? 2.0 :
                        tp <= 75 ? 2.5 :
                            3.0;
                this.setTimeScale(timeScale);
            } else {
                this.setTimeScale(1.0);
            }
        }

        isDown() {
            return this._actor.isStateAffected(DOWN_STATE) || this.isDead();
        }

        isNinshin() {
            return this._actor.isStateAffected(NINSHIN_STATE);
        }

        isZamen() {
            return this._actor.isStateAffected(ZAMEN_STATE);
        }

        isDead() {
            return this._actor.isDead();
        }

        eroStateIndex() {
            // かかっている戦闘エロステートの番号を返す
            for (let state of this._actor.states()) {
                if (state.id >= $p.states.badStateBattle1 && state.id <= $p.states.badStateBattle19) {
                    return state.id;
                }
            }

            return 0;
        }
    }

    window.Game_SpineBattle = Game_SpineBattle;

    //==============================================================================
    // Sprite_SpineBattle
    //==============================================================================

    class Sprite_SpineBattle extends Sprite_Spine {
        constructor(...args) {
            super(...args);
            this._spine = args[0] instanceof Game_SpineBattle ? args[0] : null;
            this._easing = null;
            this.setupAnimationBase();
        }

        init() {
            super.init();
            this._chroma = {};
            this._slide = {};
            if (this.spine()) {
                this.spine().actor._tachieAnimations = [];
            }
        }

        setupAnimationBase() {
            this._animationSprites = [];
            let base = this._animationBase = new Sprite_Base();
            base.x = Graphics.width - 420 / 2;
            base.y = Graphics.height / 2;
        }

        spine() {
            if (this._spine) {
                return this._spine;
            }
            return null;
        }

        update() {
            if (this.spine()) {
                this.spine().update();
            }
            super.update.apply(this, arguments);
            if (this.spine() && this.spine().priorityAnimating && this._data) {
                // 優先アニメを最後まで表示したらフラグOFF
                let track = this._data.state.tracks[0];
                if (track) {
                    if (track.trackTime >= track.animationEnd) {
                        this.spine().priorityAnimating = false;
                    }
                } else {
                    this.spine().priorityAnimating = false;
                }
            }
        }

        updateMosaic(spine) {
            super.updateMosaic(spine);
            this.updateChroma(spine);
            this.updateVisibility(spine);
            this.updatePosition(spine);
            this.updateScale(spine);
            this.updateSlide(spine);
            this.updateAnimationSprites(spine);
        }

        updateChroma(spine) {
            if (spine.chroma != this._chroma) {
                for (let image in spine.chroma) {
                    if (spine.chroma[image] != this._chroma[image]) {
                        let ratio = spine.chroma[image];
                        let filter = new ChromaFilter(ratio);
                        let sprite = (image == '/default/') ? this._data : this.getSpineSprites(image)[0];
                        if (sprite) {
                            let filters = (sprite.filters || []).filter(filter => {
                                return filter instanceof ChromaFilter == false;
                            });
                            filters.push(filter);
                            sprite.filters = filters;
                        }
                    }
                }
                for (let image in this._chroma) {
                    if (image in spine.chroma == false) {
                        let sprite = (image == '/default/') ? this._data : this.getSpineSprites(image)[0];
                        if (sprite) {
                            let filters = (sprite.filters || []).filter(filter => {
                                return filter instanceof ChromaFilter == false;
                            });
                            sprite.filters = filters.length > 0 ? filters : null;
                        }
                    }
                }
                this._chroma = spine.chroma;
            }
        }

        updateVisibility(spine) {
            this.visible = spine.visible;
        }

        updatePosition(spine) {
            this.x = spine.x;
            this.y = spine.y;
        }

        updateScale(spine) {
            this.scale.x = this.scale.y = spine.scale;
        }

        updateSlide(spine) {
            if (spine.slide != this._slide) {
                if (spine.slide.amount) {
                    const Easing = KONOHA.utils.Easing;
                    this._easing = new Easing(spine.slide.amount, spine.slide.frames, Easing.TYPE.Cubic, Easing.MODE.Out);
                }
                this._slide = spine.slide;
            }

            if (this._easing) {
                let slide = this._slide.amount - this._easing.pos();
                if ([1, 4, 7].includes(this._slide.direction)) {
                    this.x += slide;
                }
                if ([3, 6, 9].includes(this._slide.direction)) {
                    this.x -= slide;
                }
                if ([1, 2, 3].includes(this._slide.direction)) {
                    this.y -= slide;
                }
                if ([7, 8, 9].includes(this._slide.direction)) {
                    this.y += slide;
                }
                this._easing.next();
                if (slide == 0) {
                    this._easing = null;
                }
            }
        }

        updateAnimationSprites(spine) {
            let actor = this.spine().actor;
            while (actor.isTachieAnimationRequested()) {
                let data = actor.shiftTachieAnimation();
                let animation = $dataAnimations[data.animationId];
                let mirror = data.mirror;
                let delay = animation.position === 3 ? 0 : data.delay;
                let sprite = new Sprite_Animation();
                sprite.setup(this._animationBase, animation, mirror, delay);
                sprite.scale.x = sprite.scale.y = 2.0;
                SceneManager._scene._spriteset.addChild(sprite);
                this._animationSprites.push(sprite);
            }
            if (this._animationSprites.length > 0) {
                let sprites = this._animationSprites.clone();
                this._animationSprites = [];
                for (var i = 0; i < sprites.length; i++) {
                    var sprite = sprites[i];
                    if (sprite.isPlaying()) {
                        sprite.visible = this.visible;
                        this._animationSprites.push(sprite);
                    } else {
                        sprite.remove();
                    }
                }
            }
        }
    }

    window.Sprite_SpineBattle = Sprite_SpineBattle;

    /* rpg_objects.js */

    //==============================================================================
    // Game_Actor
    //==============================================================================

    (__startAnimation => {
        Game_Actor.prototype.startAnimation = function (animationId, mirror, delay) {
            __startAnimation.apply(this, arguments);
            this._tachieAnimations = this._tachieAnimations || [];
            var data = { animationId: animationId, mirror: !mirror, delay: delay };
            this._tachieAnimations.push(data);
        };
    })(Game_Actor.prototype.startAnimation);

    Game_Actor.prototype.shiftTachieAnimation = function () {
        this._tachieAnimations = this._tachieAnimations || [];
        return this._tachieAnimations.shift();
    };

    Game_Actor.prototype.isTachieAnimationRequested = function () {
        this._tachieAnimations = this._tachieAnimations || [];
        return this._tachieAnimations.length > 0;
    };

    /* rpg_sprites.js */

    //==============================================================================
    // Sprite_Picture
    //==============================================================================

    (__initialize => {
        Sprite_Picture.prototype.initialize = function (pictureId) {
            __initialize.apply(this, arguments);
            if (pictureId == $p.pictures.spine.id) {
                if (SceneManager._scene instanceof Scene_Battle) {
                    $gameParty.battleMembers().forEach(actor => {
                        let spine = new Game_SpineBattle(actor);
                        let sprite = new Sprite_SpineBattle(spine);
                        this.addChild(sprite);
                        let gionSprite = new Sprite_Spine(spine.gion);
                        this.addChild(gionSprite);
                    });
                }
            }
        };
    })(Sprite_Picture.prototype.initialize);

})();
