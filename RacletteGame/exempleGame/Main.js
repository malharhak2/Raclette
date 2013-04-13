// See my super games on http://lajili.com
define(["game/config", "game/MainGame", "game/MainMenu"], 
function(config, mainGame, mainMenu)
{
	var currentScene = mainMenu;
	var scenes = {
		"mainMenu" : mainMenu,
		"mainGame" : mainGame
	}

	var Main = function () {

	};
	Main.prototype.init = function (callback) {
		currentScene.init(callback);
	};

	Main.prototype.changeScene = function (newScene) {
		scenes[newScene].init(function () {
			currentScene = scenes[newScene];
		})
	}

	Main.prototype.update = function () {
		var newScene = currentScene.update();
		if (newScene){
			this.changeScene(newScene);
		};
	};

	Main.prototype.render = function () {
		currentScene.render();
	}
	return new Main();
});