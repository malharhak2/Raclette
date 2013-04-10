define(['jquery'], function($) {
   
   var GuiQuestion = function(params) {
       
       
       this.choices = params.choices || {
           'oui': {
               text: 'Oui',
               callback: function() {}
           },
           'non': {
               text: 'Non',
               callback: function() {}
           }
       };
              
       this.DOMElement = false;
   }
   
   GuiQuestion.prototype.insertIntoDOM = function(container) {
       
       var elem = $('<div />').attr({
            'class': 'UIQuestion '+this.classe
       });
       
       for(var i in this.choices) {
           
           var c = this.choices[i];
           
           var span = $('<span />').text(c.text);
           
           span.bind('click', c.callback);
           span.bind('click', function(event) {
            event.stopPropagation();
        });
            elem.bind('mousedown', function(event){
            event.stopPropagation();
        })
           
           elem.append(span);
       }
       
       elem.hide();
       
       container.append(elem);
       
       this.DOMElement = elem;
   }
   
   
   GuiQuestion.prototype.show = function() {
       
       this.DOMElement.show();
   }
   
   return GuiQuestion;
   
});