//Made by Los
// See my website http://www.laisney.org
define(["Raclette/Debug", "Raclette/pageManager", "game/images.js", "Raclette/AnimationManager"], function(Debug, pageManager, images, animationManager)
{	
	function InterfaceManager()
	{
		var self = this;
		this.animationManager = animationManager;
		
		//interfaceManager need to be init
		this.init = function ()
		{
			self.objects = [];
		}
		/**************** ADD IMAGE ****************
			id : id need to be unique
			active : boolean
			begin : boolean display before logique
			end : boolean display after logique
			onComplete : next id to display
			img : imageManager to display
			posX / posY : position (x,y)
			width / height : in pixels
			example image object : {id : 'image1', active : true, begin : true, img : 'imagename', posX : 900, posY : 655, width : 228, height : 123}
		**************** ADD TEXTE ****************
			id : id need to be unique
			active : boolean
			begin : boolean display before logique
			end : boolean display after logique
			onComplete : next id to display
			txt : texte to display
			posX / posY : position (x,y)
			color : color RGB
			font : font
			size : font size
			example text object : {id : 'txt1', active : true, begin : true, txt : 'text to display', posX : 900, posY : 655, color : 'rgb(255,255,255)', size : '12pt', font : 'Arial'}
		**************** ADD RECTANGLE ****************
			id : id need to be unique
			active : boolean
			begin : boolean display before logique
			end : boolean display after logique
			onComplete : next id to display
			rect : need to be true
			posX / posY : position (x,y)
			color : color RGBA
			example text object : {id : 'powerRect', active : true, begin : true, rect : true, posX : 169, posY : 714, width : 0, height : 48, color : 'rgba(0,0,0,0.8)'}; 
		**************** ADD TUTORIAL ****************
			fps : nb frame per second to display
		*/
		this.add = function (object)
		{
			self.objects[object.id] = object;
			self.objects[object.id].currentfps = self.objects[object.id].fps;
		}
		//Render before logique
		this.renderBegin = function ()
		{
			for(key in self.objects)
			{
				if(self.objects[key].begin)
					this.render(self.objects[key]);
			}
		}
		//Render after logique
		this.renderEnd = function ()
		{
			for(key in self.objects)
			{
				if(self.objects[key].end)
					this.render(self.objects[key]);	
			}
		}
		//Render
		this.render = function (object)
		{
			if(!object.active)
				return;
			if(object.img)
				this.displayImg(object);
			else if(object.txt)
				this.displayTxt(object);
			else if(object.rect)
				this.displayRect(object);
			if(object.fps)
			{
				object.currentfps--;
				if(object.currentfps <= 0)
				{
					if(object.onComplete)
						this.active(object.onComplete, object.fps);
					object.active = false;
				}
			}					
		}
		//you need to specify the id of your object to update an element
		this.update = function (object)
		{
			if (!self.objects[object.id]){ return;}
			for ( var o in object )
				self.objects[object.id][ o ] = object[ o ];
		}
		//You need to specify the id of your object to update an element
		this.remove = function (id)
		{
			delete self.objects[id]
		}
		//Image Function
		this.displayImg = function (object)
		{
			var p = this.animationManager.getAnim(object.img).renderer;
			var renderer = {
				sx : p.sx,
				sy : p.sy,
				sw : p.sw,
				sh : p.sh
			};
			var img = this.animationManager.getAnim(object.img).image;
			if (object.alpha == undefined) object.alpha = 1;
			pageManager.ctx.globalAlpha = object.alpha;
			pageManager.ctx.drawImage(img, renderer.sx, renderer.sy, renderer.sw, renderer.sh, object.posX, object.posY, object.width, object.height);
			pageManager.ctx.globalAlpha = 1;
		}
		//Text function
		this.displayTxt = function (object)
		{
			pageManager.ctx.font = object.size + " " + object.font;
			pageManager.ctx.fillStyle = object.color;
			pageManager.ctx.fillText(object.txt, object.posX, object.posY);
		}
		//Rect function
		this.displayRect = function (object)
		{
			pageManager.ctx.fillStyle = object.color;
			pageManager.ctx.fillRect(object.posX, object.posY, object.width, object.height);
		}
		/**************** ACTIVE ****************
		Set active true
		Change duration if you specify "fps"
		*/
		this.active = function (id, fps)
		{
			self.objects[id].active = true;
			if(fps)
				self.objects[id].fps = fps;
			self.objects[id].currentfps = self.objects[id].fps;
		}
	}
	return new InterfaceManager;	
});