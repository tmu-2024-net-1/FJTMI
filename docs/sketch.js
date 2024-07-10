onload = function() {
  marktool();
};


document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('document');
  const ctx = canvas.getContext('2d');
  
  // 初期設定
  const fSize = 150;
  let scale = 1;
  const lines = [
    '私が両手をひろげても、お空はちっとも飛べないが、飛べる小鳥は私のように、地面を速くは走れない。',
    '私がからだをゆすっても、きれいな音は出ないけど、あの鳴る鈴は私のように、たくさんな唄は知らないよ。',
    '鈴と、小鳥と、それから私、みんなちがって、みんないい。',
    `現在のスケール: ${scale.toFixed(2)}`
  ];

  // Canvasに文章を描画する関数
  function drawText() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.font = `${fSize * scale}px Roboto`;
    ctx.fillStyle = 'black';
    lines.forEach((line, index) => {
      ctx.fillText(line, 500, 500 + fSize * scale * index * 2);
    });
    ctx.restore();

  }

  // 初期設定で描画
  drawText();

  // マウスホイールイベントで拡大・縮小
  canvas.addEventListener('wheel', function(event) {
    event.preventDefault();
    scale += event.deltaY * -0.01;
    scale = Math.min(Math.max(0.5, scale), 2); // 最小値0.5、最大値2に制限
    lines[3] = `現在のスケール: ${scale.toFixed(2)}`; 
    ctx.fillText(`スクロール中`, 500, 500 + fSize * scale * 4 * 2);
    drawText();
  });


  const markCanvas = document.getElementById('mark');

  markCanvas.addEventListener('wheel', function(event) {
    event.preventDefault();
    scale += event.deltaY * -0.001;
    scale = Math.min(Math.max(0.5, scale), 2); // 最小値0.5、最大値2に制限
    lines[3] = `現在のスケール: ${scale.toFixed(2)}`; 
    drawText();
  });

  

});


//contextの拡大
//マウス位置取得、再現

function marktool() {
  var markcanvas = document.getElementById('mark');
  if (!markcanvas || !markcanvas.getContext) {
    return false;
  }
  var ctxmark = markcanvas.getContext('2d');
  var rectSize = 50;
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

  function getTouchPos(canvas, touch) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    };
  }

  function updateRectanglePosition(evt) {
    let pos;
    if (evt.type.includes('touch')) {
      pos = getTouchPos(markcanvas, evt.touches[0]);
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