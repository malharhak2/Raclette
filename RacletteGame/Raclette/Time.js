define (["rCONFIG", "rDebug", "rutils"], function (config, debug, utils) {
	var Time = function () {
		this.timeScale = 0.1;
		this.startDate = Date.now();
		this.lastFrame = Date.now();
		this.currentFrame = Date.now();
		this.deltaTime = this.currentFrame - this.lastFrame;
	};

	Time.prototype.update = function () {
		this.deltaTime = (this.currentFrame - this.lastFrame) * this.timeScale;
	};

	return new Time();
})