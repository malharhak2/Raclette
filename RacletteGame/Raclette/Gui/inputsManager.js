define(['Gui/GuiInput'], function(Input) {
    
    return function(obj) {
        
        obj.prototype.setInput = function(id, params) {
            
            if(!this.inputs) this.inputs = {};
            
            var elem = new Input(id,params);

            this.inputs[id] = elem;

            return elem;
        }
        
        obj.prototype.getInput = function(id) {
            
            if(!this.inputs) this.inputs = {};
            
            if(this.inputs[id]) return this.inputs[id];

            debug.warn('Error [Gui/inputManager.js - getInput()] : Input "'+id+'" is undefined');

            return false;
        }
        
        obj.prototype.deleteInput = function(id) {
            
            if(!this.inputs) this.inputs = {};
            
            if(this.inputs[id])  {
                
                delete this.inputs[id];
                
                return true;
            }
            
            debug.warn('Error [Gui/inputManager.js - deleteInput()] : Input "'+id+'" is undefined');

            return false;
        }
    }
    
});