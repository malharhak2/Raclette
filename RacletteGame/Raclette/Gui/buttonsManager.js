define(['Gui/GuiButton'], function(Button) {
    
    return function(obj) {
        
        obj.prototype.createButton = function(params) {
            
            if(!this.buttons) this.buttons = {};
            
            var elem = new Button(params);

            this.buttons[params.id] = elem;

            return elem;
        }
        
        obj.prototype.getButton = function(id) {
            
            if(!this.buttons) this.buttons = {};
            
            if(this.buttons[id]) return this.buttons[id];

            debug.warn('Error [Gui/buttonsManager.js - getButton()] : Button "'+id+'" is undefined');

            return false;
        }
        
        obj.prototype.deleteButton = function(id) {
            
            if(!this.buttons) this.buttons = {};
            
            if(this.buttons[id])  {
                
                delete this.buttons[id];
                
                return true;
            }
            
            debug.warn('Error [Gui/buttonsManager.js - deleteButton()] : Button "'+id+'" is undefined');

            return false;
        }
    }
    
});