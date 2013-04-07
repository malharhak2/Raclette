define([], function(){
	function Debug(){
		this.logs = true;
		this.warns = true;
		this.errors = true;
	}

	Debug.prototype.processTag = function (tag) {
		return "[" + tag + "] : ";
	}

	Debug.prototype.processLog = function () {
		var tag = "[UNTAGGED] : ";
		if (arguments.length > 1) {
			tag = this.processTag(arguments[0]);
		}
		var log = [tag];
		for (var i = 0; i < arguments.length; i++) {
			if (arguments.length > 1 && i == 0) {
				continue;
			} else {
				log.push(arguments[i]);
			}
		};
		return log;
	}

	Debug.prototype.log = function(){
		if (this.logs) {
			console.log.apply(console, this.processLog.apply(this, arguments));
		}
	}

	Debug.prototype.warn = function(){
		if (this.warns) {
			console.warn.apply(console, this.processLog.apply(this, arguments));
		}
	}

	Debug.prototype.error = function(){
		if (this.errors) {
			console.error.apply(console, this.processLog.apply(this, arguments));
		}
	}
	return new Debug();
})