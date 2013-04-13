define(["rAnimation"], function(Animation) {
/** Animations list
 * An animation has a few parameters :
 * Size - Which is the default length (in keys) of every anim - 0 if not precised
 * Width and height - The size of an animation case
 * states : The different animation states (moving and idle for exemple)
 * For each state : 
 *	. (optional) options : 
 *		. pace - The speed of the anim
 * 	. The directions (left and right for exemple)
 *	For each direction :
 *		. A position
 *	. An optionnal size if it needs to be different than the main animation size
 */
var datas = {
	"whitepPlateforme" : {
		width : 140,
		height : 65,
	},
	"blackPlateforme" : {
		width : 139,
		height : 65,
	},
	"handshroomWhite" : {
		size : 4,
		width : 128,
		height : 64,
		defaultState : 'move',
		defaultDir : 'right',
		states : {
			'idle' : {
				left : {
					position : 0
				},
				right : {
					position : 0
				}
			},
			'move' : {
				right : {
					position : 1
				},
				left : {
					position : 2
				}
			},
			'load' : {
				right : {
					position : 3
				},
				left : {
					position : 4
				},
				options : {
					pace : 50
				}
			},
			'attack' : {
				right : {
					position : 5
				},
				left : {
					position : 6
				},
				options : {
					pace : 50
				}
			}
		}
	}
};
var anims = {};
function fillAnims () {
	for (var i in datas) {
		anims[i] = new Animation(i, datas[i]);
	};
}
fillAnims();
return anims
});