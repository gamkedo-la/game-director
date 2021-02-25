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
	}
}

var outputText = createDisplayObject();
outputText.text = activeCard.question;
outputText.draw = function(){
	print(outputText.text, cardImage.x, 40, 384, "black", 20, "Helvetica");
}

var yesChoiceText = createDisplayObject();
yesChoiceText.rect = {
	x: cardImage.x,
	y: cardImage.y + cardImage.height + 75,
	width: cardImage.width,
	height: 30,
}
yesChoiceText.draw = function(){
	if(activeCard.active){
		rect(cardImage.x, cardImage.y + cardImage.height + 75, cardImage.width, 30, 1, "black");
		print("  "+ activeCard.yesAnswer, cardImage.x, cardImage.y + cardImage.height + 80, "black", 20, "Helvetica");
	}
}

var noChoiceText = createDisplayObject();
noChoiceText.rect = {
	x: cardImage.x,
	y: cardImage.y + cardImage.height + 115,
	width: cardImage.width,
	height: 30,
}
noChoiceText.draw = function(){
	if(activeCard.active){
		rect(cardImage.x, cardImage.y + cardImage.height + 115, cardImage.width, 30, 1, "black");
		print("  "+activeCard.noAnswer, cardImage.x, cardImage.y + cardImage.height + 120, "black", 20, "Helvetica");
	}	
}