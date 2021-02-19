// ================= CANVAS SETUP ======================
var c = createCanvas(1024,720);
var ctx = c.getContext('2d');
var canvasWidth = c.width / PIXEL_RATIO;
var canvasHeight = c.height / PIXEL_RATIO;


// ================= DECLARE VARIABLES HERE ======================
var objectsToUpdate = [];


// ================= RUN THE GAMELOOP ======================
setInterval(gameloop,16);

function gameloop(){
	update();
	draw();
}

function update(){
	for (var i = 0; i < objectsToUpdate.length; i++) {
		objectsToUpdate[i].update();
	}
}

function draw(){
	cls(); // clear screen

	for (var i = 0; i < objectsToUpdate.length; i++) {
		objectsToUpdate[i].draw();
	}
}	



