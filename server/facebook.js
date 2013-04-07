define(["CONFIG"], function (CONFIG) {
	
	var Facebook = function () {


	};



	Facebook.prototype.init = function (env) {
		
		console.log("ENV : " + env);
		if (env == "production") {

			this.FB = require('fb');
			this.FB.api('oauth/access_token', {
				client_id: CONFIG.appId,
				client_secret: CONFIG.appSecret,
				grant_type: 'client_credentials'
			}, function (res) {
				if(!res || res.error) {
			    	console.log(!res ? 'error occurred' : res.error);
			    	return;
			    }

			    this.accessToken = res.access_token;
			    console.log(this.accessToken + "<-- WTF pourquoi ça marche ça ?");
			});
		}
	};

	return new Facebook();
});