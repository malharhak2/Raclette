define (["Raclette/Debug", "Raclette/AnimationManager", "Raclette/imageManager", "Raclette/CanvasManager"], function (debug, animationManager, imageManager, canvasManager) {
	var Renderer = function (args) {
		this.unitSize = {
			x : 64,
			y : 64
		};
		this.type = args.type;
		this.image = args.image;
		this.width = args.width;
		this.height = args.height;
		this.position = args.position;
		this.state = args.state;
		this.dir = args.dir;
		this.init();
	};

	Renderer.prototype.update = function (args) {
		if (this.type == "spritesheet") {
			animationManager.animate(this);
		}
		this.position = args.position;
		this.state = args.state;
		this.dir = args.dir;
	}
	Renderer.prototype.init = function () {
		if (this.type == "spritesheet") {
			this.animation = animationManager.createAnim ({
				animName : this.image
			});
		} else if (this.type == "tileset") {

		}
	};

	Renderer.prototype.render = function () {
		var co = this.getRenderCoordinates ();
		var renderInfos = {
			image : this.image,
			sx : co.sx,
			sy : co.sy,
			sw : co.sw,
			sh : co.sh,
			dx : co.dx,
			dy : co.dy,
			dw : co.dw,
			dh : co.dh
		};
		canvasManager.ctx.drawImage(
			imageManager.get(renderInfos.image), 
			renderInfos.sx,
			renderInfos.sy,
			renderInfos.sw * this.unitSize.x,
			renderInfos.sh * this.unitSize.y,
			renderInfos.dx,
			renderInfos.dy,
			renderInfos.dw * this.unitSize.x,
			renderInfos.dh * this.unitSize.y
		);

	};

	Renderer.prototype.getRenderCoordinates = function () {
		var coordinates = {
			sx : this.animation.coordinates.sx,
			sy : this.animation.coordinates.sy,
			sw : this.animation.coordinates.sw,
			sh : this.animation.coordinates.sh,
			dx : this.position.x,
			dy : this.position.y,
			dw : this.width,
			dh : this.height
		};
		return coordinates;
	};

	return Renderer;
});