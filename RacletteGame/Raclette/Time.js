define (["rCONFIG", "rDebug", "rutils", "rPageVisibility", "rinputsManager"], 
function (config, debug, utils, pageVisibility, inputsManager) {
	var Time = function () {
		this.timeScale = 1;
		this.startDate = Date.now();
		this.lastFrame = Date.now();
		this.currentFrame = Date.now();
		this.deltaTime = this.currentFrame - this.lastFrame;

		var that = this;
		pageVisibility.onVisible = function () {
			debug.log("Time", "api");
			that.timeScale = 0;
			inputsManager.reset();
			setTimeout(function () {
				debug.log("Time", "api2");
				that.timeScale = 1;
			}, 100);
		};
	};

	Time.prototype.update = function () {
		this.deltaTime = (this.currentFrame - this.lastFrame) * this.timeScale;
	};

	return new Time();
})