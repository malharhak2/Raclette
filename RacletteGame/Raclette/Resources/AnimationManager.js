define(["rDebug", "rutils", "game/images","game/animsData", "rimageManager", "rAnimationInstance"], function(debug, utils, images, externalData, imageManager, AnimationInstance) {

	var AnimationManager = function() {
		this.externalData = externalData;
		this.imageManager = imageManager;
		imageManager.init("game/images/");
		imageManager.pushImages(images);
		this.animsDatas = {};
		this.anims = [];
	};

	AnimationManager.prototype.init = function () {
		this.pushAnimsDatas(this.externalData);
	};
	AnimationManager.prototype.getAnim = function(animimage, animId) {
		if (animId == null|| animId == undefined) {
			var animModel = {}
			var animInstance = new AnimationInstance({animName: animimage})
			animModel.image = this.imageManager.get(animimage);
			animModel.width = animModel.image.width;
			animModel.height = animModel.image.height;
			animInstance.renderer = {
				sx : 0,
				sy : 0,
				sw : animModel.width,
				sh : animModel.height
			}
			animInstance.image = animModel.image;
			return animInstance
		} else {
			return this.anims[animId]
		}
	};

	AnimationManager.prototype.pushAnimsDatas = function(anim) {
		debug.log("Anim Manager", "Pushing anims...");
		for (var i in anim) {
			this.animsDatas[i] = anim[i];
			var p = this.animsDatas[i];
			p.image = this.imageManager.get(anim[i].image);
		};
		debug.log("Anim Manager", "Anims pushed !");
	};

	AnimationManager.prototype.createAnim = function(instance) {
		var myAnim = new AnimationInstance(instance);
			debug.log("Anim Manager", instance);
		
		if (instance.dir == undefined) {
			myAnim.dir = this.animsDatas[instance.animName].defaultDir || "none";
		}
		if (instance.state == undefined) {
			myAnim.state = this.animsDatas[instance.animName].defaultState || "idle";
		}
		this.anims.push(myAnim);
		return myAnim;
	};

	AnimationManager.prototype.animate = function (renderer) {
		var animInstance = renderer.animation;
		var animModel = this.animsDatas[renderer.image]
		var objectDir;
		var objectState; 
		if (animModel !== undefined) {
			if (animModel.noanim){
				animModel.image = this.imageManager.get(renderer.image);
				animModel.width = animModel.image.width;
				animModel.height = animModel.image.height;
				animInstance = new AnimationInstance({animName: renderer.image})
				animInstance.coordinates = {
					sx : 0,
					sy : 0,
					sw : animModel.width,
					sh : animModel.height
				};
			} else {
				if (renderer.dir != "") {
					animInstance.dir = renderer.dir;
				}

				if (renderer.state != "") {
					animInstance.state = renderer.state;
				}
				if (renderer.step != undefined && renderer.step != null) {
					animInstance.step = renderer.step;
					renderer.step = null;
				}
				if (renderer.onEnd != undefined) {
					animInstance.onEnd = renderer.onEnd;
				}
				if (Date.now() - animInstance.lastStep > (animModel.states[animInstance.state].options.pace)) {
					window.FULLSTOP;
					animInstance.lastStep = Date.now();
					animInstance.step++;
					if (animInstance.step >= (animModel.states[animInstance.state][animInstance.dir].size || animModel.size)) {
						animInstance.step = 0;

						if (typeof animInstance.onEnd == 'function') {
							animInstance.onEnd();
						}
					}
					animInstance.coordinates = {
						sx : animModel.width * animInstance.step,
						sy : animModel.height * animModel.states[animInstance.state][animInstance.dir].position,
						sw : animModel.width,
						sh : animModel.height
					};
				}
			}
		} else {
			animModel = this.animsDatas[renderer.image] = {"noanim" : true};
		}
	};

	return new AnimationManager();
});