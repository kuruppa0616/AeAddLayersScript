(function(parent) {

    var myActiveItem;
    var selectedLayer;
    var solidColor = [0, 0, 0];
    var buttonSize = [0, 0, 36, 17];
    var myWindow = {
        palette: null, //初期パネル
    };

    //現在アクティブなプロジェクトとレイヤーを取得
    function getStates() {
        myActiveItem = app.project.activeItem;
        selectedLayer = app.project.activeItem.selectedLayers;
    }
    //1ノードカメラ作成
    function addOneNodeCam(threeD) {
        getStates();
        var newCam = myActiveItem.layers.addCamera("1nodeCam", [0, 0]);
        newCam = setFromSelectedLayer(newCam, threeD);
        //カメラPosition設定
        newCam.position.setValue([myActiveItem.width / 2, myActiveItem.height / 2, -1777.7778]);
        //1ノードカメラに設定
        newCam.pointOfInterest.expression = "transform.position"
    }

    //2ノードカメラ作成
    function addTwoNodeCam(threeD) {
        getStates();
        var newCam = myActiveItem.layers.addCamera("2nodeCam", [0, 0]);
        newCam = setFromSelectedLayer(newCam, threeD);
        //カメラPosition設定
        newCam.position.setValue([myActiveItem.width / 2, myActiveItem.height / 2, -1777.7778]);
        newCam.pointOfInterest.setValue([myActiveItem.width / 2, myActiveItem.height / 2, 0]);
    }

    //平面作成
    function addSolid(threeD) {
        getStates();
        var newSolid = myActiveItem.layers.addSolid(solidColor, "solid", myActiveItem.width, myActiveItem.height, myActiveItem.pixelAspect);
        //newSolid.blendingMode =  BlendingMode.SCREEN;
        newSolid = setFromSelectedLayer(newSolid, threeD);
    }
    // ヌル作成
    function addNull(threeD) {
        getStates();
        var newNull = myActiveItem.layers.addNull();
        newNull = setFromSelectedLayer(newNull, threeD);
    }
    // テキスト作成
    function addText(threeD) {
        getStates();
        var newText = myActiveItem.layers.addText();
        newText = setFromSelectedLayer(newText, threeD);
    }
    // ライト作成
    function addLight(threeD) {
        getStates();
        var newLight = myActiveItem.layers.addLight("light", [myActiveItem.width / 2, myActiveItem.height / 2]);
        newLight = setFromSelectedLayer(newLight, threeD);
    }
    // シェイプ作成
    function addShape(threeD) {
        getStates();
        var newShape = myActiveItem.layers.addShape();
        newShape = setFromSelectedLayer(newShape, threeD);
    }
    // 調整レイヤー作成
    function addAdjustment(threeD) {
        getStates();
        var newAdjustment = myActiveItem.layers.addSolid(solidColor, "Adjustment", myActiveItem.width, myActiveItem.height, myActiveItem.pixelAspect);
        newAdjustment = setFromSelectedLayer(newAdjustment, threeD);
        newAdjustment.adjustmentLayer = true;
    }

    //OpticalFlaresを適用した平面作成
    function addOpticalFlares(threeD) {
        getStates();
        var newSolid = myActiveItem.layers.addSolid(solidColor, "OpticalFlares", myActiveItem.width, myActiveItem.height, myActiveItem.pixelAspect);
        newSolid.blendingMode = BlendingMode.SCREEN;

        //プラグインが導入されていない、エラー画面を表示して生成した平面を削除する
        try {
            newSolid.property("ADBE Effect Parade").addProperty("VIDEOCOPILOT OpticalFlares");
        } catch (e) {
            alert("OpticalFlaresが導入されていません。Andrewに貢ぎましょう")
            newSolid.remove();
        }
        newSolid = setFromSelectedLayer(newSolid, threeD);

    }
    //Element3Dを適用した平面作成
    function addElement3D(threeD) {
        getStates();
        var newSolid = myActiveItem.layers.addSolid(solidColor, "E3D", myActiveItem.width, myActiveItem.height, myActiveItem.pixelAspect);

        //プラグインが導入されていない、エラー画面を表示して生成した平面を削除する
        try {
          newSolid.property("ADBE Effect Parade").addProperty("VIDEOCOPILOT 3DArray");
        } catch (e) {
            alert("Element3Dが導入されていません。Andrewに貢ぎましょう")
            newSolid.remove();
        }

        newSolid = setFromSelectedLayer(newSolid, threeD);
    }
    //Particularを適用した平面作成
    function addParticular(threeD) {
        getStates();
        var newSolid = myActiveItem.layers.addSolid(solidColor, "Particular", myActiveItem.width, myActiveItem.height, myActiveItem.pixelAspect);

        //プラグインが導入されていない、エラー画面を表示して生成した平面を削除する
        try {
            newSolid.property("ADBE Effect Parade").addProperty("tc Particular");
        } catch (e) {
            alert("Particularが導入されていません。Red Giantに貢ぎましょう")
            newSolid.remove();
        }

        newSolid = setFromSelectedLayer(newSolid, threeD);
    }

    //レイヤーを選択している場合、その上にデュレーションに合わせ作成
    //threeDがtrueの場合3Dレイヤーに変更
    function setFromSelectedLayer(item, threeD) {
        if (selectedLayer[0] !== undefined) {
            item.inPoint = selectedLayer[0].inPoint;
            item.outPoint = selectedLayer[0].outPoint;
            item.moveBefore(selectedLayer[0]);
        }
        if (threeD) {
            item.threeDLayer = true;
        }
        return item;
    }


    //UI作成
    function buildUI(thisObj) {

        myWindow.palette = (thisObj instanceof Panel) ? thisObj : new Window("palette", "addLayers", undefined, {
            resizeable: true
        });

        //上のボタン作成
        var buttonGroupAbove = myWindow.palette.add("group");
        buttonGroupAbove.alignment = "left";

        buttonGroupAbove.add('statictext {text: "2D", characters: 3, justify: "center"}', [0, 0, 37, 20]);
        var text2D = buttonGroupAbove.add("button", buttonSize, "Text");
        var solid2D = buttonGroupAbove.add("button", buttonSize, "Solid");
        var adj2D = buttonGroupAbove.add("button", buttonSize, "Adju");
        var null2D = buttonGroupAbove.add("button", buttonSize, "Null");
        var shape2D = buttonGroupAbove.add("button", buttonSize, "Shape");
        var oneCam = buttonGroupAbove.add("button", buttonSize, "1Cam");
        var twoCam = buttonGroupAbove.add("button", buttonSize, "2Cam");
        var light = buttonGroupAbove.add("button", buttonSize, "Light");
        buttonGroupAbove.margins = [0, 0, 0, -10];

        //下のボタン作成
        var buttonGroupUnder = myWindow.palette.add("group");
        buttonGroupUnder.alignment = "left";

        buttonGroupUnder.add('statictext {text: "3D/etc", characters: 7, justify: "center"}', [0, 0, 37, 20]);
        var text3D = buttonGroupUnder.add("button", buttonSize, "Text");
        var solid3D = buttonGroupUnder.add("button", buttonSize, "Solid");
        var adj3D = buttonGroupUnder.add("button", buttonSize, "Adju");
        var null3D = buttonGroupUnder.add("button", buttonSize, "Null");
        var shape3D = buttonGroupUnder.add("button", buttonSize, "Shape");
        var opti = buttonGroupUnder.add("button", buttonSize, "OF");
        var element = buttonGroupUnder.add("button", buttonSize, "E3D");
        var particular = buttonGroupUnder.add("button", buttonSize, "Parti");


        myWindow.palette.margins = [5, 5, 5, 5];

        //ボタン実装
        //引数 true:3Dレイヤ,false:2Dレイヤー
        text2D.onClick = function() {
            addText(false);
        }
        text3D.onClick = function() {
            addText(true);
        }

        solid2D.onClick = function() {
            addSolid(false);
        }
        solid3D.onClick = function() {
            addSolid(true);
        }

        oneCam.onClick = function() {
            addOneNodeCam(false);
        }
        twoCam.onClick = function() {
            addTwoNodeCam(false);
        }

        light.onClick = function() {
            addLight(false);
        }

        adj2D.onClick = function() {
            addAdjustment(false);
        }
        adj3D.onClick = function() {
            addAdjustment(true);
        }

        null2D.onClick = function() {
            addNull(false);
        }
        null3D.onClick = function() {
            addNull(true);
        }

        shape2D.onClick = function() {
            addShape(false);
        }
        shape3D.onClick = function() {
            addShape(true);
        }

        opti.onClick = function() {
            addOpticalFlares(false);
        }
        element.onClick = function() {
            addElement3D(false);
        }
        particular.onClick = function() {
            addParticular(false);
        }
        return myWindow.palette;
    }

    //ここからスクリプト実行
    buildUI(parent);
    if (myWindow.palette instanceof Window) {
        //ウィンドウ
        myWindow.palette.show();
    } else {
        //パネル
        myWindow.palette.layout.layout(true);
    }

})(this);
