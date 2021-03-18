var weekCounter = createDisplayObject();
weekCounter.draw = function(){
	print("WEEK: " + turn, 800, StatsY - 50, 55, "white", 20, "Helvetica");
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
        console.log("blink!");
        this.nextBlinkTime = now+1000+Math.random()*3500; // 0.5-4 sec
        this.blinkUntil = now+150;
    }
    if (now<this.blinkUntil) {
        circFill(this.x+x1-r,this.y+y1-r,r,'white');
        circFill(this.x+x2-r,this.y+y2-r,r,'white');
    }
     
}
cardImage.draw = function(){
	switch(activeCard.author){
		case "PROGRAMMER": 
			spr(assets["images/programmer.png"],this.x,this.y);
            this.maybeBlink(145,145,258,145);
			break;
		case "ARTIST":
			spr(assets["images/artist.png"],this.x,this.y)
            this.maybeBlink(160,170,260,170);
			break;
		case "DESIGNER":
			spr(assets["images/designer.png"],this.x,this.y)
            this.maybeBlink(140,160,240,160);
			break;
		case "PRODUCER":
			spr(assets["images/producer.png"],this.x,this.y)
            this.maybeBlink(155,130,250,130);
			break;
		case "SOUND DESIGNER":
			spr(assets["images/sound_engineer.png"],this.x,this.y)
            this.maybeBlink(150,180,240,180);
			break;
		case "QA LEAD":
			spr(assets["images/qa_lead.png"],this.x,this.y)
            this.maybeBlink(155,165,230,163,15);
			break;
		case "MASTER CODER":
			spr(assets["images/master_coder.png"],this.x,this.y)
            this.maybeBlink(160,170,230,170);
			break;
		case "LEVEL DESIGNER":
			spr(assets["images/level_designer.png"],this.x,this.y)
            this.maybeBlink(130,160,200,160);
			break;
		case "HUMAN RESOURCES":
			spr(assets["images/human_resources.png"],this.x,this.y)
            this.maybeBlink(155,168,195,168);
			break;
		case "INTERN":
			spr(assets["images/intern.png"],this.x,this.y)
            this.maybeBlink(165,160,230,160,15);
			break;
		case "VETERAN":
			spr(assets["images/veteran.png"],this.x,this.y)
            //this.maybeBlink(); // never blinks =)
			break;
		case "CEO":
			spr(assets["images/ceo.png"],this.x,this.y)
            this.maybeBlink(180,160,240,160);
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