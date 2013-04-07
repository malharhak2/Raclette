// See my super games on http://lajili.com
define(["Game/config", "Game/MainGame", "Game/MainMenu", "Game/SelectMode", "Game/SelectControl"], function(config, mainGame, mainMenu, selectMode, selectControl)
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
	function init (LajiliEngine) 
	{
		currentScene.init(LajiliEngine);
		moteur =(LajiliEngine) // If you want to debug easily.
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