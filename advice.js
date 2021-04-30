// this could be a civ style "advisor" popup
// or just a description of the effects
// of a potential choice

var choiceHint = createDisplayObject();
choiceHint.draw = function(){

    if (!yesHover && !noHover) return;

    let w = 232;
    let h = 120;
    let x = 780; //canvas.width - w; 
    let y = 585; //canvas.height - h; 

	//rectFill(x,y,w,h,"rgba(255,255,255,1)");
	
    spr(assets["images/advisor_two.png"],x+40,y-160);
    rect(x,y,w,h,6,"#5ab9a8");
    rectFill(x,y,w,h,"rgba(255,255,255,1)");

    let advice = "";
    
    if ((yesHover && activeCard.yesStats[0]) ||
        (noHover && activeCard.noStats[0])) {
        advice += "confidence";
    }
    if ((yesHover && activeCard.yesStats[1]) ||
        (noHover && activeCard.noStats[1])) {
        if (advice != "") advice += ", ";
        advice += "quality";
    }
    if ((yesHover && activeCard.yesStats[2]) ||
        (noHover && activeCard.noStats[2])) {
        if (advice != "") advice += ", ";
        advice += "schedule";
    }
    if ((yesHover && activeCard.yesStats[3]) ||
        (noHover && activeCard.noStats[3])) {
        if (advice != "") advice += ", ";
        advice += "budget";
    }

    // replace final comma with ", and"
    let pos = advice.lastIndexOf(",");
    if (pos>0) advice = advice.substring(0,pos) + ", and" + advice.substring(pos+1)

    if (advice =="") advice = "nothing";

    advice = "This choice will affect " + advice + ".";
	print(advice,x+10,y+10,200,"black",20,"Helvetica");

}