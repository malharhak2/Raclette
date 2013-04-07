define(['mongoose'], function (mongoose) {
	
	var FeedbackSchema = new mongoose.Schema ({

		sender : {
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
		},
		answer : {
			answered : {type : Boolean, default : 0},
			received : {type : Boolean, default : 0},
			content : {
				text : String
			}
		},
		sendDate : {type:Date, default : Date.now},
		content : {
			text : String
		}
	});
	var FeedbackModel = mongoose.model('feedbacks', FeedbackSchema);

	var Feedback = function (datas) {

		this.FeedbackModel = FeedbackModel;
		this.FeedbackSchema = FeedbackSchema; 
		this.datas = datas;
	};

	Feedback.prototype.init = function (callback) {
		
		var that = this;
		this.FeedbackModel = FeedbackModel;
		this.FeedbackSchema = FeedbackSchema;
		that.add(callback);
	};

	Feedback.prototype.add = function (callback) {


		this.model = new this.FeedbackModel({
			sender : {
				facebook : {
					fid : this.datas.infos.fid,
					gender : this.datas.infos.gender,
					locale : this.datas.infos.locale,
					name : this.datas.infos.name,
					link : this.datas.infos.link
				}
			},
			content : {
				text : this.datas.content
			}
		});
		this.saveNew(callback);
	};
	Feedback.prototype.saveNew = function (callback) {

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
		Feedback : Feedback,
		Model : FeedbackModel,
		Schema : FeedbackSchema
	};
});