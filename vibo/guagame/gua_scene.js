class GuaScene {
  constructor(game) {
    this.game = game
  }

  static new(game){
    var i = new this(game)
    return i
  }

  draw () {
    //空
    alert("必ず継承してオーバーライドしてください")
        // game.context.fillText("Game is over", 100, 290)
  }
  update(){
    //空
  }
  //継承するために空にする
}
