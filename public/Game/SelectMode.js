define([],function(){
	var moteur;
	var alphaUpdate = 0;
	var selectedOption = 1;
	var options = ["back","versus", "adventure", "credits"];
	var timer = 0;
	var nextAutorized = false;
	function init(lajiliEngine){
		moteur = lajiliEngine;
		moteur.interfaceManager.init();
		moteur.interfaceManager.add({id : 'back', active : true, end : true, img : 'backNormal', posX : 80, posY : 390, width : 204, height : 99});
		moteur.interfaceManager.add({id : 'versus', active : true, end : true, img : 'versusNormal', posX : 323, posY : 162, width : 242, height : 242});
		moteur.interfaceManager.add({id : 'adventure', active : true, end : true, img : 'adventureNormal', posX : 722, posY : 160, width : 242, height : 242});
		moteur.interfaceManager.add({id : 'credits', active : true, end : true, img : 'creditsNormal', posX : 1024, posY : 390, width : 204, height : 99});
		

		//moteur.interfaceManager.add({id : 'pressStart', active: true, end: true, img: 'pressStart', posX : 546, posY : 370, width : 231, height : 60})
		//moteur.inputsManager.init({"13":{type:"button", button: 9}});
	//	manetteGlobale = moteur.inputsManager.addVirtualController(["keyboard", "allGamepads"]);
	}
	function update(){
		if (timer == 0)
		{
			
			
			if (moteur.inputsManager.isButtonPressed(moteur.manetteGlobale, 39))
			{
				selectedOption++;
				selectedOption%=options.length;
				timer = 1;

			}
			if (moteur.inputsManager.isButtonPressed(moteur.manetteGlobale, 37))
			{
				if (selectedOption >= 0) selectedOption--;
				if (selectedOption == -1) selectedOption = options.length-1;
				timer = 1;
			}
		}
		else
		{
			if (!(moteur.inputsManager.isButtonPressed(moteur.manetteGlobale, 39)) && !(moteur.inputsManager.isButtonPressed(moteur.manetteGlobale, 37))){
			timer--;
			}
		}

		for (var i=0; i<options.length; i++)
			{
				moteur.interfaceManager.update({id: options[i], img: options[i]+"Normal"});
			}
		moteur.interfaceManager.update({id: options[selectedOption], img: options[selectedOption]+"Hover"});

		if ( moteur.inputsManager.isButtonPressed(moteur.manetteGlobale, 76))
			{
				if (nextAutorized)
				{
					switch (options[selectedOption]){
						case "back":
						{
							return "mainMenu";
						}
						case "versus":
						{
							return "versusControlSelect";
						}
						case "adventure":
						{
							return "adventureControlSelect";
						}
						case "credits":
						{
							return "credits";
						}
						default:
						{
							console.log("option non connue", selectedOption, options[selectedOption]);
						}
					}
				}
				
			}
			else
			{
				nextAutorized = true;
			}
	}
	return {init: init, update: update}
});