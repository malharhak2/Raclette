define (["rCONFIG", "rDebug", "rutils", "rPageVisibility", "rinputsManager"], 
function (config, debug, utils, pageVisibility, inputsManager) {
	var Time = function () {
		this.defaultTimeScale = config.timeScale;
		this.timeScale = 0;
		this.startDate = Date.now();
		this.lastFrame = Date.now();
		this.currentFrame = Date.now();
		this.deltaTime = this.currentFrame - this.lastFrame;

		var that = this;
		pageVisibility.onVisible = function () {
			debug.log("Time", "api");
			that.pause();
			inputsManager.reset();
			setTimeout(function () {
				debug.log("Time", "api2");
				that.resume();
			}, 100);
		};
	};
	Time.prototype.pause = function () {
		this.lastTimeScale = this.timeScale;
		this.timeScale = 0;
	}
	Time.prototype.resume = function () {
		this.timeScale = this.defaultTimeScale;
	}

	Time.prototype.update = function () {
		this.deltaTime = (this.currentFrame - this.lastFrame) * this.timeScale;
	};

	return new Time();
})