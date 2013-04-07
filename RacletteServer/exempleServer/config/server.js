define([], function () {
	var UserConf = function () {
		this.useNode = false;

		this.environments = {
			"production" : {
				protocol : "https",
				port : 443,
				host : "88.191.146.163",
				mongo : false,
				facebook : false
			},
			"development" : {
				protocol : "http",
				port : "1337",
				host : "localhost",
				mongo : false,
				facebook : false
			}
		};

		this.environment = "development";
		
		this.logLevel = 1;
	};

	return new UserConf();
})