//=============================================================================
// FirgofCRTMode.js
// by James "Firgof" Woodall and ocean pollen & ON/OFF改変：にゃたま
// Date: 11/5/2015
//
// VERSION: 1.0a
//=============================================================================

/*:
 * @plugindesc モニターのような効果を作成します。
 * @author James "Firgof" Woodall and ocean pollen & ON/OFF改変：にゃたま
 *
 * @help Firgof's Monitor Effect -- VERSION 1.0 [A]  
 
 ===========================================
   1.  LICENSE AND CONTACT INFORMATION
 ===========================================
 このプラグインは商用/非商用の目的で無料です。
 商用製品で使用する場合、著者にクレジットを与える必要があります
 目立って表示されている場所に表示されます。
 
 これは本製品の最初のバージョンにすぎないことに注意してください。
 追加のバージョンが続く必要があります。
 
 ===========================================
   2.  INSTALLATION
 ===========================================
 DOWNLOAD: Place the JS file in your game's JS/plugins folder.
 COPY: Paste this text into a new file called "FirgofCRTMode.js" - making SURE
 the file extension for the file is also "JS" - and place that file in your game's
 JS/plugins folder.
 
 ENABLING THE PLUGIN:  Open your project and select the two puzzle
 pieces icon.  This opens your plug-in manager.  Double click on any empty space.
 Click the 'Name:' dropdown and select 'FirgofCRTMode'.  Make sure the Status is
 set to "ON".
 
 COMPATABILITY:
 Ideally, this plugin should go last in the list - however it should
 not be sensitive to other plugins operating at the same time.
 
 If you encounter incompatabilities with this plugin running while another
 plugin is running, please provide a report of that behavior to the following
 thread: 
 
 ダウンロード：あなたのゲームのJS / pluginsフォルダにJSファイルを置きます。
 COPY：このテキストを "FirgofCRTMode.js"という新しいファイルに貼り付けてください。
 ファイルのファイル拡張子も "JS"です - そのファイルをゲームの中に置きます
 JS / pluginsフォルダ。
 
 PLUGINを有効にする：あなたのプロジェクトを開き、2つのパズルを選択してください
 ピースアイコン。これにより、プラグインマネージャが開きます。空きスペースをダブルクリックします。
 「名前：」ドロップダウンをクリックし、「FirgofCRTMode」を選択します。ステータスが
 「ON」に設定してください。
 
 適合性：
 理想的には、このプラグインはリストの最後にあるはずですが、
 同時に動作している他のプラグインには敏感ではありません。
 
 
 ===========================================
   3.  USING THIS PLUGIN
 ===========================================
 バージョン1.0では、設定する設定はありません。
 将来のバージョンでは、それを保証するのに十分な需要がある場合、
 変更可能なオプションが増え、コアイメージ資産の変更が容易になります。
 
 */

