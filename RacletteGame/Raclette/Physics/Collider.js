define (["rDebug", "rutils", "rCONFIG", "rCanvasManager", "rTime", "rCamera", "rCurrentWorld"], 
function (debug, utils, config, canvasManager, time, camera, currentWorld) {
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
		this.attachedCollider = false;
		this.useCollisions = true;
	};


	Collider.prototype.Collision = function (direction, object) {
		if (this.onCollision) {
			this.onCollision({
				direction : direction,
				object : object
			});
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
	Collider.prototype.update = function () {
		if (this.attachedCollider != false ) {
			if (!this.checkObjectCollision (this.attachedCollider)) {
				this.detachCollider();
			} else {
				var deltaCollider = {
					x : this.attachedCollider.position.x - this.lastAttachedCollision.x,
					y : this.attachedCollider.position.y - this.lastAttachedCollision.y
				};
				this.position.x += deltaCollider.x;
				this.position.y += deltaCollider.y;
				this.lastAttachedCollision = {
					x : this.attachedCollider.position.x,
					y : this.attachedCollider.position.y
				};
			}
		} 
		var statics = currentWorld.getWorld().layers["Midground"].statics
		var objects = currentWorld.getWorld().layers["Midground"].objects;

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

		if (!this.useCollisions) {
			this.position.x += this.moveStep.x;
			this.position.y += this.moveStep.y;
			return;
		}
		if (this.velocity.x < 0) {
			var check = this.checkLeftCollisions(this.newPosition, statics, objects);
			if (check.collision) {
				this.newPosition.x = this.position.x + check.distance;
				this.velocity.x = 0;
				this.Collision ("left", check.obstacle);
			}
		} else if (this.velocity.x > 0) {
			var check = this.checkRightCollisions(this.newPosition, statics, objects);
			if (check.collision) {
				this.newPosition.x = this.position.x + check.distance;
				this.velocity.x = 0;
				this.Collision ("right", check.obstacle);
			}
		}
		this.newPosition.y += this.moveStep.y;

		if (this.velocity.y < 0) {
			var check = this.checkTopCollisions (this.newPosition, statics, objects) 
			if (check.collision ) {
				this.newPosition.y = this.position.y + check.distance;
				this.velocity.y = 0;
				this.Collision ("top", check.obstacle);
			}
		} else if (this.velocity.y > 0) {
			var check = this.checkBottomCollisions(this.newPosition, statics, objects);
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
	Collider.prototype.SetVelocity = function (velocity) {
		if (velocity.x != undefined) {
			this.velocity.x = velocity.x;
		}
		if (velocity.y != undefined) {
			this.velocity.y = velocity.y;
		}
	};

	Collider.prototype.SetGravity = function (gravity) {
		this.gravity = gravity;
	}
	Collider.prototype.ApplyForce = function (force) {
		this.velocity.x += force.x || 0;
		this.velocity.y += force.y || 0;
	};


	Collider.prototype.checkLeftCollisions = function (newPos) {
		var statics = currentWorld.getWorld().layers["Midground"].statics
		var objects = currentWorld.getWorld().layers["Midground"].objects;

		var nextCol;
		var closestObstacle = 1000;
		nextCol = Math.floor (newPos.x);
		var checkStart = Math.floor (newPos.y);
		var checkEnd = Math.floor (newPos.y + this.height);

		var result = {
			collision : false
		};

		for (var i = checkStart ; i <= checkEnd; i++) {
			if (statics[i] != undefined) {
				if (statics[i][nextCol] != false) {
					var obj = statics[i][nextCol];
					if (obj.collider.type == "block"
					|| obj.collider.type == "platform"
					|| obj.collider.type == "breakable") {
						var distance = nextCol + 1.001 - (this.position.x );
						if (Math.abs(distance) < Math.abs(closestObstacle)) {
							result = {
								collision : true,
								distance : distance,
								obstacle : obj
							};
						}
					}	
				}
			}
		};
		var at = this.position.y;
		var ab = this.position.y + this.height;
		var al = newPos.x;
		var ar = newPos.x + this.width;
		for (var i in objects) {
			if (objects[i].collider.type == this.type) {
				continue;
			} 
			var o = objects[i].collider;
			var bl = o.position.x;
			var br = bl + o.width;
			var bt = o.position.y;
			var bb = bt + o.height;
			if (utils.aabb (al, ar, at, ab, bl, br, bt, bb)) {
				var distance = (o.position.x + o.width)  - (this.position.x);
				if (Math.abs (distance) < Math.abs (closestObstacle)) {
					closestObstacle = distance;
					result = {
						collision : true,
						distance : closestObstacle,
						obstacle : objects[i]
					};
					debug.log("Collider", "Left collision", result);
				}
			}
		}
		return result;
	};

	Collider.prototype.checkRightCollisions = function (newPos) {
		var statics = currentWorld.getWorld().layers["Midground"].statics
		var objects = currentWorld.getWorld().layers["Midground"].objects;

		var nextCol;
		var closestObstacle = 1000;
		var checkStart = Math.floor (newPos.y);
		var checkEnd = Math.floor(newPos.y + this.height);
			nextCol = Math.floor (newPos.x + this.width + 0.001);

		var result = {
			collision : false
		}
		for (var i = checkStart ; i <= checkEnd; i++) {
			if (statics[i] != undefined) {
				if (statics[i][nextCol] != false) {
					var obj = statics[i][nextCol];
					if (obj.collider.type == "block"
					|| obj.collider.type == "platform"
					|| obj.collider.type == "breakable") {
						var distance = nextCol - (this.position.x + this.width);
						if (Math.abs(distance) < Math.abs(closestObstacle)) {
							result = {
								collision : true,
								distance : distance,
								obstacle : obj
							};
						}
					}	
				}
			}
		};

		var at = this.position.y;
		var ab = this.position.y + this.height;
		var al = newPos.x;
		var ar = newPos.x + this.width;
		for (var i in objects) {
			if (objects[i].collider.type == this.type) {
				continue;
			} 
			var o = objects[i].collider;
			var bl = o.position.x;
			var br = bl + o.width;
			var bt = o.position.y;
			var bb = bt + o.height;
			if (utils.aabb (al, ar, at, ab, bl, br, bt, bb)) {
				var distance = (o.position.x)  - (this.position.x + this.width);
				if (Math.abs (distance) < Math.abs (closestObstacle)) {
					closestObstacle = distance;
					result = {
						collision : true,
						distance : closestObstacle,
						obstacle : objects[i]
					};
				}
			}
		}
		return result;	
	};

	Collider.prototype.checkTopCollisions = function (newPos) {
		var statics = currentWorld.getWorld().layers["Midground"].statics;
		var objects = currentWorld.getWorld().layers["Midground"].objects;

		var nextLine;
		var closestObstacle = 1000;
		nextLine = Math.floor (newPos.y);
		var checkStart = Math.floor (newPos.x);
		var checkEnd = Math.floor (newPos.x + this.width + 1 - 0.001);

		var result = {
			collision : false
		};

		for (var i = checkStart; i < checkEnd; i++) {
			if (statics[nextLine] != undefined) {
				if (statics[nextLine][i] != false) {
					var obj = statics[nextLine][i];
					if (obj.collider.type == "block"
					|| obj.collider.type == "platform"
					|| obj.collider.type == "breakable") {
						var distance = nextLine + 1.00001 - this.position.y;
						if (Math.abs(distance) < Math.abs(closestObstacle)) {
							result = {
								collision : true,
								distance : distance,
								obstacle : obj
							}
						}
					}	
				}
			}
		};

		var at = newPos.y;
		var ab = newPos.y + this.height;
		var al = this.position.x;
		var ar = this.position.x + this.width;
		for (var i in objects) {
			if (objects[i].collider.type == this.type) {
				continue;
			} 
			var o = objects[i].collider;
			var bl = o.position.x;
			var br = bl + o.width;
			var bt = o.position.y;
			var bb = bt + o.height;
			if (utils.aabb (al, ar, at, ab, bl, br, bt, bb)) {
				var distance = (o.position.y + o.height)  - (this.position.y);
				if (Math.abs (distance) < Math.abs (closestObstacle)) {
					closestObstacle = distance;
					result = {
						collision : true,
						distance : closestObstacle,
						obstacle : objects[i]
					};
				}
			}
		}
		return result;
	};

	Collider.prototype.checkBottomCollisions = function (newPos) {
		var statics = currentWorld.getWorld().layers["Midground"].statics
		var objects = currentWorld.getWorld().layers["Midground"].objects;
		var nextLine;
		var closestObstacle = 1000;
		var checkEnd = Math.floor (newPos.x + (this.width + 1) - 0.001);
		var checkStart = Math.floor (newPos.x);
		nextLine = Math.floor (newPos.y + this.height);

		var result = {
			collision : false
		};
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
							result = {
								collision : true,
								distance : closestObstacle,
								obstacle : obj
							};
						}
					}
				}
			}
		};
		var at = newPos.y;
		var ab = newPos.y + this.height;
		var al = this.position.x;
		var ar = this.position.x + this.width;
		for (var i in objects) {
			if (objects[i].collider.type == this.type) {
				continue;
			} 
			var o = objects[i].collider;
			var bl = o.position.x;
			var br = bl + o.width;
			var bt = o.position.y;
			var bb = bt + o.height;
			if (utils.aabb (al, ar, at, ab, bl, br, bt, bb)) {
				var distance = o.position.y  - (this.position.y + this.height);
				if (Math.abs (distance) < Math.abs (closestObstacle)) {
					closestObstacle = distance;
					result = {
						collision : true,
						distance : closestObstacle,
						obstacle : objects[i]
					};
				}
			}
		}


		return result;
	};

	Collider.prototype.checkObjectCollision = function (collider) {
		var al = this.position.x,
			ar = this.position.x + this.width,
			at = this.position.y,
			ab = this.position.y + this.height + 0.001,
			bl = collider.position.x,
			br = collider.position.x + collider.width,
			bt = collider.position.y,
			bb = collider.position.y + collider.height;

		if (utils.aabb (al, ar, at, ab, bl, br, bt, bb) ) {
			return true;
		} else {
			return false;
		}
	}
	Collider.prototype.getSpecial = function (){
		var position = {
			x: Math.floor(this.position.x),
			y: Math.floor(this.position.y)
		}
		for (var i=position.y; i< position.y + this.height; i++){
			for (var e=position.x; e< position.x + this.width; e++){
				var pos = {
					x: e,
					y: i
				}
				var result = currentWorld.getWorld().isThereASpecial(pos);
				if (result) return result;
			}
		}

		return false; 
	};

	Collider.prototype.attachCollider = function (collider) {
		debug.log("Player", "Attach collider");
		this.lastAttachedCollision = {
			x : collider.position.x,
			y : collider.position.y
		};
		this.attachedCollider = collider;
	};

	Collider.prototype.detachCollider = function () {
		debug.log("Player", "Detach collider");
		this.attachedCollider = false;
	}
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