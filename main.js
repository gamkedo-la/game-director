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
		music.play();
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
	    	if(!yesHover){
	    		buttonHoverSFX.play();
	    	}
	    	yesHover = true;
	    	noHover = false;
	    	c.style.cursor = "pointer";
	        //console.log("Hovering Over Option 1");
	    }else if(isMouseInside(mousePos,noChoiceText.rect)){
	    	if(!noHover){
	    		buttonHoverSFX.play();
	    	}
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
	music.update();
}

var spashScreenFrameCount = 0;
var splashOffset = 800;
var splashSize = 520;
var splashSpeed = 0.001;

function drawSpashScreen() {
    spashScreenFrameCount++;
    var now = performance.now(); // ms
    spr(assets["images/splash_screen.png"],0,0);
    
    spr(assets["images/programmer.png"],25,
        splashOffset+Math.sin(now*splashSpeed)*splashSize);
    spr(assets["images/artist.png"],100,
    splashOffset+Math.sin(now*splashSpeed*0.99+4444)*splashSize);
    spr(assets["images/designer.png"],170,
    splashOffset+Math.sin(now*splashSpeed*1.01+1234)*splashSize);
    spr(assets["images/producer.png"],220,
    splashOffset+Math.sin(now*splashSpeed*1.02+7582)*splashSize);
    spr(assets["images/sound_engineer.png"],270,
    splashOffset+Math.sin(now*splashSpeed*0.993+1759)*splashSize);
    spr(assets["images/qa_lead.png"],320,
    splashOffset+Math.sin(now*splashSpeed*1.002+7492)*splashSize);
    spr(assets["images/master_coder.png"],370,
    splashOffset+Math.sin(now*splashSpeed*0.97+9232)*splashSize);
    spr(assets["images/level_designer.png"],420,
    splashOffset+Math.sin(now*splashSpeed*1.04+2345)*splashSize);
    spr(assets["images/human_resources.png"],400,
    splashOffset+Math.sin(now*splashSpeed*0.999+1024)*splashSize);
    spr(assets["images/intern.png"],450,
    splashOffset+Math.sin(now*splashSpeed*1.03+8500)*splashSize);
    spr(assets["images/veteran.png"],500,
    splashOffset+Math.sin(now*splashSpeed*1.01+5973)*splashSize);
    spr(assets["images/interviewer.png"],550,
    splashOffset+Math.sin(now*splashSpeed*0.97+2053)*splashSize);
    spr(assets["images/marketing.png"],600,
    splashOffset+Math.sin(now*splashSpeed*0.995+4654)*splashSize);
    spr(assets["images/ceo.png"],680,
    splashOffset+Math.sin(now*splashSpeed*0.933+6789)*splashSize);

}

function draw(){
	cls(); // clear screen
	if(gameState == "splash"){
		drawSpashScreen();
	} else if(gameState == "game"){
		spr(assets["images/pattern_background.png"],0,0);
		for (var i = 0; i < objectsToUpdate.length; i++) {
			objectsToUpdate[i].draw();
		}
	} 

	else if(gameState == "game over"){
		spr(assets["images/game_over_screen.png"],0,0);
		//ctx.fillStyle = "white";
		//print("YOU'RE GAME HAS BEEN CANCELLED...",256,160,512,"white",64);
    }

    else if (gameState == "game win") {
        spr(assets["images/you_win_screen.png"],0,0);
        //ctx.fillStyle = "white";
        //ctx.fillRect(canvasWidth / 2, canvasHeight / 265, 160, 512);
        //print("YOU'RE GAME HAS SUCCESSFULLY SHIPPED...", 256, 160, 512, "white", 64);
    }
	
}	



