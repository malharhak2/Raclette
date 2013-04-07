define(['mongoose'], function (mongoose) {
	
	
	var AppleSchema = new mongoose.Schema({
		name : {type : String, default : "apple"}
	});


	var AppleModel = mongoose.model('apple', AppleSchema);

	var Apple = function () {

	}

	Apple.prototype.init = function (callback) {

		this.model = new AppleModel();
	};
	

	return {
		Apple : Apple,
		model : AppleModel,
		schema : AppleSchema
	};
});