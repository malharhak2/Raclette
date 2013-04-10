define (["jquery", "Gui/GuiQuestObjective"], function ($, GuiQuestObjective) {
	
	var GuiQuestItem = function (args) {

		this.id = args.quest.id;
		this.parent = args.parent;
		this.name = args.quest.name;
		this.desc = args.quest.description;
		this.container = $('<div />');
		this.container.appendTo(this.parent);
		this.container.attr({
			"class" : "guiQuest"
		});
		this.iconContainer = $('<img />');
		this.iconContainer.attr({
			"class" : "guiQuestIcon"
		});
		this.objectives = args.quest.objectives;
		this.guiObjectives = {};
		this.tooltipContainer = $("<div />").addClass("questObjectivePopup").appendTo(this.container);
		this.iconContainer.appendTo(this.tooltipContainer);
		this.objectivesContainer = $("<span />").addClass("guiQuestObjectives").appendTo(this.tooltipContainer);
		$("<h4 />").html(this.name).appendTo(this.objectivesContainer);
		$("<h6 />").html(this.desc).appendTo(this.objectivesContainer);

		$("<div />").addClass("clearBoth").appendTo(this.tooltipContainer);
	}; 

	GuiQuestItem.prototype.destroy = function () {
		this.container.remove();
		for (var i in this.objectives) {
			this.objectives[i].destroy();
			delete this.objectives[i];
		}
	};

	GuiQuestItem.prototype.addObjective = function (objective) {
		this.guiObjectives[objective.id] = new GuiQuestObjective ({
			objective : objective,
			parent : this.objectivesContainer
		});
	};

	GuiQuestItem.prototype.updateObjective = function (objective) {
		this.deleteObjective(objective);
		this.addObjective(objective);
	};

	GuiQuestItem.prototype.deleteObjective = function (objective) {
		if (this.guiObjectives[objective.id] !== undefined) {
			this.guiObjectives[objective.id].destroy();
			delete this.guiObjectives[objective.id];
		}
	};

	GuiQuestItem.prototype.update = function (quest) {
		for (var i in quest.objectives) {
			this.updateObjective(quest.objectives[i]);
		}
	};

	return GuiQuestItem;
});