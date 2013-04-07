define (['CONFIG', 'mongoose', 'mongo/User/User', 'mongo/Feedback', 'mongo/Event', 'sockets'], function (CONFIG, mongoose, User, Feedback, Event, sockets) {


	var mongoUtils = {};

	mongoUtils.init = function (env) {
		if (CONFIG.mongo) {
			var p = CONFIG.mongo;
			mongoose.connect('mongodb://' + p.user + ":" + p.pass + "@" + p.host + ":" + p.port + "/" + p.db, function (err) {

				if (err) {
					throw err;
				}


			});
		}
	};
	mongoUtils.addUser = function(fid, callback) {
		var kevin = new User.User({
			auth : {
				facebook : {
					fid :fid
				}
			}
		});
		kevin.init(function (infos) {
			infos.cocorico({currentTime : Date.now()});
			infos.save (function (err) {
				if (err) throw err;

				callback (infos);
			});
		});
	};

	mongoUtils.addEvent = function (data, callback) {
		var e = new Event.Event(data);
		e.init(function () {
			callback({message : "Event saved :)"});
		});
	};

	mongoUtils.getEvents = function (callback) {
		var query = Event.Model.find({});
		query.exec (function (err, events) {
			if (err) {throw err;}
			callback(events);
		});
	};


	mongoUtils.updatePlayerInfos = function (data) {
		var query = User.Model.findOne({'auth.facebook.fid' : data.fid});
		query.exec( function (err, user) {
			if (err) throw err;
			user.auth.facebook.gender = data.gender;
			user.auth.facebook.locale = data.locale;
			user.auth.facebook.name = data.name;
			user.auth.facebook.link = data.link;

			user.save(function (err) {
				if (err) throw err;
			});
		});
	};

	
	mongoUtils.updateMapCase = function (data) {
		console.log(data);
		var query = User.Model.findOne({'auth.facebook.fid' : data.fid});
		query.exec (function (err, user) {

			if (err) throw err;

			if (user) {

				var map = user.map[0];
				//console.log("Map : " + map);
				var parcelle = user.map[0].parcelles[data.parcelle];
				var cell = parcelle.objects[data.y].objects[data.x];
				for (var i in data.cell.caseContent) {
					user.map[0].parcelles[data.parcelle].objects[data.y].objects[data.x].caseContent[i] = data.cell.caseContent[i];
				}
				user.map[0].parcelles[data.parcelle].objects[data.y].objects[data.x].collision = data.cell.collision;
				user.map[0].parcelles[data.parcelle].objects[data.y].objects[data.x].object = data.cell.object;

				user.map[0].parcelles[data.parcelle].objects[data.y].objects[data.x].markModified('caseContent');


				user.save (function (err) {
					if (err) throw err;
				});
			} else {
			}
		})
	}
	

	mongoUtils.getPlayersIn = function (friendsList, callback) {

		var query = User.Model.find({ 'auth.facebook.fid' : { $in: friendsList } });
		query.select('auth.facebook.fid');
		query.exec( function (err, friends) {
			callback(friends);
		});
	};

	mongoUtils.getPlayersId = function (page, callback) {
		var query = User.Model.find({}).sort({'auth.inscDate' : -1}).skip(page * 50).limit((page + 1) * 50);
		query.exec(function (err, users) {
			if (err) {
				throw err;
				callback("error");
			} else {
			callback(users);
			}
		});
	};

	mongoUtils.getAllPlayers = function (callback) {
		var query = User.Model.find({});
		query.exec( function (err, users) {
			callback (users);
		})
	}

	mongoUtils.getPlayerMap = function (fid, callback) {
		User.Model.findOne({'auth.facebook.fid' : fid}, function (err, copain) {
			callback(copain);
		})
	}

	mongoUtils.addPlayerFeedback = function (datas, callback) {
		console.log("New player feedback");
		var feed = new Feedback.Feedback(datas);
		feed.init(function (infos) {
			console.log("FEedback saved");
			callback(infos);
		});
	};

	mongoUtils.getPlayerFeedbacks = function (player, callback) {
		if (player == "all") {
			var query = Feedback.Model.find({});
		} else {
			var query = Feedback.Model.find({'sender.facebook.fid' : player.fid});
		}
		query.sort({'sendDate' : -1});
		query.exec(function (err, feedbacks) {
			callback(feedbacks);
		});
	}

	mongoUtils.getPlayerProfile = function (data, callback) {
		var fid = data.fid;
		var query = User.Model.findOne({'auth.facebook.fid' : fid});
		query.exec (function (err, user) {
			if (err) throw err;
			if (user) {

				var answer = user;
				callback(answer);
			} else {
				callback("No user found with :" + fid);
			}
		})
	}

	return mongoUtils;
});
