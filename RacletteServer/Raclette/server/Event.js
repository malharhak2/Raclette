define(["CONFIG", "EventTrigger", "sockets"], function (CONFIG, EventTrigger, sockets) {

	var Event = function (data) {
		this.id = data.id;
		this.name = data.name;
		this.description = data.description;

		this.launchData = data.launch;
		this.actions = data.actions;
		this.startTriggers = {};
		this.endTrigger = {};
		this.running = false;
	};

	Event.prototype.init = function () {
		this.calculateNextLaunchDate();
		
		/*
		for (var i in start) {
			this.startTriggers[i] = new EventTrigger(start[i], 0);
		};
		var end = this.launchData.end;
		for (var i in end) {
			this.endTriggers[i] = new EventTrigger(end[i], 0);
		};
		*/
	};

	Event.prototype.calculateNextLaunchDate = function () {
		this.startDate = this.getDateFromParams(this.launchData.start);

		this.endDate = this.getDateFromParams(this.launchData.end, this.startDate);
		//console.log(this.startDate.date);
		//console.log(this.endDate.date);
		console.log("Now : " + Date.now() + " - Start : " + this.startDate.date + " - Ecart : " + (this.startDate.date - Date.now()));

	};

	Event.prototype.getDateFromParams = function (data, startingDate) {

		var moisListe = {
			"janvier" : 0,
			"fevrier" : 1,
			"mars" : 2,
			"avril" : 3,
			"mai" : 4,
			"juin" : 5,
			"juillet" : 6,
			"aout" : 7,
			"septembre" : 8,
			"octobre" : 9,
			"novembre" : 10,
			"decembre" : 11
		};
		var moments = {
			"aube" : 5,
			"matin" : 8,
			"midi" : 11,
			"apresmidi" : 14,
			"soir" : 18,
			"nuit" : 22
		};
		var jours = {
			"dimanche" : 0,
			"lundi" : 1,
			"mardi" : 2,
			"mercredi" : 3,
			"jeudi" : 4,
			"vendredi" : 5,
			"samedi" : 6
		};
		var currentDate = {
			date : new Date()
		};
		currentDate.year = currentDate.date.getFullYear();
		currentDate.month = currentDate.date.getMonth();
		currentDate.day = currentDate.date.getDate();
		currentDate.weekDay = currentDate.date.getDay();
		currentDate.hour = currentDate.date.getHours();
		currentDate.minute = currentDate.date.getMinutes();
		currentDate.seconds = currentDate.date.getSeconds();

		var annee = currentDate.year;
		var mois = currentDate.month;
		if (data.mois !== "nope") {
			mois = moisListe[data.mois];
		} else if (startingDate) {
			mois = startingDate.mois
		}
		if (mois < currentDate.month) {
			annee += 1;
		}
		var jour = 1;
		if (data.heure !== -1 || data.minute !== -1 || data.seconde !== -1) {
			jour = currentDate.day;
		}
		if (data.jour !== -1) {
			jour = data.jour;
		} else if (data.jourSemaine !== "nope") {
			var infos = this.getUTCDay(currentDate, annee, mois, jours[data.jourSemaine]);
			annee = infos.annee;
			mois = infos.mois;
			jour = infos.jour;
		} else if (startingDate) {
			jour = startingDate.jour
		}
		if (jour < currentDate.day) {
			mois += 1;
			if (mois < currentDate.month) {
				annee += 1;
			}
		}
		var heure = 0;
		if (data.minute !== -1 || data.seconde !== -1) {	
			heure = currentDate.hour;
		}
		if (data.moment !== "nope") {
			heure = moments[data.moment];
		} else if (data.heure !== -1) {
			heure = data.heure
		} else if (startingDate) {
			heure = startingDate.heure;
		}
		if (currentDate.hour > heure && data.heure !== -1 ) {
			jour += 1;
			if (jour < currentDate.day) {
				mois += 1;
				if (mois < currentDate.month) {
					annee += 1;
				}
			}
		}
		var minute = 0;
		if (data.seconde !== -1) {
			minute = new Date().getMinutes();
		}
		if (data.minute !== -1) {
			minute = data.minute;
		} else if (startingDate) {
			minute = startingDate.minute;
		}
		if (currentDate.minute > minute && data.minute !== -1) {
			heure+= 1;
			if (heure < currentDate.hour) {
				jour += 1;
				if (jour < currentDate.day) {
					mois += 1;
					if (mois < currentDate.month) {
						annee += 1;
					}
				} 
			}
		}

		var seconde = 0;
		if (data.seconde !== -1) {
			seconde = data.seconde;
		} else if (startingDate) {
			seconde = startingDate.seconde;
		}
		if (currentDate.seconds > seconde && data.seconde !== -1) {
			minute += 1;
			if (minute < currentDate.minute) {
				heure += 1;
				if (heure < currentDate.hour) {
					jour += 1;
					if (jour < currentDate.jour) {
						mois += 1;
						if (mois < currentDate.month) {
							annee += 1;
						}
					}
				}
			}
		}
		if (seconde > 59) {
			minute += 1;
			seconde = 0;
		}
		if (minute > 59) {
			heure += 1;
			minute = 0;
		}
		if (jour > new Date(annee, mois + 1, 0).getDate()) {
			mois += 1;
			heure = 0;
		}
		if (mois > 11) {
			annee += 1;
			mois = 0;
		}
		console.log(annee, mois, jour, heure, minute, seconde);
		var finalDate = new Date(annee, mois, jour, heure, minute, seconde);
		return {
			date : finalDate,
			annee : annee,
			mois : mois,
			jour : jour,
			heure : heure,
			minute : minute,
			seconde : seconde
		};
	};

	Event.prototype.getUTCDay = function (currentDate, year, month, day) {
		var ajd = currentDate.day
		var ajdDay = currentDate.weekDay;
		if (month != currentDate.month) {
			console.log("Later month");
			ajd = new Date(year, month, 1).getDate();
			ajdDay = new Date(year, month, 1).getDay();
		}
		var ecart = (7 - ajdDay) + day;
		if (ajdDay <= day) {
			ecart = day - ajdDay;
		}
		//console.log ("year : ", year," month : ", month, " Day : ",  day, " ajd :" ,  ajd, "ajdDay : ", ajdDay, " ecart : ", ecart);
		var result = ajd + ecart;
		if (result < 0) {
			month -= 1;
			if (month < 0) {
				year -= 1;
				month = 11;
			}
			result = new Date(year, month + 1, 0).getDate() + result;
		}
		if (result > new Date(year, month + 1, 0).getDate()) {
			month += 1;
			if (month > 11) {
				year += 1;
				month = 0;
			}
			result = result - new Date(year, month, 0).getDate();
		}
		return {
			annee : year,
			mois : month,
			jour : result
		}

	}

	Event.prototype.update = function (data) {
		if (!this.running) {
			if (data.date > this.startDate.date) {
				this.start();
			}
		} else {
			if (data.date > this.endDate.date) {
				console.log(data.date - this.endDate.date);
				this.end();
				this.startDate = this.getDateFromParams(this.launchData.start, this.endDate);
			}
		}
	}

	Event.prototype.end = function () {
		console.log ("End event : " + this.name);
		this.startDate = this.getDateFromParams(this.launchData.start, this.endDate);
		this.running = false;
		sockets.io.sockets.emit('eventEnd', this);
	};

	Event.prototype.start = function () {
		console.log("Start event : " + this.name);
		this.endDate = this.getDateFromParams(this.launchData.end, this.startDate);
		this.running = true;
		sockets.io.sockets.emit('eventLaunch', this);
	}

	return Event;
});