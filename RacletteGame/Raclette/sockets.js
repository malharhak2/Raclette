define(["rsocket_io", "rDebug", "rCONFIG", "rutils", "rfacebook", "rGlobalVariables"], function (io, debug, CONFIG, utils, facebook, user, globalVariables) {
    var Sockets = function () {

    	this.io = io;
        this.lastBeat = Date.now();
    }

    Sockets.prototype.init = function (callback) {

        this.socket = io.connect(CONFIG.domain);
        var that = this;
        this.socket.on('connected', function (answer) {
            callback(answer);
        });
    };

    Sockets.prototype.emit = function (name, params) {
        var newParams = {
            id : params.id
        };
        for (var i in params) {
            newParams[i] = params[i];
        };
        debug.log("Sockets", name, params, newParams);
        this.socket.emit("test", "bonjour");
        this.socket.emit(name, newParams);
    };

    Sockets.prototype.on = function (name, callback) {
        this.socket.on(name, callback);
    };

    return new Sockets();

});