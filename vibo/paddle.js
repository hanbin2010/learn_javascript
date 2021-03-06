var Paddle = function () {
  //imageFromPath関数を呼び出して、パスをその関数に渡して」、imageをゲットする
  //imageはPaddleという形のオブジェクトの中で一つの属性である
  var image = imageFromPath('paddle.png')
  // oというオブジェクトがある
  //自由にその中の属性を定義する
  var o = {
    image:image,
    x:100,
    y:250,
    //カンマを絶対つけたほうが良い
    speed:15,
  };


  //★★JSの特殊な書き方
  //再定義というか、登録する
  //oに一つの関数を定義する
  o.move = function (x) {
    if (x >= 400 - o.image.width) {
      if (x <= 0) {
        x = 0
      }
      x = 400 - o.image.width
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

  //collide
  o.collide = function (ball) {
    if (ball.y + o.image.height > o.y) {
        if(ball.x > o.x && ball.x < o.x + o.image.width){
          // console.log("collide")
          return true
        }
    }
    return false
  }
  //いろんな属性とかを持つオブジェクトにする
  return o
}
