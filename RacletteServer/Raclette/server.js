var requirejs = require('requirejs');

var paths = {
	"engine" : "Raclette/server/",
	"mongo" : "mongo/"
}
requirejs.config({
    baseUrl : __dirname + "/../",
    nodeRequire: require,
    paths : {

    	"rapp" : paths.engine + "app",
    	"rCONFIG" : paths.engine + "CONFIG",
    	"rDebug" : paths.engine + "Debug",
    	"rfacebook" : paths.engine + "facebook",
    	"rGameloop" : paths.engine + "Gameloop",
    	"rSocketConnection" : paths.engine + "SocketConnection",
    	"rsockets" : paths.engine + "sockets",
    	"rutils" : paths.engine + "utils",
    	"rmain" : paths.engine + "main",

    	// Mongo
    	"rMongo" : paths.engine + paths.mongo + "base",
    	"rMongoUser" : paths.engine + paths.mongo + "User/User",
    	"rMongoAuth" : paths.engine + paths.mongo + "User/Auth/Auth",
        "rMapSave" : paths.engine + paths.mongo + "User/MapSave"
    }
});
requirejs(["rCONFIG", 'rapp', 'rsockets'], function (CONFIG, app, sockets) {
	console.log("Dirname : " + __dirname);
	app.init(__dirname);
});

