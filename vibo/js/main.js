//js do not need import


//dirty code
//change paused and blocks to globlal var
window.paused = false

var loadLevel = function (n,game) {
  n = n -1
  //one element in array
  var level = levels[n]
  //empty array
  blocks = []
  //create blocks by level
  for (var i = 0; i < level.length; i++) {
    //p is position
    var p = level[i]
    //call Block func and pass p to block
    var b = Block(p,game)
    //add an element
   blocks.push(b)
   log('blocks',blocks)
  }
  return blocks
}


//デバッグ用
var enableDebugMode = function (flg,game) {
  if(!flg){
    return
  }
// so what is the difference key up vs key down??
  window.addEventListener('keyup',function () {
    //use short var name in the func
    var k = event.key
    //一時停止機能
      if(k === 'p'){
        //change paused
        window.paused = !window.paused
      }else if ('1234567'.includes(k)) {
            blocks = loadLevel(Number(k),game)
      }
    //   }else if (event.key === '1') {
    //     blocks = loadLevel(1)
    // }else if (event.key === '2') {
    //     blocks = loadLevel(2)
    //   }
  })

  //speed control
  //too much in event
  //イベントの中にいろんなものがありすぎて、わかりにくい
  document.querySelector('#id-input-speed').addEventListener('input',function (event) {
    //event.targetは、イベントバブルのイベントを開始したDOM要素を返すプロパティ。
    // イベントバブルとは、子要素のイベントが発生すると、
    //その親要素や先祖要素の同じタイプのイベントが発生すること。
    var input = event.target
    window.fps = Number(input.value)
  })
}

//入り口を一つにする
var __main = function(){

  //define var
  var images = {
        block:'imgs/block.png',
        ball:'imgs/ball.png',
        paddle:'imgs/paddle.png',
  }
    var game = GuaGame(30,images,function () {
    blocks = loadLevel(1,game)

    //gameの初期化は非同期なので、まだイメージができていないんだ
    //imagesが空のobjectになってしまった
    var paddle = Paddle(game)
    log(paddle)
    var ball = Ball(game)
    var score = 0

    // window.blocks = loadLevel(1,game)

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
//drawとupdateは本来ならguaGameの中にいるはず
//今はpaddleとかballとか一緒に使っているんで、とても分かりにくい
    //draw
    game.draw = function () {
      // console.log("draw");
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
      for (var i = 0; i < blocks.length; i++) {
        var b = blocks[i]
        if(b.collide(ball)){
          console.log("ball collide");
          b.kill()
          ball.rebound()
          //update score
          score = score + 100
        }
      }
    }
})

//call func
//set debug mode true
enableDebugMode(true,game)

}


//start main function
__main()
