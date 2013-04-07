define (["jquery", "Raclette/Map"], function ($, Map) {
	
	var MapLoader = function () {

	};

	MapLoader.prototype.loadMap = function (map, callback) {
		$.getJSON("game/maps/" + map + ".json", function(json) {
		    var map = new Map(json);
		    callback(map);
		});
	}
	return new MapLoader();
});