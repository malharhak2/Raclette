define(["CONFIG", "EventsManager"], function (CONFIG, eventsManager) {
	
	var run = function () {
		eventsManager.update({
			date : Date.now()
		});
		setTimeout(run, 1000);
	};

	return {run : run};
})