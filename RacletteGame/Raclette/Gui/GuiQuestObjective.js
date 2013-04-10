define (["Debug", "jquery"], function (debug, $) {
	
	var GuiQuestObjective = function (args) {

		this.id = args.objective.id;
		this.parent = args.parent;
		this.container = $('<div />');
		this.container.appendTo(this.parent);
		this.container.attr({
			"class" : "guiQuestObjective"
		});
		this.container.html(args.objective.text);
	}; 

	GuiQuestObjective.prototype.destroy = function () {
		this.container.remove();
	};

	return GuiQuestObjective;
});