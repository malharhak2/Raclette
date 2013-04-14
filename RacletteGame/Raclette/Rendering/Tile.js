define (["rCONFIG", "rTime"], function (config, time) {
	var Tile = function (args) {
		this.x = args.x;
		this.y = args.y;
		this.caseWidth = args.caseWidth;
		this.caseHeight = args.caseHeight;
		this.pos = args.pos;
		this.nb = args.nb;
		this.name = args.name;
		this.type = args.type;
		if (args.anims){
			this.animated = true;
			this.currentAnim = 0;
			this.anims = args.anims;
			this.counter = args.anims[0].duration || config.defaultDuration;
			this.time = 0;
		}


		};
		Tile.prototype.addTime = function(){
			this.time += time.deltaTime;
			if (this.time >= this.counter){
				this.currentAnim++;
				this.currentAnim%= this.anims.length;
				this.counter = this.anims[this.currentAnim].duration || config.defaultDuration;
				this.time = 0;
			}
		}

	return Tile;
})