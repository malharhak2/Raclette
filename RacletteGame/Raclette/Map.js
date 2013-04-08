define (["Raclette/Debug", "Raclette/MapCase", "Raclette/TilesManager"], function (debug, MapCase, tilesManager) {
	var Map = function (data) {
		debug.log("Map", "Creation...");
		this.data = data;
		this.height = data.height;
		this.width = data.width;
		this.props = {};
		this.arrangeLayers();
		debug.log("Map", "Created !");
	};

	Map.prototype.arrangeLayers = function () {
		debug.log("Map", "Treating data...");
		this.level = [];
		this.objects = {};
		for (var i = 0; i < this.height; i++) {
			this.level[i] = [];
			for (var j = 0; j < this.width; j++) {
				this.level[i][j] = {};
			};
		};

		for (var i = 0; i < this.data.layers.length; i++) {
			var nb = 0;
			var l = this.data.layers[i];
			if (l.properties) {
				this.props[l.name] = l.properties;
			}
			if (l.type == "tilelayer") {
				for (var j = 0; j < this.height; j++) {
					for (var k = 0; k < this.width; k++) {
						var kase = l.data[nb];
						this.level[j][k][l.name] = kase;
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

	return Map;
})