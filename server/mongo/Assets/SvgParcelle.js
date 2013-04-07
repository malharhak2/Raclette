define(['mongoose'], function (mongoose) {
	
	var Svg = new mongoose.Schema ({
		content : String,
		id : String
	});

	var SvgModel = mongoose.model('svg', Svg);
	return SvgModel;
});