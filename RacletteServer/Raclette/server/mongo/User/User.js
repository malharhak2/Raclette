define(['mongoose', 'rMapSave'], function (mongoose, mapSave) {
	
	var UserSchema = new mongoose.Schema ({

		auth : {
			name : {type : String, default : "Anonymous"},
			facebook : {
				id : {type: String, default: "None"},
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
			money : {type : Number, default : 10},
			save : {
				maps : [mapSave.Model]
			}
		}
	});

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
		var query = UserModel.findOne({'auth.facebook.id' : this.datas.auth.facebook.id});
		query.exec (function (err, user) {
			if (user != undefined) {
				that.getInfos(user, callback);
			} else {
			}
		});
		that.add(callback);
	}

	User.prototype.doesExist = function (callback) {

		var that = this;
		var query = UserModel.findOne({'auth.facebook.id' : this.datas.auth.facebook.id}, function (err, user) {
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
					id : this.datas.auth.facebook.id
				}
			}		
		});
		this.saveNew(callback);
	};
	User.prototype.saveNew = function (callback) {
		var that = this;
		this.errors = [];
		this.model.save(function (err) {
			console.log(err);
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