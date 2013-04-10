define(['jquery'], function($) {
    
    var GuiButton = function(params) {
        
        this.id = params.id;
        
        this.onClick = params.onclick || function() {};
        
        this.active = params.active || true;
        
        this.data = params.data || {};
        
        this.value = params.text || '';
        
        this.classe = params.className || '';
        
        this.DOMElement = $('<input />');
    };
    
    GuiButton.prototype.insertIntoDOM = function(container) {
        
        var elem = this.DOMElement;
        
        elem.attr({
            'type'  : 'button',
            'value' : this.value,
            'id'    : this.id,
            'class' : this.classe
        });
        
        var that = this;
        
        elem.bind('click', function(event) {
            
            if(!that.active) return;
            
            that.onClick(that.data);

            event.stopPropagation();
            
        });
        elem.bind('mousedown', function(event){
            event.stopPropagation();
        })
        elem.bind('mouseup', function(event){
            event.stopPropagation();
        })
        container.append(elem);
    }
    
    return GuiButton;
});