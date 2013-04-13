define (["rDebug"], function (debug) {
	var WorldLayer = function (args) {
		this.objects = {};
		this.name = args.name;
		this.parallax = args.parallax;
	};

	WorldLayer.prototype.GenerateStatics = function (map) {
		this.statics = [];
		for (var i = 0; i < map.height; i++) {
			this.statics[i] = [];
			for (var j = 0; j < map.width ; j++) {
				this.statics[i][j] = false;
			}
		}
	}

	return WorldLayer;
})