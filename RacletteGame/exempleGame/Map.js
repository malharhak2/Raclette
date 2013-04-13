define(["rMapLoader"], function(mapLoader) {

	var Map = function () {

	};

	Map.prototype.init = function (mapName, callback) {
		var that = this;
		mapLoader.loadMap(mapName, function (map) {
			that.map = map;
			callback(map);
		});
	};

	return new Map();
});