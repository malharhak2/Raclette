define(["game/config"], function(config){
	function scrolling(camera, playerPosition)
	{
		if (playerPosition.x > config.width/2)
		{
			camera.x = playerPosition.x - config.width/2;
		}
		if (playerPosition.y < camera.origin + 75)
		{
			//camera.y = playerPosition.y - config.floor;
		}
		if (playerPosition.y > config.height + camera.origin + 75)
		{
			//camera.y = playerPosition.y + config.height;
		}
	}
	return scrolling;
});