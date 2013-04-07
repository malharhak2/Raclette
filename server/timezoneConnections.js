define([], function () {
	
	var timezoneConnections = {};
	for (var i = -12; i < 13; i++) {
		timezoneConnections[i] = {};
	};

	return timezoneConnections;
});