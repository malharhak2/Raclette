define(["User"], function(user) {
    
    return function(params) {
        
        var gui = params.gui;
        
        
        var feedback = gui.setPopUp("feedback", {});
                
        feedback.setText("feedbackTitle", {
            text: "<h1>Que penses-tu de ce monde ?</h1>",
            classe: "popUpTitle"
        });
        var feedbackInput = feedback.setInput("feedbackContent", {
            classe: "fill-popup",
            type: "textarea"
        });
        var feedbackFooter = feedback.createBox({
            id : "feedbackFooter",
            className : "popUpFooter alignRight",
            parent : feedback
        });
        feedbackFooter.createButton({
            id : "feedbackValidate",
            classe: "btn-valid",
            text : "Donner son avis à Zebura",
            onclick: function() {

                user.sendFeedback(feedbackInput.DOMElement.val());

                feedback.hide();

                gui.dialogs['merciZebura'].init();
            }
        });
        feedbackFooter.createButton({
            id : "feedbackCancel",
            classe: "btn-valid",
            text : "Plus envie !",
            onclick: function() {

                feedback.hide();

                gui.dialogs['tantPisZebura'].init();
            }
        });
    }
});