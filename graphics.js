var PIXEL_RATIO = (function () {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;

    return dpr / bsr;
})();

var canvas; // global so we can measure the width and height in gui routines
createCanvas = function(w, h, ratio) {
    if (!ratio) { ratio = PIXEL_RATIO; }
    canvas = document.createElement("canvas");
    canvas.width = w * ratio;
    canvas.height = h * ratio;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    canvas.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
    canvas.style.background ="black";
    document.body.appendChild(canvas);
    return canvas;
}

function createDisplayObject(x,y,width,height,sprite){
  var o = {};
  o.x = x || 0;
  o.y = y || 0;
  o.width = width || 32;
  o.height = width || 32;
  o.spr = sprite || undefined;

  o.update = function(){};
  o.draw = function(){};

  objectsToUpdate.push(o);
  return o;
}

function cls(){ // Clears the canvas
  ctx.clearRect(0,0,c.width,c.height);
}

function clip(x,y,width,height){
  ctx.beginPath()
  ctx.rect(x, y, width, height);
  ctx.clip();
}

function line(x0,y0,x1,y1,color){ // Creates a line
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.stroke();
}

function printWithShadow(str, x, y, maxWidth, color, fontSize, fontFace) {
    print(str, x+1, y+1, maxWidth, "black", fontSize, fontFace);
    print(str, x, y, maxWidth, color, fontSize, fontFace);
}


function print(str, x, y, maxWidth, color, fontSize, fontFace){ // Print text to the canvas screen
  var firstY = y;
  var words = str.split(' ');
  var line = '';
  var lineHeight = fontSize * 1.1;// made slightly smaller to fit four lines in the prompt was: 1.286; // aprox for 10-18px sizes

  ctx.fillStyle = color;
  ctx.font = fontSize + "px " + fontFace || "12px sans-serif";
  ctx.textBaseline = 'top';

  for (var i = 0; i < words.length; i++) {
    var testLine = line + words[i] + ' ';
    var metrics = ctx.measureText(testLine);
    var testWidth = metrics.width;

    if(testWidth > maxWidth){
      ctx.fillText(line,x,y);
      if(i < words.length){
        line = words[i] + ' ';
        y += lineHeight;
      }
    } else{
      line = testLine;
    }
  }
  ctx.fillText(line,x,y);
}

function rectFill(x,y,width,height,color){ // Draw a rectangle
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.fill();
}

function rect(x,y,width,height,lineWidth,color){
  ctx.strokeStyle = "solid";
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.stroke();
}

function circ(x,y,r,color){
  ctx.strokeStyle = "solid";
  ctx.lineWidth = 1;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.arc(
    r + (x),
    r + (y),
    r,
    0, 2 * Math.PI, false
  );

  ctx.stroke();
}

function circFill(x,y,r,color){
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(
    x-r/2,
    y-r/2,
    // non centered version:
    //r + (x),
    //r + (y),
    r,
    0, 2 * Math.PI, false
  );

  ctx.fill();
}

function spr(sprite,x,y){
  ctx.drawImage(sprite, x, y, sprite.width, sprite.height);
}