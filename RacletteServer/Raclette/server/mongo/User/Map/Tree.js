define(['mongoose', 'mongo/User/Map/Apple'], function (mongoose, Apple) {
	
	
	var TreeSchema = new mongoose.Schema({
		appleCount : {type : Number, default : 3}
	});
	var cocorico = function (data, tree) {
		
		tree.appleCount += Math.floor(data.deltaTime / 7200000);
		if (tree.appleCount > 5) {
			tree.appleCount = 5;
		}
		return true;
	};

	var TreeModel = mongoose.model('tree', TreeSchema);

	var Tree = function () {

		this.init();


	};


	Tree.prototype.init = function (callback) {

		this.model = new TreeModel({});

		var that = this;
		this.model.save( function (err) {
			if (callback !== undefined) {
				callback(that.model);
			}
		});
	};
	

	return {
		Tree : Tree,
		cocorico : cocorico,
		model : TreeModel,
		schema : TreeSchema
	};
});