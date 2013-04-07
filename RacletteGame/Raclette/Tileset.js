define (["Raclette/Debug", "Raclette/Tile"], function (debug, Tile) {
	var Tileset = function (data) {
		debug.log("Tileset", data);
		this.width = data.width;
		this.height = data.height;
		this.caseWidth = data.caseWidth;
		this.caseHeight = data.caseHeight;
		this.image = data.image;
		this.tiles = [];
		this.parseTilesList(data.tiles);
	};

	Tileset.prototype.parseTilesList = function (tiles) {
		this.tileNames = {};
		for (var i in tiles) {
			var t = tiles[i];
			var pos = t.x + t.y * this.width;
			this.tiles[pos] = new Tile ({
				x : t.x,
				y : t.y,
				nb : pos,
				name : t.name
			});
			this.tileNames[t.name] = pos;
		}
	}

	Tileset.prototype.hasTile = function (nb) {
		if (this.tiles[nb]) {
			return this.tiles[nb];
		} else {
			return false;
		}
	}

	return Tileset
})