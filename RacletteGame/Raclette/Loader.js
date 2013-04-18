define(["rUser"], function(user){
	function Loader() {
		this.ressourceSize = 100; // indicate the part of the ressource in the loading, in pourcent.
		this.ressource = {
			length: 0,
			loaded: 0,
			objects : []
		}
		this.computing = {
			length: 0,
			loaded: 0,
			objects: []
		}
		this.userInitialised = true;
		var that = this;
	}

	Loader.prototype.update = function() {
		if (this.getPercent() == 100 && this.userInitialised) {
			return "loaded";
		}
	};

	Loader.prototype.render = function(ctx) {
		ctx.strokeRect(500, 400, 100, 40);
		ctx.fillRect(500, 400, this.getPercent(), 40);
	};

	Loader.prototype.addObject = function(id, type) {
		this[type].length++;
		this[type].objects[id] = false;
	};

	Loader.prototype.itsOkFor = function(id, type) {
		var that = this;
		function appel() {
			that.lateItsOkFor(id, type);
		}
		setTimeout(appel, 30)
	};

	Loader.prototype.lateItsOkFor = function(id, type) {
		this[type].loaded++;
		this[type].objects[id] = true;
	};
	Loader.prototype.getPercent = function() {
		if (this.ressource.length != 0) {
			var pourcent = ((this.ressource.loaded*this.ressourceSize/this.ressource.length))
			if (this.computing.length != 0) pourcent += (this.computing.loaded*(100-this.ressourceSize)/this.computing.length);
			return pourcent;
		} else {
			return 0;
		}
	};
	Loader.prototype.isLoaded = function(id, type) {
		return this[type].objects[id];
	};
	var loader = new Loader();
	return loader;
});