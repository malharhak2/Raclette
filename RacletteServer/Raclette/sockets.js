define(['app', 'CONFIG', 'mongo/base', 'facebook', 'SocketConnection'], function (app, CONFIG, mongoUtils, facebook, SocketConnection) {

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
				console.log("handshake received");
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

			socket.on('test', function () {
				console.log("test");
			})

			socket.on('finishLevel', function (data) {
				console.log("Level finished : ", data);
				mongoUtils.finishLevel (data);
			});

			socket.emit('connected', answer);
		});

	}
	return new Sockets();
});