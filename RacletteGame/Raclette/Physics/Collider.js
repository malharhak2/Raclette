define (["rDebug", "rutils", "rCONFIG", "rCanvasManager", "rTime"], 
function (debug, utils, config, canvasManager, time) {
	var Collider = function (args) {
		this.position = {
			x : args.position.x,
			y : args.position.y
		};
		this.width = args.width;
		this.height = args.height;
		this.static = args.static || true;

		this.velocity = {
			x : 0,
			y : 0
		};
	};

	Collider.prototype.SetVelocity = function (velocity) {
		if (velocity.x === undefined) {
			velocity.x = this.velocity.x;
		}
		if (velocity.y === undefined) {
			velocity.y = this.velocity.y;
		}
		this.velocity = velocity;
	};

	Collider.prototype.GetVelocity = function () {
		return this.velocity;
	};

	Collider.prototype.GetPosition = function () {
		return this.position;
	};

	Collider.prototype.render = function () {
		this.DrawDebug (canvasManager.ctx);
	};

	Collider.prototype.update = function () {
		this.position.x += this.velocity.x * time.deltaTime;
		this.position.y += this.velocity.y * time.deltaTime;
	};

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