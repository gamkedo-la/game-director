// ================= LOAD ASSETS HERE ======================
var assetsToload = ["images/programmer.png",
					"images/artist.png",
					"images/designer.png",
					"images/producer.png",
					"images/sound_engineer.png",
					"images/qa_lead.png",
					"images/master_coder.png",
					"images/pattern_background.png",
					"images/level_designer.png",
					"images/human_resources.png",
					"images/intern.png",
					"images/veteran.png",
					"images/splash_screen.png",
					"images/ceo.png"
					];

var assets = {};

var buttonClickSFX = new Audio("audio/select.wav");

assetsToload.forEach(function(source){
	var img = new Image();
	img.src = source;

	assets[source] = img;
});