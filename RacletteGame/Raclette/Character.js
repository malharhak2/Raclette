define (["rDebug", "rCONFIG", "rutils", "rTime", "rSoundManager", "rJsonStorer"],
function (debug, config, utils, time, soundManager, jsonStorer) {
	var Character = function (parent) {
		this.parent = parent;

		this.initSpeed = 0.005;
		this.acceleration = {
			x : 0.00015,
			y : 0.00026
		};
		this.maxSpeed = {
			x : 0.015,
			y : 0.01
		};
		this.stopMultiplicator = 1;
		this.turnbackMultiplicator = 1;
		this.defaultAnimSpeed = 1;

		this.jumpForce = -0.009;

		this.lastJump = Date.now();
		this.lastJumpEnd = Date.now();

		this.onPlatform = false;
		this.canJump = false;
		this.jumping = false;
		this.canFall = true;
		this.descending = true;

		this.goingThrough = false;
		this.goingThroughTimer = 100;
		this.lastGoThrough = Date.now();
		this.entring = false;
		this.gravity = false;
		this.ignoreGravity = false;
		this.flying = true;
	};

	Character.prototype.init = function (args) {
		this.gameObject = args.gameObject;
		this.initSpeed = args.initSpeed || 0.005;
		this.acceleration = args.acceleration || {
			x : 0.00015,
			y : 0.00026
		};
		this.maxSpeed = args.maxSpeed || {
			x : 0.015,
			y : 0.01
		};
		this.stopMultiplicator = args.stopMultiplicator || 1;
		this.turnbackMultiplicator = args.turnbackMultiplicator || 1;
		this.defaultAnimSpeed = args.defaultAnimSpeed || 1;
		this.jumpForce = args.jumpForce || -0.009;

		this.position = this.GetPosition();
		this.lastPosition = {
			x : this.position.x,
			y : this.position.y
		};
		this.startFalling();
		debug.log("Character init", this.gameObject);
	};

	Character.prototype.stayStill = function (){
		if (this.GetVelocity().x > 0) {
			this.ApplyForce ({
				x : -this.acceleration.x * this.stopMultiplicator
			});
			if (this.GetVelocity().x < 0) {
				this.GetVelocity().x = 0;
			}
		} else if (this.GetVelocity().x < 0) {
			this.ApplyForce ({
				x : this.acceleration.x * this.stopMultiplicator
			});
			if (this.GetVelocity().x > 0) {
				this.GetVelocity().x = 0;
			}
		}
	};

	Character.prototype.moveRight = function (force){
		if (this.entring) return;
		var mul = 1;
		if (this.GetVelocity().x < this.initSpeed && this.GetVelocity().x > 0) {
			this.ApplyForce ({
				x : this.initSpeed
			});
		}
		if (this.GetVelocity().x < 0) {
			mul = this.turnbackMultiplicator;
		}
		if (this.GetVelocity().x < this.maxSpeed.x) {
			this.ApplyForce ({
				x : this.acceleration.x * mul * force
			});
			this.gameObject.state = "move";
			this.gameObject.dir = "right";
		} else {
			this.flying = true;
			this.gameObject.state = "maxspeed";
			this.gameObject.dir = "right";
		}
		if (this.jumping) {
			this.gameObject.state = "jumpMiddle";
		}
	}
	Character.prototype.moveLeft = function (force){
		if (this.entring) return;
		var mul = 1;
		if (this.GetVelocity().x > -this.initSpeed && this.GetVelocity().x < 0) {
			this.ApplyForce ({
				x : -this.initSpeed
			})
		}
		if (this.GetVelocity().x > 0) {
			mul = this.turnbackMultiplicator;
		}
		if (this.GetVelocity().x > -this.maxSpeed.x) {
			this.ApplyForce ({
				x : -this.acceleration.x * mul * force
			});
			this.gameObject.state = "move";
			this.gameObject.dir = "left";
		} else {
			this.flying = true;
			this.gameObject.state = "maxspeed";
			this.gameObject.dir = "left";
		}
		if (this.jumping) {
			this.gameObject.state = "jumpMiddle";
		}		
	}

	Character.prototype.jump = function (){
		if (this.entring) return;
		if (this.canJump && (this.descending || this.onPlatform)) {
			this.startJumping();
			this.descending = false;
			this.gameObject.state = "jumpMiddle";
		}
	};

	Character.prototype.startJumping = function () {		
		if (Math.abs(this.GetVelocity().x) > 0.001 && time.currentFrame - this.lastJumpEnd < this.jumpTimer) {
			this.jumpSequence++;
			if (this.jumpSequence > this.jumpForces.length - 1) {
				this.jumpSequence = this.jumpForces.length - 1;
			}
			debug.log("Jump", "Jump sequence level " + this.jumpSequence);
		} else {
			debug.log("Jump", "sequence end")
			this.jumpSequence = 1;
		}
		this.ApplyForce ({
			y : this.jumpForce
		});
		this.lastJump = Date.now();
		this.jumping = true;
		this.onPlatform = false;
		this.canJump = false;
		this.descending = false;
		this.jumpStart = this.position.y;	
		this.startFalling();	
	};

	Character.prototype.preUpdate = function () {
		var bottomObject = this.gameObject.collider.checkObjectsVertical({
			x : this.gameObject.collider.position.x,
			y : this.gameObject.collider.position.y + 0.01
		}, "bottom");
		if (bottomObject.collision && bottomObject.obstacle.type == "movingplatform") {
			this.gameObject.collider.attachCollider(bottomObject.obstacle.collider);
		} else {
			this.gameObject.collider.detachCollider();
		}		
	};

	Character.prototype.update = function () {
		var map = jsonStorer.getJson();
		if (this.position.y < map.height - 20) {
			this.flying = true;
		}
		this.lastPosition = {
			x : this.position.x,
			y : this.position.y
		};
		this.position = this.GetPosition();
		if (this.lastPosition.y < this.position.y) {
			this.midJump();
		}
		if (this.onPlatform ) {
			var check = this.gameObject.collider.checkBottomCollisions ({
				x : this.GetPosition().x,
				y : this.GetPosition().y + 0.1
			});

			if (!check.collision) {
				this.startFalling();
			} else if (this.goingThrough && (check.obstacle == "onewayplatform")) {
				this.startFalling();
			}
		}
		if (time.currentFrame - this.lastGoThrough > this.goingThroughTimer) {
			this.endGoingThrough();
		}
		if (this.gravity && this.ignoreGravity){
			this.gameObject.collider.gravity = false;
		}
		if (!this.gameObject.collider.gravity && this.gravity && !this.ignoreGravity){
			this.gameObject.collider.gravity = true; 
		}
	};

	Character.prototype.onCollision = function (args) {
		if (args.direction == "bottom" && this.descending && this.jumping) {
			this.endJump();
		} else if (args.direction == "bottom" && this.descending && !this.onPlatform && !this.goingThrough) {
			this.endFalling();
		}
		this.parent.collision(args);
	};

	Character.prototype.onMessage = function (message) {
		if (typeof this.parent.onMessage == "function") {
			this.parent.onMessage (message);
		}
	};

	Character.prototype.endJump = function () {
		debug.log("Character", "end jumping");
		this.endFalling();
		this.jumping = false;
		this.canJump = true;
		this.lastJumpEnd = Date.now();
		this.flying = false;
	};

	Character.prototype.midJump = function () {
		this.canFall = true;
		this.descending = true;
		this.gameObject.renderer.resumeAnim();
	}

	Character.prototype.goThrough = function () {
		this.goingThrough = true;
		this.lastGoThrough = time.currentFrame;
		this.gameObject.collider.goingThrough = true;
	};
	Character.prototype.endGoingThrough = function () {
		this.goingThrough = false;
		this.gameObject.collider.goingThrough = false;
	}

	Character.prototype.startFalling = function () {
		debug.log("Character", "Start falling");
		this.gameObject.collider.SetGravity (true);
		this.canJump = false;
		this.canFall = true;
		this.descending = true;
		this.onPlatform = false;
		this.gravity = true;
	};

	Character.prototype.endFalling = function () {
		debug.log("Character", "endFalling");
		this.gameObject.collider.SetGravity (false);
		this.canJump = true;
		this.canFall = true;
		this.onPlatform = true;
		this.descending = true;
		this.gravity = false;
		this.flying = false;
	};

	Character.prototype.GetPosition = function () {
		return this.gameObject.GetPosition();
	};
	Character.prototype.GetVelocity = function () {
		return this.gameObject.collider.GetVelocity();
	};
	Character.prototype.ApplyForce = function (force) {
		this.gameObject.collider.ApplyForce(force);
	};

	return Character;

});