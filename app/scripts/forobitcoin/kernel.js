define([
    'jquery',
    'backbone',
    'underscore',
    'events',
    'forobitcoin/env',
    'forobitcoin/models/ticker',
    'forobitcoin/collections/tickers'
],function($,Backbone,_,Events,Env,TickerClass,TickersClass){

    var tickers = new TickersClass();

    var Kernel = Backbone.Model.extend({
        initialize : function (){
            debug.debug("[KERNEL] Initializing kernel ...");

            if (this.get('providers') === undefined){
                throw new Error("Providers not found");
            }

            //Loading previous data
            this.initTickers();

            //Loading new data
            this.loadTickers();
        },

        initTickers : function(){
            //Obtengo los tickers guardados en el localStorage
            debug.debug("[KERNEL] Fetching ticker collection ...");
            tickers.fetch();
        },

        loadTickers : function(){
            debug.debug("[KERNEL] Updating sources " );
            var me = this;

            $.ajax({
                url: 'https://api.bitcoinaverage.com/exchanges/all',
                type: 'GET',
                success: function(data) {
                    if (data){
                        debug.debug("[Sync] Success - Data received. ");
                        me.populateTickers(data);
                    }else {
                        debug.debug("[Sync] Success - BUT NO DATA RECEIVED. ");
                    }
                },
                error : function(data){
                    debug.debug("[KERNEL] FAIL! - Something wrong updating sources");
                }
            });
        },

        getTickers : function(){
            return tickers;
        },

        populateTickers : function(data){
            var providers = this.get('providers');

            for (var currency in providers) {
                if (providers.hasOwnProperty(currency)) {
                    debug.debug("[KERNEL] Populating " + currency);

                    var markets = providers[currency]['markets'];
                    for (var ix =0 ;ix < markets.length ; ix++){
                        var remoteTicker = data[currency][markets[ix]['symbol']];
                        if (remoteTicker != undefined){
                            debug.debug("[KERNEL] Data founded for " + markets[ix]['symbol']);
                            var localTicker = tickers.get(markets[ix]['id']);

                            var rate = {};
                            rate[Env.PROPERTY_TICKER_LAST] = remoteTicker['rates']['last'];
                            rate[Env.PROPERTY_TICKER_BUY] = remoteTicker['rates']['ask'];
                            rate[Env.PROPERTY_TICKER_SELL] = remoteTicker['rates']['bid'];

                            if (localTicker == undefined){
                                var toSave = {};
                                toSave[Env.PROPERTY_ID] =  markets[ix]['id'];
                                toSave[Env.PROPERTY_TICKER_SYMBOL] = markets[ix]['symbol'];
                                toSave[Env.PROPERTY_TICKER_MARKET] = rate;
                                toSave[Env.PROPERTY_TICKER_CURRENCY] = currency;
                                localTicker = new TickerClass(toSave);
                                tickers.create(localTicker);
                                debug.debug("[KERNEL] New Ticker created :" + localTicker.get(Env.PROPERTY_TICKER_SYMBOL) + "-" + localTicker.get(Env.PROPERTY_TICKER_CURRENCY)) ;
                            }else {
                                var toSave = {};
                                toSave[Env.PROPERTY_TICKER_MARKET] = rate;
                                localTicker.save(toSave);
                                debug.debug("[KERNEL] Ticker updated :" + localTicker.get(Env.PROPERTY_TICKER_SYMBOL) + "-" + localTicker.get(Env.PROPERTY_TICKER_CURRENCY)) ;
                            }
                        }else {
                            debug.debug("[KERNEL] No data founded for " + markets[ix]['symbol']);
                        }
                    }
                }
            }

            debug.debug("[KERNEL] Loaded information about providers");
        }

    });

    return Kernel;
});

