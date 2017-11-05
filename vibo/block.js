
  var Block = function (position) {
    //pのフォーマットは[0,0]
    var p = position
    //imageFromPath関数を呼び出して、パスをその関数に渡して」、imageをゲットする
    //imageはPaddleという形のオブジェクトの中で一つの属性である
    var image = imageFromPath('block.png')
    // oというオブジェクトがある
    //自由にその中の属性を定義する
    var o = {
      image:image,
      x:p[0],
      y:p[1],
      w:50,
      h:25,
      alive:true,
      lifes:p[2]||1,
    };

    o.kill = function(){
      if(o.lifes>0){
        // console.log("haha");
        o.lifes--
      }else{
      o.alive = false
    }
  }

    //collide
    o.collide = function (b) {
      // console.log("ball collide check");
      return o.alive && (rectIntersects(o,b) || rectIntersects(b,o))
    }

    //いろんな属性とかを持つオブジェクトにする
    return o
  }
