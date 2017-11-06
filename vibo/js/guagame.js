//js do not need import

var GuaGame = function (fps,images) {
  //imagesはオブジェクトであり、中には、イメージの引用名とイメージのリンクがある
  //プログラムはイメージを全部ロードし終わった後に動く
  var g = {
    //ものがあるけど、中身が決まっていない
    actions:{},
    //どのキーが押されているかを判断する
    keydowns:{},
    //空のobject
    images:{},
  }
  //canvasを画面から取得する
  var canvas = document.querySelector('#id-canvas')
  //コンテキストを取得
  var ctx = canvas.getContext('2d');

  //gの中の要素を定義
  //javaとは大きな違い
  //jsは動的言語なので、オブジェクトの中のものは実行されるまで決まらなくてよい
  g.canvas = canvas
  g.context = ctx

//redはfunctionの中の変数
//grayは普通の壱枚のファイルの中の変数
//青はfunction変数
//黄緑は文字列
//紫は予約語

  g.drawImage = function (guaImage) {
    // g.context.drawImage()
    g.context.drawImage(guaImage.image,guaImage.x,guaImage.y)
  }

//非同期
  //イベントを登録する
  window.addEventListener('keydown',function (event) {
    //配列
    g.keydowns[event.key] =true;
  })

  //非同期
  window.addEventListener('keyup',function (event) {
    g.keydowns[event.key] =false;
  })
  //gに対して、新たなアクション（関数）を登録する
  //関数をコールバックする
    g.registerAction = function (key,callback) {
    //どのキーによって、どの関数を呼びたいかを定義
    //jsの配列は[key]でも定義できる、不思議
    //javaのマップみたいな感じ
    g.actions[key] = callback
  }

//ぽつんといて、醜い
  window.fps = 30

  //イベントループだね
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
      //  g.actions[key]存在の場合
      if(g.keydowns[key]){
        //もしキーが押されたら、登録されたactionを実施
        // console.log("もしキーが押されたら、登録されたactionを実施");
          // g.actions[key]はファンクション
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
    //自分の中で、自分を設定する
    //回帰的に呼ぶ
    runloop()
  },1000/window.fps)
  }

//一回ロードしたら、1をプッシュする
var loads = []

var names = Object.keys(images)

//先にすべての図をロードする
for (var i = 0; i < names.length; i++) {
  var name =  names[i]
  var path = images[name]
  var img = new Image()

  //imgのリンクを定義する
  //imgは変数であり、オブジェクトでもあり、
  //その中に属性がある、その一つはsrc
  img.src = path
  img.onload = function () {
    //imgをg.imagesに保存
    g.images[name]=img
    //すべての図がロードされた後に、g.runを呼ぶ
    loads.push(1)
    if(loads.length == images.length){
      g.run()
    }
  }
}


g.imageByName = function (name) {
  var img = g.images[name]
  var image = {
    w:img.width,
    h:img.height,
    //why?
    image:image,
  }

  return image
}


//プログラムがスタート
g.run = function () {
  //1秒内30回更新＋再描画
  //非同期
  //g.drawとg.updateの定義コードを読み終わってから、
  //このコードが実行される
  setTimeout(function (fps) {
    //setIntervalを定義
    // setInterval(function (fps) {
    runloop()
  },1000/window.fps)

}

  //イベントを登録する関数を呼び出す
  return g
}