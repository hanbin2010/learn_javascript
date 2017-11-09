//js do not need import

var GuaGame = function (fps,images,callback) {

  // log("Gua start2")

  //imagesはオブジェクトであり、中には、イメージの引用名とイメージのリンクがある
  //プログラムはイメージを全部ロードし終わった後に動く
  var g = {
    scene:null,
    //ものがあるけど、中身が決まっていない
    actions:{},
    //どのキーが押されているかを判断する
    keydowns:{},
    //空のobject
    images:{},
  }
  // scene.game = g

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
    // log("guaImage",guaImage)
    // log("draw start3")
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
    //draw
    g.scene.draw()
    //update
    // g.scene.update && g.scene.update()
      g.scene.update()
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

//imageの名前を全部取得する
var names = Object.keys(images)

//先にすべての図をロードする
for (var i = 0; i < names.length; i++) {
  log("name.lenght start4")
  // log("aa")
  //forの中でnameのスコープが上層し、全域になって
  //nameは常に最後のものしか取れない
  // var name =  names[i]
  let name =  names[i]
   path = images[name]
  let img = new Image()


  //imgのリンクを定義する
  //imgは変数であり、オブジェクトでもあり、
  //その中に属性がある、その一つはsrc
  img.src = path
  img.onload = function () {
    //imgをg.imagesに保存
    g.images[name]=img
    //１回ロードしたら、プラス１回
    loads.push(1)
    // log("loads",loads)
    // if(loads.length == images.length){
    //もし図が全部ロードできたら、ゲームを始める
    if(loads.length == names.length){
      // log("run start5")
      //すべての図がロードされた後に、g.runを呼ぶ
      g.run()
    }
  }
}


//nameをキーに、その中のimgオブジェクトを取得する
g.imageByName = function (name) {
  var img = g.images[name]
  var image = {
    w:img.width,
    h:img.height,
    //why?
    image:img,
  }

// log('imageByName',image.image)
  return image
}

g.runWithScene = function (scene) {
// console.log("runwith");
  g.scene = scene
  // log(scene)
  //1秒内30回更新＋再描画
  //非同期
  //g.drawとg.updateの定義コードを読み終わってから、
  //このコードが実行される
  setTimeout(function (fps) {
    //setIntervalを定義
    // setInterval(function (fps) {
    // log("run")
    runloop()
  },1000/window.fps)
}

g.replaceScene = function (scene) {
  g.scene = scene
}
//プログラムがスタート
g.run = function () {
  // log("run in start6")
  callback(g)
}
  //イベントを登録する関数を呼び出す
  return g
}
