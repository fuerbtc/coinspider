/**  Ticker Collection Class **
 */

define(['backbone','underscore','forobitcoin/env','forobitcoin/models/ticker','localStorage'],function(Backbone,_,Env,TickerClass){
    var Tickers = Backbone.Collection.extend({
        model: TickerClass,
        localStorage: new Backbone.LocalStorage(Env.STORAGE_TICKERS),

        getEnables : function(){
            return this.filter(function(ticker){
               return ticker.get(Env.PROPERTY_TICKER_STATUS) === true;
            });
        },

        getModelsById : function(){
            return _.sortBy(this.models,function(ticker){
                return ticker.get(Env.PROPERTY_ID);
            })
        }
    });

    return Tickers;
});
