// ================= SETUP ======================
var c = createCanvas(1024,720);
var ctx = c.getContext('2d');
var canvasWidth = c.width / PIXEL_RATIO;
var canvasHeight = c.height / PIXEL_RATIO;

// ================= DECLARE VARIABLES HERE ======================
var objectsToUpdate = [];

const StatsX = 56;
const StatsY = 30;
const StatsSpacingY = 32; 

var yesHover = false;
var noHover = false;
var confirmHover = false;

var gameState = "splash";

var creditsButtonX = 295;
var creditsButtonY = 16;
var creditsButtonWidth = 140;
var creditsButtonHeight = 20;
var creditsRect = {x: creditsButtonX, y: creditsButtonY, width: creditsButtonWidth, height: creditsButtonHeight};

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

	if(gameState == "credits") {
		gameState = "splash";
		return;
	} else if(gameState == "splash"){
		var mousePos = getMousePos(c, evt);
		if(isMouseInside(mousePos,creditsRect)) {
			gameState = "credits";
		} else {
			screenWipe.activated = true;
			//gameState = "game";
			music.play();
		}
	} else if(gameState == "game over"){
		//resetStats();
		location.reload();
		screenWipe.activated = true;
		//gameState = "game";
	}else if(gameState == "game win"){
		//resetStats();
		location.reload();
		screenWipe.activated = true;
		//gameState = "game";
	}

	if(activeCard.active && !(gameState == "splash")){
		var mousePos = getMousePos(c, evt);

	    if (isMouseInside(mousePos,yesChoiceText.rect)) {
			buttonClickSFX.play();
			outputText.text = activeCard.yesResponse;
			responseIsShowing = true;
	        selectYes();
			voxAnswer[activeCard.author].play();
	    } else if(isMouseInside(mousePos,noChoiceText.rect)){
	    	buttonClickSFX.play();
	    	outputText.text = activeCard.noResponse;
	    	responseIsShowing = true;
	        selectNo();
			voxAnswer[activeCard.author].play();
	    }  
	} else{
		var mousePos = getMousePos(c, evt);

		if(isMouseInside(mousePos, confirmButton.rect)){
      buttonClickSFX.play();
      currentScore = Math.floor(overAllPerformence);
			if(outputText.text == activeCard.yesResponse && responseIsShowing){
				activeCard.active = false;
				activeCard.applyYesOutcome(activeCard.id);
			} else if(outputText.text == activeCard.noResponse && responseIsShowing){
				activeCard.active = false;
				activeCard.applyNoOutcome(activeCard.id);
			}

			if(activeCard.active == false){
				updateCardConditions();
				flipCard();
				outputText.text = activeCard.question;
				responseIsShowing = false;
				voxQuestion[activeCard.author].play();
			}
		}
	}
     
}, false);

//Check to see if the mouse is hovering over any buttons
c.addEventListener('mousemove', function(evt) {

	if(gameState == "credits") {
		// suppress mouseover sounds
	} else if(activeCard.active && !(gameState == "splash")){
		var mousePos = getMousePos(c, evt);

	    if (isMouseInside(mousePos,yesChoiceText.rect)) {
	    	if(!yesHover){
	    		buttonHoverSFX.play();
	    	}
	    	yesHover = true;
	    	noHover = false;
	    	confirmHover = false;
	    	c.style.cursor = "pointer";
	        //console.log("Hovering Over Option 1");
	    }else if(isMouseInside(mousePos,noChoiceText.rect)){
	    	if(!noHover){
	    		buttonHoverSFX.play();
	    	}
	    	yesHover = false;
	    	noHover = true;
	    	confirmHover = false;
	    	c.style.cursor = "pointer";
	        //console.log("Hovering Over Option 2");
	    } else{
	    	yesHover = false;
	    	noHover = false;
	    	confirmHover = false;
	    	c.style.cursor = "default";
	    	//console.log("NO HOVER!");
	    }
	} else{
		var mousePos = getMousePos(c, evt);

		if(isMouseInside(mousePos,confirmButton.rect) && !(gameState == "splash")){
	    	if(!confirmHover){
	    		buttonHoverSFX.play();
	    	}
	    	yesHover = false;
	    	noHover = false;
	    	confirmHover = true;
	    	c.style.cursor = "pointer";
		} else{
			yesHover = false;
	    	noHover = false;
	    	confirmHover = false;
	    	c.style.cursor = "default";
		}
	}
});

flipCard(); // Flip the first story card

