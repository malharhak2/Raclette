define([], function(){
	/**
		An animation
		@constructor
		@param {Object} args - The animation parameters
	*/
var AnimationInstance = function (args) {
	this.animName = args.animName || null;
	this.dir = args.dir || null;
	this.state = args.state || null;
	this.step = 0;
	this.lastStep = Date.now();
	this.renderer = {
		sx : 0,
		sy : 0,
		sw : 1, // because a width of 0 can cause issues;
		sh : 1 // idem;
	};
};
return AnimationInstance;

});