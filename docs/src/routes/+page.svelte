<script>
    import { onMount } from "svelte";
  
    let canvas;
    let ctx;
    let zoomFactor = 1.0;
    let offsetX = 0;
    let offsetY = 0;
  
    function setupCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx = canvas.getContext('2d');
      drawCircle();
    }
  
    function drawCircle() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2 + offsetX, canvas.height / 2 + offsetY);
      ctx.scale(zoomFactor, zoomFactor);
      ctx.beginPath();
      ctx.arc(0, 0, 25, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
      ctx.fill();
      ctx.restore();
    }
  
    function handleWheel(event) {
      zoomFactor += event.deltaY * -0.001;
      zoomFactor = Math.min(Math.max(0.5, zoomFactor), 2);
      drawCircle();
    }
  
    function handleMouseMove(event) {
      if (event.buttons === 1) {
        offsetX += event.movementX;
        offsetY += event.movementY;
        drawCircle();
      }
    }
  
    onMount(() => {
      setupCanvas();
      window.addEventListener('resize', setupCanvas);
      return () => window.removeEventListener('resize', setupCanvas);
    });
  </script>
  
  <style>
    body {
      margin: 0;
      overflow: hidden;
    }
    canvas {
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none;
    }
  </style>
  
  <div>
    <p>ここにコンテンツが入ります。</p>
    <img src="example.jpg" alt="example" />
    <div>その他の要素</div>
  </div>
  <canvas
    bind:this={canvas}
    on:wheel={handleWheel}
    on:mousemove={handleMouseMove}
  ></canvas>
  