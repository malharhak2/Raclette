define(["rCONFIG", "rsockets", "rMongo", "rGameloop"], function (CONFIG, sockets, mongoUtils, gameloop) {
	
	var App = function () {

		this.express = require('express');
		this.app = this.express();
		CONFIG.init(this.app.settings.env);
		mongoUtils.init(this.app.settings.env);
	};

	App.prototype.init = function (dirname, env) {
		

		if (CONFIG.protocol == "https") {

			var fs = require('fs');
			this.hskey = fs.readFileSync(dirname + '/../game_server/certificates/myserver.key');
			this.hscert = fs.readFileSync(dirname + '/../game_server/certificates/certificate.crt');
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
		this.app.use(this.express.static(dirname + '../../../RacletteGame'));
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
			res.redirect("/");
		});		
		this.app.get('/game', function(req, res) {
			res.redirect("/");
		});
		this.app.get('/', function(req, res) {
			res.render(view);
		});


		sockets.init(this);

		gameloop.run();
	};

	return new App();
});