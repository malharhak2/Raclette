define([], function () {
	var EventTrigger = function (id, state) {
		this.id = id;
		this.state = state;
	};

	return EventTrigger;
})