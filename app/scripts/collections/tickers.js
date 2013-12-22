/**  Ticker Collection Class **
 */

define(['backbone','underscore','utils/environment','models/ticker','localStorage'],function(Backbone,_,Env,TickerClass){
    var Tickers = Backbone.Collection.extend({
        model : TickerClass,
        localStorage : new Backbone.LocalStorage(Env.STORAGE_TICKERS), //Default LocalStorage

        getEnabled : function(){
            return this.filter(function(ticker){
               return ticker.get(Env.PROPERTY_TICKER_STATUS) === true;
            });
        },

        getModelsById : function(){
            return _.sortBy(this.models,function(ticker){
                return ticker.get(Env.PROPERTY_ID);
            })
        },

        comparator : function(ticker){
            return ticker.get(Env.PROPERTY_TICKER_ORDER);
        }
    });

    return Tickers;
});
