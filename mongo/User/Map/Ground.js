define(['mongoose'], function(mongoose){

	var GroundSchema = new mongoose.Schema({
		nothing : String
	});

	var cocorico = function (data, ground){
		return false;
	}

	var GroundModel = mongoose.model('ground', GroundSchema)

	var Ground = function () {
		this.init();
	}

	Ground.prototype.init = function (callback) {
		this.model = new GroundModel({});

		var that = this;
		this.model.save(function(err) {
			if (callback !== undefined){
				callback(that.model);
			}
		});
	};

	return {
		Ground : Ground,
		cocorico : cocorico,
		model: GroundModel,
		schema : GroundSchema
	}
});