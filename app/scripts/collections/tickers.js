/**  Ticker Collection Class **
 */

define(['backbone','models/ticker','localStorage'],function(Backbone,Ticker){
    var Tickers = Backbone.Collection.extend({
        model: Ticker,
        localStorage: new Backbone.LocalStorage("bitcoins-board"),

        getEnables : function(){
            return this.filter(function(ticker){
               return ticker.get('status') === true;
            });
        }

    });

    return Tickers;
});
