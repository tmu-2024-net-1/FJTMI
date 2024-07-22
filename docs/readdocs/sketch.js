/*
onload = function() {
  //marktool();
};*/


document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('document');
  const ctx = canvas.getContext('2d');

  const zoom = document.getElementById('zoom');

  const params = new URLSearchParams(window.location.search);
  const type = params.get('type');
  
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
    '東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東',
    '東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東',   
    '東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東',   
    '東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東',    
    '東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東',    
    '東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東',    
    '東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東',    
    '東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東',
    '東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東',    
    '東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東',    
    '東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東',    
    '東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東',    
    '東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　束　東　東　東　東　東　東　東　東',    
    '東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東',    
    '東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東',    
    '東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東　東'        
    ],
    [
      '　吾輩は猫である。名前はまだ無い。',
      '　どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。',
      '吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。',
      'この書生というのは時々我々を捕えて煮て食うという話である。',
      'しかしその当時は何という考もなかったから別段恐しいとも思わなかった。',
      'ただ彼の掌に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。',
      '掌の上で少し落ちついて書生の顔を見たのがいわゆる人間というものの見始であろう。',
      'この時妙なものだと思った感じが今でも残っている。第一毛をもって装飾されべきはずの顔がつるつるしてまるで薬缶だ。',
      'その後猫にもだいぶ逢ったがこんな片輪には一度も出会わした事がない。',
      'のみならず顔の真中があまりに突起している。そうしてその穴の中から時々ぷうぷうと煙を吹く。',
      'どうも咽せぽくて実に弱った。これが人間の飲む煙草というものである事はようやくこの頃知った。',
      '　この書生の掌の裏でしばらくはよい心持に坐っておったが、しばらくすると非常な速力で運転し始めた。',
      '書生が動くのか自分だけが動くのか分らないが無暗に眼が廻る。胸が悪くなる。',
      '到底助からないと思っていると、どさりと音がして眼から火が出た。',
      'それまでは記憶しているがあとは何の事やらいくら考え出そうとしても分らない。',
      'ーー夏目漱石「吾輩は猫である」冒頭　青空文庫より抜粋'
    ],
    [
      '　朝顔の蔓　　　　　　　　　　　　　たもと　　　　　　　　　　　　　　　　　　向日葵(ひまわり)',
      '　垣がひくうて　　　　　　　　　　　袂のゆかたは　　　　　　　　　　　　　　　おてんとさまの車の輪、',
      '　朝顔は、　　　　　　　　　　　　　うれしいな　　　　　　　　　　　　　　　　黄金のきれいな車の輪。',
      '　どこへすがろと　　　　　　　　　　よそ行き見たいな気がするよ。　　　　　　　青い空をゆくときは、',
      '　さがしてる。　　　　　　　　　　　夕顔の　　　　　　　　　　　　　　　　　　黄金のひびきをたてました。',
      '　西もひがしも　　　　　　　　　　　花の明るい背戸へ出て　　　　　　　　　　　白い雲をゆくときに、',
      '　みんなみて、　　　　　　　　　　　そっと踊りの真似をする。　　　　　　　　　見たは小さな黒い星。',
      '　さがしあぐねて　　　　　　　　　　とん、と、叩いて、手を入れて　　　　　　　天でも地でも誰知らぬ、',
      '　かんがえる。　　　　　　　　　　　誰か来たか、と、ちょいと見る。　　　　　　黒い星を轢くまいと、',
      '　それでも　　　　　　　　　　　　　藍の匂の新しい　　　　　　　　　　　　　　急に曲った車の輪。',
      '　お日さまこいしゅうて、　　　　　　ゆかたの袂は　　　　　　　　　　　　　　　おてんとさまはほり出され、',
      '　きょうも一寸　　　　　　　　　　　うれしいな。　　　　　　　　　　　　　　　真赤になってお腹立ち、',
      '　また伸びる。　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　黄金のきれいな車の輪、',
      '　伸びろ、朝顔、　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　はるか下界へすてられた、',
      '　まっすぐに、　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　むかし、むかしにすてられた。',
      '　納屋のひさしが　　　　　ーー金子みすゞ　　　　　　　　　　　　　　　　　　　いまも、黄金の車の輪、',
      '　もう近い。　　　　　　　　　サイト春夏秋冬・四季の詩より夏の詩三選　　　　　お日を慕うてまわります。'
    ]
  ];
  let typopos = [500,550,500,400]

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
    y:typopos[type]-canvas.height / 2
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

    let Inter;
    if(memorize.length>=25){
      Inter = 10000/memorize.length;
    }else{
      Inter = 5000/memorize.length;
    }
    
    drawInterval = setInterval(function() {
      if (index < memorize.length) {
        let scaleMark = 0.9 * 0.9 / memorize[index].scale;
        let newMemoX = mapRange(memorize[index].x, 0, -9000, 45, 855);
        let newMemoY = mapRange(memorize[index].y, 0, -5500, 27.5, 522.5);
        drawRectangle(newMemoX, newMemoY, scaleMark);
        index++;
        zoom.innerHTML = `再現中…`;
      } else {
        clearInterval(drawInterval); // 描画が終了したらタイマーをクリア
        zoom.innerHTML = `完成！`;
      }
    }, Inter); // 1秒ごとに描画
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
//150
    ctx.font = `500px "Times New Roman", serif`;  
    ctx.fillStyle = color; //'black'
    lines[type].forEach((line, index) => {
      if(type == 3 && index == 0){
        ctx.font = `bold 150px "Times New Roman", serif`;
      }else{ctx.font = `150px "Times New Roman", serif`;}
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
    
      zoom.innerHTML = `記録中…　　拡大率 ×${scale.toFixed(2)}　　　　　　　　　　　　　　　　　　　　　　　　　　　　　終了・可視化開始：スペースキー`;
    
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

