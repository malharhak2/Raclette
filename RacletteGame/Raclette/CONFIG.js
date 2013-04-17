define(["rDebug", "rCONFIG", "game/config"], function (debug, config, userConfig) {
	var CONFIG = function () {
		this.userConfig = userConfig
		this.controllers = userConfig.controllers;
		this.drawDebug = userConfig.drawDebug || false;
		this.keysTable = userConfig.keysTable;
		this.unitSize = userConfig.unitSize || 64;
		this.gravity = userConfig.gravity || {
			x : 0,
			y : 0.005
		};
		this.maxSpeed = userConfig.maxSpeed || {
			x : 0.5,
			y : 0.5
		};
		this.layers = userConfig.layers || {
			"Background" : {
				parallax : 0.5
			},
			"Foreground" : {
				parallax : 1
			}
		};
		this.defaultDuration = userConfig.defaultDuration || 100;
		this.gameTitle = userConfig.gameTitle || "UNTITLED";
		this.containerID = userConfig.gameContainer || "#racletteGame";
		this.guiID = userConfig.guiID || "#racletteGui";
		this.backgroundColor = userConfig.backgroundColor || "#464F63";
		this.screen = userConfig.screen || {
			mode : userConfig.screen.mode || "ratio_css",
			ratio : userConfig.screen.ratio || 14/10,
			width : userConfig.screen.width || 1400,
			height : userConfig.screen.height || 1000
		};
		this.pressedThreshold = userConfig.pressedThreshold || 0.8;
		this.detectThreshold = userConfig.detectThreshold || 0.1;
		this.floor = 62;
		this.specials = userConfig.specials || ["start", "end"]
		this.canvasBackgroundColor = userConfig.canvasBackgroundColor || "#464F63";
		this.showCredit = userConfig.showCredit || true;
		this.showCustomFooter = userConfig.showCustomFooter || true;
		this.customFooter = userConfig.customFooter || "Raclette engine inside";

		this.domain = window.location.hostname;
		this.envs = {
			"fbdev" : {
				appId : "363526327091238"
			},
			"production" : {
				appId : "503005056431764"
			},
			"development" : {
				appId : false
			}
		}
	};

	CONFIG.prototype.initFacebook = function (env) {
		debug.log("Config", env, this.envs);
		this.appId = this.envs[env].appId;
	}
	return new CONFIG();
})