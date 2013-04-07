define([],function(){
	var moteur;
	var alphaUpdate = 0;
	var timer = 0;
	var nextAutorized = false;
	var players=[];
	var currentPlayer = 0;
	var nonAllowedControllers = [];
	var pressStart = false;
	var alphaUpdate = 0;
	function init(lajiliEngine){
		moteur = lajiliEngine;
		moteur.interfaceManager.init();
		moteur.interfaceManager.add({id : 'chooseControlTitle', active : true, end : true, img : 'chooseControlTitle', posX : 0, posY : 0, width : 1300, height : 204});
		moteur.interfaceManager.add({id : 'player1', active : true, end : true, img : 'player1Normal', posX : 272, posY : 224, width : 242, height : 242});
		moteur.interfaceManager.add({id : 'player2', active : true, end : true, img : 'player2Normal', posX : 722, posY : 229, width : 242, height : 242});

		//moteur.interfaceManager.add({id : 'pressStart', active: true, end: true, img: 'pressStart', posX : 546, posY : 370, width : 231, height : 60})
		//moteur.inputsManager.init({"13":{type:"button", button: 9}});
		//manetteGlobale = moteur.inputsManager.addVirtualController(["keyboard", "allGamepads"]);
	}
	function update(){
		if (nextAutorized)
		{
			if (players.length >= 1)
			{
				for (var i=0; i<players.length; i++)
				{
					console.log("testentrée", moteur.inputsManager.isButtonPressed(players[i], 13))
					if (moteur.inputsManager.isButtonPressed(players[i], 13))
					{
						moteur.player1 = players[0];
						moteur.player2 = players[1] || "bot"
						return "mainGame";
					}
				}
			}
		}
		if (nextAutorized)
		{
			for (var i=0; i<moteur.gamepads.length; i++)
			{
				var autorized = true;
				for (var e=0; e<nonAllowedControllers.length; e++)
				{
					if (nonAllowedControllers[e] == i) autorized = false;
				}
				if (!autorized) continue;
				if (moteur.gamepads[i].buttons[0] >= 0.4)
				{
					players[currentPlayer] = moteur.inputsManager.addVirtualController([i]);
					moteur.interfaceManager.update({id:"player"+(currentPlayer+1), img: "player"+(currentPlayer+1)+"Gamepad"});
					moteur.interfaceManager.update({id:"chooseControlTitle", img: "chooseControlP2"});
					addPressStart();
					nonAllowedControllers.push(i);
					currentPlayer++;
					nextAutorized = false;
				}
			}

			if (moteur.inputsManager.keyboardManager.touches[13])
			{
				console.log("clavier")
				var autorized = true;
				for (var e=0; e<nonAllowedControllers.length; e++)
				{
					if (nonAllowedControllers[e] == "keyboard") autorized = false;
				}
				if (!autorized) return;
				players[currentPlayer] = moteur.inputsManager.addVirtualController(["keyboard"]);
				moteur.interfaceManager.update({id:"player"+(currentPlayer+1), img: "player"+(currentPlayer+1)+"Keyboard"});
				moteur.interfaceManager.update({id:"chooseControlTitle", img: "chooseControlP2"});
				addPressStart();
				nonAllowedControllers.push("keyboard");
				currentPlayer++;
				nextAutorized = false;
				
			}
		
			if (pressStart)
			{
				alphaUpdate+=0.01;
				alphaUpdate = alphaUpdate%1;
				moteur.interfaceManager.update({id: 'pressStart', alpha: alphaUpdate})
			}
		}
		if (!moteur.inputsManager.isButtonPressed(moteur.manetteGlobale, "13") && !moteur.inputsManager.isButtonPressed(moteur.manetteGlobale, "77") )
		{
			nextAutorized = true;
		}
		
		
	}
	function addPressStart(){
		if (pressStart == false)
		{
			moteur.interfaceManager.add({id : 'pressStart', active : true, end : true, img : 'pressStartOrange', posX : 1070, posY : 480, width : 188, height : 59})
			pressStart = true;
		}
	}

	return {init: init, update: update}
});