/**  Ticker Collection Class **
 */

define(['backbone','utils/environment','models/ticker','localStorage'],function(Backbone,Environment,TickerClass){
    var Tickers = Backbone.Collection.extend({
        model: TickerClass,
        localStorage: new Backbone.LocalStorage(Environment.STORAGE_TICKERS),

        getEnables : function(){
            return this.filter(function(ticker){
               return ticker.get('status') === true;
            });
        }

    });

    return Tickers;
});
