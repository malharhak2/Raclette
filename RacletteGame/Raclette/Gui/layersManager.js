define(['Gui/GuiLayer'], function(Layer) {
    
    return function(obj) {
        
        obj.prototype.createBox = function(params) {
            
            if(!this.layers) this.layers = {};
            
            var elem = new Layer(params);

            this.layers[params.id] = elem;

            return elem;
        }
        
        obj.prototype.getLayer = function(id) {
            
            if(!this.layers) this.layers = {};
            
            if(this.layers[id]) return this.layers[id];

            debug.warn('Error [Gui/layersManager.js - getLayer()] : Layer "'+id+'" is undefined');

            return false;
        }
        
        obj.prototype.deleteLayer = function(id) {
            
            if(!this.layers) this.layers = {};
            
            if(this.layers[id])  {
                
                delete this.layers[id];
                
                return true;
            }
            
            debug.warn('Error [Gui/layersManager.js - deleteLayer()] : Layer "'+id+'" is undefined');

            return false;
        }
    }
    
});