(function () {
  var minTimeAchieved = 0;
  var nextUpdate = 0;

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command.toUpperCase() === 'CRT') {
      switch (args[0].toUpperCase()) {
        case 'ON':
          SceneManager._scene.showOverlay();
          break;
        case 'OFF':
          SceneManager._scene.hideOverlay();
          break;
      }
    }
  };


  function rgb2hex(r, g, b) {
    if (g !== undefined)
      return Number(0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).substring(1);
    else
      return Number(0x1000000 + r[0] * 0x10000 + r[1] * 0x100 + r[2]).toString(16).substring(1);
  }


  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  function prepend(obj, name, func) {
    var orig = obj.prototype[name]
    obj.prototype[name] = function () {
      func.call(this)
      orig.call(this)
    }
  }
  function extend(obj, name, func) {
    var orig = obj.prototype[name]
    obj.prototype[name] = function () {
      orig.call(this)
      func.call(this)
    }
  }

  function zsorter(a, b) {
    if (!a.z && !b.z) return 0
    if (!a.z) return -1;
    if (!b.z) return 1;
    return a.z - b.z
  }

  Scene_Map.prototype.createCRTLED = function () {
    //Initialize Bitmaps and Sprites, give default values
    $crt_overlay1 = new Sprite_Base();
    $crt_overlay2 = new Sprite_Base();
    $crt_overlay3 = new Sprite_Base();
    $crt_overlay4 = new Sprite_Base();
    $crt_overlay4b = new Sprite_Base();
    $crt_overlay5 = new Sprite_Base();
    $crt_overlay8 = new Sprite_Base();
    $crt_overlay11 = new Sprite_Base();

    $crt_glitch_base = new Sprite_Base(); // For BLT corruption
    $crt_glitch = new Sprite_Base(); // Actual glitch image 

    $crt_overlay1.bitmap = ImageManager.loadPicture("crt_phosphor_grid");
    $crt_overlay1.blendMode = 1;
    $crt_overlay1.opacity = 50;//40

    $crt_overlay2.bitmap = ImageManager.loadPicture("crt_wave");
    $crt_overlay2.blendMode = 0;
    $crt_overlay2.opacity = 200;

    $crt_overlay3.bitmap = ImageManager.loadPicture("crt_linedcolor");
    $crt_overlay3.blendMode = 1;
    $crt_overlay3.opacity = 50;

    $crt_overlay5.bitmap = ImageManager.loadPicture("crt_border_merged");
    $crt_overlay5.blendMode = 0;
    $crt_overlay5.opacity = 255;

    $crt_overlay8.bitmap = ImageManager.loadPicture("crt_interiorlight");
    $crt_overlay8.blendMode = 1;
    $crt_overlay8.opacity = 10;
    $crt_overlay8.y = 12;

    $crt_overlay4.bitmap = ImageManager.loadPicture("majorglitch");
    $crt_overlay4b.bitmap = ImageManager.loadPicture("majorglitch");

    //ADD
    if ($gameMap._enableCRT) { SceneManager._scene.showOverlay(); }
    else { SceneManager._scene.hideOverlay(); }

    this.addChild($crt_overlay1);
    this.addChild($crt_overlay3);
    this.addChild($crt_overlay2);
    this.addChild($crt_overlay8);
    this.addChild($crt_overlay11);
    this.addChild($crt_overlay4);
    this.addChild($crt_overlay5);
  };

  //ADD
  Scene_Map.prototype.showOverlay = function () {
    $gameMap._enableCRT = true;
    $crt_overlay1.show();
    $crt_overlay3.show();
    $crt_overlay2.show();
    $crt_overlay8.show();
    $crt_overlay11.show();
    $crt_overlay4.show();
    $crt_overlay5.show();

    //ズームを有効にする場合以下のコメントを外してください。
    //$gameScreen.setZoom((SceneManager._screenWidth)/2,(SceneManager._screenHeight)/2,2,5);
  };

  //ADD
  Scene_Map.prototype.hideOverlay = function () {
    $gameMap._enableCRT = false;
    $crt_overlay1.hide();
    $crt_overlay3.hide();
    $crt_overlay2.hide();
    $crt_overlay8.hide();
    $crt_overlay11.hide();
    $crt_overlay4.hide();
    $crt_overlay5.hide();

    //ズームを有効にする場合以下のコメントを外してください。
    //$gameScreen.setZoom((SceneManager._screenWidth),(SceneManager._screenHeight),1);
  };

  //
  //var _Firgof_CRTLED_init = Scene_Map.prototype.createDisplayObjects;
  Scene_Map.prototype.createDisplayObjects = function () {
    //        _Firgof_CRTLED_init.call(this);
    this.createSpriteset();
    this.createCRTLED();//ADD
    this.createMapNameWindow();
    this.createWindowLayer();
    this.createAllWindows();
  };

  //
  var _Firgof_CRTLED_update = Scene_Map.prototype.updateChildren;
  Scene_Map.prototype.updateChildren = function () {
    if (Math.random() >= 0.25 && $gameMap._enableCRT) {
      var now = Date.now();
      if (now <= nextUpdate) {
        var target = $crt_overlay4.bitmap;
        var height = SceneManager._screenHeight * Math.random();
        var off = SceneManager._screenHeight * Math.random();

        // !! これらの機能はパフォーマンス上の理由からオフになっています !!
        // !! それほどパフォーマンスの低いゲームでOKでない限り、コメントを外してはいけません !!

        //$crt_overlay4.bitmap = ImageManager.loadPicture("majorglitch");
        //$crt_overlay4.bitmap = ImageManager.loadPicture("crt_phosphor_grid");
        //$crt_overlay4.bitmap = Bitmap.snap();
        //$crt_overlay4.bitmap.clearRect(0,off,SceneManager._screenWidth,height);
        //$crt_overlay4.bitmap.clearRect(0,0,w,h);
        //$crt_overlay4.bitmap = Bitmap.load("img/pictures/majorglitch.png");

        // !! これらの機能は、パフォーマンス上の理由からオフになっています !!
        // !! それほどパフォーマンスの低いゲームでOKでない限り、コメントを外してはいけません !!

        target.fillRect((SceneManager._screenWidth * Math.random()), off + (height * Math.random()), SceneManager._screenWidth, SceneManager._screenHeight, "#FF0000");
        target.fillRect((SceneManager._screenWidth * Math.random()), off + (height * Math.random()), SceneManager._screenWidth, SceneManager._screenHeight, "#00FF00");
        target.fillRect((SceneManager._screenWidth * Math.random()), off + (height * Math.random()), SceneManager._screenWidth, SceneManager._screenHeight, "#0000FF");
        return;

      }
      else {
        var target = $crt_overlay4.bitmap;
        var height = SceneManager._screenHeight * Math.random();
        var off = SceneManager._screenHeight * Math.random();
        var w = SceneManager._screenWidth;
        var h = SceneManager._screenHeight;

        if (Math.random() > 0.995) {
          $crt_overlay4.bitmap.blt($crt_overlay4b.bitmap, 0, 0, $crt_overlay4b.bitmap.width, $crt_overlay4b.bitmap.height, 0, 0, $crt_overlay4b.bitmap.width, $crt_overlay4b.bitmap.height);
        }

        var r = Math.floor(256 * Math.random());
        var g = Math.floor(256 * Math.random());
        var b = Math.floor(256 * Math.random());

        var out = "#" + rgb2hex(r, g, b);

        var r = Math.floor(256 * Math.random());
        var g = Math.floor(256 * Math.random());
        var b = Math.floor(256 * Math.random());

        var out2 = "#" + rgb2hex(r, g, b);

        // 破損画像を時間の経過とともに劣化させたい場合は、以下の行のコメントを外してください。
        //        		  target.blt(target, w*Math.random(), h*Math.random(), $crt_overlay4b.bitmap.width, $crt_overlay4b.bitmap.height, w*Math.random(), h*Math.random());
        //        		  target.blt(target, w*Math.random(), h*Math.random(), w*Math.random(), h*Math.random(), w*Math.random(), h*Math.random());
        //        		  target.blt(target, w*Math.random(), h*Math.random(), $crt_overlay4b.bitmap.width, $crt_overlay4b.bitmap.height, w*Math.random(), h*Math.random());
        //        		  target.clearRect(w*Math.random(),h*Math.random(),w,h);
        // 破損画像を時間の経過とともに劣化させたい場合は、上記の行のコメントを外してください。

        target.blendMode = 0;

        nextUpdate = now + (Math.random() * 100) + ($gameVariables[4] * 100);
      }
    }
    _Firgof_CRTLED_update.call(this);
    if (Math.random() >= 0.25 && $gameMap._enableCRT) {
      if (minTimeAchieved == 1) {

        // この行は、パフォーマンス上の懸念があるためコメントアウトしました。
        // 「ゴースト」効果を持たせたい場合は、次の行のコメントを外してください。
        // WARNING: この機能は多くのパフォーマンスを必要とします!!

        //$crt_overlay11.bitmap = Bitmap.snap(this);
        //$crt_overlay11.opacity = 180*Math.random();


        minTimeAchieved = 0;
        var offx = getRandomArbitrary(-1, 1);
        offx *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
        offx *= Math.floor(Math.random() * 2) == 1 ? 6 : 1;
        var offy = getRandomArbitrary(-1, 1);
        offy *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
        offy *= Math.floor(Math.random() * 2) == 1 ? 6 : 1;

        //$crt_overlay11.x = offx;
        //$crt_overlay11.y = offy;
      }
      else {
        var op = 0 + getRandomArbitrary(8, 40);//org:(16,80)

        //$crt_overlay11.opacity = op * Math.Random();
        $crt_overlay2.opacity = 100;//5
        $crt_overlay2.y += 12;

        if ($crt_overlay2.y >= SceneManager._screenHeight + 480) { $crt_overlay2.y = -480; }

        $crt_overlay4.opacity = op;
        $crt_overlay8.opacity = 120 + (op * 0.001);
        $crt_overlay4.blendMode = 0;
      }
    }

  };
})();