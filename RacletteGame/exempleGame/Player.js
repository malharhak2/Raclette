define(["rDebug", "rTime", "rWorldManager"], function(debug, time, worldManager){
	function Player()
	{
		this.body = {};
		this.transform = {
			position:{
				x: 0,
				y: 0
			},
			size:{
				w:0,
				h:0
			}
		}
		this.speed = {
			x : 0,
			y : 0
		};
		this.acceleration = {
			x : 0.00009,
			y : 0.00026
		};
		this.maxSpeed = {
			x : 0.01,
			y : 0.01
		};
		this.stopMultiplicator = 4;
		this.turnbackMultiplicator = 6;

		this.jumpForces = [
			-0.004,
			-0.005,
			-0.006
		];

		this.jumpHeight = 1.5;
		this.jumpUp = 2.8;
		this.lastJump = Date.now();
		this.lastJumpEnd = Date.now();
		this.jumpTimer = 500;
		this.jumpSequence = 1;

		this.load = false
		this.leftLoad = false;
		this.rightLoad = false;
		this.attack = false;
		this.timerMaxCoup = 50;
		this.timerCoup = this.timerMaxCoup;

		this.onPlatform = false;
		this.canJump = false;
		this.jumping = false;
		this.falling = true;
		this.canFall = true;
		this.descending = true;

	}

	Player.prototype.setNormal = function(){
		this.load = false;
		this.leftLoad = false;
		this.rightLoad = false;
		this.attack = false;
	}
	Player.prototype.init = function (data) {
		this.worldObject = data;
		this.position = this.GetPosition();
		this.startFalling();
	};
	Player.prototype.stayStill = function (){
		if (this.GetVelocity().x > 0) {
			this.ApplyForce ({
				x : -this.acceleration.x * this.stopMultiplicator
			});
			if (this.GetVelocity().x < 0) {
				this.GetVelocity().x = 0;
			}
		} else if (this.GetVelocity().x < 0) {
			this.ApplyForce ({
				x : this.acceleration.x * 20
			});
			if (this.GetVelocity().x > 0) {
				this.GetVelocity().x = 0;
			}
		}
	};

	Player.prototype.moveRight = function (force){
		var mul = 1;
		if (this.GetVelocity().x < 0) {
			mul = this.turnbackMultiplicator;
		}
		if (this.GetVelocity().x < this.maxSpeed.x) {
			this.ApplyForce ({
				x : this.acceleration.x * mul * force
			});
		}
		this.worldObject.renderer.state = "move";
		this.worldObject.renderer.dir = "right";
	}
	Player.prototype.moveLeft = function (force){
		var mul = 1;
		if (this.GetVelocity().x > 0) {
			mul = this.turnbackMultiplicator;
		}
		if (this.GetVelocity().x > -this.maxSpeed.x) {
			this.ApplyForce ({
				x : -this.acceleration.x * mul * force
			});
		}
		this.worldObject.renderer.state = "move";
		this.worldObject.renderer.dir = "left";
	}

	Player.prototype.updateCollider = function () {
		this.worldObject.collider.SetVelocity (this.speed);
	}
	Player.prototype.jump = function (){
		if (this.canJump && (this.descending || this.onPlatform)) {
			this.startJumping();
			this.descending = false;
		}
	};

	Player.prototype.startJumping = function () {
		debug.log("Player", "jump");
		
		if (Math.abs(this.GetVelocity().x) > 0.001 && time.currentFrame - this.lastJumpEnd < this.jumpTimer) {
			this.jumpSequence++;
			if (this.jumpSequence > this.jumpForces.length) {
				this.jumpSequence = 3;
			}
			debug.log("Jump", "Jump sequence level " + this.jumpSequence);
		} else {
			debug.log("Jump", "sequence end")
			this.jumpSequence = 1;
		}
		this.ApplyForce ({
			y : this.jumpForces[this.jumpSequence]
		});
		this.lastJump = Date.now();
		this.jumping = true;
		this.onPlatform = false;
		this.canJump = false;
		this.jumpStart = this.position.y;	
		this.startFalling();	
	};

	Player.prototype.jumpAsk = function (){
		if (this.jumpAllowed) return true;
	}

	Player.prototype.update = function () {
		this.lastPosition = {
			x : this.position.x,
			y : this.position.y
		};
		this.position = this.GetPosition();
		if (this.lastPosition.y < this.position.y) {
			this.midJump();
		} else if (this.lastPosition.y >= this.position.y){
			this.descending = false;
		}
		if (this.onPlatform ) {
			var check = this.worldObject.collider.checkBottomCollisions ({
				x : this.GetPosition().x,
				y : this.GetPosition().y + 0.01
			}, worldManager.currentWorld.layers["Foreground"].statics);
			if (!check.collision) {
				this.startFalling();
			}
		}
	};
	Player.prototype.onCollision = function (direction) {
		if (this.descending && this.jumping && time.currentFrame - this.lastJump > 200) {
			this.endJump();
		} else if (this.falling && this.descending) {
			this.endFalling();
		}
	};
	Player.prototype.endJump = function () {
		debug.log("Player", "end jumping");
		this.endFalling();
		this.jumping = false;
		this.canJump = true;
		this.lastJumpEnd = Date.now();
	};

	Player.prototype.midJump = function () {
		this.canFall = true;
		this.descending = true;
	}

	Player.prototype.startFalling = function () {
		this.worldObject.collider.SetGravity (true);
		this.canJump = false;
		this.falling = true;
		this.onPlatform = false;
	};

	Player.prototype.endFalling = function () {
		debug.log("Player", "endFalling");
		this.worldObject.collider.SetGravity (false);
		this.canJump = true;
		this.falling = false;
		this.canFall = true;
		this.onPlatform = true;
		this.descending = true;
	};


	Player.prototype.GetPosition = function () {
		return this.worldObject.GetPosition();
	};
	Player.prototype.GetVelocity = function () {
		return this.worldObject.collider.GetVelocity();
	};
	Player.prototype.ApplyForce = function (force) {
		this.worldObject.collider.ApplyForce(force);
	};
	return Player;
});