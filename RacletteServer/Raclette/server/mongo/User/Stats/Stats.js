define(['mongoose'], function (mongoose) {
	
	var Stats = new mongoose.Schema ({

		test : String
	});

	var StatsModel = mongoose.model('stats', Stats);
	return StatsModel;
});