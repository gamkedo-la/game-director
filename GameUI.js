var weekCounter = createDisplayObject();

weekCounter.draw = function(){
	//rectFill(796,20,200,128,"#5AB9A8");
    spr(assets["images/calendar_bg.png"],792,20);
	printWithShadow("WEEK", 900, 70, 999, "#5AB9A8", 20, "Helvetica");
    // fixme needs to be centered
    printWithShadow(""+turn, 910, 95, 999, "#5AB9A8", 60, "Helvetica");
}

var cardFrame = createDisplayObject();
cardFrame.width = 512;
cardFrame.height = 720;
cardFrame.draw = function(){
	rectFill(canvasWidth/2 - (this.width/2), 0, this.width, this.height, "white");
}

var cardImage = createDisplayObject();
cardImage.width = 384;
cardImage.height = 384;
cardImage.x = (canvasWidth/2) - (cardImage.width/2);
cardImage.y = (canvasHeight/2) - (cardImage.height * 0.6);
cardImage.maybeBlink = function(x1=120,y1=110,x2=220,y2=110,r=30) {
    let now = performance.now();
    if (!this.nextBlinkTime) this.nextBlinkTime = now + 1000;
    if (!this.blinkUntil) this.blinkUntil = 0;
    if (now>this.nextBlinkTime) {
        //console.log("blink!");
        this.nextBlinkTime = now+1000+Math.random()*3500; // 0.5-4 sec
        this.blinkUntil = now+150;
    }
    if (now<this.blinkUntil) {
        circFill(this.x+x1-r,this.y+y1-r,r,'white');
        circFill(this.x+x2-r,this.y+y2-r,r,'white');
    }
     
}

cardImage.flipCardImg=0; // to detect when new flip required
cardImage.flipCardPrevImg=0; // what's on the back of the card as we flip
cardImage.flipCardStarted=0; // timestamp of last flip
cardImage.flipCardTimespan=500; // ms to complete animation
cardImage.flipCard = function(img) {

    if (!img) { 
        console.log("error: undefined image used for "+activeCard.author);
        return;
    }
    
    var now = performance.now();
    
    // start a new flip if the img just changed
    if (img!=this.flipCardImg) {
        console.log("flipping card!");
        this.flipCardPrevImg = this.flipCardImg;
        if (!this.flipCardPrevImg) this.flipCardPrevImg = assets["images/back_of_card.png"];
        this.flipCardImg = img;
        this.flipCardStarted = now;
        // don't blink during anim since the circles would be in the wrong place
        this.nextBlinkTime = now + this.flipCardTimespan+Math.random()*2000;
        this.blinkUntil = now-1;

        cardFlipSFX.play();
    }

    var w = 0;
    var h = img.height;
    var age = now - this.flipCardStarted;
    var percent = age / this.flipCardTimespan;
    if (percent<0) percent = 0;
    if (percent>1) percent = 1;
    //console.log("flip %"+(percent.toFixed(2)*100));
    
    if (percent < 0.5) {
        // back of card - shrinks
        w = img.width * (1-percent*2);
        offset = img.width/2 - w/2; // center
        ctx.drawImage(this.flipCardPrevImg,this.x+offset,this.y,w,h);
    } else {
        // front of card - grows
        w = img.width * (percent-0.5)*2;
        offset = img.width/2 - w/2; // center
        ctx.drawImage(this.flipCardImg,this.x+offset,this.y,w,h);
    }

}



