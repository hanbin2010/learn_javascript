//js do not need import

var Ball = function (game) {
  //imageFromPath関数を呼び出して、パスをその関数に渡して」、imageをゲットする
  //imageはPaddleという形のオブジェクトの中で一つの属性である
  // var image = imageFromPath('imgs/ball.png')
  var img = game.imageByName('ball')
  // oというオブジェクトがある
  //自由にその中の属性を定義する

  var o = {
    image:img.image,
    x:100,
    y:200,
    //imgの中でものを取得する
    //少し変更を加えて、修正を検証するとよい
    //全部直さないと、気が済まないというのは、私の悪い癖である
    w:img.w,
    h:img.h,
    //カンマを絶対つけたほうが良い
    speedX:10,
    speedY:10,
    fired:false,
  };

  //  o.image=img.image
  o.fire = function () {
    o.fired = true
  }

  o.move = function () {
    if(o.fired === true){
      // console.log('move');
      if(o.x < 0 || o.x > 400){
        o.speedX = -o.speedX
      }
      if(o.y < 0 || o.y > 300){
        o.speedY = -o.speedY
      }
      o.x += o.speedX
      o.y += o.speedY
    }
  }

  o.rebound = function () {
    o.speedY *= -1
  }

//私の今の位置（xとy）はballの中にいるかどうかを判断する
  o.hasPoint = function (x,y) {
    // log('check')
    // log('x',x)
    // log('w',o.x+o.w)
    // log('y',y)
    // log('h',o.y+o.h)
    //x軸はボールのx軸より大きいけど、長さよりは小さい
    //y軸はボールのy軸より大きいが、高さよりは小さい
    var xIn = x >= o.x && x <= o.x + o.w
    var yIn = y >= o.y && y <= o.y + o.h
    return xIn && yIn
  }

  //いろんな属性とかを持つオブジェクトにする
  return o
}
