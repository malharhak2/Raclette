define([], function() {
    
    return function(obj) {
        
        obj.prototype.on = function(eventName, callback) {
            
            if(!this.events) this.events = {};
            
            this.events[eventName] = callback;
        }
        
        
        obj.prototype.trigger = function(eventName, params) {
            
            if(!this.events) this.events = {};
            
            if(!this.events[eventName]) return;
            
            this.events[eventName](params);
        }
    }
});