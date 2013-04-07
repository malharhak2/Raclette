define([],function(){
	var moteur;
	var alphaUpdate = 0;
	var manetteGlobale;
	function init(lajiliEngine){
		moteur = lajiliEngine;
		moteur.interfaceManager.init();
		moteur.interfaceManager.add({id : 'logo', active : true, end : true, img:'logo', posX :262, posY :150, width : 787, height : 146});
		moteur.interfaceManager.add({id : 'pressStart', active: true, end: true, img: 'pressStart', posX : 546, posY : 370, width : 231, height : 60})
		moteur.inputsManager.init(
			{"13":{type:"button", button: 9}, // start / enter
			 "75":{type:"button", button: 2}, // j
			 "76": {type:"button", button: 0}, // k
			 "77":{type: "button", button: 1}, // l
			 "39":{type:"axe", axe:0, direction:"plus"}, // droite 
			 "37":{type:"axe", axe:0, direction:"minus"}}); // gauche
		moteur.manetteGlobale = manetteGlobale = moteur.inputsManager.addVirtualController(["keyboard", "allGamepads"]);
	}
	function update(){
		alphaUpdate+=0.01;
		alphaUpdate = alphaUpdate%1;
		moteur.interfaceManager.update({id: 'pressStart', alpha: alphaUpdate})
		if (moteur.inputsManager.isButtonPressed(manetteGlobale, 13))
		{
			erase();
			return ("mainGame")
		}
	}
	function erase()
	{
		moteur.interfaceManager.remove("logo");
		moteur.interfaceManager.remove("pressStart");
	}
	return {init: init, update: update}
});