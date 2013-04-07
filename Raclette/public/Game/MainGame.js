define(["Game/Map", "Game/Player", "Game/config", "Game/scrolling"], function(map, Player, config, scrolling){
	var moteur;
	var players = [];
	var playerCreated = 0;
	function init(LajiliEngine)
	{
		window.moteur = moteur = LajiliEngine; // I get the engine (the var is at the beginning of the file)
		players.push(new Player(moteur.manetteGlobale));
		moteur.interfaceManager.init();
		moteur.world.init({x:0,y:8}); // I init the world
		moteur.camera.origin = moteur.camera.y = 980 + config.height/4;
		//I create a few objects i'll use lateron
		moteur.world.createPhysicalObjectType({id: "floor", shape: "square", image: "floor", width: 0.25, height: 0.25, density: 0.5, friction: 0.5, restitution: 0})
		moteur.world.createPhysicalObjectType({id: "brick", shape: "square", image: "brick", width: 0.25, height: 0.25, density: 0.5, friction: 0.5, restitution: 0})
		moteur.world.createPhysicalObjectType({id: "player", shape: "square", image: "handshroomWhite", width: 0.25, height: 0.16, density: 0.1, friction: 0.5, restitution: 0.2, imageWidth: 0.4, imageHeight: 0.2, imageOffset: {x:0, y: 0.05}, fixedRotation: true, animated: true});
		var offset = moteur.utils.metters(config.width/5);
		// I parse the map (see map.js) to instance every object
		var niveau = map.niveaux[map.currentLevel]
		for (var i=0; i<niveau.length; i++)
		{
			var item = niveau[i];
			switch(item.id)
			{
				case 1:
					moteur.world.instancePhysicalObject("floor", true, item.x/4, item.y/4, {}, []);
				break;

				case 2:
					moteur.world.instancePhysicalObject("brick", true, item.x/4, item.y/4, {}, []);
				break;

				default:
				console.error("élement de level inconnu", "id", niveau[i].id, "i", i)
				break;
			}
		}

		// I instance the player
		var thot = players[0]
		players[0].physical = moteur.world.instancePhysicalObject("player", false, 4, 0, {onCollision: function(){
		thot.jumpAllowed = true;
		console.log("thot", thot)
		}}, ["punchable"]);
	}

	function update()
	{
		scrolling(moteur.camera, {x: moteur.utils.pixels(players[0].physical.body.GetPosition().x), y: moteur.utils.pixels(players[0].physical.body.GetPosition().y)})
		moteur.world.update();
		 // A variable that prevent invoking 50000 'coupDePoing' each second.
			for (i=0; i<players.length; i++)
			{
				if (players[i].input == "bot") return;
				players[i].load = players[i].leftLoad || players[i].rightLoad;
				if (players[i].timerCoup > 0) {players[i].timerCoup--}
				if (moteur.inputsManager.isButtonPressed(players[i].input, "39")) // Si le player va à droite
				{
					players[i].physical.body.SetLinearVelocity({x:moteur.inputsManager.isButtonPressed(players[i].input, "39")*3, y: players[i].physical.body.GetLinearVelocity().y })
					if (players[i].load == false && players[i].attack == false)
					{
						players[i].physical.renderer.state = "move";
						players[i].physical.renderer.dir = "right";
					}
				}
				else if (moteur.inputsManager.isButtonPressed(players[i].input, "37")) // Si il va à gauche
				{
					players[i].physical.body.SetLinearVelocity({x:moteur.inputsManager.isButtonPressed(players[i].input, "37")*3, y: players[i].physical.body.GetLinearVelocity().y })
					if (players[i].load == false && players[i].attack == false)
					{
						players[i].physical.renderer.state = "move";
						players[i].physical.renderer.dir = "left";
					}
				}
				else // si il reste sur place.
				{
					//players[i].physical.body.SetLinearVelocity({x:0, y: players[i].physical.body.GetLinearVelocity().y})
					if (players[i].load == false && players[i].attack == false)
					{
						players[i].physical.renderer.state = "idle";
						players[i].physical.renderer.dir = "right";
					}
				}
				if (moteur.inputsManager.isButtonPressed(players[i].input, "76"))
					{
						console.log("demande de saut", players[i])
						if (players[i].jumpAllowed)
						{
							players[i].physical.body.SetLinearVelocity({x: players[i].physical.body.GetLinearVelocity().x, y: -4})
							players[i].jumpAllowed = false;
						}
					}
				if (moteur.inputsManager.isButtonPressed(players[i].input, "77"))
				{
					players[i].physical.renderer.state = "load";
					players[i].physical.renderer.dir = "right";
					players[i].rightLoad = true;
					players[i].timerCoup = players[i].timerMaxCoup; // I set the timer at the max
					console.log("poing droit");
					// I instance a coup with a 'onCollision' function. if the objectTouche is punchable, i give a linear velocity to the objetTouche
					var coup = moteur.world.instancePhysicalObject("coupDePoing", false, players[i].physical.body.GetPosition().x+1,players[i].physical.body.GetPosition().y, {onCollision:function(body){
					
						var objetTouche = moteur.world.getObject(body.m_userData.id);
						
						if (objetTouche.tags[0] == "punchable")
						{
							objetTouche.body.SetLinearVelocity({x: 5, y: objetTouche.body.GetLinearVelocity().y})
						}
					console.log(coup)

					}}, ["coup"])
					moteur.world.removeObject(coup)
					
				}
				else
				{
					if (players[i].rightLoad == true)
					{
						players[i].rightLoad = false;
						players[i].physical.renderer.state = "attack";
						players[i].physical.renderer.dir = "right";
						players[i].attack = true;
						players[i].physical.renderer.step = 0;
						var player = players[i];
						players[i].physical.renderer.onEnd = function(){
							player.setNormal();
						}
					}
				}

				if (moteur.inputsManager.isButtonPressed(players[i].input, "75"))
				{
					players[i].physical.renderer.state = "load";
					players[i].physical.renderer.dir = "left";
					players[i].leftLoad = true;
				}
				else
				{
					if (players[i].leftLoad)
					{
						players[i].leftLoad = false;
						players[i].physical.renderer.state = "attack";
						players[i].physical.renderer.dir = "left";
						players[i].physical.renderer.step = 0;
						var player = players[i];
						players[i].physical.renderer.onEnd = function(){
							player.setNormal();
						}
						players[i].attack = true;
					}	
					
				}

			}		

	}
return {init: init, update: update}
});