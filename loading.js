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
					"images/ceo.png",
					"images/advisor.png",
					"images/advisor_two.png",
                    "images/back_of_card.png",
                    "images/marketing.png",
                    "images/interviewer.png",
                    "images/game_over_screen.png",
                    "images/you_win_screen.png",
                    "images/calendar_bg.png",
                    "images/transition.png"
					];

var assets = {};

var buttonClickSFX = new soundEffectClass("audio/select.wav", 0.5);
var buttonHoverSFX = new soundEffectClass("audio/hover.wav", 0.5);
var cardFlipSFX = new soundEffectClass("audio/card_flip.wav", 1);
var music = new musicClass("audio/MusicWeDevTo.mp3", 82.5, 0.6);

var voxQuestion = {
	"PROGRAMMER": new soundEffectRandomClass(["audio/VOX_00_Question_01.mp3", "audio/VOX_00_Question_02.mp3", "audio/VOX_00_Question_03.mp3"], 1),
	"ARTIST": new soundEffectRandomClass(["audio/VOX_17_Question_01.mp3", "audio/VOX_17_Question_02.mp3", "audio/VOX_17_Question_03.mp3"], 1),
	"DESIGNER": new soundEffectRandomClass(["audio/VOX_01_Question_01.mp3", "audio/VOX_01_Question_02.mp3", "audio/VOX_01_Question_03.mp3"], 1),
	"PRODUCER": new soundEffectRandomClass(["audio/VOX_16_Question_01.mp3", "audio/VOX_16_Question_02.mp3", "audio/VOX_16_Question_03.mp3"], 1),
	"SOUND DESIGNER": new soundEffectRandomClass(["audio/VOX_02_Question_01.mp3", "audio/VOX_02_Question_02.mp3", "audio/VOX_02_Question_03.mp3"], 1),
	"QA LEAD": new soundEffectRandomClass(["audio/VOX_15_Question_01.mp3", "audio/VOX_15_Question_02.mp3", "audio/VOX_15_Question_03.mp3"], 1),
	"MASTER CODER": new soundEffectRandomClass(["audio/VOX_03_Question_01.mp3", "audio/VOX_03_Question_02.mp3", "audio/VOX_03_Question_03.mp3"], 1),
	"LEVEL DESIGNER": new soundEffectRandomClass(["audio/VOX_14_Question_01.mp3", "audio/VOX_14_Question_02.mp3", "audio/VOX_14_Question_03.mp3"], 1),
	"HUMAN RESOURCES": new soundEffectRandomClass(["audio/VOX_04_Question_01.mp3", "audio/VOX_04_Question_02.mp3", "audio/VOX_04_Question_03.mp3"], 1),
	"INTERN": new soundEffectRandomClass(["audio/VOX_13_Question_01.mp3", "audio/VOX_13_Question_02.mp3", "audio/VOX_13_Question_03.mp3"], 1),
	"VETERAN": new soundEffectRandomClass(["audio/VOX_05_Question_01.mp3", "audio/VOX_05_Question_02.mp3", "audio/VOX_05_Question_03.mp3"], 1),
	"CEO": new soundEffectRandomClass(["audio/VOX_12_Question_01.mp3", "audio/VOX_12_Question_02.mp3", "audio/VOX_12_Question_03.mp3"], 1),
	"MARKETING": new soundEffectRandomClass(["audio/VOX_06_Question_01.mp3", "audio/VOX_06_Question_02.mp3", "audio/VOX_06_Question_03.mp3"], 1),
	"INTERVIEWER": new soundEffectRandomClass(["audio/VOX_11_Question_01.mp3", "audio/VOX_11_Question_02.mp3", "audio/VOX_11_Question_03.mp3"], 1)
}

var voxAnswer = {
	"PROGRAMMER": new soundEffectRandomClass(["audio/VOX_00_Statement_01.mp3", "audio/VOX_00_Statement_02.mp3", "audio/VOX_00_Statement_03.mp3"], 1),
	"ARTIST": new soundEffectRandomClass(["audio/VOX_17_Statement_01.mp3", "audio/VOX_17_Statement_02.mp3", "audio/VOX_17_Statement_03.mp3"], 1),
	"DESIGNER": new soundEffectRandomClass(["audio/VOX_01_Statement_01.mp3", "audio/VOX_01_Statement_02.mp3", "audio/VOX_01_Statement_03.mp3"], 1),
	"PRODUCER": new soundEffectRandomClass(["audio/VOX_16_Statement_01.mp3", "audio/VOX_16_Statement_02.mp3", "audio/VOX_16_Statement_03.mp3"], 1),
	"SOUND DESIGNER": new soundEffectRandomClass(["audio/VOX_02_Statement_01.mp3", "audio/VOX_02_Statement_02.mp3", "audio/VOX_02_Statement_03.mp3"], 1),
	"QA LEAD": new soundEffectRandomClass(["audio/VOX_15_Statement_01.mp3", "audio/VOX_15_Statement_02.mp3", "audio/VOX_15_Statement_03.mp3"], 1),
	"MASTER CODER": new soundEffectRandomClass(["audio/VOX_03_Statement_01.mp3", "audio/VOX_03_Statement_02.mp3", "audio/VOX_03_Statement_03.mp3"], 1),
	"LEVEL DESIGNER": new soundEffectRandomClass(["audio/VOX_14_Statement_01.mp3", "audio/VOX_14_Statement_02.mp3", "audio/VOX_14_Statement_03.mp3"], 1),
	"HUMAN RESOURCES": new soundEffectRandomClass(["audio/VOX_04_Statement_01.mp3", "audio/VOX_04_Statement_02.mp3", "audio/VOX_04_Statement_03.mp3"], 1),
	"INTERN": new soundEffectRandomClass(["audio/VOX_13_Statement_01.mp3", "audio/VOX_13_Statement_02.mp3", "audio/VOX_13_Statement_03.mp3"], 1),
	"VETERAN": new soundEffectRandomClass(["audio/VOX_05_Statement_01.mp3", "audio/VOX_05_Statement_02.mp3", "audio/VOX_05_Statement_03.mp3"], 1),
	"CEO": new soundEffectRandomClass(["audio/VOX_12_Statement_01.mp3", "audio/VOX_12_Statement_02.mp3", "audio/VOX_12_Statement_03.mp3"], 1),
	"MARKETING": new soundEffectRandomClass(["audio/VOX_06_Statement_01.mp3", "audio/VOX_06_Statement_02.mp3", "audio/VOX_06_Statement_03.mp3"], 1),
	"INTERVIEWER": new soundEffectRandomClass(["audio/VOX_11_Statement_01.mp3", "audio/VOX_11_Statement_02.mp3", "audio/VOX_11_Statement_03.mp3"], 1)
}

assetsToload.forEach(function(source){
	var img = new Image();
	img.src = source;

	assets[source] = img;
});