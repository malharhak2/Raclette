define(['Gui/buttonsManager', 'Gui/textManager', 'Gui/inputsManager', 'jquery'], 
    function(addButtonFunctions, addTextFunctions, addInputFunctions, $) {
    
    var GUILayer = function(params) {
        
        this.id = params.id;
        
        this.classe = params.className || '';
        
        this.parent = false;
        
        if(params.parent) {
            
            //console.log("Layer parent : "+params.parent.DOMElement);
            
            this.parent = (params.parent.DOMElement) ? $(params.parent.DOMElement) : $(params.parent);
        }
        
        this.DOMElement = $('<div />');
    }
    
    addButtonFunctions(GUILayer);
    addTextFunctions(GUILayer);
    addInputFunctions(GUILayer);
    
    
    
    GUILayer.prototype.insertIntoDOM = function(container) {
        
        container = (this.parent) ? this.parent : container;
        
        var elem = this.DOMElement.attr({
            'id': this.id,
            'class': this.classe
        });
        
        elem.bind('click', function(event) {
            event.stopPropagation();   
        });
        elem.bind('mousedown', function(event){
            event.stopPropagation();
        })
        elem.bind('mouseup', function(event){
            event.stopPropagation();
        })
        if(this.buttons)
        for(var l in this.buttons) {
            
            this.buttons[l].insertIntoDOM(elem);
        }
        if(this.text)
        for(l in this.text) {
            
            this.text[l].insertIntoDOM(elem);
        }
        if(this.inputs)
        for(l in this.inputs) {
            
            this.text[l].insertIntoDOM(elem);
        }
    
        elem.appendTo(container);
        
        this.DOMElement = elem;
    }
    
    
    return GUILayer;
});