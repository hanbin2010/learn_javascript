//js do not need import

  var Ball = function (game) {
    //imageFromPath関数を呼び出して、パスをその関数に渡して」、imageをゲットする
    //imageはPaddleという形のオブジェクトの中で一つの属性である
    // var image = imageFromPath('imgs/ball.png')
      var img = game.imageByName('ball')
    // oというオブジェクトがある
    //自由にその中の属性を定義する

    var o = {
      x:100,
      y:200,
      //カンマを絶対つけたほうが良い
      speedX:10,
      speedY:10,
      fired:false,
    };
    

     o.image=img.image


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
    //いろんな属性とかを持つオブジェクトにする
    return o
  }
