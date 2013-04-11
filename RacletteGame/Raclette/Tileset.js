define (["Raclette/Debug", "Raclette/Tile", "Raclette/utils"], 
function (debug, Tile, utils) {
	var Tileset = function (data) {
		debug.log("Tileset", "Creating new tileset...");
		this.width = data.width;
		this.height = data.height;
		this.caseWidth = data.caseWidth;
		this.caseHeight = data.caseHeight;
		this.image = data.image;
		this.tiles = [];
		this.parseTilesList(data.tiles);
		debug.log("Tileset", "Tileset created !");
	};

	Tileset.prototype.parseTilesList = function (tiles) {
		this.tileNames = {};
		for (var i in tiles) {
			var t = tiles[i];
			var pos = (t.x - 1) + (t.y - 1) * this.width + 1;
			this.tiles[pos] = new Tile ({
				x : t.x,
				y : t.y,
				pos : {
					x : t.x * this.caseWidth,
					y : t.y  * this.caseHeight
				},
				nb : pos,
				name : t.name,
				type : t.type
			});
			this.tileNames[t.name] = pos;
		}
	}

	Tileset.prototype.hasTile = function (nb) {
		if (utils.chances (50)) {
		}
		if (this.tiles[nb]) {
			return this.tiles[nb];
		} else {
			return false;
		}
	}

	return Tileset
})