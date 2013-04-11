define(["game/config"], function (userConfig) {
	var CONFIG = function () {
		this.userConfig = userConfig
		this.controllers = userConfig.controllers;
		this.drawDebug = userConfig.drawDebug || false;
		this.keysTable = userConfig.keysTable;
		this.unitSize = userConfig.unitSize || 64;
		this.gameTitle = userConfig.gameTitle || "UNTITLED";
		this.containerID = userConfig.gameContainer || "#racletteGame";
		this.guiID = userConfig.guiID || "#racletteGui";
		this.backgroundColor = userConfig.backgroundColor || "#A099A0";
		this.screen = userConfig.screen || {
			mode : userConfig.screen.mode || "ratio_css",
			ratio : userConfig.screen.ratio || 14/10,
			width : userConfig.screen.width || 1400,
			height : userConfig.screen.height || 1000
		};
		this.floor = 62;
		this.canvasBackgroundColor = userConfig.canvasBakgroundColor || "#4E3D61";
		this.showCredit = userConfig.showCredit || true;
		this.showCustomFooter = userConfig.showCustomFooter || true;
		this.customFooter = userConfig.customFooter || "Raclette engine inside";
	};
	return new CONFIG();
})