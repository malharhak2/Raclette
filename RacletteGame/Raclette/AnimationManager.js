define(["Raclette/Debug", "game/images","game/animsData", "Raclette/imageManager", "Raclette/AnimationInstance"], function(debug, images, externalData, ImageManager, AnimationInstance) {

	/** The animation manager
		@class AnimationManager
		@classdesc The main class managing all the animations
		@constructor
	*/
	var AnimationManager = function() {
		this.init();
	};

	AnimationManager.prototype.init = function () {
		this.externalData = externalData;
		this.imageManager = new ImageManager ("Game/images/");
		this.imageManager.pushImages(images);
		this.animsDatas = {};
		this.anims = [];
		this.pushAnimsDatas(this.externalData);
	};
	AnimationManager.prototype.getAnim = function(animImg, animId) {
		if (animId == null|| animId == undefined) {
			var animModel = {}
			var animInstance = new AnimationInstance({animName: animImg})
			animModel.img = this.imageManager.get(animImg);
			animModel.width = animModel.img.width;
			animModel.height = animModel.img.height;
			animInstance.renderer = {
				sx : 0,
				sy : 0,
				sw : animModel.width,
				sh : animModel.height
			}
			animInstance.img = animModel.img;
			return animInstance
		} else {
			return this.anims[animId]
		}
	};

	AnimationManager.prototype.pushAnimsDatas = function(anim) {
		for (var i in anim) {
			this.animsDatas[i] = anim[i];
			var p = this.animsDatas[i];
			p.img = this.imageManager.get(anim[i].img);
		};
	};

	AnimationManager.prototype.createAnim = function(instance) {
		var myAnim = new AnimationInstance(instance);
		if (instance.dir == undefined) {
			myAnim.dir = this.animsDatas[instance.animName].defaultDir || "none";
		}
		if (instance.state == undefined) {
			myAnim.state = this.animsDatas[instance.animName].defaultState || "idle";
		}
		this.anims.push(myAnim);
		return myAnim;
	};

	AnimationManager.prototype.animate = function (object) {
		var animInstance = object.renderer.animation;
		var animModel = this.animsDatas[object.renderer.img]
		var objectDir;
		var objectState; 
		if (animModel !== undefined) {
			if (animModel.noanim){
				animModel.img = this.imageManager.get(object.renderer.img);
				animModel.width = animModel.img.width;
				animModel.height = animModel.img.height;
				animInstance = new AnimationInstance({animName: object.renderer.img})
				animInstance.coordinates = {
					sx : 0,
					sy : 0,
					sw : animModel.width,
					sh : animModel.height
				};
			} else {
				if (object.renderer.dir != "") {
					animInstance.dir = object.renderer.dir;
				}

				if (object.renderer.state != "") {
					animInstance.state = object.renderer.state;
				}
				if (object.renderer.step != undefined && object.renderer.step != null) {
					animInstance.step = object.renderer.step;
					object.renderer.step = null;
				}
				if (object.renderer.onEnd != undefined) {
					animInstance.onEnd = object.renderer.onEnd;
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
			animModel = this.animsDatas[object.renderer.img] = {"noanim" : true};
		}
	};

	return new AnimationManager();
});