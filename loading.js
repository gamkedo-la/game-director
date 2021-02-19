// ================= LOAD ASSETS HERE ======================
var assetsToload = ["images/programmer.png",
					"images/artist.png",
					"images/designer.png",
					"images/producer.png",
					"images/sound_engineer.png"
					];

var assets = {};

assetsToload.forEach(function(source){
	var img = new Image();
	img.src = source;

	assets[source] = img;
});