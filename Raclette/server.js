var requirejs = require('requirejs');

requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    baseUrl : __dirname + "/server",
    nodeRequire: require
});

requirejs(['main', 'CONFIG', 'app', 'sockets'], function (main, CONFIG, app, sockets) {
	console.log("Dirname : " + __dirname);
	app.init(__dirname);
});

