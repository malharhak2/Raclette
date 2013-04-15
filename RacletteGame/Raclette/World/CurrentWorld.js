define(["rCONFIG", "rDebug"],
	function(config, debug){
		var CurrentWorld = function(){
			this.currentWorld = {};
		}

		CurrentWorld.prototype.update = function(world){
			this.currentWorld = world;
		}

		CurrentWorld.prototype.getWorld = function(){
			return this.currentWorld;
		}

		return new CurrentWorld()
	});