function soundEffectClass(fullFilenameWithPath, volume = 1.0) {
	var sound = new Audio(fullFilenameWithPath);
	var sfxVolume = volume;

	this.play = function() {
		sound.currentTime = 0;
		sound.volume = Math.pow(sfxVolume, 2);
		sound.play();
	}

	this.stop = function() {
		sound.pause();
	}
}

function soundEffectRandomClass(arrayOfFilenames, volume = 1.0) {
	var sounds = [''];
	var sfxVolume = volume;

	for (var i = 0; i < arrayOfFilenames.length; i++) {
		sounds[i] = new Audio(arrayOfFilenames[i]);
		sounds[i+arrayOfFilenames.length] = new Audio(arrayOfFilenames[i]);
	}

	this.play = function() {
		var soundIndex = Math.floor(Math.random() * sounds.length);
		if(!sounds[soundIndex].paused) {
			var startIndex = soundIndex;
			soundIndex++;
			while (!sounds[soundIndex].paused && startIndex != soundIndex) {
				if (soundIndex >= sounds.length) {
					soundIndex = 0;
				}
			}
		}

		sounds[soundIndex].currentTime = 0;
		sounds[soundIndex].volume = Math.pow(sfxVolume, 2);
		sounds[soundIndex].play();
	}

	this.stop = function() {
		for (var i in sounds) {
			sounds[i].pause();
		}
	}
}

function musicClass(fullFilenameWithPath, endTime, volume = 1.0) {
	var fileName = fullFilenameWithPath;
	var soundIndex = 0;
	var sounds = new Array(2);
	for (var i = 0; i < sounds.length; i++) {
		sounds[i] = new Audio(fileName);
	}
	var loopTime = endTime;
	var musicVolume = volume;
	var playing = false;

	this.play = function() {
		if (playing) return;

		if (++soundIndex == sounds.length) soundIndex = 0;

		sounds[soundIndex].currentTime = 0;
		sounds[soundIndex].volume = Math.pow(musicVolume, 2);
		sounds[soundIndex].play();

		playing = true;
	}

	this.stop = function() {
		for (var i in sounds) {
			sounds[i].pause();
		}

		playing = false
	}

	this.update = function() {
		if (sounds[soundIndex].currentTime >= loopTime) {
			playing = false;
			music.play();
		}
	}
}