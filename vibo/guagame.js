var GuaGame = function (fps) {
  var g = {
    //ものがあるけど、中身が決まっていない
    actions:{},
    //どのキーが押されているかを判断する
    keydowns:{},
  }
  //canvasを画面から取得する
  var canvas = document.querySelector('#id-canvas')
  //コンテキストを取得
  var ctx = canvas.getContext('2d');
  g.canvas = canvas
  g.context = ctx

  g.drawImage = function (guaImage) {
    // g.context.drawImage()
    g.context.drawImage(guaImage.image,guaImage.x,guaImage.y)
  }

  //イベントを登録する
  window.addEventListener('keydown',function (event) {
    //配列
    g.keydowns[event.key] =true;
  })
  window.addEventListener('keyup',function (event) {
    g.keydowns[event.key] =false;
  })
  //gに対して、新たなアクション（関数）を登録する
  //callbackは関数
  g.registerAction = function (key,callback) {
    //どのキーによって、どの関数を呼びたいかを定義
    g.actions[key] = callback
  }

  window.fps = 30
  var runloop = function () {
    //events
    // 与えられたオブジェクト自身に存在する列挙可能なプロパティの配列
    //actionsとg.actionsを区別できる
    var actions = Object.keys(g.actions)
    //この下のactionsはgのaction
    for (var i = 0; i < actions.length; i++) {
      //赤はたぶん、オブジェクト内の属性
      //白はローカル変数みたいな感じ
      var key = actions[i]
      if(g.keydowns[key]){
        //もしキーが押されたら、登録されたactionを実施
        // console.log("もしキーが押されたら、登録されたactionを実施");
        g.actions[key]()
      }
    }
    //clear
    g.context.clearRect(0, 0, canvas.width, canvas.height)
    //update
    g.update()
    //draw
    g.draw()
    // next run loop
    setTimeout(function (fps) {
    // setInterval(function (fps) {
    runloop()
  },1000/window.fps)
  }
  //setIntervalを定義する
  //1秒内30回更新＋再描画
  setTimeout(function (fps) {
  // setInterval(function (fps) {
  runloop()
},1000/window.fps)
  //イベントを登録する関数を呼び出す
  return g
}
