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
		this.onCollision = args.onCollision;
		this.mass = args.mass || 1;
		this.type = args.type;
		this.gravity = false;
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
		if (axis == "horizontal") {
			this.SetVelocity ({
				x : 0
			});
		} else {
			this.SetVelocity ({
				y : 0
			})
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
		if (this.velocity.x > config.maxSpeed.x) {
			this.velocity.x = config.maxSpeed.x;
		} else if (this.velocity.x < -config.maxSpeed.x) {
			this.velocity.x = -config.maxSpeed.x;
		}
		if (this.velocity.y > config.maxSpeed.y) {
			this.velocity.y = config.maxSpeed.y;
		} else if (this.velocity.y < -config.maxSpeed.y) {
			this.velocity.y = -config.maxSpeed.y;
		}
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

		var horizontalCol = this.checkHorizontalCollisions (this.velocity.x, statics);
		this.newPosition.x = this.position.x + horizontalCol;

		this.newPosition.y = this.position.y + this.moveStep.y;
		var verticalCol = this.checkVerticalCollisions (this.velocity.y, statics);
		this.newPosition.y = this.position.y + verticalCol;

		this.position = this.newPosition;


	};

	Collider.prototype.applyGravity = function () {
		if (this.gravity) {
			if (utils.chances (50)) {
				debug.log("Collider", "Apply Gravity");
			}
			
			this.velocity.x += config.gravity.x * this.mass * time.deltaTime;
			this.velocity.y += config.gravity.y * this.mass * time.deltaTime;
		}
	};

	Collider.prototype.SetGravity = function (gravity) {
		this.gravity = gravity;
	}
	Collider.prototype.ApplyForce = function (force) {
		this.velocity.x += force.x || 0;
		this.velocity.y += force.y || 0;
	};

	Collider.prototype.checkHorizontalCollisions = function (velocity, statics) {
		var nextCol;
		var closestObstacle = 1000;
		if (velocity < 0) {
			nextCol = Math.floor (this.newPosition.x);
			for (var i = Math.floor (this.newPosition.y); i < Math.floor (this.newPosition.y + this.height); i++) {
				if (statics[i] != undefined) {
					if (statics[i][nextCol].collider != undefined) {
						if (statics[i][nextCol].collider.type == "block") {
							var distance = nextCol - this.newPosition.x;
							if (Math.abs(distance) < Math.abs(closestObstacle)) {
								closestObstacle = distance;
								this.Collision ("left", statics[i][nextCol]);
							}
						}	
					}
				}
			}
		} else if (velocity > 0) {
			nextCol = Math.floor (this.newPosition.x + this.width);
			for (var i = Math.floor (this.newPosition.y); i < Math.floor (this.newPosition.y + this.height); i++) {
				if (statics[i] != undefined) {
					if (statics[i][nextCol].collider!= undefined) {
						if (statics[i][nextCol].collider.type == "block") {
							debug.log("Physics", statics[i][nextCol]);
							var distance = nextCol - (this.newPosition.x + this.width);
							if (distance < closestObstacle) {
								this.Collision ("right", statics[i][nextCol]);
								closestObstacle = distance;
							}
						}
					}
				}
			}
		}
		if (Math.abs(closestObstacle) < Math.abs(this.moveStep.x)) {
			return closestObstacle;
		} else {
			return this.moveStep.x;
		}

	};
	Collider.prototype.checkVerticalCollisions = function (velocity, statics) {
		var nextLine;
		var closestObstacle = 1000;
		if (velocity < 0) {
			nextLine = Math.floor (this.newPosition.y);
			for (var i = Math.floor (this.newPosition.x); i < Math.floor (this.newPosition.x + this.width); i++) {
				if (statics[nextLine] != undefined) {
					if (statics[nextLine][i].collider != undefined) {
						if (statics[nextLine][i].collider.type == "block") {
							var distance = nextLine  - this.newPosition.y;
							debug.log("Collider", "test", closestObstacle, velocity, nextLine, statics, distance);
							if (Math.abs(distance) < Math.abs(closestObstacle)) {
								closestObstacle = distance;
								this.Collision ("top", statics[nextLine][i]);
							}
						}
					}
				}
			}
		} else if (velocity > 0) {
			nextLine = Math.floor (this.newPosition.y + this.height);
			for (var i = Math.floor (this.newPosition.x); i < Math.floor (this.newPosition.x + this.width); i++) {
				if (statics[nextLine] != undefined) {
					if (statics[nextLine][i].collider != undefined) {
						if (statics[nextLine][i]) {
							var distance = nextLine - (this.newPosition.y + this.height);
							if (distance < closestObstacle) {
								closestObstacle = distance;
								this.Collision ("bottom", statics[nextLine][i]);
							}
						}
					}
				}
			}
		}
		if (Math.abs(closestObstacle) < Math.abs(this.moveStep.y)) {
			return closestObstacle;
		} else {
			return this.moveStep.y;
		}

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