cardImage.draw = function(){
	switch(activeCard.author){
		case "PROGRAMMER": 
            this.flipCard(assets["images/programmer.png"]);
            this.maybeBlink(145,145,258,145);
			break;
		case "ARTIST":
			this.flipCard(assets["images/artist.png"])
            this.maybeBlink(160,170,260,170);
			break;
		case "DESIGNER":
			this.flipCard(assets["images/designer.png"])
            this.maybeBlink(140,160,240,160);
			break;
		case "PRODUCER":
			this.flipCard(assets["images/producer.png"])
            this.maybeBlink(155,130,250,130);
			break;
		case "SOUND DESIGNER":
			this.flipCard(assets["images/sound_engineer.png"])
            this.maybeBlink(150,180,240,180);
			break;
		case "QA LEAD":
			this.flipCard(assets["images/qa_lead.png"])
            this.maybeBlink(155,165,230,163,15);
			break;
		case "MASTER CODER":
			this.flipCard(assets["images/master_coder.png"])
            this.maybeBlink(160,170,230,170);
			break;
		case "LEVEL DESIGNER":
			this.flipCard(assets["images/level_designer.png"])
            this.maybeBlink(130,160,200,160);
			break;
		case "HUMAN RESOURCES":
			this.flipCard(assets["images/human_resources.png"])
            this.maybeBlink(155,168,195,168);
			break;
		case "INTERN":
			this.flipCard(assets["images/intern.png"])
            this.maybeBlink(165,160,230,160,15);
			break;
		case "VETERAN":
			this.flipCard(assets["images/veteran.png"])
            //this.maybeBlink(); // never blinks =)
			break;
		case "CEO":
			this.flipCard(assets["images/ceo.png"])
            this.maybeBlink(180,160,240,160);
			break;
		case "MARKETING":
			this.flipCard(assets["images/marketing.png"])
			break;
		case "INTERVIEWER":
			this.flipCard(assets["images/interviewer.png"])
			break;
        default:
            console.log("MISSING CARD: " +activeCard.author);
            break;
	}
}

var outputText = createDisplayObject();
outputText.text = activeCard.question;
outputText.draw = function(){
	print(outputText.text, cardImage.x, 40, 384, "black", 20, "Helvetica");
}

var yesChoiceText = createDisplayObject();
yesChoiceText.hoverWidth = 0;
yesChoiceText.rect = {
	x: cardImage.x,
	y: cardImage.y + cardImage.height + 75,
	width: cardImage.width,
	height: 30,
}
yesChoiceText.draw = function(){
	//If button is being hovered over, start filling it gradually
	if(yesHover){
		if(yesChoiceText.hoverWidth < cardImage.width){
			yesChoiceText.hoverWidth += 16;
		} else{
			yesChoiceText.hoverWidth = cardImage.width;
		}
		
	} else{
		yesChoiceText.hoverWidth = 0;
	}

	if(activeCard.active){
		ctx.fillStyle = "#5ab9a8";
		rect(cardImage.x, cardImage.y + cardImage.height + 75, cardImage.width, 30, 1, "#5ab9a8");
		rectFill(cardImage.x, cardImage.y + cardImage.height + 75, yesChoiceText.hoverWidth, 30, 1, "#5ab9a8");
		if(yesHover){
			ctx.fillStyle = "white";
			print("  "+ activeCard.yesAnswer, cardImage.x, cardImage.y + cardImage.height + 80, "white", 20, "Helvetica");	
		} else{
			ctx.fillStyle = "black";
			print("  "+ activeCard.yesAnswer, cardImage.x, cardImage.y + cardImage.height + 80, "black", 20, "Helvetica");	
		}
		
	}
}

var noChoiceText = createDisplayObject();
noChoiceText.hoverWidth = 0;
noChoiceText.rect = {
	x: cardImage.x,
	y: cardImage.y + cardImage.height + 115,
	width: cardImage.width,
	height: 30,
}
noChoiceText.draw = function(){
	//If button is being hovered over, start filling it gradually
	if(noHover){
		if(noChoiceText.hoverWidth < cardImage.width){
			noChoiceText.hoverWidth += 16;
		} else{
			noChoiceText.hoverWidth = cardImage.width;
		}
		
	} else{
		noChoiceText.hoverWidth = 0;
	}

	if(activeCard.active){
		ctx.fillStyle = "#5ab9a8";
		rect(cardImage.x, cardImage.y + cardImage.height + 115, cardImage.width, 30, 1, "#5ab9a8");
		rectFill(cardImage.x, cardImage.y + cardImage.height + 115, noChoiceText.hoverWidth, 30, 1, "#5ab9a8");
		if(noHover){
			ctx.fillStyle = "white";
			print("  "+activeCard.noAnswer, cardImage.x, cardImage.y + cardImage.height + 120, "white", 20, "Helvetica");
		} else{
			ctx.fillStyle = "black";
			print("  "+activeCard.noAnswer, cardImage.x, cardImage.y + cardImage.height + 120, "black", 20, "Helvetica");
		}
		
	}	
}