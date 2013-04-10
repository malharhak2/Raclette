define(["User", "jquery"], function(user, $) {
    var dockList;
    return function(params) {
        
        var gui = params.gui;
        
        var dock = gui.createBox({
        	id : "dock",
        	className : "dockHolder"
        });
        
        dockList = [
        	"hand",
        	"fishingrod",
        	"butterflynet",
        	"shovel",
        	"axe",
            "wateringcan"
        ];

    	for (var i = 0; i < dockList.length; i++) {

    		dock.createButton({
    			onclick : ( function(index) {
                return function() {
                user.tool = dockList[index];
                for (var e=0; e<dockList.length; e++)
                {
                   $("#dock"+e).removeClass("mainTool");
                }
                $("#dock"+index).addClass("mainTool");
            };
        })(i),
    			id : "dock" + i,
    			text : "",
    			className : "dockItem " + dockList[i]
    		});
    		
    	};
        $("#dock0").addClass("mainTool");
    }
});