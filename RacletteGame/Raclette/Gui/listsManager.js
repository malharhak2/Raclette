define(['Gui/GuiList', 'Gui/GuiInventory'], function(List, Inventory) {
    
    return function(obj) {
        
        obj.prototype.createList = function(params) {
            
            if(!this.lists) this.lists = {};
            
            var elem = new List(params);

            this.lists[params.id] = elem;

            return elem;
        }
        
        obj.prototype.createInventory = function (params) {
             if(!this.inventories) this.inventories = {};
            
            var elem = new Inventory(params);

            this.inventories[params.id] = elem;

            return elem;           
        };
        obj.prototype.getList = function(id) {
            
            if(!this.lists) this.lists = {};
            
            if(this.lists[id]) return this.lists[id];

            debug.warn('Error [Gui/listsManager.js - getList()] : List "'+id+'" is undefined');

            return false;
        }
        
        obj.prototype.deleteList = function(id) {
            
            if(!this.lists) this.lists = {};
            
            if(this.lists[id])  {
                
                delete this.lists[id];
                
                return true;
            }
            
            debug.warn('Error [Gui/listsManager.js - deleteList()] : List "'+id+'" is undefined');

            return false;
        }
    }
    
});