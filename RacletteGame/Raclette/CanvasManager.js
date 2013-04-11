define(["rDebug", "rCONFIG", "jquery"], function (debug, config, $) {
	
	var CanvasManager = function() {

		switch (config.screen.mode) {
			case "ratio_css" : 
				this.aspectRatio = config.screen.ratio;
				this.canvasWidth = config.screen.width;
				this.canvasHeight = config.screen.height;
			break;
		}
		this.cssWidth = this.canvasWidth;
		this.cssHeight = this.canvasHeight;
		this.container = $(config.containerID);
		this.gui = $(config.guiID);
		this.init();

	};

	CanvasManager.prototype.cleanCanvas = function () {
		this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
	}

	CanvasManager.prototype.init = function()
	{

		this.canvas = $('<canvas />');
		this.ctx = this.canvas[0].getContext('2d');
		this.canvas.css({
			'position' : "relative",
			'width' : this.cssWidth + 'px',
			'height' : this.cssHeight + 'px'
		});
		this.canvas.attr({
			'width' : this.canvasWidth,
			'height' : this.canvasHeight
		});
		var that = this;
		this.container.resize(function (event) {
			var size = {
				x : that.container.width(),
				y : that.container.height()
			};
			that.onresize(size);
		});
		var size = {
			x : this.container.width(),
			y : this.container.height()
		};

		this.onresize(size);
		this.canvas.appendTo(this.gui);
	};

	CanvasManager.prototype.onresize = function (size) {

		var sizeRatio = size.x / size.y;
		var width = size.x;
		var height = size.y;
		if (sizeRatio > this.aspectRatio) {
			width = Math.floor(this.aspectRatio * height);
			this.cssWidth = width;
			this.cssHeight = height;
		} else { 

			height = Math.floor(width / this.aspectRatio);
			this.cssWidth = width;
			this.cssHeight = height;
		}
		debug.log("canvas manager", config.canvasBackgroundColor);
		this.canvas.css ({
			'width' : this.cssWidth + 'px',
			'height' : this.cssHeight + 'px',
			'backgroundColor' : config.canvasBackgroundColor,
			'position' : 'relative'
		});
		this.gui.css ({
			'width' : this.cssWidth + 'px',
			'height' : this.cssHeight + 'px',
			'left' : Math.floor (this.cssWidth / 2) + 'px',
			'top' : Math.floor (this.cssHeight / 2) + 'px',
			'marginLeft' : "-" + (Math.floor(this.cssWidth / 2) - Math.floor ((size.x - this.cssWidth) / 2)) + "px",
			'marginTop' : "-" + (Math.floor(this.cssHeight / 2) - Math.floor((size.y - this.cssHeight) / 2)) + "px"
		});
	};

	return new CanvasManager();
});