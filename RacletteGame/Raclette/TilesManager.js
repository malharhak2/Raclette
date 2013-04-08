define(["Raclette/Debug", "game/tilesets", "Raclette/Tileset"], function (debug, tilesets, Tileset) {
	var TilesManager = function () {
		this.tilesets = {};
		this.parseTilesets();
	};

	TilesManager.prototype.parseTilesets = function () {
		debug.log("TilesManager", "Parsing tilesets List...");
		for (var i in tilesets) {
			this.tilesets[i] = new Tileset (tilesets[i]);
		};
		debug.log("TilesManager", "Tilesets parsed !");
	};

	TilesManager.prototype.getTile = function (nb) {
		for (var i in this.tilesets) {
			if (this.tilesets[i].hasTile(nb)) {
				return this.tilesets[i].hasTile(nb);
			}
		};
		return false;
	} 

	return new TilesManager();
})