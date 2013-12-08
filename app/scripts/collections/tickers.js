/**  Ticker Collection Class **
 */

define(['backbone','underscore','utils/environment','models/ticker','localStorage'],function(Backbone,_,Environment,TickerClass){
    var Tickers = Backbone.Collection.extend({
        model: TickerClass,
        localStorage: new Backbone.LocalStorage(Environment.STORAGE_TICKERS),

        getEnables : function(){
            return this.filter(function(ticker){
               return ticker.get(Environment.PROPERTY_TICKER_STATUS) === true;
            });
        },

        getModelsById : function(){
            return _.sortBy(this.models,function(ticker){
                return ticker.get(Environment.PROPERTY_ID);
            })
        },

        comparator : function(ticker){
            return ticker.get(Environment.PROPERTY_TICKER_ORDER);
        }
    });

    return Tickers;
});
