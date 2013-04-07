define(['app', 'CONFIG', 'mongo/base', 'facebook', 'SocketConnection'], function (app, CONFIG, mongoUtils, facebook, SocketConnection) {


	/*
	var cookie = require('cookie');
	var parseSignedCookies = require('connect').utils.parseSignedCookies;
	io.set('authorization', function (data, accept) {
	    // check if there's a cookie header
	    if (data.headers.cookie) {
	        // if there is, parse the cookie
	        data.cookie = parseSignedCookies(cookie.parse(decodeURIComponent(data.headers.cookie)));
	        // note that you will need to use the same key to grad the
	        // session id, as you specified in the Express setup.
	        data.sessionID = data.cookie['express.sid'];
	    } else {
	       // if there isn't, turn down the connection with a message
	       // and leave the function.
	       return accept('No cookie transmitted.', false);
	    }
	    // accept the incoming connection
	    accept(null, true);
	});

	*/
	var Sockets = function () {


	};

	Sockets.prototype.init = function (app) {

		var io = require('socket.io').listen(app.server);
		io.set('log level', CONFIG.logLvl);
		this.io = io;

		this.connections = {

		};
		var that = this;
		this.io.sockets.on('connection', function (socket) {
			var answer = {};
			var env = app.app.settings.env;
			var fb = true;
			if (app.app.settings.env == "production" || app.app.settings.env == "fbdev" || app.app.settings.env == "staging") {
				fb = true;
				facebook.init(app.app.settings.env);

			} else {
				fb = false;
			}
			answer.env = app.app.settings.env;
			answer.fb = fb;
			socket.on('handshake', function (data) {
				that.connections[data.fid] = new SocketConnection({
					socket : socket,
					timezone : 1,
					fid : data.fid,
					master : that.connections
				});
				mongoUtils.addUser(data.fid, function (answer) {
					if (app.app.settings.env == "production" || app.app.settings.env == "fbdev" || app.app.settings.env == "staging") {
						answer.facebook = true;
					} else {
						answer.facebook = false;
					}
					socket.emit('handshake', answer);
				});
			});

			socket.on('getFriends', function (players) {
				mongoUtils.getPlayersIn(players, function (friends) {
					socket.emit('friendsList', friends);
				});
			});

			socket.on('getFriendMap', function (data) {
				mongoUtils.getPlayerMap(data.fid, function (data) {
					socket.emit('friendMap', data);
				});
			});


			socket.on('updatePlayerInfos', function (data) {
				mongoUtils.updatePlayerInfos(data);
			});

			socket.on('playerFeedback', function (data) {
				console.log("Player feedback received");
				mongoUtils.addPlayerFeedback(data, function () {});
			});

			socket.on('updateMapCase', function (data) {
				console.log('Updating case');
				mongoUtils.updateMapCase(data, function (answer) {
					console.log('Case updated');
				});
			})

			socket.emit('connected', answer);
		});

	}
	return new Sockets();
});