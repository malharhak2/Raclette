define(['mongoose', 'mongo/User/Map/Parcelle'], function (mongoose, Parcelle) {
	
	
	var MapSchema = new mongoose.Schema({
		parcelles : [Parcelle.Schema],
		seed : {type : String, default : "lol"}
	});

	MapSchema.methods.cocorico = function (data) {
		for (var i = 0; i < this.parcelles.length; i++) {
			this.parcelles[i].cocorico(data);
		};
	};


	var MapModel = mongoose.model('map', MapSchema);

	var Map = function () {

		this.parcelles = [];
		for (var i = 0; i < 20; i++) {
			this.parcelles[i] = new Parcelle.Parcelle().model;
		}
		this.seed = "test";

		this.init();


	}

	Map.prototype.init = function (callback) {

		this.model = new MapModel({
			seed : this.seed,
			parcelles : this.parcelles
		});
	};

	return {
		Map : Map,
		model : MapModel,
		schema : MapSchema
	};
});