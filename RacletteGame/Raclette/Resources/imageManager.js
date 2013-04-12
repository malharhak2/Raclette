define(["rDebug", "rLoader"], function(debug, loader) {
    var ImageManager = function() {
    	this.images = {};
    	this.imagesToLoad = 0;
    	this.imagesLoaded = 0;
    };

    ImageManager.prototype.init = function (baseFolder) {
        this.baseFolder = baseFolder;
    }

    ImageManager.prototype.isLoaded = function () {
    	if (this.imagesToLoad == this.imagesLoaded) {
    		return true;
    	} else {
    		return false;
        }
    };

    ImageManager.prototype.loadImage = function(i) {
    	var img = this.images[i].img;
    	var _this = this;
    	img.addEventListener('load', function (event) {
    		_this.images[i].loaded = true;
    		_this.imagesLoaded++;
            loader.itsOkFor("image"+i, "ressource");
    	});
    	img.src = this.images[i].url;
    }

    ImageManager.prototype.pushImages = function(images) {

    	for (var i in images) {
    		var p = images[i];
    		var img = new Image();
    		this.images[i] = {
    			img : img,
    			url : this.baseFolder + p,
    			loaded : 0
    		};
    		this.imagesToLoad++;
            loader.addObject("image"+i, "ressource");
    		this.loadImage(i);
    	}
    };

    ImageManager.prototype.get = function (name) {

    	if (this.images[name])
    		return this.images[name].img;
    	else {
    		return false;	
    	}
    }
    
    return new ImageManager();
});