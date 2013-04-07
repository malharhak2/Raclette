define(['mongoose'], function(mongoose){

	var TrunkSchema = new mongoose.Schema({
		nothing : String
	});

	var cocorico = function (data, trunk){
		return false;
	}

	var TrunkModel = mongoose.model('trunk', TrunkSchema)

	var Trunk = function () {
		this.init();
	}

	Trunk.prototype.init = function (callback) {
		this.model = new TrunkModel({});

		var that = this;
		this.model.save(function(err) {
			if (callback !== undefined){
				callback(that.model);
			}
		});
	};

	return {
		Trunk : Trunk,
		cocorico : cocorico,
		model: TrunkModel,
		schema : TrunkSchema
	}
});