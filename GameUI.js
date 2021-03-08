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
cardImage.draw = function(){
	switch(activeCard.author){
		case "PROGRAMMER": 
			spr(assets["images/programmer.png"],this.x,this.y)
			break;
		case "ARTIST":
			spr(assets["images/artist.png"],this.x,this.y)
			break;
		case "DESIGNER":
			spr(assets["images/designer.png"],this.x,this.y)
			break;
		case "PRODUCER":
			spr(assets["images/producer.png"],this.x,this.y)
			break;
		case "SOUND DESIGNER":
			spr(assets["images/sound_engineer.png"],this.x,this.y)
			break;
		case "QA LEAD":
			spr(assets["images/qa_lead.png"],this.x,this.y)
			break;
		case "MASTER CODER":
			spr(assets["images/master_coder.png"],this.x,this.y)
			break;
		case "LEVEL DESIGNER":
			spr(assets["images/level_designer.png"],this.x,this.y)
			break;
		case "HUMAN RESOURCES":
			spr(assets["images/human_resources.png"],this.x,this.y)
			break;
		case "INTERN":
			spr(assets["images/intern.png"],this.x,this.y)
			break;
		case "VETERAN":
			spr(assets["images/veteran.png"],this.x,this.y)
			break;
		case "CEO":
			spr(assets["images/ceo.png"],this.x,this.y)
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