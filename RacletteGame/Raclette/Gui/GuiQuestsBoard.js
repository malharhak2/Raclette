define(["Debug", 'jquery', "Gui/GuiQuestItem"], function(debug, $, GuiQuestItem) {
    
    var GuiQuestsBoard = function(params) {

        var that = this;
        require(["quests/QuestsManager"], function (questsManager) {
            that.questsManager = questsManager;
        });
        this.id = "guiQuestsBoard";
        
        this.onClick = params.onclick || function() {};
        
        this.active = params.active || true;
        
        this.data = params.data || {};
        
        this.value = params.text || '';
        
        this.klass = params.className || '';
        
        this.container = $('<div />');
        this.quests = {};

    };
    
    GuiQuestsBoard.prototype.insertIntoDOM = function(container) {
        
        var elem = this.container;
        
        elem.attr({
            'id'    : this.id,
            'class' : this.klass
        });
        
        var that = this;
        
        elem.bind('click', function(event) {
            
            if(!that.active) return;
            
            that.onClick(that.data);

            event.stopPropagation();
            
        });
        elem.bind('mousedown', function(event){
            event.stopPropagation();
        })
        elem.bind('mouseup', function(event){
            event.stopPropagation();
        })
        container.append(elem);
    };

    GuiQuestsBoard.prototype.addQuest = function (quest) {
        this.quests[quest.id] = new GuiQuestItem({
            parent : this.container,
            quest : quest
        });

    };

    GuiQuestsBoard.prototype.updateQuest = function (quest) {
        if (this.quests[quest.id] !== undefined) {
            this.quests[quest.id].update(quest);
        } else {
            this.addQuest(quest);
        }
    }

    GuiQuestsBoard.prototype.deleteQuest = function (quest) {
        if (this.quests[quest.id] !== undefined) {
            this.quests[quest.id].destroy();
            delete this.quests[quest.id];
        }
    };

    GuiQuestsBoard.prototype.update = function () {
        if (this.questsManager !== undefined) {
            this.checkQuests();
        }
    };

    GuiQuestsBoard.prototype.checkQuests = function () {
        var quests = this.questsManager.getCurrentQuests();
        for (var i in quests) {
            if (!quests[i].running) {
                this.deleteQuest(quests[i]);
            } else {
                this.updateQuest(quests[i]);
            }
        };
    };
    
    return GuiQuestsBoard;
});