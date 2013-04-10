define(['jquery'], function($) {
    
    var GuiInput = function(id, params) {
        
        this.id = id;
        
        this.value = params.value || 'Sample of Text';
        this.label = params.label || '';
        this.type = params.type || 'text';
        
        this.classe = params.classe || '';
        
        this.DOMElement = false;
    };
    
    GuiInput.prototype.insertIntoDOM = function(container) {
        
        var elem = (this.type == 'textarea') ? $('<textarea />') : $('<span />');
        
        elem.attr({
            'id'    : this.id,
            'class' : this.classe,
            'name'  : this.id
        });
        elem.bind('mousedown', function(event){
            console.log("event", event)
            event.stopPropagation();
        })
        
        var label = (this.label) ? $('<label />').attr('for', this.id) : null;
        
        elem.val(this.value);
        
        this.DOMElement = elem;
        
        container.append(label).append(elem);
    }
    
    return GuiInput;
});