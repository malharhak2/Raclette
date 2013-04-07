define(['mongoose'], function(mongoose){

	var BuriedSchema = new mongoose.Schema({
		nothing : String
	});

	var cocorico = function (data, buried){
		return false;
	}

	var BuriedModel = mongoose.model('buried', BuriedSchema)

	var Buried = function () {
		this.init();
	}

	Buried.prototype.init = function (callback) {
		this.model = new BuriedModel({});

		var that = this;
		this.model.save(function(err) {
			if (callback !== undefined){
				callback(that.model);
			}
		});
	};

	return {
		Buried : Buried,
		cocorico : cocorico,
		model: BuriedModel,
		schema : BuriedSchema
	}
});