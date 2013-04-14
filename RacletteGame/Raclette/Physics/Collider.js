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
		this.goingThrough = false;
	};


	Collider.prototype.Collision = function (axis, type) {
		if (this.onCollision) {
			debug.log("Physics", "Collision", axis, type);
			this.onCollision(axis, type);
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
				this.Collision ("left", check.obstacle);
			}
		} else if (this.velocity.x > 0) {
			var check = this.checkRightCollisions(this.newPosition, statics);
			if (check.collision) {
				this.newPosition.x = this.position.x + check.distance;
				this.velocity.x = 0;
				this.Collision ("right", check.obstacle);
			}
		}
		this.newPosition.y += this.moveStep.y;

		if (this.velocity.y < 0) {
			var check = this.checkTopCollisions (this.newPosition, statics) 
			if (check.collision ) {
				this.newPosition.y = this.position.y + check.distance;
				this.velocity.y = 0;
				this.Collision ("top", check.obstacle);
			}
		} else if (this.velocity.y > 0) {
			var check = this.checkBottomCollisions(this.newPosition, statics);
			if (check.collision) {
				this.newPosition.y = this.position.y + check.distance;
				this.velocity.y = 0;
				this.Collision ("bottom", check.obstacle);
			}
		}
		this.position = this.newPosition;


	};

	Collider.prototype.applyGravity = function () {
		if (this.gravity) {
			this.velocity.x = this.velocity.x + config.gravity.x * this.mass * time.deltaTime;
			this.velocity.y = this.velocity.y + config.gravity.y * this.mass * time.deltaTime;
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
		var checkStart = Math.floor (newPos.y);
		var checkEnd = Math.floor (newPos.y + this.height);
		for (var i = checkStart ; i <= checkEnd; i++) {
			if (statics[i] != undefined) {
				if (statics[i][nextCol] != false) {
					var obj = statics[i][nextCol];
					if (obj.collider.type == "block"
					|| obj.collider.type == "platform"
					|| obj.collider.type == "breakable") {
						var distance = nextCol + 1.001 - (this.position.x );
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
				distance : closestObstacle,
				obstacle : obj.collider.type
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
		var checkStart = Math.floor (newPos.y);
		var checkEnd = Math.floor(newPos.y + this.height);
			nextCol = Math.floor (newPos.x + this.width + 0.001);
			for (var i = checkStart ; i <= checkEnd; i++) {
				if (statics[i] != undefined) {
					if (statics[i][nextCol] != false) {
						var obj = statics[i][nextCol];
						if (obj.collider.type == "block"
						|| obj.collider.type == "platform"
						|| obj.collider.type == "breakable") {
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
					distance : closestObstacle,
					obstacle : obj.collider.type
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
		var checkStart = Math.floor (newPos.x);
		var checkEnd = Math.floor (newPos.x + this.width + 1);
		for (var i = checkStart; i < checkEnd; i++) {
			if (statics[nextLine] != undefined) {
				if (statics[nextLine][i] != false) {
					var obj = statics[nextLine][i];
					if (obj.collider.type == "block"
					|| obj.collider.type == "platform"
					|| obj.collider.type == "breakable") {
						var distance = nextLine + 1.00001 - this.position.y;
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
				distance : closestObstacle,
				obstacle : obj.collider.type
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
		var checkEnd = Math.floor (newPos.x + (this.width + 1) - 0.001);
		var checkStart = Math.floor (newPos.x);
		nextLine = Math.floor (newPos.y + this.height);
		for (var i = checkStart; i < checkEnd; i++) {
			if (statics[nextLine] != undefined) {
				if (statics[nextLine][i] != false && statics[nextLine][i] != undefined) {
					var obj = statics[nextLine][i];

					if ((obj.collider.type == "block" 
					|| obj.collider.type == "platform" 
					|| obj.collider.type == "breakable" 
					|| obj.collider.type == "onewayplatform")
					&& (!this.goingThrough || obj.collider.type != "onewayplatform")) {
						var distance = nextLine - 0.00001 - (this.position.y + this.height);
						if (Math.abs(distance) < Math.abs(closestObstacle) && this.position.y + this.height< nextLine) {
							closestObstacle = distance;
							return {
								collision : true,
								distance : closestObstacle,
								obstacle : obj.collider.type
							};
						}
					}
				}
			}
		};
		return {
			collision : false
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