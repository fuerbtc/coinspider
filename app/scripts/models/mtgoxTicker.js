/** Mt.Gox Ticket Implementation **/

define(['backbone','models/ticker'],function(Backbone,Ticker){

    var MtGox = Ticker.extend({

        initialize : function(){
        },

        update : function(){

        }

    });

    console.log("Valor de name: " + MtGox.get('name'));

    return MtGox;

});
