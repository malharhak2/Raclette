define(["Debug", 'Gui/GuiBuilder', 'Gui/buttonsManager', 'Gui/GuiList', 'Gui/GuiPopUp', 'Gui/layersManager', 
    'Gui/textManager', 'Gui/inputsManager', 'Gui/GuiDialog', 'Gui/GuiPickupItem', 'jquery', 'CONFIG', "Gui/GuiDiary", "Gui/GuiQuestsBoard"], 
    function(debug, GuiBuilder, addButtonFunctions, List, PopUp, addLayersFunctions, addTextFunctions, addInputFunctions, Dialog, PickupItem, $, CONFIG, Diary, QuestsBoard) {
    
    var GUI = function() {
        this.container = $('#'+CONFIG.guiContainer);
        this.popups = {};
        this.layers = {};
        this.dialogs = {};
        this.pickupItem = {};
        this.builder = GuiBuilder;
        this.contents = {};
        this.questsLongTimer = 1000;
        this.questsTimer = Date.now();
    };
    
    GUI.prototype.clean = function() {
        for(var label in this) {
            if(typeof this[label] != "function" && label != "container") {
                this[label] = {};
                console.log("GUI - "+label+" has been cleaned.");
            }
        }
    };
    
    GUI.prototype.update = function() {
        for(var i in this.dialogs) {
            this.dialogs[i].update();
        };
        if (Date.now() - this.questsTimer > this.questsLongTimer && this.questsBoard) {
            this.questsBoard.update();
            this.questsTimer = Date.now();
        }
    };

    addLayersFunctions(GUI);

    GUI.prototype.setPopUp = function(id, params) {
        var elem = new PopUp(id, params);
        this.popups[id] = elem;
        return elem;
    };
    
    GUI.prototype.getPopUp = function(id) {
        if(this.popups[id]) return this.popups[id];
        debug.warn('Error [Gui.js - getPopup()] : Popup "'+id+'" is undefined');
        return false;
    };
    
    GUI.prototype.deletePopUp = function(id) {
        if(this.popups[id]) {
            this.popups[id] = undefined;  
            return true;
        } 
        debug.warn('Error [Gui.js - deletePopup()] : Popup "'+id+'" is undefined');
        return false;
    };

    addButtonFunctions(GUI);
    addTextFunctions(GUI);
    addInputFunctions(GUI);

    GUI.prototype.createDialog = function(params) {
        var elem = new Dialog(params);
        this.dialogs[params.id] = elem;  
        return elem;
    };
    
    GUI.prototype.getDialog = function(id) {
        if(this.dialogs[id]) return this.dialogs[id];
        debug.warn('Error [Gui.js - getDialog()] : Dialog "'+id+'" is undefined');
        return false;
    }
    
    GUI.prototype.deleteDialog = function(id) {
        if(this.dialogs[id]) {
            this.dialogs[id] = undefined;  
            return true;
        } 
        debug.warn('Error [Gui.js - deleteDialog()] : Dialog "'+id+'" is undefined');

        return false;
    };

    GUI.prototype.createPickupItem = function (args) {
        var img = new PickupItem(args);
        this.pickupItem[args.id] = img;
        return img;
    };

    GUI.prototype.createQuestsBoard = function () {
        var questsBoard = new QuestsBoard({
        });
        this.questsBoard = questsBoard;
        this.questsBoard.insertIntoDOM(this.container);
    }

    GUI.prototype.createDiary = function () {
        var diary = new Diary({
            parent : this.container
        });
        this.diary = diary;
        return diary;
    };

    GUI.prototype.toggleDiary = function () {
        this.diary.toggle();
    };

    GUI.prototype.initDiary = function () {
        this.diary.init();
    };

    GUI.prototype.openDiary = function () {
        this.diary.open();
    };

    GUI.prototype.closeDiary = function () {
        this.diary.close();
    };

    GUI.prototype.insertIntoDOM = function() {
        if(this.layers) {
            for(var elem in this.layers) {
                
                this.layers[elem].insertIntoDOM(this.container);
            };
        }
        if(this.buttons) {
            for(var elem in this.buttons) {
                
                this.buttons[elem].insertIntoDOM(this.container);
            };
        }
        if(this.popups) {
            for(var elem in this.popups) {
                
                this.popups[elem].insertIntoDOM(this.container);
            };  
        }
    };

    GUI.prototype.updateInventory = function () {
        this.popups['inventaire'].inventories.Inventaire.updateInventory();
    };
    
    return new GUI();
});