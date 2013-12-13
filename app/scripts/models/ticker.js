/**
 * Ticker Class
 *
 * Object Descriptor
 * {
 *     name : ''.
 *     symbol : '',
 *     siteUrl : '',
 *     iconUrl : '',
 *     adapter : '',
 *     status : '',
 *     order : '',
 *     markets : {
           USD : {
 *             currency : '',
 *             coin : '',
 *             feed : '',
 *             crossdomain : '',
 *             current : {
 *                 last: '',
 *                 buy : '',
 *                 sell : '',
 *                 volume : '',
 *                 update : ''
 *             },
 *             previous : {
 *                 last: '',
 *                 buy : '',
 *                 sell : '',
 *                 volume : '',
 *                 update : ''
 *             }
 *         },
 *         ...
 *     }

 * }
 *
 * **/

define(['backbone','underscore','utils/environment'],function(Backbone,_,Env){

    var Ticker = Backbone.Model.extend({
        defaults: function() {
            // Default Values for a ticker
            var standard = {};

            standard[Env.PROPERTY_TICKER_NAME] = "";
            standard[Env.PROPERTY_TICKER_SYMBOL] = "";
            standard[Env.PROPERTY_TICKER_SITE_URL] = "";
            standard[Env.PROPERTY_TICKER_ICON_URL] = "";
            standard[Env.PROPERTY_TICKER_STATUS] = Env.TICKER_DISABLE;
            standard[Env.PROPERTY_TICKER_ORDER] = Env.DEFAULT_VALUE;

            standard[Env.PROPERTY_TICKER_MARKETS] = {};

            //Backbone don't trigger nested objects events.
            // Easy way is to create a standard property and update this
            // property any time nested properties are updated . For more complex requirement is better use
            // Backbone plugins like  http://documentup.com/afeld/backbone-nested/
            standard[Env.PROPERTY_TICKER_MARKETS_UPDATE] = Env.DEFAULT_VALUE;

            return standard;
        },

        initialize : function(){
            var errors =  validate();

            if (errors.size > 0){
                throw new Error(errors.join());
            }

            //Iterate over each market and initialize elements
            var markets = this.get(Env.PROPERTY_TICKER_MARKETS);
            _.each(markets,function(currency){
                if (markets[currency][Env.PROPERTY_TICKER_MARKET_CURRENT] === undefined){
                    markets[currency][Env.PROPERTY_TICKER_MARKET_CURRENT] = this._initMarketValue();
                }

                if (markets[currency][Env.PROPERTY_TICKER_MARKET_PREVIOUS] === undefined){
                    markets[currency][Env.PROPERTY_TICKER_MARKET_PREVIOUS] = this._initMarketValue();
                }

                var currencyInfo = this._getCurrencyInfo(currency);
                markets[currency][Env.PROPERTY_TICKER_MARKET_COIN]  = currencyInfo.coin;
                markets[currency][Env.PROPERTY_TICKER_MARKET_CURRENCY] = currencyInfo.currency;
            });
        },

        validate : function(){
            var errors = [];

            var isEmpty = function(property,value){

                if(_.isUndefined(value) || _.isEmpty(value)){
                    errors.push("Wrong value provided for " + property);
                }
            }

            isEmpty(Env.PROPERTY_TICKER_NAME,this.get(Env.PROPERTY_TICKER_NAME));
            isEmpty(Env.PROPERTY_TICKER_SYMBOL,this.get(Env.PROPERTY_TICKER_SYMBOL));
            isEmpty(Env.PROPERTY_TICKER_SITE_URL,this.get(Env.PROPERTY_TICKER_SITE_URL));
            isEmpty(Env.PROPERTY_TICKER_ICON_URL,this.get(Env.PROPERTY_TICKER_ICON_URL));

            var markets = this.get(Env.PROPERTY_TICKER_MARKETS);

            if (markets === undefined || markets.length < 0 ){
                error.push("Empty markets not allowed");
            }else {
                _.each(markets,function(currency){
                    isEmpty(currency +".feed",markets[currency][Env.PROPERTY_TICKER_MARKET_FEED]);
                    isEmpty(currency +".crossdomain",markets[currency][Env.PROPERTY_TICKER_MARKET_FEED_CROSSDOMAIN]);
                    isEmpty(currency +".coin",markets[currency][Env.PROPERTY_TICKER_MARKET_COIN]);
                    isEmpty(currency +".currency",markets[currency][Env.PROPERTY_TICKER_MARKET_CURRENCY]);
                });
            }

            return errors;
        },

        _initMarketValue : function(){
            var current = {};
            current[Env.PROPERTY_TICKER_LAST] = Env.DEFAULT_VALUE;
            current[Env.PROPERTY_TICKER_BUY] = Env.DEFAULT_VALUE;
            current[Env.PROPERTY_TICKER_SELL] = Env.DEFAULT_VALUE;
            current[Env.PROPERTY_TICKER_UPDATE] = Env.DEFAULT_VALUE;
            current[Env.PROPERTY_TICKER_VOLUME] = Env.DEFAULT_VALUE;

            return current;
        },

        _getCurrencyInfo : function(currency){
            var result = {
                coin : '',
                currency : ''
            };

            if (!_.isUndefined(currency) && currency.length == 6){
                result.coin = currency.substr(0,3);
                result.currency = currency.substr(4,6);
            }

            return result;
        }

    });

    return Ticker;
});
