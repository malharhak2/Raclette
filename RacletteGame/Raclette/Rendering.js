define(["Raclette/Debug", "Raclette/pageManager", "game/images.js", "Raclette/AnimationManager", "Raclette/Camera"], function(debug, pageManager, images, animationManager, Camera) {
	var pageManager = pageManager;
	var animationManager = animationManager;
	function renderObject(object) {
		animationManager.animate(object)
		var p = animationManager.getAnim(object.renderer.img, object.renderer.anim).renderer;
		var renderer = {
			sx : p.sx,
			sy : p.sy,
			sw : p.sw,
			sh : p.sh
		};
		var img = animationManager.animsDatas[object.renderer.img].img;
		if (object.angle != 0) {
			pageManager.ctx.save();
			pageManager.ctx.translate(object.x + object.w/2 - object.w/4, object.y + object.h/2 - object.w/4);
			pageManager.ctx.rotate(object.angle);
			pageManager.ctx.drawImage(img,renderer.sx, renderer.sy, renderer.sw, renderer.sh, -object.w/2, -object.h/2, object.w, object.h);
			pageManager.ctx.restore();
		} else {
			try {
				pageManager.ctx.drawImage(img,renderer.sx, renderer.sy, renderer.sw, renderer.sh, object.x-object.w/4, object.y-object.h/4, object.w, object.h);
			} catch(err) {
				debug.log("Rendering", "Error with : ", object, renderer, err)
			}
		}	
	};

	function renderSquare(object) {
		if (object.angle != 0) {
			pageManager.ctx.save();
			pageManager.ctx.translate(object.x + object.w/2, object.y + object.h/2);
			pageManager.ctx.rotate(object.angle);
			pageManager.ctx.fillStyle = "red";
			pageManager.ctx.fillRect(-object.w/2, -object.h/2, object.w, object.h);
			pageManager.ctx.restore();
		} else {
			pageManager.ctx.fillRect(object.x, object.y, object.w, object.h);
		}		
	};
	function cleanCanvas() {
		var ctx = pageManager.ctx;
		ctx.clearRect(0,0,pageManager.canvas.width, pageManager.canvas.height);
	}
	return {
		pageManager: pageManager,
		renderObject : renderObject,
		renderSquare: renderSquare,
		cleanCanvas : cleanCanvas
	};
});