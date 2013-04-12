define (["rDebug"], function (debug) {
	var WorldLayer = function (name) {
		this.objects = {};
		this.name = name;
	};

	WorldLayer.prototype.GenerateStatics = function (map) {
		this.statics = [];
		for (var i = 0; i < map.height; i++) {
			this.statics[i] = [];
			for (var j = 0; j < map.width ; j++) {
				this.statics[i][j] = {};
			}
		}
	}

	return WorldLayer;
})