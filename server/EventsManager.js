define (["CONFIG", "Event"], function (CONFIG, Event) {
	
	var defaultEvents = [
	{

		id : "event_01", // ID unique de l'event
		name : "Marathon du jeudi soir", // Nom de l'event
		description : "Tous les jeudi soir, l'ensemble des PNJ courent autour du village", // Description de l'event

		launch : { 
		
		/*
			Conditions de lancement de l'event. On peut préciser un mois, un jour, une semaine, une saison. 
			Si l'event est récurrent, il se reproduira selon la plus grande unité définie (par exemple pour un event annuel. 
			Si son mois de lancement est novembre il se lancera en novembre)
		*/
			start : {
				"mois" : "mars", // Si l'on veut créer un event qui se reproduit à chaque mois de mars, on précise cela. Si on enlevait cette ligne, l'event se répèteraient simplement tous les jeudi
				"jourSemaine" : "jeudi",
				"moment" : "soir" // On peut spécifier une période (matin, midi, aprem, soir, nuit) ou une heure ("10" pour 10 heures, ou "10:30" pour 10 heures 30)
				/*
					Au final, cet event se reproduit tous les jeudi de la première semaine de mars, le soir.
				*/
			},
			end : {
				"moment" : "nuit" // L'event se termine dès qu'on arrive à la nuit.
			}
		}
	},
	{
		id : "event_02",
		name : "Fake event toutes les dix secondes",
		description : "Toutes les dix secondes, les NPC font des bébés",

		launch : {

			start  : {
				"seconde" : 10
			},
			end : {
				"seconde" : 30
			}
		}
	},
	{
		id : "event_03",
		name : "Coucou tu veux voir ma bite",
		description : "Toutes les dix secondes, les NPC font des bébés",

		launch : {

			start  : {
				"seconde" : 10
			},
			end : {
				"seconde" : 30
			}
		}
	},
	{
		id : "event_04",
		name : "MDRLOLOLOL",
		description : "Toutes les dix secondes, les NPC font des bébés",

		launch : {

			start  : {
				"minute" : 5
			},
			end : {
				"minute" : 34
			}
		}
	},
	{
		id : "event_05",
		name : "Fake event toutes les dix secondes",
		description : "Toutes les dix secondes, les NPC font des bébés",

		launch : {

			start  : {
				"jour" : 10
			},
			end : {
				"jour" : 18
			}
		}
	},
	{
		id : "event_06",
		name : "test",
		description : "test",
		launch : {
			start : {
				mois : "janvier"
			},
			end : {
				mois : "fevrier"
			}
		}
	}
	
	];
	var EventsManager = function () {
		this.events = {};

		this.lastDate = {
			"mois" : 0,
			"jour" : 0,
			"jourSemaine" : 0,
			"moment" : 0,
			"heure" : 0,
			"minute" : 0,
			"seconde" : 0
		};

		this.triggers = {
			"mois" : [], // Janvier, février...
			"jour" : [], // 1 à 31
			"jourSemaine" : [], // 1 à 7
			"moment" : [], // aube, matin, midi, apresMidi, soiree, nuit
			"heure" : [], // 0 à 23
			"minute" : [], // 0 à 59
			"seconde" : [], // 0 à 59

		};

		
	};

	EventsManager.prototype.fill = function (events) {
		for (var i = 0; i < events.length; i++) {
			this.events[events[i].id] = new Event(events[i]);
			this.events[events[i].id].init();
		};
	};

	EventsManager.prototype.pushEvent = function (evt) {
		this.events[evt.id] = new Event(evt);
		this.events[evt.id].init();
	};


	EventsManager.prototype.update = function (data) {
		for (var i in this.events) {
			this.events[i].update (data);
		};
	};
	var eventsManager = new EventsManager();
	return eventsManager;
});