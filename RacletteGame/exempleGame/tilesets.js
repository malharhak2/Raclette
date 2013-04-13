define([], function () {
	var tilesets = {};

	tilesets["main"] = {
		width : 10,
		height : 5,
		caseWidth : 64,
		caseHeight : 64,
		image : "tileset",
		tiles : [
			{   x : 1, y : 1, name : "rock_no", type : "rock"
			},{ x : 2, y : 1, name : "rock_n", type : "rock"
			},{ x : 3, y : 1, name : "rock_ne", type : "rock"
			},{ x : 1, y : 2, name : "rock_o", type : "rock"
			},{ x : 2, y : 2, name : "rock", type : "rock"
			},{ x : 3, y : 2, name : "rock_e", type : "rock"
			},{ x : 1, y : 3, name : "rock_so", type  : "rock"
			},{ x : 2, y : 3, name : "rock_s", type : "rock"
			},{ x : 3, y : 3, name : "rock_se", type : "rock"
			},{ x : 5, y : 2, name : "void", type : "void"
			},{ x : 4, y : 4, name : "platform_o", type : "platform"
			},{ x : 5, y : 4, name : "platform", type : "platform"
			},{ x : 6, y : 4, name : "platform_e", type : "platform"
			}
		]
	};
	return tilesets;
})