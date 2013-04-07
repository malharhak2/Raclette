define(["CONFIG", "sockets", "mongo/base", "Gameloop", "EventsManager"], function (CONFIG, sockets, mongoUtils, gameloop, eventsManager) {
	
	var App = function () {

		this.express = require('express');
		this.app = this.express();
		CONFIG.init(this.app.settings.env);
		mongoUtils.init(this.app.settings.env);
	};

	App.prototype.init = function (dirname, env) {
		

		if (CONFIG.protocol == "https") {

			var fs = require('fs');
			this.hskey = fs.readFileSync(dirname + '/myserver.key');
			this.hscert = fs.readFileSync(dirname + '/certificate.crt');
			var options = {
				key : this.hskey,
				cert : this.hscert
			};
			this.server = require(CONFIG.protocol).createServer(options, this.app);
		} else {
			this.server = require(CONFIG.protocol).createServer(this.app);
		}
		console.log(CONFIG.protocol);


		var port = CONFIG.port;
		console.log(port);

		this.server.listen(port, function () {
			console.log('listening' + port);
		});
		this.app.use(this.express.static(dirname + '/game/client'));
		this.app.set('views', dirname + '/views');
		this.app.use(this.express.cookieParser());
		this.app.use(this.express.bodyParser());
    	this.app.use(this.express.session({secret: 'secret', key: 'express.sid'}));

    	var view = "game.jade";
    	/*
    	if (this.app.settings.env == "production") {
    		view = "homeProd.jade";
    	}
    	*/
		this.app.post('/game?', function(req, res) {
			res.render(view);
		});		
		this.app.get('/game', function(req, res) {
			res.render(view);
		});
		this.app.get('/', function(req, res) {
			res.render(view);
		});


		sockets.init(this);
		
		mongoUtils.getEvents(function (events) {
			console.log(events[0]);
			eventsManager.fill(events);
		});

		gameloop.run();
	};

	return new App();
});