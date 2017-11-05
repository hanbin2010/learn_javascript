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

var imageFromPath = function(path) {
  //imgを作る
  //この関数の中にimgという変数を持っている
  //このimgはImage型のオブジェクトでもある
  var img = new Image();
  //imgのリンクを定義する
  //imgは変数であり、オブジェクトでもあり、
  //その中に属性がある、その一つはsrc
  img.src = path
  //このimgをリターンする
  //javaと違って、関数（メソッド）には返り値の型を定義する必要ない
  return img
}

var e = sel => document.querySelector(sel)
// var log = console.log.bind(console)
var log = function (s) {
  e('#id-out-log').value += '\n' +s
}
