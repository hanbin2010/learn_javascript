var rectIntersects = function(a,b) {
  var o = a
  if (b.y > o.y && b.y < o.y + o.image.height) {
    if (b.x > o.x && b.x < o.x + o.image.width) {
        // console.log("collide")
        return true
      }
  }
  return false
}


//make a image to canvas
var imageFromPath = function(path) {
  //この関数の中にimgという変数を持っている
  //このimgはImage型のオブジェクトでもある
  //Image object is predifined
  var img = new Image();

  //imgのリンクを定義する
  //imgは変数であり、オブジェクトでもあり、
  //その中に属性がある、その一つはsrc
  img.src = path

  // return the new img
  //javaと違って、関数（メソッド）には返り値の型を定義する必要ない
  return img
}

//何でアロー関数を使ったのか？
var e = sel => document.querySelector(sel)

//logを単独で定義することによって、柔軟性を持たせる
 var log = console.log.bind(console)
/*
var log = function (s) {
  e('#id-out-log').value += '\n' +s
}
*/
