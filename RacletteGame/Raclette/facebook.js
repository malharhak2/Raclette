define(["rDebug", "rutils", "rCONFIG"], function (debug, utils, CONFIG) {

	var Facebook = function () {

	}

	Facebook.prototype.init = function (callback) {

		var that = this;
		this.callback = callback;
		window.fbAsyncInit = function(callback) {
			// init the FB JS SDK
			debug.log("Facebook", "Initialisation on " + CONFIG.appId + " - " + CONFIG.domain);
			FB.init({
				appId      : CONFIG.appId, // App ID from the App Dashboard
				channelUrl : CONFIG.domain + '/channel.html', // Channel File for x-domain communication
				status     : true, // check the login status upon init?
				cookie     : true, // set sessions cookies to allow your server to access the session?
				xfbml      : true,  // parse XFBML tags on this page?,
				frictionlessRequest : true
			});
			that.FB = FB;
			FB.getLoginStatus(function(response) {
			  if (response.status === 'connected') {
			    that.launch(callback);
			  } else if (response.status === 'not_authorized') {
			    that.login(callback);
			  } else {
			    that.login(callback);
			  }
			 });

			// Additional initialization code such as adding Event Listeners goes here

		};

		// Load the SDK's source Asynchronously
		// Note that the debug version is being actively developed and might 
		// contain some type checks that are overly strict. 
		// Please report such bugs using the bugs tool.
		(function(d, debug){
			var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
			if (d.getElementById(id)) {return;}
			js = d.createElement('script'); js.id = id; js.async = true;
			js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
			ref.parentNode.insertBefore(js, ref);
		}(document, /*debug*/ false));

	};
	Facebook.prototype.login = function (callback) {
		try {
	 		FB.Canvas.setDoneLoading();
	 	} catch(e) {}
		var that = this;
		this.FB.login(function(response) {
        if (response.authResponse) {
            	that.launch(callback);
        	} else {
            	that.launch(callback);
        	}
    	});
	};

	Facebook.prototype.launch = function (callback) {
		this.callback();
	};

	Facebook.prototype.getFriends = function (callback) {
		this.FB.api('/me/friends', function (ans) {
			callback(ans.data);
		})
	};

	Facebook.prototype.getUserInfo = function (callback) {
		this.FB.api('/me', function (ans) {
			callback (ans);
		})
	};

	Facebook.prototype.inviteFriends = function (title, message, callback) {
		FB.ui({method: 'apprequests',
	     title: title,
	     message: message,
	   }, callback);
	};

	Facebook.prototype.share = function (data, callback) {
		FB.ui({
			method : 'feed',
			caption : data.message,
			name : data.name,
			picture : CONFIG.defaultPic,
			link : data.link
		}, callback);
	};
	var facebook = new Facebook();
	return facebook;
});