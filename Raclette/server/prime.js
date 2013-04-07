define([], function () {
	var prime = {
		nextPrime : function (n) {

			var smaller;
			n = Math.floor(n);

			if (n >= 2) {
				smaller = 1;
				while (smaller * smaller <= n) {
					n++;
					smaller = 2;
					while ((n % smaller > 0) && (smaller * smaller <= n)) {
						smaller++;
					}
				}
				return n;
			} else {
				return 2;
			}
		},
		asyncPrime : function (n, fn) {
			var _this = this;
		  	setTimeout(function() {
				fn(_this.nextPrime(n));
			}, 10);
		}
	};
	return prime;
});