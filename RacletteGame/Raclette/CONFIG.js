define(["game/config"], function (userConfig) {
	var CONFIG = function () {
		this.userConfig = userConfig

		this.unitSize = userConfig.unitSize || {
			x : 64, 
			y : 64
		};
		this.gameTitle = userConfig.gameTitle || "UNTITLED";
		this.containerID = userConfig.gameContainer || "racletteGame";
		this.backgroundColor = userConfig.backgroundColor || "#A099A0";
		this.screen = userConfig.screen || {
			mode : userConfig.screen.mode || "ratio_css",
			ratio : userConfig.screen.ratio || 14/10,
			width : userConfig.screen.width || 1400,
			height : userConfig.screen.height || 1000
		};
		this.floor = 62;
		this.canvasBakgroundColor = userConfig.canvasBakgroundColor || "#4E3D61";
		this.showCredit = userConfig.showCredit || true;
		this.showCustomFooter = userConfig.showCustomFooter || true;
		this.customFooter = userConfig.customFooter || "Raclette engine inside";
	};
	return new CONFIG();
})