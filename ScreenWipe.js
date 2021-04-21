var screenWipe = {};
screenWipe.frame = 0;
screenWipe.tickCount = 0;
screenWipe.ticksPerFrame = 2;
screenWipe.inReverse = false;
screenWipe.activated = false;

screenWipe.draw = function(){

	if(this.activated){
		ctx.drawImage(assets["images/transition.png"], this.frame * 1024, 0, 1024, 720, 0, 0, 1024, 720);

		this.tickCount++;

		if(this.tickCount > this.ticksPerFrame){
			this.tickCount = 0;

			if(!this.inReverse){
				if(this.frame < 4){
					this.frame++;
				}
				else{
					gameState = "game";
					this.inReverse = true;
				}
			}
			else{
				if(this.frame > 0){
					this.frame--;
				}
				else{
					this.activated = false;
					this.frame = 0;
					this.inReverse = false;
					this.frame = 0;
					this.tickCounter = 0;
				}
			}
		}
	}
}