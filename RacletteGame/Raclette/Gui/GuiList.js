define(['Gui/GuiListElement', 'jquery', 'Gui/GuiEventHandlersManager'], function(GuiListElement, $, addEventFunctions) {
    
    var GuiList = function(params) {
        
        this.id = params.id;
        
        this.classe = params.classe || '';
        
        this.elements = params.elements || [];
        
        this.onElementClick = params.onElementClick || false;
        
        this.DOMElement = $('<ul />');
        
        this.lis = [];
        
    };
    
    
    GuiList.prototype.insertIntoDOM = function(container) {
        
        if(container.DOMElement) container = container.DOMElement;
        
        var elem = this.DOMElement;
        
        elem.bind('click', function(event) {
            event.stopPropagation();   
        });
        elem.bind('mousedown', function(event){
            event.stopPropagation();
        })
        elem.bind('mouseup', function(event){
            event.stopPropagation();
        })
        
        elem.attr({
            'id'    : this.id,
            'class' : this.classe
        });
        var that = this;
        
        for(var i = 0; i < this.elements.length; i++) {
            
            var item = this.elements[i];
            
            var li = new GuiListElement({
                data : item,
                guiList : that,
                onclick : that.onElementClick
            });
            
            li.insertIntoDOM(elem);
            
            this.lis[i] = li;
                        
        }
        
        container.append(elem);
        
        
    }
    
    
    addEventFunctions(GuiList);
    
    return GuiList;
});