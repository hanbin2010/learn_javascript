//大文字はobjectって感じ
var SceneEnd = function (game) {
  // log("scene start8")
  //sは空のオブジェクト
  var s = {
    game:game,
    //新しい特性ならOK
    // game,
  }

  s.draw = function () {
    //draw labels
    game.context.fillText("Game is over", 100, 290)
  }
  s.update = function () {
  }

return s
}
