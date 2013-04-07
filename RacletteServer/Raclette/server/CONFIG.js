define(["../../game_server/config/server"], function (userConfig) {
	var CONFIG = function () {
		this.environments = userConfig.environments;
		this.logLevel = userConfig.logLevel;
		this.environments.default = {
			port : "9595",
			host : "localhost",
			protocol : "http",
			mongo : false,
			fb : false
		};
	};

	CONFIG.prototype.init = function (env) {

		this.environment = env;
		if (this.environments[this.environment] !== undefined) {

		} else {
			this.environment = "default";
		}
		this.port = this.environments[this.environment].port;
		this.host = this.environments[this.environment].host;
		this.protocol = this.environments[this.environment].protocol;
		this.mongo = this.environments[this.environment].mongo;
		this.mongo = this.environments[this.environment].fb;
	}
	
	return new CONFIG();
});