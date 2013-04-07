define(["game/config"], function (userConfig) {
	var CONFIG = function () {
		this.userConfig = userConfig

		this.gameTitle = userConfig.gameTitle || "UNTITLED";
		this.divName = userConfig.gameContainer || "lincoln";
		this.backgroundColor = userConfig.backgroundColor || "#A099A0";
		this.width = userConfig.width || 1300;
		this.height = userConfig.height || 600;
		this.floor = 62;
		this.canvasBakgroundColor = userConfig.canvasBakgroundColor || "#4E3D61";
		this.showCredit = userConfig.showCredit || true;
		this.showCustomFooter = userConfig.showCustomFooter || true;
		this.customFooter = userConfig.customFooter || "Raclette engine inside";

	};

	return new CONFIG();
})