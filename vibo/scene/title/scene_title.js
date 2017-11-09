// //大文字はobjectって感じ
// var SceneTitle = function (game) {
//   // log("scene start8")
//   //sは空のオブジェクト
//   var s = {
//     game:game,
//     //新しい特性ならOK
//     // game,
//   }
//
//   game.registerAction('k',function () {
//     var s = Scene(game)
//       game.replaceScene(s)
//       })
//
//
//   s.draw = function () {
//     //draw labels
//     game.context.fillText("Game Start", 100, 100)
//   }
//   s.update = function () {
//   }
//
// return s
// }
class SceneTitle extends GuaScene{
  constructor(game) {
    super(game)

    this. game.registerAction('k',function () {
      var s = Scene(game)
        game.replaceScene(s)
        })

  }

 // static new(game){
 //   var i = new this(game)
 //   return i
 // }
  draw () {
    //空
        this.game.context.fillText("Game Start", 100, 200)
  }

}
