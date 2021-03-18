// ================= SETUP ======================
var c = createCanvas(1024,720);
var ctx = c.getContext('2d');
var canvasWidth = c.width / PIXEL_RATIO;
var canvasHeight = c.height / PIXEL_RATIO;

// ================= DECLARE VARIABLES HERE ======================
var objectsToUpdate = [];

const StatsX = 64;
const StatsY = 32;

var yesHover = false;
var noHover = false;

var gameState = "splash";

// ================= INIT FUNCTIONS ======================
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

	if(gameState == "splash"){
		gameState = "game";
	} else if(gameState == "game over"){
		stats.morale = 50; //rename to match what's in stat data
		stats.quality = 50;
		stats.time = 50;
		stats.budget = 50;
		gameState = "game";
	}

	if(activeCard.active){
		var mousePos = getMousePos(c, evt);

	    if (isMouseInside(mousePos,yesChoiceText.rect)) {
			buttonClickSFX.play();
			outputText.text = activeCard.yesResponse;
	        selectYes();
	    } else if(isMouseInside(mousePos,noChoiceText.rect)){
	    	buttonClickSFX.play();
	    	outputText.text = activeCard.noResponse;
	        selectNo();
	    }  
	} else{
		flipCard();
		outputText.text = activeCard.question;
	}
     
}, false);

//Check to see if the mouse is hovering over any buttons
c.addEventListener('mousemove', function(evt) {

	if(activeCard.active){
		var mousePos = getMousePos(c, evt);

	    if (isMouseInside(mousePos,yesChoiceText.rect)) {
	    	yesHover = true;
	    	noHover = false;
	    	c.style.cursor = "pointer";
	        //console.log("Hovering Over Option 1");
	    }else if(isMouseInside(mousePos,noChoiceText.rect)){
	    	yesHover = false;
	    	noHover = true;
	    	c.style.cursor = "pointer";
	        //console.log("Hovering Over Option 2");
	    } else{
	    	yesHover = false;
	    	noHover = false;
	    	c.style.cursor = "default";
	    	//console.log("NO HOVER!");
	    }
	}
});

flipCard(); // Flip the first story card

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
	if(gameState == "splash"){
		spr(assets["images/splash_screen.png"],0,0);
	} else if(gameState == "game"){
		spr(assets["images/pattern_background.png"],0,0);
		for (var i = 0; i < objectsToUpdate.length; i++) {
			objectsToUpdate[i].draw();
		}
	} 

	else if(gameState == "game over"){
		//spr(assets["images/splash_screen.png"],0,0);
		ctx.fillStyle = "white";
		print("YOU'RE GAME HAS BEEN CANCELLED...",256,160,512,"white",64);
	}
	
}	



