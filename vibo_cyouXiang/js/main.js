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
    // log('blocks',blocks)
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

  // log("main start1")

  //define var
  var images = {
    block:'imgs/block.png',
    ball:'imgs/ball.png',
    paddle:'imgs/paddle.png',
  }
  // var scene = Scene(game)
  var game = GuaGame(30,images,function (g) {
    // log("call start7")
    var s = Scene(g)
    g.runWithScene(s)
  })


  //call func
  //set debug mode true
  enableDebugMode(true,game)
  // log(ball)
}


//start main function
__main()
