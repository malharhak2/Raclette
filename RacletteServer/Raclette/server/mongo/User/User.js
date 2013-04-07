define(['mongoose', 'mongo/User/House/House', 'mongo/User/Map/Map'], function (mongoose, House, Map) {
	
	var UserSchema = new mongoose.Schema ({

		auth : {
			name : {type : String, default : "Anonymous"},
			facebook : {
				fid : {type: String, default: "None"},
				gender : {type:String, default : "male"},
				locale : {type:String, default : "fr_FR"},
				name : {type:String, default : "None"},
				link : {type:String, default : "http://www.facebook.com"}
			},
			mail : {type:String, default:"None"},
			ip : String,
			inscDate : {type:Date, default: Date.now},
			lastConnection : {type : Date, default : Date.now()}
		},
		stats : {
			money : {type : Number, default : 10}
		},
		map : [Map.schema],
		house : [House.schema]
	});

	UserSchema.methods.cocorico = function (datas) {
		var data = {
			lastConnection : this.auth.lastConnection,
			currentConnection : datas.currentTime
		};
		data.deltaTime = data.currentConnection - data.lastConnection;
		this.map[0].cocorico(data);
		this.auth.lastConnection = Date.now();
		this.save();
	}
	var UserModel = mongoose.model('users', UserSchema);

	var User = function (datas) {

		this.UserModel = UserModel;
		this.UserSchema = UserSchema; 
		this.datas = datas;
	};

	User.prototype.init = function (callback) {
		
		var that = this;
		this.UserModel = UserModel;
		this.UserSchema = UserSchema;
		var query = UserModel.findOne({'auth.facebook.fid' : this.datas.auth.facebook.fid}, function (err, user) {
			if (user != undefined) {
				that.getInfos(user, callback);
			} else {
				that.add(callback);
			}
		});
	}

	User.prototype.doesExist = function (callback) {

		var that = this;
		var query = UserModel.findOne({'auth.facebook.fid' : this.datas.auth.facebook.fid}, function (err, user) {
			if (user != undefined) {
				callback (true);
			} else {
				callback (false);
			}
		});
	};

	User.prototype.getInfos = function (user, callback) {

		this.model = user;
		callback(user);
	};

	User.prototype.add = function (callback) {


		this.model = new this.UserModel({
			auth : {
				facebook : {
					fid : this.datas.auth.facebook.fid
				}
			}		
		});
		this.model.map.push(new Map.Map().model);
		this.model.house.push(new House.House().model);
		this.saveNew(callback);
	};
	User.prototype.saveNew = function (callback) {

		var that = this;
		this.errors = [];
		this.model.save(function (err) {
			if (err) {
				this.errors.push(err);
				throw err;
			}
			callback(that.model);
		});
	};

	return {
		User : User,
		Model : UserModel,
		Schema : UserSchema
	};
});