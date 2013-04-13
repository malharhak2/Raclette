define(["rCONFIG", "rDebug", "rutils", "rCamera"], 
function (config, debug, utils, camera){
	function scrolling(playerPosition)
	{
		if (playerPosition.x > camera.width / 2)
		{
			camera.x = playerPosition.x - camera.width/2;
		}
		if (playerPosition.y > camera.height / 2) {
			camera.y = playerPosition.y - camera.height / 2;
		}
	}
	return scrolling;
});