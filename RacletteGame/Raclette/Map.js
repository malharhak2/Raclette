define (["Raclette/utils", "Raclette/Debug", "Raclette/MapCase", "Raclette/TilesManager"], function (utils, debug, MapCase, tilesManager) {
	var Map = function (data) {
		debug.log("Map", "Creation...");
		this.data = data;
		this.height = data.height;
		this.width = data.width;
		this.tileWidth = data.tilewidth;
		this.tileheight = data.tileheight;
		this.props = {};
		this.arrangeLayers();
		debug.log("Map", "Created !");
	};

	Map.prototype.arrangeLayers = function () {
		debug.log("Map", "Treating data...");
		this.level = {};
		this.objects = {};
		for (var l in this.data.layers) {
			var layer = this.data.layers[l];
			if (layer.type == "tilelayer") {
				this.level[layer.name] = [];
				for (var i = 0; i < this.height; i++) {
					this.level[layer.name][i] = [];
					for (var j = 0; j < this.width; j++) {
						this.level[layer.name][i][j] = [];
					}
				};
			}
		};
		debug.log(this.level);

		for (var i in this.data.layers) {
			var nb = 0;
			var l = this.data.layers[i];
			if (l.properties) {
				this.props[l.name] = l.properties;
			}
			if (l.type == "tilelayer") {
				for (var j = 0; j < this.height; j++) {
					for (var k = 0; k < this.width; k++) {
						var kase = l.data[nb];
						this.level[l.name][j][k] = kase;
						nb++;
					};
				};
			} else if (l.type == "objectgroup") {
				this.objects[l.name] = [];
				for (var j = 0; j < l.objects.length; j++) {
					var o = l.objects[j];
					this.objects[l.name].push ({
						name : o.name,
						height : o.height,
						width : o.width,
						x : o.x,
						y : o.y,
						type : o.type
					});
				};
			}
		}
		debug.log("Map", "Data treated !");
	};

	Map.prototype.CreateObjects = function () {
		debug.log("Map", "Objects creation...");
		this.objectsList = {};
		for (var i in this.level) {
			if (i != "Fringe" && i != "Collision") {
				var layer = this.level[i];
				for (var j in layer) {
					for (var k in layer[j]) {
						var kase = layer[j][k];
						if (kase == 0) {
							this.objectsList[kaseID] = false;
							continue;
						}
						var kaseID = this.calculateCaseId (i, j, k);
						this.objectsList[kaseID] = this.TransformObject ({
							kase : kase,
							id : kaseID,
							layer : i,
							position : {
								x : k,
								y : j
							}
						});
					};
				};
			}
		};
		debug.log("Map", "Object created !", this.objectsList);
		// TODO : Ajouter le support des objets définis dans tiled ?

		return this.objectsList;
	};

	Map.prototype.calculateCaseId = function (layer, x, y) {
		var id = "mapcase_" + layer + "_" + x + "_" + y;
	};

	Map.prototype.TransformObject = function (args) {
		var tile = tilesManager.getTile(args.kase);
		var objekt = {
			type : tile.type,
			name : tile.name,
			physicsType : "block",
			layer : args.layer,
			position : args.position
		};
		return objekt;
	};

	return Map;
})