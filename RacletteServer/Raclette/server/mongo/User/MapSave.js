define (["mongoose"], function (mongoose) {
	var MapSaveSchema = new mongoose.Schema ({
		id : {type : String, default : "00_00"},
		finished : {type : Boolean, default : false},
		color : {type : String, default : "white"},
		score : {type : Number, default : 0},
		time : {type : Number, default : 0}
	});

	var MapSaveModel = mongoose.model('mapsaves', MapSaveSchema);

	return {
		Model : MapSaveModel,
		Schema : MapSaveSchema
	};
});