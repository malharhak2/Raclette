define(['mongoose'], function (mongoose) {
	
	
	var HouseSchema = new mongoose.Schema({
		test : String
	});

	var HouseModel = mongoose.model('house', HouseSchema);

	var House = function () {

	};

	House.prototype.init = function (callback) {

		this.model = new HouseModel ({
			
		});

		var that = this;
	};
	

	return {
		House : House,
		model : HouseModel,
		schema : HouseSchema
	};
});