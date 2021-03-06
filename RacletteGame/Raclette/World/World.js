define(["rDebug", "rCONFIG", "rutils", "rWorldLayer", "rWorldObjectType", "rWorldObject", "rWorldMapObject", "rCONFIG", "rAnimationManager", "rJsonStorer", "rCamera"], 
function(debug, config, utils, WorldLayer, WorldObjectType, WorldObject, WorldMapObject, CONFIG, animationManager, jsonStorer, camera){ 
	var World = function (args) {
		this.id = args.id;
		this.objectTypes = {}; 
		this.layers = {};
		for (var i in config.layers) {
			this.layers[i] = new WorldLayer (config.layers[i]);
		}
		this.objects = {};
		debug.log("World", "Initializing world...");
		for (var i in this.layers) {
			this.layers[i].GenerateStatics(args.map);
		}
		this.specials = {};
		jsonStorer.storeJson(args.json);
		debug.log("World", "World initialized !");
		this.start = false;
	};

	World.prototype.init = function() {
		
	};
	World.prototype.Start = function() {
		this.start = true;
	}

	World.prototype.CreateObject = function (args) {
		try{
			var klass = this.objectTypes[args.type];
			args.render = klass.render;
		}
		catch(err){
			debug.error("objects", args, this.objectTypes, this.objectTypes[args.type])
		}
		args.render.layer = args.layer;
		args.defaultState = klass.defaultState;
		args.defaultDir = klass.defaultDir;
		args.physics = klass.physics;
		args.physics.position = args.position;
		args.physics.onCollision = args.onCollision;
		args.physics.layer = args.layer;
		return args;
	};
	
	World.prototype.instanceObject = function (args) {
		if (args.layer == "Special"){
			this.createSpecial(args);
			return false;
		}
		var obj = this.CreateObject (args);
		if (obj.render.static) {
			this.layers[args.layer].statics[args.position.y][args.position.x] = new WorldObject (obj);
			return this.layers[args.layer].statics[args.position.y][args.position.x] = new WorldObject (obj);
		} else {
			this.layers[args.layer].objects[args.id] = new WorldObject (obj);
			return this.layers[args.layer].objects[args.id];
		}
	}

	World.prototype.removeObject = function(layer, id) {
		delete this.layers[layer].objects[id];
	};

	World.prototype.update = function() {
		if (this.start == false) return;
		for (var i in this.layers) {
			var l = this.layers[i];
			for (var j in l.objects) {
				var o = l.objects[j];
				if (o.activated) {
					o.collider.update();
					o.update();
				}
			}
		};
	};

	World.prototype.render = function  () {
		for (var i in this.layers) {
			var l = this.layers[i];
			this.renderStatics(l.statics);
			for (var j in l.objects) {
				if (l.objects[j].activated) {
					l.objects[j].render();
				}
			}
		};
	};

	World.prototype.renderStatics = function (statics) {
		var cam = {
			x : Math.floor (camera.x),
			y : Math.floor (camera.y),
			w : Math.floor (camera.width + 1),
			h : Math.floor (camera.height + 2)
		};
		for (var i = cam.y; i < cam.y + cam.h; i++) {
			if (statics[i] != undefined) {
				for (var j = cam.x; j < cam.x + cam.w; j++) {
					if (statics[i][j] != undefined) {
						if (statics[i][j].render) {
							statics[i][j].render();
						}
					}
				}
			}
		}
	};

	World.prototype.onMessage = function (message) {
		debug.log("World", "?", message);
		if (message.inst == "destroyObject") {
			debug.log("World", "Destroy", message);
			delete this.layers[message.args.layer].objects[message.args.id];
		}
	};

	World.prototype.getAllObjects = function() {
		return this.layers;
	}
	World.prototype.getObject = function(layer, id) {
		return this.layers[layer].objects[id];
	}
	World.prototype.isSpecial = function(name) {
		for (var i=0; i<config.specials.length; i++)
		{
			if (name == config.specials[i])
			{
				return true;
			}
		}
	}
	World.prototype.createSpecial = function(args) {
		if (this.specials[args.position.y] == undefined) this.specials[args.position.y] = {};
		this.specials[args.position.y][args.position.x] = args.type;
	}
	World.prototype.findSpecial = function(name) {
		for (var i in this.specials){
			for (var e in this.specials[i]){
				if (this.specials[i][e] == name){
					return {x: parseInt(e), y: parseInt(i)}
				}
			}
		}
		debug.error("findSpecial", name, "not found", this)
	}
	World.prototype.isThereASpecial = function (vec2){
		if (this.specials[vec2.y] && this.specials[vec2.y][vec2.x]) {
			return this.specials[vec2.y][vec2.x];
		}
		return false;
	}
	return World;
});