define(['jquery'], function($) {
    
    var GuiListElement = function(args) {
        
        this.data = args.data;
        this.guiList = args.guiList;
        
        this.onClick = args.onClick || false;
        
        this.DOMElement = $('<li />');
        
        // Liste des actions disponibles au clic sur un objet
        this.actions = data.actions || [];
        
        
    }
    
    GuiListElement.prototype.insertIntoDOM = function(container) {
        
        
        var elem = this.DOMElement;
        var div = $('<div />');
        div.addClass("inventoryItemContainer");
        elem.append(div);
        this.divContainer = div;
        if(typeof this.data == 'String') {
            
            elem.innerHTML = this.data;
            
        } else if(this.data.img) {
                    

            var title = $('<h3 />');
            title.addClass("inventoryTitle");
            title.html(this.data.name);
            div.append(title);
            this.titleContainer = title;

            var img = $('<img />');
            img.addClass("inventoryIcon");
            img.attr ('src', "images/" + this.data.img);
            div.append(img);
            this.imgContainer = img;

            var desc = $('<p />');
            desc.addClass("inventoryDescription");
            desc.html (this.data.desc);
            div.append(desc);
            this.descContainer = desc;
            
        } else {
            
            elem.html(this.data.name);
        }
        
        var that = this;
            
        if(typeof this.onClick == 'function') {

            elem.bind('click', function(e) {

                that.onClick(that.data);
                e.stopPropagation();
            });
            
        }
        
        
        container.append(elem);
        
        //this.bindActions(GUIList);
    }
    
    
    GuiListElement.prototype.bindActions = function(GUIList) {
        
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
                
                GUIList.trigger(eventName, that.data);
            });
            
            i++;
        }
        
    }
    
    
    return GuiListElement;
});