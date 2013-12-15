/**  Ticker Collection Class **
 */

define(['backbone','underscore','utils/environment','models/ticker','localStorage'],function(Backbone,_,Env,TickerClass){
    var Tickers = Backbone.Collection.extend({
        model: TickerClass,

        initialize : function() {
            if (_.undefined(this.options[Env.PROPERTY_STORAGE])){
                this.localStorage =  new Backbone.LocalStorage(Env.STORAGE_TICKERS);
            }else {
                this.localStorage = new Backbone.LocalStorage(this.options[Env.PROPERTY_STORAGE]);
            }

        },

        getEnables : function(){
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
