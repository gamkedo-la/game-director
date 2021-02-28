var statBar1 = createDisplayObject();
statBar1.draw = function(){
	rectFill(StatsX,0,160,240,"black");
	print("MORALE", StatsX, StatsY - 50, 20, "white", 20, "Helvetica");
	rect(StatsX,StatsY,128,16,4,"white");
	rectFill(StatsX,StatsY,128 * (stats.energy/100),16,"white");

	if(yesHover){
		if(activeCard.yesStats[0] != 0 ){
			circFill(StatsX+136, StatsY+4,4,"white");
		}
	}else if(noHover){
		if(activeCard.noStats[0] != 0 ){
			circFill(StatsX+136, StatsY+4,4,"white");
		}
	}
}

var statBar2 = createDisplayObject();
statBar2.draw = function(){
	print("QUALITY", StatsX, StatsY*3 - 50, 20, "white", 20, "Helvetica");
	rect(StatsX,StatsY*3,128,16,4,"white");
	rectFill(StatsX,StatsY*3,128 * (stats.quality/100),16,"white");

	if(yesHover){
		if(activeCard.yesStats[1] != 0 ){
			circFill(StatsX+136, (StatsY*3) + 4, 4, "white");
		}
	}else if(noHover){
		if(activeCard.noStats[1] != 0 ){
			circFill(StatsX+136, (StatsY*3) + 4, 4, "white");
		}
	}
	
}

var statBar3 = createDisplayObject();
statBar3.draw = function(){
	print("SCHEDULE", StatsX, StatsY*5 - 50, 20, "white", 20, "Helvetica");
	rect(StatsX,StatsY*5,128,16,4,"white");
	rectFill(StatsX,StatsY*5,128 * (stats.time/100),16,"white");

	if(yesHover){
		if(activeCard.yesStats[2] != 0 ){
			circFill(StatsX+136, (StatsY*5) + 4, 4, "white");
		}
	}else if(noHover){
		if(activeCard.noStats[2] != 0 ){
			circFill(StatsX+136, (StatsY*5) + 4, 4, "white");
		}
	}
	
}

var statBar4 = createDisplayObject();
statBar4.draw = function(){
	print("BUDGET", StatsX, StatsY*7 - 50, 20, "white", 20, "Helvetica");
	rect(StatsX,StatsY*7,128,16,4,"white");
	rectFill(StatsX,StatsY*7,128 * (stats.budget/100),16,"white");

	if(yesHover){
		if(activeCard.yesStats[3] != 0 ){
			circFill(StatsX+136, (StatsY*7) + 4, 4, "white");
		}
	} else if(noHover){
		if(activeCard.noStats[3] != 0 ){
			circFill(StatsX+136, (StatsY*7) + 4, 4, "white");
		}
	}
	
}