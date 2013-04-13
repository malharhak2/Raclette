define (["rDebug", "jquery", "rMap"], function (debug, $, Map) {
	
	var MapLoader = function () {

	};

	MapLoader.prototype.loadMap = function (map, callback) {
		debug.log("MapLoader", "Loading map...");
		$.getJSON("game/maps/" + map + ".json", function(json) {
		    debug.log("MapLoader", "Map loaded !");
		    var map = new Map(json);
		    callback(map, json);
		});
	}
	return new MapLoader();
});