define(['mongoose', 'utils'], function (mongoose, utils) {
	
	
	var EventSchema = new mongoose.Schema({
		id : {
			type : String,
			index : {unique : false}
		},
		name : {type : String, default : "NO_NAME"},
		description : {type : String, default : "NO_DESCRIPTION"},
		launch : {
			start : {
				mois : {type : String, default : "nope"},
				jourSemaine : {type : String, default : "nope"},
				jour : {type : Number, default : -1},
				moment : {type : String, default : "nope"},
				heure : {type : Number, default : -1},
				minute : {type : Number, default : -1},
				seconde : {type : Number, default : -1}
			},
			end : {
				mois : {type : String, default : "nope"},
				jourSemaine : {type : String, default : "nope"},
				jour : {type : Number, default : -1},
				moment : {type : String, default : "nope"},
				heure : {type : Number, default : -1},
				minute : {type : Number, default : -1},
				seconde : {type : Number, default : -1}
			}
		},
		actions : {type:String, default : ""}
	});


	var EventModel = mongoose.model('events', EventSchema);

	var Event = function (data) {
		this.data = data;
	}

	Event.prototype.init = function (callback) {

		this.model = new EventModel(this.data);
		this.model.save( function (err) {
			if (err) { throw err; }
			callback();
		});
	};
	

	return {
		Event : Event,
		Model : EventModel,
		Schema : EventSchema
	};
});