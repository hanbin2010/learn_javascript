//js do not need import

  var Block = function (position,game) {

    // a var called p
    //pのフォーマットは[0,0,0]
    var p = position

    // get image object
    //imageFromPath関数を呼び出して、パスをその関数に渡して」、imageをゲットする
    //imageはPaddleという形のオブジェクトの中で一つの属性である
    //? so where is imageFromPath? hard to find
    //utils.js
    //★問題：毎回blockを作るたびに、新しい、imageタグが作られる
    //このプログラムはそんなにたくさんimageタグが必要ない
    //同じものだから
    // var image = imageFromPath('imgs/block.png')
    var img = game.imageByName('block')

    // a object called o
    /*
     var {objectName} = {
        var1:value,
        var2:value,
        var3:value,
   }
   */
    // It is not necessary to give a full name,just o is ok
    //自由にその中の属性を定義する

    var o = {
      // comma must be added by everyline
      image:img.image,
      x:p[0],
      y:p[1],
      w:img.w,
      h:img.h,
      alive:true,
      //dont forget last comma
      lifes:p[2]||1,
      // no need to add ;
    }


// o.image=img.image
// o.w=img.w
// o.h=img.h
// o.alive=true

//dont forget last comma
lifes:p[2]||1,


    //a func called kill belongs object o
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
      // a && ( b || c )difficult to understand
      return o.alive && (rectIntersects(o,b) || rectIntersects(b,o))
    }

    //いろんな属性とかを持つオブジェクトにする
    return o
  }
