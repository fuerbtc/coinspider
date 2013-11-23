/** Generic Ticker Collection **
 */

define(['backbone','models/ticker'],function(Backbone,Ticker){

    var Tickers = Backbone.Collection.extend({
        model: Ticker,
        initialize: function(model, options){

        }
    });

    return Tickers;
});
