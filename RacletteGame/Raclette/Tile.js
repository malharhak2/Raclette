define ([], function () {
	var Tile = function (args) {
		this.x = args.x;
		this.y = args.y;
		this.pos = args.pos;
		this.nb = args.nb;
		this.name = args.name;
		this.type = args.type;
	};

	return Tile;
})