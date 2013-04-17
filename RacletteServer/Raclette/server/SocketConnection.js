define(["rCONFIG"], function (CONFIG) {
	
	var SocketConnection = function (data) {
		this.socket = data.socket;
		this.lastHeartbeat = Date.now();
		this.fid = data.fid;
		this.master = data.master;

		this.init();
	};

	SocketConnection.prototype.init = function () {	
		var that = this;
		this.socket.on('playerping', function () {
			that.lastHeartbeat = Date.now();
		});
	};

	SocketConnection.prototype.update = function (data) {
		if (data.date - this.lastHeartbeat > 300000) {
			this.suicide();
		}
	};

	SocketConnection.prototype.suicide = function () {
		delete this.master[this.fid];
		return;
	}

	return SocketConnection;
});