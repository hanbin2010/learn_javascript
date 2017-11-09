var Paddle = function (game) {
  log('paddle')
  //imageFromPath関数を呼び出して、パスをその関数に渡して」、imageをゲットする
  //imageはPaddleという形のオブジェクトの中で一つの属性である
  //var image = imageFromPath('paddle.png')
  var img = game.imageByName('paddle')
  // log('img',img)
  // oというオブジェクトがある
  //自由にその中の属性を定義する

  var o = {
    //    image:img.image,
    x:100,
    y:250,
    w:img.w,
    h:img.h,

    //カンマを絶対つけたほうが良い
    speed:15,
  };

  o.image = img.image
  // log(o.image)
  //★★JSの特殊な書き方
  //再定義というか、登録する
  //oに一つの関数を定義する
  o.move = function (x) {
    if (x >= 400 - o.w) {
      if (x <= 0) {
        x = 0
      }
      x = 400 - o.w
    }
    o.x = x
  }

  o.moveLeft = function () {
    // o.x -= o.speed
    o.move(o.x - o.speed)
  }
  //oに一つの関数を定義する
  o.moveRight = function () {
    // o.x += o.speed
    o.move(o.x + o.speed)

  }

  var aInb = function (x,x1,x2) {
    return x >= x1 && x <= x2
  }
  //collide
  o.collide = function (ball) {
    //   if (ball.y + o.h > o.y) {
    //       if(ball.x > o.x && ball.x < o.x + o.w){
    //         log("collide")
    //         return true
    //       }
    //   }
    //   return false
    var a = o
    var b = ball
    if (aInb(a.x,b.x,b.x+b.w)||aInb(b.x,a.x,a.x+a.w) ){
      if (aInb(a.y,b.y,b.y+b.h)||aInb(b.y,a.y,a.y+a.h) ){
        return true
      }
    }
    return false
  }
  // log('paddle last')



  //いろんな属性とかを持つオブジェクトにする
  return o
}
