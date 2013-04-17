define (["rDebug", "rTile", "rutils", "rJsonStorer"], 
function (debug, Tile, utils, jsonStorer) {
	var Tileset = function (data) {
		
	};

	Tileset.prototype.init = function (data) {
		debug.log("Tileset", "Creating new tileset...");
		this.width = data.width;
		this.height = data.height;
		this.caseWidth = data.caseWidth;
		this.caseHeight = data.caseHeight;
		this.image = data.image;
		this.tiles = [];
		this.parseTilesList(data.tiles, data.image);
		debug.log("Tileset", "Tileset created !");
	}

	Tileset.prototype.parseTilesList = function (tiles, image) {
		this.tileNames = {};
		
		for (var i in tiles) {
			var t = tiles[i];
			var firstGid = this.getJsonTileset(image).firstgid;
			var pos = (t.x - 1) + (t.y - 1) * this.width + firstGid;
			var anims;
			if (t.anims){
				anims = []
				for (var e=0; e<t.anims.length; e++)
				{
					anims[e] = {
						x : (t.anims[e].x -1) * this.caseWidth,
						y : (t.anims[e].y -1) * this.caseHeight,
						duration : t.anims[e].duration
					}
				}
			}else{
				anims = false;
			}
			
			this.tiles[pos] = new Tile ({
				x : t.x,
				y : t.y,
				pos : {
					x : (t.x - 1) * this.caseWidth,
					y : (t.y - 1)  * this.caseHeight
				},
				caseWidth : this.caseWidth,
				caseHeight : this.caseHeight,
				nb : pos,
				name : t.name,
				type : t.type,
				anims : anims
			});
			this.tileNames[t.name] = pos;
		}
	}
	Tileset.prototype.getJsonTileset = function (name){
		var tilesets = jsonStorer.getJson().tilesets;
		for (var i=0; i<tilesets.length; i++){
			if (tilesets[i].name == name){
				return tilesets[i];
			}
		}
		debug.error("tilesets", "Pas de tilesets du nom de", name, "dans le json.")
	}

	Tileset.prototype.hasTile = function (nb) {
		if (this.tiles[nb]) {
			return this.tiles[nb];
		} else if (this.tileNames[nb]) {
			return this.tiles[this.tileNames[nb]];
		} else {
			return false;
		}
	}

	return Tileset
})