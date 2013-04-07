define(['mongoose'], function (mongoose) {
	
	var Auth = new mongoose.Schema ({

		test : String
	});

	var AuthModel = mongoose.model('auth', Auth);
	return AuthModel;
});