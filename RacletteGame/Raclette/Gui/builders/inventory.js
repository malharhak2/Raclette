define(['User'], function(user) {
    
    
    return function(params) {
        
        var GUI = params.gui;
        var inventaire = GUI.setPopUp('inventaire', {});
        
        inventaire.setText('inventaireTitle', {
            text:   'Inventaire',
            classe: 'popUpTitle'
        });
        
       
        var inventory = user.inventory;
        
        var liste = inventaire.createInventory({
            id:             'Inventaire',
            elements:       inventory.items,
            onElementClick: function(clickedItem) {
                user.tool = "object";
                user.object = clickedItem.name;
                inventaire.toggle();
            }
        });
        
        liste.insertIntoDOM(inventaire.contentContainer);
        
        liste.on('Jeter', function(item) {
            
            console.log(item);
        });
    }
    
});