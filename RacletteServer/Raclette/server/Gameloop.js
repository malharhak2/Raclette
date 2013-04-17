define(["rCONFIG"], function (CONFIG) {
	
	var run = function () {
		setTimeout(run, 1000);
	};

	return {run : run};
})