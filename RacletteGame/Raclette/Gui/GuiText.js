define(['jquery'], function($) {
    
    var GuiText = function(id, params) {
        
        this.id = id;
        
        this.text = params.text || 'Sample of Text';
        
        this.classe = params.classe || '';
        
    };
    
    GuiText.prototype.insertIntoDOM = function(container) {
        
        var elem = $('<div />');
        
        elem.attr({
            'id'    : this.id,
            'class' : this.classe
        });
        
        elem.html(this.text);
        
        container.append(elem);
    }
    
    return GuiText;
});