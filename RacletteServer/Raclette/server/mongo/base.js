
define (['rCONFIG', 'mongoose', 'rMongoUser', 'rsockets', 'rMapSave'], function (CONFIG, mongoose, User, sockets, MapSave) {


	var mongoUtils = {};

	mongoUtils.init = function (env) {
		if (CONFIG.mongo) {
			var p = CONFIG.mongo;
			mongoose.connect('mongodb://' + p.user + ":" + p.pass + "@" + p.host + ":" + p.port + "/" + p.db, function (err) {
				console.log("Mongo connected");
				if (err) {
					throw err;
				}


			});
		}
	};
	mongoUtils.addUser = function(id, callback) {
		var kevin = new User.User({
			auth : {
				facebook : {
					id :id
				}
			}
		});
		kevin.init(function (infos) {
			infos.save (function (err) {
				if (err) throw err;
				callback (infos);
			});
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

	mongoUtils.finishLevel = function (data) {
		console.log("Mongo finishLvl", data);
		var query = User.Model.findOne({'auth.facebook.id' : data.id});
		query.exec (function (err, user) {
			if (user != undefined) {
				for (var i = 0; i < user.stats.save.maps.length; i++) {
					var map = user.stats.save.maps[i];
					if (map.id == data.id) {
						if (data.score > map.score) {
							map.score = data.score;
						}
						if (data.time < map.time) {
							map.time = data.time;
						}
						map.save(function (err) {});
						return;

					}
				};
				var map = new MapSave.Model (data);
				user.maps.push(map);
				user.save(function (err) {
					throw err;
				})
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
	};

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
		});
	};

	return mongoUtils;
});
