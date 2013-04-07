define(["Raclette/Animation"], function(Animation) {

var anims = {};
anims["whitePlateforme"] = new Animation({

	img : "whitePlateforme",
	size : 5,
	steps : 5,
	width : 140,
	height : 65,
	defaultState : 'idle',
	defaultDir : 'none',
	states : {
		"idle" : {
			"none" : {
				position : 0,
				size : 0
			},
			"options" : {
				"pace" : 100,
				"onStart" : function () {},
				"onStop" : function () {}
			}
		}			
	}
		
	});
anims["blackPlateforme"] = new Animation({
	img: "blackPlateforme",
	size : 5,
	steps : 5,
	width : 139,
	height : 65,
	defaultState : 'idle',
	defaultDir : 'none',
	states : {
		"idle" : {
			"none" : {
				position : 0,
				size : 0
			},
			"options" : {
				"pace" : 150,
				"onStart" : function () {},
				"onStop" : function () {}
			}
		}			
	}
});
anims["handshroomWhite"] = new Animation({
	img: "handshroomWhite",
	size : 4,
	steps : 4,
	width : 128,
	height : 64,
	defaultState : 'move',
	defaultDir : "right",
	states : {
		"idle" : 
		{
			"right" : 
			{
				position : 0,
				size : 0
			},
			"options" : 
			{
				"pace" : 100,
				"onStart" : function () {},
				"onStop" : function () {}
			}
		},
		"move" : 
		{
			"right" : 
			{
				position : 1,
				size: 0
			},
			"left" : 
			{
				position: 2,
				size: 0
			},
			"options" : {
				"pace" : 100,
				"onStart" : function () {},
				"onStop" : function () {}
			}
		},
		"load" :
		{
			"right" :
			{
				position: 3
			},
			"left" :
			{
				position: 4
			},
			"options" : {
				"pace" : 50,
				"onStart" : function () {},
				"onStop" : function() {}
			}
		},
		"attack" :
		{
			"right" :
			{
				position: 5
			},
			"left" :
			{
				position: 6
			},
			"options" : {
				"pace" : 50,
				"onstart" : function () {},
				"onStop" : function() {}
			}
		}
				
	}
});
return anims
});