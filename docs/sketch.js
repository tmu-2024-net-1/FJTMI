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
    '止',
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

  // 記録用の配列
  let memorize = [];

  function recordState() {
    memorize.push({
      scale: scale,
      x: basePos.x + Mpos.x, 
      y: basePos.y + Mpos.y 
    });
  }

  let stop = false;

  document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
      // スペースキーが押された時の処理
      stop = true;

      basePos = {
        x:-canvas.width / 2,
        y:-canvas.height / 2
      }
    
      textPos = {
        x:500-canvas.width / 2,
        y:500-canvas.height / 2
      }
    
      scale = 0.9;
      drawText();
    }
  });

  // Canvasに文章を描画する関数
  function drawText() {
    ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    ctx.save();  // コンテキストの状態を保存
    ctx.scale(scale, scale);

    ctx.fillStyle = 'white';
    ctx.fillRect(basePos.x+Mpos.x, basePos.y+Mpos.y, canvas.width, canvas.height);  // 四角形の中を白で塗りつぶす

    ctx.font = `150px Roboto`;  // スケールはすでに適用されているので、fSizeのみにする
    ctx.fillStyle = 'black';
    lines.forEach((line, index) => {
      ctx.fillText(line, textPos.x+Mpos.x, textPos.y + 150 * index * 2+Mpos.y);
      //ctx.fillText(line, 500 / scale, (500 + fSize * index * 2) / scale);
    });
    ctx.restore();  // コンテキストの状態を元に戻す
  }

  setInterval(function() {
    if (!stop) {
      recordState();
    }
  }, 1000);

  //拡大移動
  const markCanvas = document.getElementById('mark'); 

  //拡大
  markCanvas.addEventListener('wheel', function(event) {
    event.preventDefault();
    scale += event.deltaY * -0.001;
    scale = Math.min(Math.max(0.5, scale), 5); // 最小値0.5、最大値5に制限
  
    zoom.innerHTML = `拡大率　×${scale.toFixed(2)}`;
  
    drawText();  // スケールの更新後に描画を更新
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
    Fpos = getMousePos(markCanvas, event);
    lines[4] = `タッチ開始 x:${Fpos.x} y:${Fpos.y}`; 
    move = true;
    drawText();
  }, {passive: false});

  markCanvas.addEventListener('mousemove', function(event) {
    if(move == true){
      let Pos = getMousePos(markCanvas, event);
      Mpos = {
        x:(Pos.x - Fpos.x)*5,
        y:(Pos.y - Fpos.y)*5
      }
      lines[4] = `移動中 x:${Mpos.x} y:${Mpos.y}`; 

      drawText();

    }
  }, {passive: false});

  markCanvas.addEventListener('mouseup', function(event) {
    let Upos = getMousePos(markCanvas, event);
    Mpos = {
      x:(Upos.x - Fpos.x)*5,
      y:(Upos.y - Fpos.y)*5
    }
    lines[4] = `移動後 x:${Mpos.x} y:${Mpos.y}`; 
    move = false;

    // 基準点を更新
    basePos.x += Mpos.x;
    basePos.y += Mpos.y;
    textPos.x += Mpos.x;
    textPos.y += Mpos.y;

    // Mposをリセット
    Mpos = { x: 0, y: 0 };

    drawText();

  }, {passive: false});



  // 初期設定で描画
  drawText();



  console.log('History:', memorize);


});


//contextの拡大
//マウス位置取得、再現

function marktool() {
  var markcanvas = document.getElementById('mark');
  if (!markcanvas || !markcanvas.getContext) {
    return false;
  }
  var ctxmark = markcanvas.getContext('2d');
  var rectSize =50;
  var rectangles = [];

  function drawRectangle(x, y) {
    ctxmark.beginPath();
    ctxmark.rect(x - rectSize / 2, y - rectSize / 2, rectSize, rectSize);
    ctxmark.strokeStyle = 'black';
    ctxmark.lineWidth = 2;
    ctxmark.stroke();
    ctxmark.closePath();
  }

  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  function updateRectanglePosition(evt) {
    let pos;
    if (evt.type.includes('touch')) {
      //pos = getTouchPos(markcanvas, evt.touches[0]);
    } else {
      pos = getMousePos(markcanvas, evt);
    }
    rectangles.push(pos);
    ctxmark.clearRect(0, 0, markcanvas.width, markcanvas.height); // キャンバスをクリア
    rectangles.forEach(rect => drawRectangle(rect.x, rect.y));
  }

  // イベントリスナーを追加
  markcanvas.addEventListener('mousemove', updateRectanglePosition, { passive: false });
  markcanvas.addEventListener('touchmove', updateRectanglePosition, { passive: false });

  // 初期状態としてキャンバス中央に四角形を描画
  var rectcan = markcanvas.getBoundingClientRect();
  var initialPos = { x: rectcan.width / 2, y: rectcan.height / 2 };
  rectangles.push(initialPos);
  drawRectangle(initialPos.x, initialPos.y);
}