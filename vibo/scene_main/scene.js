//大文字はobjectって感じ
var Scene = function (game) {
  log("scene start8")
  //sは空のオブジェクト
  var s = {
    game:game,
    //新しい特性ならOK
    // game,
  }

//初期化
  blocks = loadLevel(1,game)

  //gameの初期化は非同期なので、まだイメージができていないんだ
  //imagesが空のobjectになってしまった
  var paddle = Paddle(game)
  // log(paddle.w)
  // log(paddle)
  var ball = Ball(game)
  var score = 0

  // blocks = loadLevel(1,game)

  //gameの初期化は非同期なので、まだイメージができていないんだ
  //imagesが空のobjectになってしまった
  // var paddle = Paddle(game)
  // log("paddle is",paddle)
  // var ball = Ball(game)
  // var score = 0

  // window.blocks = loadLevel(1,game)

  //paddleと関係ないことも関数に入れる
  //canvasを描画する
  //そうすると、画面がロードされたときに、自動的にcanvasの中に出てくる
  // console.log("load");
  // log("onload",paddle.image.onload)
  // paddle.image.onload = function() {
  //   log("load image start9")
  //   game.context.drawImage(paddle.image, paddle.x, paddle.y)
  //   console.log("load");
  // }
  // console.log("regis");
  //events
  game.registerAction('a',function () {
    // console.log("もしキーが押されたら、登録されたactionを実施");
    paddle.moveLeft()
  })
  game.registerAction('d',function () {
    paddle.moveRight()
  })
  game.registerAction('f',function () {
    ball.fire()
  })

  // game.registerAction('p',function () {
  // })
  s.draw = function () {
      //""? ''?
      //背景を描く
      game.context.fillStyle = "#ffccff";
      game.context.fillRect(0, 0, 400, 300);

      // console.log("draw");
      // log(paddle,"paddle")
      game.drawImage(paddle)
      game.drawImage(ball)

      for (var i = 0; i < blocks.length; i++) {
        var b = blocks[i]
        if(b.alive){
          game.drawImage(b)
        }
      }
      //draw lables
      game.context.fillText("score is "+score, 10, 290)
  }
  s.update = function () {
    if(window.paused){
      // console.log("stop");
      return
    }

    // console.log('update');
    ball.move()

    //is game over?
    if(ball.y > paddle.y){
      log("game over")
      //game overに遷移する
      var end = SceneEnd.new(game)
        game.replaceScene(end)
        // return
    }
    //collide
    if(paddle.collide(ball)){
      //ここはball.リバウンド()関数を呼び出すべき　
      ball.rebound()
      // ball.speedY *= -1
    }
    for (var i = 0; i < blocks.length; i++) {
      var b = blocks[i]
      if(b.collide(ball)){
        og("ball collide");
        b.kill()
        ball.rebound()
        //update score
        score = score + 100
      }
    }

  }

  var enableDrug = false

  //mouse event
  //マウスが押されたとき
  game.canvas.addEventListener('mousedown',function (event) {
    var x = event.offsetX
    var y = event.offsetY
    // log("haha",x,y)
    //ballを選択できているかを判断する
    if (ball.hasPoint(x,y)) {
      // log('handan')
      //drug drop
      enableDrug = true
    }
  })

  //マウスが移動されたとき
  game.canvas.addEventListener('mousemove',function (event) {
    var x = event.offsetX
    var y = event.offsetY
    if (enableDrug) {
      // log(x,y,"move")
      ball.x = x
      ball.y = y
    }
  })

  //マウスが押上されたとき
  game.canvas.addEventListener('mouseup',function (event) {
    var x = event.offsetX
    var y = event.offsetY
    // log(x,y,"up")
    //drug drop
    enableDrug = false
  })

  return s
}
