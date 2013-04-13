define([], function(){
var config = {
	useMap : true,
	unitSize : 64,
	drawDebug : true,
	useTilesets : true,
	gameTitle : "Raclette demo", 
	containerID : "#racletteGame",
	guiID : "#racletteGui",
	backgroundColor: "#A099A0",
	screen : {
		mode : "ratio_css",
		ratio : 16/10,
		width : 1600,
		height : 1000
	},
	floor: 62,
	gravity : {
		x : 0,
		y : 0.0005
	},
	maxSpeed : {
		x : 1,
		y : 1
	},
	pressedThreshold : 0.2,
	canvasBackgroundColor: "#4E3D61", // the backgroundColor of your canvas,
	showCredit: true, // Have a footer with the text "realised with the Lajili Engine" and a link to my website. If you choose not to, please send me a mail with the adress of your game, i'm curious of the games made with my engine :),
	showCustomFooter: true,

	controllers : [
		{
			id : "one",
			keysTable : {
				"jump" : [16, 17, 32, "A"],
				"left" : [37, 81, "ls_left"],
				"right" : [39, "ls_right"],
				"start" : [13, "Start"]
			},
			gamepadNumber : 0
		}
	],

	layers : {
		"Background" : {
			name : "Background",
			parallax : 0.3
		},
		"Midground" : {
			name : "Midground",
			parallax : 1
		},
		"Foreground" : {
			name : "Foreground",
			parallax : 1
		},
		"Objects" : {
			name : "Objects",
			parallax : 1
		}
	}
}

return config
});