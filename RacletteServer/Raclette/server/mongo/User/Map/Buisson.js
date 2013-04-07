define(['mongoose'], function (mongoose) {
	
	
	var BuissonSchema = new mongoose.Schema({
		nothing : {type : String, default : "nothing"}
	});


	var cocorico = function (data, buisson) {

		return false;
	}


	var BuissonModel = mongoose.model('buisson', BuissonSchema);

	var Buisson = function () {

		this.init();


	}

	Buisson.prototype.init = function (callback) {


		this.model = new BuissonModel({});

		var that = this;
		this.model.save( function (err) {
			if (callback !== undefined) {
				callback(that.model);
			}
		});
	};
	

	return {
		Buisson : Buisson,
		cocorico : cocorico,
		model : BuissonModel,
		schema : BuissonSchema
	};
});