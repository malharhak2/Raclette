define(['rapp', 'rCONFIG', 'rMongo', 'rfacebook', 'rSocketConnection'], function (app, CONFIG, mongoUtils, facebook, SocketConnection) {

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
			console.log("connection");
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
				console.log("handshake", data);
				that.connections[data.fid] = new SocketConnection({
					socket : socket,
					timezone : 1,
					fid : data.fid,
					master : that.connections
				});
				mongoUtils.addUser(data.id, function (answer) {
					if (app.app.settings.env == "production" || app.app.settings.env == "fbdev" || app.app.settings.env == "staging") {
						answer.facebook = true;
					} else {
						answer.facebook = false;
					}
					socket.emit('handshake', answer);
				});
			});


			socket.on('updatePlayerInfos', function (data) {
				mongoUtils.updatePlayerInfos(data);
			});

			socket.on('test' , function () {
				console.log("couccou");
			})

			socket.emit('connected', answer);
		});

	}
	return new Sockets();
});