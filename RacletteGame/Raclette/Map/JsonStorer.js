define(["rDebug", "rutils", "rCONFIG"], 
	function(debug, utils, config){
	var JsonStorer = function(){
		this.json = {};
	}
	JsonStorer.prototype.storeJson = function(json){
		this.json = json
	}
	JsonStorer.prototype.getJson = function(){
		return this.json;
	}
	return new JsonStorer();
})