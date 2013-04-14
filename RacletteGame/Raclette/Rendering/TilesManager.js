define(["rDebug", "game/tilesets", "rTileset"], function (debug, tilesets, Tileset) {
	var TilesManager = function () {
		
	};
	TilesManager.prototype.init = function () {
		this.tilesets = {};
		this.parseTilesets();
		console.warn("TILES MANAGER INIT")
	}

	TilesManager.prototype.parseTilesets = function () {
		debug.log("TilesManager", "Parsing tilesets List...");
		for (var i in tilesets) {
			this.tilesets[i] = new Tileset ();
			this.tilesets[i].init(tilesets[i])
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
	TilesManager.prototype.getTilesetNameFromTile = function (tileName) {
		for (var i in this.tilesets) {
			if (this.tilesets[i].hasTile(tileName)) {
				return i;
			}
		} 
	}
	TilesManager.prototype.animate = function (){
		for (var i in this.tilesets) {
			var tileset = this.tilesets[i]
			for (var e in tileset.tiles){
				tileset.tiles[e].addTime();
			}
		}
	}

	return new TilesManager();
})