define(["../game/config/server.js"], function (userConfig) {
	var CONFIG = {

		environments : {
			"production" : 1,
			"development" : 1,
			"fbdev" : 1,
			"staging" : 1,
			"test" : 1
		},
		environment : "default",
		ports : {
			"production" : 443,
			"fbdev" : 443,
			"development" : 8080,
			"staging" : 8181,
			"default" : 8080,
			"test" : 8282
		},
		hosts : {
			"production" : "88.191.146.163",
			"fbdev" : "localhost",
			"development" : "localhost",
			"staging" : "88.191.146.163",
			"default" : "localhost",
			"test" : "localhost"
		},
		mongo : {
			"production" : {
				user : "folks",
				pass : "f0rukuSU",
				db : "folks",
				host : "localhost",
				port : "27017"
			},
			"fbdev" : {
				user : "dev",
				pass : "f0rukuSU",
				db : "folksdev",
				host : "localhost",
				port : "27017"
			},
			"development" : {
				user : "dev",
				pass : "f0rukuSU",
				db : "folksdev",
				host : "localhost",
				port : "27017"
			},
			"staging" : {
				user : "staging",
				pass : "f0rukuSU",
				db : "folkstaging",
				host : "localhost",
				port : "27017"
			},
			"test" : {
				user : "test",
				pass : "f0rukuSU",
				db : "folkstest",
				host : "localhost",
				port : "27017"
			}

		},
		logLvl : 1,
		protocol : "http",
		appIds : {
		"production" : "105311372981377",
		"fbdev" : "412022338879754",
		"staging" : "375871362519716"
		},
		appSecrets : {
			production : "17b66bff727014904edec16916ffde14",
			fbdev : "5badde344a9d7190fe3bb2b50bc7f30c",
			staging : "131497be8c48923914748c28a0ef9068"
		}
	};

	CONFIG.init = function (env) {

		CONFIG.environment = env;
		if (CONFIG.environments[CONFIG.environment] !== undefined) {

		} else {
			CONFIG.environment = "default";
		}
		CONFIG.port = CONFIG.ports[CONFIG.environment];
		CONFIG.host = CONFIG.hosts[CONFIG.environment];
		if (CONFIG.environment == "production" || CONFIG.environment == "fbdev" || CONFIG.environment == "staging") {
			CONFIG.appId = CONFIG.appIds[CONFIG.environment];
			CONFIG.appSecret = CONFIG.appSecrets[CONFIG.environment];
			CONFIG.protocol = "https";
		}
	}
	
	return CONFIG;
});