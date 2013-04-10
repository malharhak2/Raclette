define(['Gui/builders/dock', 
        'Gui/builders/feedback-popup', 
        'Gui/builders/facebook-dock',
        'Gui/builders/inventory'], 
    
    function(dock, feedbackPopup, facebookDock, inventory) {
    
    var GuiBuilder = function() {
        
        this.builders = {
            
            'dock': dock,
            'feedback-popup': feedbackPopup,
            'facebook-dock': facebookDock,
            'inventory': inventory
        };
    }
    
    
    GuiBuilder.prototype.build = function(name, params) {
        
        if(this.builders[name]) {
            
            this.builders[name](params);
        }
    }
    
    return new GuiBuilder();
    
});