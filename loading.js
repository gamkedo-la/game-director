// ================= LOAD ASSETS HERE ======================
var assetsToload = ["images/programmer.png",
					"images/artist.png",
					"images/designer.png",
					"images/producer.png",
					"images/sound_engineer.png",
					"images/qa_lead.png",
					"images/master_coder.png",
					"images/pattern_background.png"
					];

var assets = {};

assetsToload.forEach(function(source){
	var img = new Image();
	img.src = source;

	assets[source] = img;
});