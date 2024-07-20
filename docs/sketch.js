/*
onload = function() {
  //marktool();
};*/


document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('document');
  const ctx = canvas.getContext('2d');

  const zoom = document.getElementById('zoom');
  
  // 初期設定
  let scale = 0.9;
  const lines = [
    ['止',
    '私が両手をひろげても、お空はちっとも飛べないが、飛べる小鳥は私のように、地面を速くは走れない。',
    '私がからだをゆすっても、きれいな音は出ないけど、あの鳴る鈴は私のように、たくさんな唄は知らないよ。',
    '鈴と、小鳥と、それから私、みんなちがって、みんないい。',
    'あいうえお　かきくけこ　さしすせそ　たちつてと　なにぬねの　はひふへほ　まみむめも　やゆよ　らりるれろ',
    'あいうえお　かきくけこ　さしすせそ　たちつてと　なにぬねの　はひふへほ　まみむめも　やゆよ　らりるれろ',
    'あいうえお　かきくけこ　さしすせそ　たちつてと　なにぬねの　はひふへほ　まみむめも　やゆよ　らりるれろ',
    'あいうえお　かきくけこ　さしすせそ　たちつてと　なにぬねの　はひふへほ　まみむめも　やゆよ　らりるれろ',
    'あいうえお　かきくけこ　さしすせそ　たちつてと　なにぬねの　はひふへほ　まみむめも　やゆよ　らりるれろ',
    'あいうえお　かきくけこ　さしすせそ　たちつてと　なにぬねの　はひふへほ　まみむめも　やゆよ　らりるれろ',
    'あいうえお　かきくけこ　さしすせそ　たちつてと　なにぬねの　はひふへほ　まみむめも　やゆよ　らりるれろ',
    'あいうえお　かきくけこ　さしすせそ　たちつてと　なにぬねの　はひふへほ　まみむめも　やゆよ　らりるれろ',
    'あいうえお　かきくけこ　さしすせそ　たちつてと　なにぬねの　はひふへほ　まみむめも　やゆよ　らりるれろ',
    'あいうえお　かきくけこ　さしすせそ　たちつてと　なにぬねの　はひふへほ　まみむめも　やゆよ　らりるれろ',
    'あいうえお　かきくけこ　さしすせそ　たちつてと　なにぬねの　はひふへほ　まみむめも　やゆよ　らりるれろ',
    'あいうえお　かきくけこ　さしすせそ　たちつてと　なにぬねの　はひふへほ　まみむめも　やゆよ　らりるれろ'
    ],
    [
    '東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東',
    '東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東',   
    '東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東',   
    '東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東',    
    '東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東',    
    '東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東',    
    '東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東',    
    '東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東',
    '東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東',    
    '東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東',    
    '東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東',    
    '東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東',    
    '東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　束　東　東　東　東　東　東　東',    
    '東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東',    
    '東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東',    
    '東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東',        
    ]
  ];

  let Mpos = {
    x:0,
    y:0
  };

  let basePos = {
    x:-canvas.width / 2,
    y:-canvas.height / 2
  }

  let textPos = {
    x:500-canvas.width / 2,
    y:500-canvas.height / 2
  }

  let Fpos = null;
  let move = false;

  ctx.translate(canvas.width / 2, canvas.height / 2);

  //拡大移動
  const markCanvas = document.getElementById('mark'); 
  var ctxmark = markCanvas.getContext('2d');


  // 記録用の配列
  let memorize = [];

  function recordState() {
    memorize.push({
      scale: scale,
      x: basePos.x + Mpos.x, 
      y: basePos.y + Mpos.y 
    });
  }

  //記録終了
  let stop = false;
  let i = 0;

  function mapRange(value, inMin, inMax, outMin, outMax) {
    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  }

  //マーク
  function drawRectangle(x, y, scale) {
    let width = 900;
    let height = 550;

    ctxmark.beginPath();
    ctxmark.rect(x - width*scale / 2, y - height*scale / 2, width*scale, height*scale);
    ctxmark.strokeStyle = 'rgba(255, 150, 0, 0.6)';
    ctxmark.lineWidth = 1;
    ctxmark.stroke();
    ctxmark.closePath();
  }

  function mapRange(value, inMin, inMax, outMin, outMax) {
    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  }

  let drawInterval = null;

  function startDrawing() {
    let index = 0;
    drawInterval = setInterval(function() {
      if (index < memorize.length) {
        let scaleMark = 0.9 * 0.9 / memorize[index].scale;
        let newMemoX = mapRange(memorize[index].x, 0, -9000, 45, 855);
        let newMemoY = mapRange(memorize[index].y, 0, -5500, 27.5, 522.5);
        drawRectangle(newMemoX, newMemoY, scaleMark);
        index++;
      } else {
        clearInterval(drawInterval); // 描画が終了したらタイマーをクリア
      }
    }, 10000/memorize.length); // 1秒ごとに描画
  }

  document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
      // スペースキーが押された時の処理
      stop = true;
      //i = 0;

      basePos = {
        x:-canvas.width / 2,
        y:-canvas.height / 2
      }
    
      textPos = {
        x:500-canvas.width / 2,
        y:500-canvas.height / 2
      }
    
      scale = 0.9;

      zoom.innerHTML = `拡大率　×1.00`;

      //グレーにする
      drawText('rgba(0, 0, 0, 0.25)');
