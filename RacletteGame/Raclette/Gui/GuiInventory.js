define(['Gui/GuiInventoryItem', 'jquery', 'Gui/GuiEventHandlersManager', 'User'], function(GuiInventoryItem, $, addEventFunctions, user) {
    
    var GuiInventory = function(params) {
        
        this.id = params.id;
        
        this.classe = params.classe || '';
        
        this.elements = params.elements || [];
        
        this.onElementClick = params.onElementClick || false;
        
        this.DOMElement = $('<ul />');
        
        this.lis = [];
        
    };
    
    
    GuiInventory.prototype.insertIntoDOM = function(parent) {
        
        if(parent !== undefined) {
            this.parent = parent;
        }
        
        var elem = this.DOMElement;
        
        elem.bind('click', function(event) {
            event.stopPropagation();   
        });
        elem.bind('mousedown', function(event){
            event.stopPropagation();
        });
        elem.bind('mouseup', function(event){
            event.stopPropagation();
        });
        elem.attr({
            'id' : this.id,
            'class' : this.className
        });
        var that = this;
        
        for(var i = 0; i < this.elements.length; i++) {
            
            var item = this.elements[i];
            var li = new GuiInventoryItem({
                data : item,
                InventoryItem : this,
                onClick : that.onElementClick
            });
            
            li.insertIntoDOM(this.DOMElement);
            
            this.lis[i] = li;
            
                
        }
        this.parent.append(elem);
        
        
    };

    GuiInventory.prototype.updateInventory = function () {
        this.elements = user.inventory.items;
        this.DOMElement.empty();
        this.elements = user.inventory.items;
        this.insertIntoDOM(this.parent);
    }
    
    addEventFunctions(GuiInventory);
    
    return GuiInventory;
});