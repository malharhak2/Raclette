define (["rDebug", "rutils", "rCONFIG", "rCanvasManager", "rTime", "rCamera"], 
function (debug, utils, config, canvasManager, time, camera) {
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
		this.onCollision = args.onCollision;
		this.mass = args.mass || 1;
		this.type = args.type;
		this.gravity = false;
		this.layer = args.layer;
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

	Collider.prototype.Collision = function (axis, target) {
		if (this.onCollision) {
			this.onCollision(axis, target);
		}
	};

	Collider.prototype.GetVelocity = function () {
		return this.velocity;
	};

	Collider.prototype.GetPosition = function () {
		return this.position;
	};

	Collider.prototype.render = function () {
		if (config.drawDebug) {
			this.DrawDebug (canvasManager.ctx);
		}
	};

	Collider.prototype.update = function (statics) {
		this.applyGravity();

		this.oldPosition = {
			x : this.position.x,
			y : this.position.y
		};
		
		this.moveStep = {
			x : this.velocity.x * time.deltaTime,
			y : this.velocity.y * time.deltaTime
		}
		this.newPosition = {
			x : this.position.x +  this.moveStep.x,
			y : this.position.y
		};

		if (this.velocity.x < 0) {
			var check = this.checkLeftCollisions(this.newPosition, statics);
			if (check.collision) {
				this.newPosition.x = this.position.x + check.distance;
				this.velocity.x = 0;
				this.Collision ("left");
				debug.log("Physics", "Left collision")
			}
		} else if (this.velocity.x > 0) {
			var check = this.checkRightCollisions(this.newPosition, statics);
			if (check.collision) {
				this.newPosition.x = this.position.x + check.distance;
				this.velocity.x = 0;
				this.Collision ("right");
				debug.log("Physics", "Right collision")
			}
		}
		this.newPosition.y += this.moveStep.y;

		if (this.velocity.y < 0) {
			var check = this.checkTopCollisions (this.newPosition, statics) 
			if (check.collision ) {
				this.newPosition.y = this.position.y + check.distance;
				this.velocity.y = 0;
				this.Collision ("top");
				debug.log("Physics", "Up collision")
			}
		} else if (this.velocity.y > 0) {
			if (utils.chances (50)) {
				debug.log("physics", this.velocity);
			}
			var check = this.checkBottomCollisions(this.newPosition, statics);
			if (check.collision) {
				this.newPosition.y = this.position.y + check.distance;
				if (utils.chances (50)) {
					debug.log("Physics", "Down collision", this.velocity);
				}
				this.velocity.y = 0;
				this.Collision ("bottom");
			}
		}
		this.position = this.newPosition;


	};

	Collider.prototype.applyGravity = function () {
		if (this.gravity) {
			this.velocity.x += config.gravity.x * this.mass * time.deltaTime;
			this.velocity.y += config.gravity.y * this.mass * time.deltaTime;
			if (utils.chances (50)) {
				debug.log("Physics", "gravity");
			}
		} 
	};

	Collider.prototype.SetGravity = function (gravity) {
		this.gravity = gravity;
	}
	Collider.prototype.ApplyForce = function (force) {
		this.velocity.x += force.x || 0;
		this.velocity.y += force.y || 0;
	};

	Collider.prototype.checkLeftCollisions = function (newPos, statics) {
		var nextCol;
		var closestObstacle = 1000;
		nextCol = Math.floor (newPos.x);
		for (var i = Math.floor (newPos.y); i < Math.floor (newPos.y + this.height); i++) {
			if (statics[i] != undefined) {
				if (statics[i][nextCol] != false) {
					var obj = statics[i][nextCol];
					if (obj.collider.type == "block") {
						var distance = nextCol - this.position.x;
						if (Math.abs(distance) < Math.abs(closestObstacle)) {
							closestObstacle = distance;
						}
					}	
				}
			}
		};
		if (closestObstacle != 1000) {
			return {
				collision : true,
				distance : closestObstacle
			};
		} else {
			return {
				collision : false
			}
		}
	};

	Collider.prototype.checkRightCollisions = function (newPos, statics) {
		var nextCol;
		var closestObstacle = 1000;
			nextCol = Math.floor (newPos.x + this.width);
			for (var i = Math.floor (newPos.y); i < Math.floor (newPos.y + this.height); i++) {
				if (statics[i] != undefined) {
					if (statics[i][nextCol] != false) {
						var obj = statics[i][nextCol];
						if (obj.collider.type == "block") {
							var distance = nextCol - (this.position.x + this.width);
							if (Math.abs(distance) < Math.abs(closestObstacle)) {
								closestObstacle = distance;
							}
						}	
					}
				}
			};
			if (closestObstacle != 1000) {
				return {
					collision : true,
					distance : closestObstacle
				};
			} else {
				return {
					collision : false
				}
			}	
	};

	Collider.prototype.checkTopCollisions = function (newPos, statics) {
		var nextLine;
		var closestObstacle = 1000;
		nextLine = Math.floor (newPos.y);
		for (var i = Math.floor (newPos.x); i < Math.floor (newPos.x + this.width); i++) {
			if (statics[nextLine] != undefined) {
				if (statics[nextLine][i] != false) {
					var obj = statics[nextLine][i];
					if (obj.collider.type == "block") {
						var distance = nextLine - this.position.y;
						if (Math.abs(distance) < Math.abs(closestObstacle)) {
							closestObstacle = distance;
						}
					}	
				}
			}
		};
		if (closestObstacle != 1000) {
			return {
				collision : true,
				distance : closestObstacle
			};
		} else {
			return {
				collision : false
			}
		}
	};

	Collider.prototype.checkBottomCollisions = function (newPos, statics) {
		var nextLine;
		var closestObstacle = 1000;
		nextLine = Math.floor (newPos.y + this.height);
		for (var i = Math.floor (newPos.x ); i < Math.floor (newPos.x + this.width); i++) {
			if (statics[nextLine] != undefined) {
				if (statics[nextLine][i] != false) {
					var obj = statics[nextLine][i];
					if (obj.collider.type == "block") {
						var distance = nextLine - (this.position.y + this.height);
						if (Math.abs(distance) < Math.abs(closestObstacle)) {
							closestObstacle = distance;
						}
					}
				}
			}
		};
		if (closestObstacle != 1000) {
			return {
				collision : true,
				distance : closestObstacle
			};
		} else {
			return {
				collision : false
			}
		}
	};

	Collider.prototype.DrawDebug = function (cétéhixe) {
		cétéhixe.fillStyle = "rgba(0, 250, 0, 0.3)";
		cétéhixe.strokeStyle = "green";
		cétéhixe.strokeWidth = 3;

		var cameraInfos = camera.isObjectVisible ({
			x : this.position.x,
			y : this.position.y,
			w : this.width,
			h : this.height,
			layer : this.layer
		});
		if (cameraInfos) {
			cétéhixe.fillRect (
				cameraInfos.x * config.unitSize,
				cameraInfos.y * config.unitSize,
				cameraInfos.w * config.unitSize,
				cameraInfos.h * config.unitSize
			);		
			cétéhixe.strokeRect (
				cameraInfos.x * config.unitSize,
				cameraInfos.y * config.unitSize,
				cameraInfos.w * config.unitSize,
				cameraInfos.h * config.unitSize
			);
		}

	};

	return Collider;
});