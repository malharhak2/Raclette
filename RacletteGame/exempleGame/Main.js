// See my super games on http://lajili.com
define(["game/config", "game/MainGame", "game/MainMenu", "game/SelectMode", "game/SelectControl"], function(config, mainGame, mainMenu, selectMode, selectControl)
{
	var currentScene = mainMenu;
	var scenes = {
		"mainMenu" : mainMenu,
		"SelectMode" : selectMode,
		"versusControlSelect": selectControl,
		"mainGame" : mainGame
	}
	var moteur;
	// The main file of your game, the engine will call its functions init and update. The init will have the engine as a parameter
	function init (Raclette) 
	{
		currentScene.init(Raclette);
		moteur =(Raclette) // If you want to debug easily.
	}

	function update()
	{
		var changeScene = currentScene.update();
		if (changeScene){
			currentScene = scenes[changeScene];
			currentScene.init(moteur);
		};
	}
	return {init: init, update: update}
})