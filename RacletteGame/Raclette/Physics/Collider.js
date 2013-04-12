define (["rDebug", "rutils", "rCONFIG", "rCanvasManager"], function (debug, utils, config, canvasManager) {
	var Collider = function (args) {
		this.position = {
			x : args.position.x,
			y : args.position.y
		};
		this.width = args.width;
		this.height = args.height;
		this.static = args.static || true;
	};

	Collider.prototype.GetPosition = function () {
		return this.position;
	};

	Collider.prototype.render = function () {
		this.DrawDebug (canvasManager.ctx);
	}

	Collider.prototype.DrawDebug = function (cétéhixe) {
		cétéhixe.fillStyle = "rgba(0, 250, 0, 0.3)";
		cétéhixe.strokeStyle = "green";
		cétéhixe.strokeWidth = 3;
		cétéhixe.fillRect (
			this.position.x * config.unitSize,
			this.position.y * config.unitSize,
			this.width * config.unitSize,
			this.height * config.unitSize
		);		
		cétéhixe.strokeRect (
			this.position.x * config.unitSize,
			this.position.y * config.unitSize,
			this.width * config.unitSize,
			this.height * config.unitSize
		);

	};

	return Collider;
});