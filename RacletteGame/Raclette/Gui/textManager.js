define(['Gui/GuiText'], function(Text) {
    
    return function(obj) {
        
        obj.prototype.setText = function(id, params) {
            
            if(!this.text) this.text = {};
            
            var elem = new Text(id,params);

            this.text[id] = elem;

            return elem;
        }
        
        obj.prototype.getText = function(id) {
            
            if(!this.text) this.text = {};
            
            if(this.text[id]) return this.text[id];

            debug.warn('Error [Gui/textManager.js - getText()] : Text "'+id+'" is undefined');

            return false;
        }
        
        obj.prototype.deleteText = function(id) {
            
            if(!this.text) this.text = {};
            
            if(this.text[id])  {
                
                delete this.text[id];
                
                return true;
            }
            
            debug.warn('Error [Gui/textManager.js - deleteText()] : Text "'+id+'" is undefined');

            return false;
        }
    }
    
});