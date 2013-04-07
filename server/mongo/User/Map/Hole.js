define(['mongoose'], function(mongoose){

	var HoleSchema = new mongoose.Schema({
		nothing : String
	});

	var cocorico = function (data, hole){
		return false;
	}

	var HoleModel = mongoose.model('hole', HoleSchema)

	var Hole = function () {
		this.init();
	}

	Hole.prototype.init = function (callback) {
		this.model = new HoleModel({});

		var that = this;
		this.model.save(function(err) {
			if (callback !== undefined){
				callback(that.model);
			}
		});
	};

	return {
		Hole : Hole,
		cocorico : cocorico,
		model: HoleModel,
		schema : HoleSchema
	}
});