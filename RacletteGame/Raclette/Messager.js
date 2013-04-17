define (["rCONFIG", "rutils", "rDebug"],
function (config, utils, debug) {
	var SendMessage = function () {
		this.rconfig = config;
		this.rutils = utils;
		this.rdebug = debug;
	};

	SendMessage.prototype.sendMessage = function (id, msg) {
		if (this[id] != undefined) {
			if (typeof this[id].onMessage == "function") {
				this[id].onMessage (msg);
			}
		}
	}

	return new SendMessage();
})