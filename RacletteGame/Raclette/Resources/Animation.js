define([], function() {
	function Anim(name, anim) {
		this.img = name;
		this.size = anim.size;
		this.width = anim.width;
		this.height = anim.height;
		this.defaultDir = anim.defaultDir || "idle";
		this.defaultState = anim.defaultState || "none";
		this.states = anim.states || {
			"idle" : {
				none : {
					position : 0
				}
			}
		};

		for (var i in this.states) {
			var s = this.states[i];
			if (!s.options) {
				s.options = {
					pace : 100
				}
			}
			for (var j in s) {
				var d = s[j];
				if (!d.size) {
					d.size = 0;
				}
			}
		}
	};

	return Anim;
});