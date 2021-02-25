// ================= SETUP ======================
var c = createCanvas(1024,720);
var ctx = c.getContext('2d');
var canvasWidth = c.width / PIXEL_RATIO;
var canvasHeight = c.height / PIXEL_RATIO;

const StatsX = 64;
const StatsY = 32;
window.onload = function(){
	window.addEventListener('keydown',keyDown,true);
}

function keyDown(evt){
	if(evt.keyCode == 49){
		if(activeCard.active){
			selectYes();
			outputText.text = activeCard.yesResponse;
		} else{
			flipCard();
			outputText.text = activeCard.question;
		}
	}

	if(evt.keyCode == 50){
		if(activeCard.active){
			selectNo();
			outputText.text = activeCard.noResponse;
		} else{
			flipCard();
			outputText.text = activeCard.question;
		}
	}
}

function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function isMouseInside(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
}

//Binding the click event on the canvas
c.addEventListener('click', function(evt) {

	if(activeCard.active){
		var mousePos = getMousePos(c, evt);

	    if (isMouseInside(mousePos,yesChoiceText.rect)) {
	        selectYes();
			outputText.text = activeCard.yesResponse;
	    }else if(isMouseInside(mousePos,noChoiceText.rect)){
	        selectNo();
			outputText.text = activeCard.noResponse;
	    }  
	} else{
		flipCard();
		outputText.text = activeCard.question;
	}
     
}, false);




flipCard();

// ================= DECLARE VARIABLES HERE ======================
var objectsToUpdate = [];


// ================= RUN THE GAMELOOP ======================
setInterval(gameloop,16);

function gameloop(){
	update();
	draw();
}

function update(){
	for (var i = 0; i < objectsToUpdate.length; i++) {
		objectsToUpdate[i].update();
	}
}

function draw(){
	cls(); // clear screen
	spr(assets["images/pattern_background.png"],0,0);
	for (var i = 0; i < objectsToUpdate.length; i++) {
		objectsToUpdate[i].draw();
	}
}	



