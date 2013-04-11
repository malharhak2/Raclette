define (["rDebug"], function (debug) {
	var WorldLayer = function (name) {
		this.objects = {};
		this.name = name;
	};

	return WorldLayer;
})