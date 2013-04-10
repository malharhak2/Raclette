define(['Gui/buttonsManager', 'Gui/layersManager', 'jquery', 'Gui/textManager', 'Gui/inputsManager', 'Gui/listsManager'], 
    function(addButtonFunctions, addLayersFunctions, $, addTextFunctions, addInputFunctions, addListFunctions) {
    
    var GuiPopUp = function(id, params) {
        
        this.id = id;
        
        this.open = params.open || false;
        this.classe = params.classe || '';
        
        this.DOMElement = $('<div />');
        this.contentContainer = $('<div />');
        this.contentContainer.addClass("popupContent");
    };
    
    
    GuiPopUp.prototype.hide = function(callback) {
        
        this.open = false;
        
        this.DOMElement.hide();
        
        if(callback && typeof callback === "function") callback();
    }
    
    GuiPopUp.prototype.show = function(callback) {
        
        this.open = true;
        
        this.DOMElement.show();
        
        if(callback && typeof callback === "function") callback();
    }
    
    GuiPopUp.prototype.toggle = function(callback) {
        
        if(this.open) {
            
            this.hide(callback);
        }
        else {
            
            this.show(callback);
        }
    }
    
    GuiPopUp.prototype.insertIntoDOM = function(container) {
        
        var elem = this.DOMElement.attr({
            'id'    : this.id,
            'class' : this.classe
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
        
        elem.addClass('popup');
        
        if(this.open) elem.addClass('open');
        
        elem.appendTo(container);
        var contentContainer = this.contentContainer;
        elem.append(contentContainer);
        
        elem.hide();
        
        this.DOMElement = elem;
        
        if(this.layers)
        for(var l in this.layers) {
            
            this.layers[l].insertIntoDOM(contentContainer);
        }
    
        if(this.buttons)
        for(var l in this.buttons) {
            
            this.buttons[l].insertIntoDOM(contentContainer);
        }
    
        if(this.inputs)
        for(var l in this.inputs) {
            
            this.inputs[l].insertIntoDOM(contentContainer);
        }
    
        if(this.text)
        for(var l in this.text) {
            
            this.text[l].insertIntoDOM(contentContainer);
        }        
        for(var l in this.inventories) {
            
            this.inventories[l].insertIntoDOM(contentContainer);
        }
    }
    
    
    addButtonFunctions(GuiPopUp);
    addLayersFunctions(GuiPopUp);
    addTextFunctions(GuiPopUp);
    addInputFunctions(GuiPopUp);
    addListFunctions(GuiPopUp);
    
    return GuiPopUp;
});