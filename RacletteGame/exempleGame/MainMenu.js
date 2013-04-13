define(["rDebug", "rCONFIG", "rutils", "rinputsManager", "rInterfaceManager"],
function(debug, config, utils, inputsManager, interfaceManager){
	var alphaUpdate = 0;
	var manetteGlobale;

	var MainMenu = function () {

	};

	MainMenu.prototype.init = function (callback) {
		interfaceManager.init();
		interfaceManager.add({id : 'logo', active : true, end : true, img:'logo', posX :262, posY :150, width : 787, height : 146});
		interfaceManager.add({id : 'pressStart', active: true, end: true, img: 'pressStart', posX : 546, posY : 370, width : 231, height : 60});
		callback();
	};

	MainMenu.prototype.update = function () {
		alphaUpdate+=0.01;
		alphaUpdate = alphaUpdate%1;
		interfaceManager.update({id: 'pressStart', alpha: alphaUpdate})
		if (inputsManager.getKey("start")) {
			this.erase();
			return ("mainGame")
		}
	};

	MainMenu.prototype.render = function () {

	};

	MainMenu.prototype.erase = function () {
		interfaceManager.remove("logo");
		interfaceManager.remove("pressStart");
		
	}
	return new MainMenu();
});