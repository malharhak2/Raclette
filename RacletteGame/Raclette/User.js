define(["rDebug", "rCONFIG", "rutils", "rfacebook", "rsockets", "rGlobalVariables"], function (debug, CONFIG, utils, facebook, sockets, globalVariables) {

	var User = function () {

		this.id = utils.randomString(5);
		this.friends = {};
		this.playerFriends = {};
		this.friendsList = [];
		this.playerFriendsList = [];
	};

	User.prototype.init = function (callback) {
		var that = this;
		sockets.init(function (answer) {
			that.fb = answer.fb;
			CONFIG.facebook = answer.fb;
			CONFIG.initFacebook(answer.env);
			
			if (answer.fb) {
				facebook.init(function () {
					debug.log("User", "Facebook init ok");
                	facebook.getUserInfo(function (user) {
                    	var id = user.id;
                    	that.id = id;
                    	that.infos = user;
                    	that.servInfos = {
                    		id : that.infos.id,
                    		gender : that.infos.gender,
                    		locale : that.infos.locale,
                    		link : that.infos.link,
                    		name : that.infos.name
                    	};
                    	sockets.id = id;
                    	debug.log("User", "Connexion handshake...");
                		sockets.socket.emit('handshake', {id:id});
                    });
                });
			} else {
				that.id = utils.randomString(5);
				that.infos = {
					first_name: "Demo",
					last_name: "Demo" 
				}
				debug.log("User", "Connexion handshake...");
                sockets.socket.emit('handshake', {id : that.id});
            }
	        sockets.socket.on('handshake', function (user) {
	        	debug.log("User", "Connexion succeeded !");
	        	that.data = user;
	        	globalVariables.user = that;
	        	sockets.socket.emit('test', "lol");
	            if (CONFIG.facebook) {
	            	sockets.socket.emit('updatePlayerInfos', that.servInfos);
	            	debug.log("User", "Requesting friends...");
	            	callback();
	            } else {
	            	callback();
	            }
	        });
        });
	};

	User.prototype.getFriends = function (callback) {

		var that = this;
		sockets.socket.on('friendsList', function (friends) {
			debug.log("User", "Friends list received !");
    		for (var i = 0; i < friends.length; i++) {
    			that.playerFriends[friends[i].auth.facebook.id] = that.friends[friends[i].auth.facebook.id];
    			that.playerFriendsList[i] = friends[i].auth.facebook.id;
    		};
    		callback();
		});

		facebook.getFriends( function (friends) {
    		for (var i = 0; i < friends.length; i++) {
    			that.friends[friends[i].id] = friends[i];
    			that.friendsList[i] = friends[i].id;
    		}
    		debug.log("User", "Sending friends to server...");
	    	sockets.socket.emit('getFriends', that.friendsList);
	    });
	};

	User.prototype.update = function () {
		if (Date.now() - sockets.lastBeat > 300000) {
			sockets.emit('playerping', {});
		}
	}


	return new User();
})