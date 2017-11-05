var loadLevel = function (n) {
  n = n -1
  var level = levels[n]
  var blocks = []
  for (var i = 0; i < level.length; i++) {
    var p = level[i]
    var b = Block(p)
    blocks.push(b)
  }
  return blocks
}

window.paused = false
window.blocks = loadLevel(1)
//デバッグ用
var enableDebugMode = function (flg) {
  if(!flg){
    return
  }
  window.addEventListener('keyup',function () {
    var k = event.key
    //一時停止機能
      if(k === 'p'){
        window.paused = !window.paused
      }else if ('1234567'.includes(k)) {
            window.blocks = loadLevel(Number(k))
      }
    //   }else if (event.key === '1') {
    //     blocks = loadLevel(1)
    // }else if (event.key === '2') {
    //     blocks = loadLevel(2)
    //   }
  })

  //speed control
  document.querySelector('#id-input-speed').addEventListener('input',function (event) {
    var input = event.target
    window.fps = Number(input.value)
  })
}

    //入り口を一つにする
var __main = function(){
    var game = GuaGame(30)
    var paddle = Paddle()
    var ball = Ball()
    var score = 0
    // var blocks = loadLevel(1)


    enableDebugMode(true)

    //paddleと関係ないことも関数に入れる
    //canvasを描画する
    //そうすると、画面がロードされたときに、自動的にcanvasの中に出てくる
    paddle.image.onload = function() {
      game.context.drawImage(paddle.image, paddle.x, paddle.y)
    }

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

    //draw
    game.draw = function () {
      // console.log("draw");
      game.drawImage(paddle)
      game.drawImage(ball)

      for (var i = 0; i < window.blocks.length; i++) {
        var b = window.blocks[i]
        if(b.alive){
          game.drawImage(b)
        }
      }

      //draw lables
      game.context.fillText("score is "+score, 10, 290)
    }
    game.update = function () {
      if(window.paused){
        // console.log("stop");
        return
      }
      // console.log('update');
      ball.move()
      //collide
      if(paddle.collide(ball)){
        //ここはball.リバウンド()関数を呼び出すべき　
          ball.rebound()
        // ball.speedY *= -1
      }

      for (var i = 0; i < window.blocks.length; i++) {
        var b = window.blocks[i]
        if(b.collide(ball)){
          console.log("ball collide");
          b.kill()
          ball.rebound()
          //update score
          score = score + 100
        }
      }

    }
}

  __main()
