define(["CONFIG", "User", "facebook"], function(CONFIG, user, facebook) {
    
    return function(params) {
        
        var gui = params.gui;
        var game = params.game;
        
        var friendsDockHolder = gui.createBox({
    		id : "friendsDock",
    		className : "friendsDock",
    		parent : document.getElementById(CONFIG.guiContainer)
    	});
    	var friendsMiniDock = gui.createBox({
    		id : "friendsContainer",
    		className : "friendsContainer",
    		parent : friendsDockHolder
    	});
    	var friendsDock = gui.createBox({
    		id : "friendsContainerScroller",
    		className : "friendsContainerScroller",
    		parent : friendsMiniDock
    	});
    	if (CONFIG.facebook && user.currentMapId == user.fid) {


	    	var friendsImages = [];
	    	for (var i = 0; i < user.playerFriendsList.length; i++) {
	    		friendsImages[i + 1] = {
	    			img : "http://graph.facebook.com/" + user.playerFriendsList[i] + "/picture"
	    		};
	    	};
	    	friendsImages[0] = {
	    		img : "images/hud/addFriendCadre.png"
	    	};	    	
			friendsImages.push({
	    		img : "images/hud/addFriendCadre.png"
	    	});
	    	for (var i = 0; i < friendsImages.length; i++) {
	    		if (i == 0 || i == friendsImages.length - 1) {
					friendsImages[i].button = friendsDock.createButton({
		    			onclick : function () {
		    				facebook.inviteFriends("Coucou", "test", function(){});
		    			},
		    			id : "friend" + i,
		    			text : "",
		    			className : "button friendItem"
		    		});
	    		} else {

	    			var machin = i - 1;
	    			var machinTruc = function() {

	    				user.getFriendMap(user.playerFriendsList[machin], function (data) {
		        			game.scenesManager.scenes.changeMap.loadMap(data);
		        			game.scenesManager.changeScene(game.scenesManager.scenes.changeMap, game);
		        		});
	    			};
		    		friendsImages[i].button = friendsDock.createButton({
		    			onclick : machinTruc,
		    			id : "friend" + i,
		    			text : "",
		    			className : "button friendItem"
		    		});
	    		}
	    		friendsImages[i].button.DOMElement.css('backgroundImage', 'url(images/degradeCopain.png), url(' + friendsImages[i].img  + ')');
	    	};
			friendsDock.DOMElement.css('width', friendsImages.length * 70 + "px");

	    	var that = this;
    	} else {
    		var homeButton = gui.createButton({
    			onclick : function () {
    				user.getFriendMap(user.fid, function (data) {
    					user.currentMapId = user.fid;
    					game.scenesManager.scenes.changeMap.loadMap(data);
    					game.scenesManager.changeScene(game.scenesManager.scenes.changeMap, game);
    				});
    			},
    			id : "goHome",
    			parent : friendsDock,
    			text : ""    		
    		});
    		friendsDock.DOMElement.css('width', "341px");
    	}
    }
})