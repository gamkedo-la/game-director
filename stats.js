function statPercent(val) {
	// forces it to stay within 0..1
    let percent = val / 100;
    if (percent>1) percent = 1;
    if (percent<0) percent = 0;
	return percent;
}

var statBar1 = createDisplayObject();
statBar1.draw = function(){
	
    rectFill(StatsX-28,StatsY-10,200,270,"#5AB9A8");
	
    printWithShadow("MORALE", StatsX, StatsY+StatsSpacingY-50, 20, "white", 20, "Helvetica");
	rect(StatsX,StatsY+StatsSpacingY,128,16,4,"white");
	rectFill(StatsX,StatsY+StatsSpacingY,128 * statPercent(stats.morale),16,"white");

	if(yesHover){
		if(activeCard.yesStats[0] != 0 ){
			circFill(StatsX+136, StatsY+StatsSpacingY+4,6,"#fff");
		}
	}else if(noHover){
		if(activeCard.noStats[0] != 0 ){
			circFill(StatsX+136, StatsY+StatsSpacingY+4,6,"#fff");
		}
	}
}

var statBar2 = createDisplayObject();
statBar2.draw = function(){
	printWithShadow("QUALITY", StatsX, StatsY+StatsSpacingY*3 - 50, 20, "white", 20, "Helvetica");
	rect(StatsX,StatsY+StatsSpacingY*3,128,16,4,"white");
	rectFill(StatsX,StatsY+StatsSpacingY*3,128 * statPercent(stats.quality),16,"white");

	if(yesHover){
		if(activeCard.yesStats[1] != 0 ){
			circFill(StatsX+136, StatsY+(StatsSpacingY*3) + 4, 6, "#fff");
		}
	}else if(noHover){
		if(activeCard.noStats[1] != 0 ){
			circFill(StatsX+136, StatsY+(StatsSpacingY*3) + 4, 6, "#fff");
		}
	}
	
}

var statBar3 = createDisplayObject();
statBar3.draw = function(){
	printWithShadow("SCHEDULE", StatsX, StatsY+StatsSpacingY*5 - 50, 20, "white", 20, "Helvetica");
	rect(StatsX,StatsY+StatsSpacingY*5,128,16,4,"white");
	rectFill(StatsX,StatsY+StatsSpacingY*5,128 * statPercent(stats.time),16,"white");

	if(yesHover){
		if(activeCard.yesStats[2] != 0 ){
			circFill(StatsX+136, StatsY+(StatsSpacingY*5) + 4, 6, "#fff");
		}
	}else if(noHover){
		if(activeCard.noStats[2] != 0 ){
			circFill(StatsX+136, StatsY+(StatsSpacingY*5) + 4, 6, "#fff");
		}
	}
	
}

var statBar4 = createDisplayObject();
statBar4.draw = function(){
	printWithShadow("BUDGET", StatsX, StatsY+StatsSpacingY*7 - 50, 20, "white", 20, "Helvetica");
	rect(StatsX,StatsY+StatsSpacingY*7,128,16,4,"white");
	rectFill(StatsX,StatsY+StatsSpacingY*7,128 * statPercent(stats.budget),16,"white");

	if(yesHover){
		if(activeCard.yesStats[3] != 0 ){
			circFill(StatsX+136, StatsY+(StatsSpacingY*7) + 4, 6, "#fff");
		}
	} else if(noHover){
		if(activeCard.noStats[3] != 0 ){
			circFill(StatsX+136, StatsY+(StatsSpacingY*7) + 4, 6, "#fff");
		}
	}
	
}