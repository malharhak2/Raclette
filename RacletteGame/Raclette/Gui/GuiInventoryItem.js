define(['jquery', 'Gui/GuiTooltip'], function($, GuiTooltip) {
    
    var InventoryItem = function(args) {
        
        this.data = args.data;
        this.InventoryItem = args.InventoryItem;
        
        this.onClick = args.onClick || false;
        
        this.DOMElement = $('<li />');
        this.DOMElement.attr({
            id : this.data.id,
            class : "inventoryItemContainer"
        });
        
        // Liste des actions disponibles au clic sur un objet
        this.actions = this.data.actions || [];
        
        
    }
    
    InventoryItem.prototype.insertIntoDOM = function(InventoryItem) {
        
        var container = InventoryItem;
        
        var elem = this.DOMElement;
        var div = $('<div />');
        elem.append(div);
        this.divContainer = div;
        if(typeof this.data == 'String') {
            
            elem.innerHTML = this.data;
            
        } else if(this.data.img) {
                    
            var tooltip = new GuiTooltip({
                title : this.data.name,
                img : this.data.img,
                content : this.data.desc
            });
            tooltip.init(div);

            var img = $('<img />');
            img.attr({
                class : "inventoryIcon",
                src : "images/" + this.data.img
            });
            div.append(img);
            this.imgContainer = img;

            
        } else {
            
            elem.innerHTML = this.data.name;
        }
        
        var that = this;
            
        if(typeof this.onClick == 'function') {

            elem.bind('click', function(e) {

                that.onClick(that.data);
                e.stopPropagation();
            });
            
        }
        
        
        container.append(elem);
        
        //this.bindActions(InventoryItem);
    }
    
    
    /*
    InventoryItemElement.prototype.bindActions = function(InventoryItem) {
        
        var actions = this.data.actions;
        
        var actionsContainer = $('<span />').addClass('listActions');
        
        this.DOMElement.append(actionsContainer);
        
        var i = 0;
        
        while(i < actions.length) {
            
            var btn = $('<button type="button" />').addClass('action');
            
            btn.attr('data-trigger-event', actions[i]);
            
            btn.text(actions[i]);
            
            btn.appendTo(actionsContainer);
            
            var that = this;
            
            btn.on('click', function(e) {
                
                e.preventDefault();
                e.stopPropagation();
                
                var eventName = $(this).attr('data-trigger-event');
                
                InventoryItem.trigger(eventName, that.data);
            });
            
            i++;
        }
        
    }
    */
    
    
    return InventoryItem;
});