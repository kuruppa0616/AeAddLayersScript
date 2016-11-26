(function (parent) {

    var myActiveItem;
    var selectedLayer;
    var oneNodeCamName = "1nodeCam";
    var twoNodeCamName = "2nodeCam";
    var solidColor = [0, 0, 0];
    var solidName = "solid";
    var lightName = "light"
    var adjustmentName = "Adjustment"
    var buttonSize = [0, 0, 36, 17];

    //現在アクティブなプロジェクトとレイヤーを取得
    function getStates() {
        myActiveItem = app.project.activeItem;
        selectedLayer = app.project.activeItem.selectedLayers;
    }
    //1ノードカメラ作成
    function addOneNodeCam() {
        getStates();
        //カメラ作成
        var newCam = myActiveItem.layers.addCamera(oneNodeCamName, [0, 0]);
        //デュレーション指定
        if (selectedLayer[0] !== undefined) {

        }
        newCam = setFromSelectedLayer(newCam);

        //カメラPosition設定
        newCam.position.setValue([myActiveItem.width / 2, myActiveItem.height / 2, -1777.7778]);
        
        //1ノードカメラに設定
        newCam.pointOfInterest.expression = "transform.position"

    }

    //2ノードカメラ作成
    function addTwoNodeCam() {
        getStates();
        var newCam = myActiveItem.layers.addCamera(twoNodeCamName, [0, 0]);
        newCam = setFromSelectedLayer(newCam);
        newCam.position.setValue([myActiveItem.width / 2, myActiveItem.height / 2, -1777.7778]);
        newCam.pointOfInterest.setValue([myActiveItem.width / 2, myActiveItem.height / 2, 0]);

    }

    //平面作成
    function addSolid(threeD) {
        getStates();
        var newSolid = myActiveItem.layers.addSolid(solidColor, solidName, myActiveItem.width, myActiveItem.height, myActiveItem.pixelAspect);
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
        var newLight = myActiveItem.layers.addLight(lightName, [myActiveItem.width / 2, myActiveItem.height / 2]);
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
        var newAdjustment = myActiveItem.layers.addSolid(solidColor, adjustmentName, myActiveItem.width, myActiveItem.height, myActiveItem.pixelAspect);
        newAdjustment = setFromSelectedLayer(newAdjustment, threeD);
        newAdjustment.adjustmentLayer = true;

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
    var myWindow = {
        palette: null, //初期パネル
    };

    //UI作成
    function buildUI(thisObj) {

        myWindow.palette = (thisObj instanceof Panel) ? thisObj : new Window("palette", "addLayers", undefined, {
            resizeable: true
        });

        //上のボタン作成
        var buttonGroupAbove = myWindow.palette.add("group");
        buttonGroupAbove.alignment = "left";

        buttonGroupAbove.add('statictext {text: "2D", characters: 3, justify: "left"}', [0, 0, 20, 20]);
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

        buttonGroupUnder.add('statictext {text: "3D", characters: 3, justify: "left"}', [0, 0, 20, 20]);
        var text3D = buttonGroupUnder.add("button", buttonSize, "Text");
        var solid3D = buttonGroupUnder.add("button", buttonSize, "Solid");
        var adj3D = buttonGroupUnder.add("button", buttonSize, "Adju");
        var null3D = buttonGroupUnder.add("button", buttonSize, "Null");
        var shape3D = buttonGroupUnder.add("button", buttonSize, "Shape");

        myWindow.palette.margins = [5, 5, 5, 5];

        text2D.onClick = function () {
            addText(false);
        }
        text3D.onClick = function () {
            addText(true);
        }

        solid2D.onClick = function () {
            addSolid(false);
        }
        solid3D.onClick = function () {
            addSolid(true);
        }

        oneCam.onClick = function () {
            addOneNodeCam(true);
        }
        twoCam.onClick = function () {
            addTwoNodeCam(true);
        }

        light.onClick = function () {
            addLight(true);
        }

        adj2D.onClick = function () {
            addAdjustment(false);
        }
        adj3D.onClick = function () {
            addAdjustment(true);
        }

        null2D.onClick = function () {
            addNull(false);
        }
        null3D.onClick = function () {
            addNull(true);
        }

        shape2D.onClick = function () {
            addShape(false);
        }
        shape3D.onClick = function () {
            addShape(true);
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