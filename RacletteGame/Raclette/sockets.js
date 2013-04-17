define(["rsocket_io", "rCONFIG", "rutils", "rfacebook"], function (io, CONFIG, utils, facebook) {
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
            fid : this.fid
        };
        for (var i in params) {
            newParams[i] = params[i];
        };

        this.socket.emit(name, newParams);
    };

    Sockets.prototype.on = function (name, callback) {
        this.socket.on(name, callback);
    };

    return new Sockets();

});