/*
      for(let i = 0; i < memorize.length; i++){
        let scaleMark = 0.9*0.9/memorize[i].scale;
        let newMemoX = mapRange(memorize[i].x, 0, -9000, 45, 855);
        let newMemoY = mapRange(memorize[i].y, 0, -5500, 27.5, 522.5);
        drawRectangle( newMemoX ,  newMemoY ,scaleMark);
      }*/

      startDrawing(); 
    }
  });

  // Canvasに文章を描画する関数
  function drawText(color = 'rgba(0, 0, 0, 1)') {
    ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    ctx.save();  // コンテキストの状態を保存
    ctx.scale(scale, scale);

    ctx.fillStyle = 'white';
    ctx.fillRect(basePos.x+Mpos.x, basePos.y+Mpos.y, canvas.width, canvas.height);  // 四角形の中を白で塗りつぶす

    ctx.font = `150px Roboto`;  // スケールはすでに適用されているので、fSizeのみにする
    ctx.fillStyle = color; //'black'
    lines[1].forEach((line, index) => {
      ctx.fillText(line, textPos.x+Mpos.x, textPos.y + 150 * index * 2+Mpos.y);
      //ctx.fillText(line, 500 / scale, (500 + fSize * index * 2) / scale);
    });
    ctx.restore();  // コンテキストの状態を元に戻す
  }

  setInterval(function() {
    if (!stop) {
      recordState();
    }
  }, 100);



  //拡大

  markCanvas.addEventListener('wheel', function(event) {
    if(stop == false){
      event.preventDefault();
      scale += event.deltaY * -0.001;
      scale = Math.min(Math.max(0.5, scale), 5); // 最小値0.5、最大値5に制限
    
      zoom.innerHTML = `記録中…　　拡大率 ×${scale.toFixed(2)}`;
    
      drawText();  // スケールの更新後に描画を更新
      
    }
});

  //移動
  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    }; 
  }

  markCanvas.addEventListener('mousedown', function(event) {
    if(stop == false){
    Fpos = getMousePos(markCanvas, event);
    move = true;
    drawText();
    }
  }, {passive: false});

  markCanvas.addEventListener('mousemove', function(event) {
    if(stop == false){
    if(move == true){
      let Pos = getMousePos(markCanvas, event);
      Mpos = {
        x:(Pos.x - Fpos.x)*5,
        y:(Pos.y - Fpos.y)*5
      }
      drawText();
    }
    }
  }, {passive: false});

  markCanvas.addEventListener('mouseup', function(event) {
    if(stop == false){
    let Upos = getMousePos(markCanvas, event);
    Mpos = {
      x:(Upos.x - Fpos.x)*5,
      y:(Upos.y - Fpos.y)*5
    } 
    move = false;

    // 基準点を更新
    basePos.x += Mpos.x;
    basePos.y += Mpos.y;
    textPos.x += Mpos.x;
    textPos.y += Mpos.y;

    // Mposをリセット
    Mpos = { x: 0, y: 0 };

    drawText();
    }
  }, {passive: false});
  



  // 初期設定で描画
  drawText();



  console.log('History:', memorize);


});