function resetStats(){
	stats.morale = 50;
	stats.quality = 50;
	stats.time = 50;
	stats.budget = 50;


	programmer_ate_pudding = false;
	qa_intense = false;
	qa_gaveup = false;
	marketing_offered_interview = false;
	scope_has_shrunk = false;
	programmer_has_overwritten_truth = false;
	purchased_backup = false;
	programmer_meeting_called = false;
	marketing_has_budget = false;
	intern_help_art = false;
	intern_help_programmer = false;
	training_program_starting = false;
	advanced_trailer_bought = false;
	video_channel_created = false;
	suggestion_box_active = false;
	create_ost = false;
	advanced_trailer_not_bought = false;
	pets_allowed = false;
	big_bug_missed = false;
	team_meeting_scheduled = false;
	intern_idea_pitched = false;
	intern_idea_active = false;
	find_the_leak = false;
	hit_piece_interview = false;
	has_been_bought_minor = false;
	localization_complete = false;
	active_multiplayer = false;
	kaizen_implemented = false;
	untested_code_prod_truth = false;
	untested_code_prod_lie = false;
	fetch_programmer = false;
	intern_punishment = false;
	gameplay_changed = false;
	gameplay_broken = false;
	vr_available = false;
	artistlove = 0;
	artist_ask_date = false;
	breakup_initiated = false;
	relationship_approved = false;
	internmissing = 0;
	sounddesignhobby = 0;
	ismining = false;
	double_mine = false;
	hrtalent = 0;
	qafan = 0;


	activeCard.active = false;
	turn = 0;
	responseIsShowing = false;
	resetLockedCards();
	flipCard();
	outputText.text = activeCard.question;
}

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
    spr(assets["images/marketing.png"],575,
    splashOffset+Math.sin(now*splashSpeed*0.888+4654)*splashSize);
    spr(assets["images/ceo.png"],600,
    splashOffset+Math.sin(now*splashSpeed*0.933+6789)*splashSize);

    print("Team Credits", creditsButtonX,creditsButtonY, creditsButtonWidth, "white", "18", "sans-serif");
}

function draw(){
	cls(); // clear screen

	if(gameState == "credits") {
		print("Click anywhere to return", 415,canvasHeight-30, 300, "white", "18", "sans-serif");
		for(var i=0; i<creditsList.length;i++) {
			print(creditsList[i], 40,25+i*25, 1000, "#cccccc", "25", "sans-serif");
		}
		return;
	} else if(gameState == "splash"){
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

    screenWipe.draw();
	
}	

let creditsList = [
"Gabriel Cornish: Project lead, core gameplay, choice game engine, spreadsheet integration, art direction, majority of character card art, background pattern, additional writing, assorted bug fixing, initial splash screen, game over, hover button effect, screen transitions"," ",
"Cassidy Noble: Lead writer (about 80% of dialog)"," ",
"Christer \"McFunkypants\" Kaitila: Stats bars flash when low, NPC blinking effect, animated stat hints, text drop shadow effect, title card animation, advisor feature, random thank you messages, three additional NPCs, additional writing, week counter UI calendar styling"," ",
"Lane Watson: Dialog editing"," ",
"Vaan Hope Khani: Story for game shipping win state, start of scoring code"," ",
"Michael \"Misha\" Fewkes: Audio code, game music, audio barks recording and integration, card flip audio"," ",
"Simon Donohoe: Two story cards, week counter UI frame"," ",
"Jeff \"Axphin\" Hanlon: Initial thank you quotes, additional ending text"," ",
"H Trayford: Intern and veteran images"," ",
"Made by members in HomeTeamGameDev.com Apollo - come make games with us!"];
let creditsMaxCharWidthToWrap = 84;

function wrapCredits() { // note: gets calling immediately after definition
    let newCut = [];
    let findEnd;
    for(var i=0;i<creditsList.length;i++) {
        while(creditsList[i].length > 0) {
            findEnd = creditsMaxCharWidthToWrap;
            if(creditsList[i].length > creditsMaxCharWidthToWrap) {
                for(var ii=findEnd;ii>0;ii--) {
                    if(creditsList[i].charAt(ii) == " ") {
                        findEnd=ii;
                        break;
                    }
                }
            }
            newCut.push(creditsList[i].substring(0, findEnd));
            creditsList[i] = creditsList[i].substring(findEnd, creditsList[i].length);
        }
    }
    creditsList = newCut;
}
wrapCredits(); // calling once right at start


