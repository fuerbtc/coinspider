define([
    'jquery',
    'backbone',
    'underscore',
    'events',
    'forobitcoin/env',
    'forobitcoin/models/ticker',
    'forobitcoin/collections/tickers',
    'forobitcoin/models/config',
    'forobitcoin/collections/configs'
],function($,Backbone,_,Events,Env,TickerClass,TickersClass,ConfigClass,ConfigsClass){

    var tickers = new TickersClass();
    var configs = new ConfigsClass();

    var Kernel = Backbone.Model.extend({

        defaults : function() {
            version : -1
        },

        initialize : function (){
            debug.debug("[KERNEL] Initializing kernel ...");

            _(this).bindAll('refresh','populateTickers','loadTickers');

            //Loading Configuration
            this.initConfig();

            if (this.get('providers') === undefined){
                throw new Error("Providers not found");
            }

            //Loading previous data
            this.initTickers();

           this.refresh(Env.TIMER);
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
            var rates = configs.get(1).get('rates');

            for (var keyProvider in providers) {
                if (providers.hasOwnProperty(keyProvider)) {
                    debug.debug("[KERNEL] Populating " + keyProvider);
                    var provider = providers[keyProvider];

                    //Busco si el Ticker ya existe
                    var localTicker = tickers.get(provider[Env.PROPERTY_ID]);

                    var markets = {};
                    //Si existe tomo el objeto guardado con los mercados del exchanger
                    if (localTicker !== undefined){
                        markets = localTicker.get(Env.PROPERTY_TICKER_MARKETS);
                    }

                    var toSave = {};
                    toSave[Env.PROPERTY_ID] =  provider[Env.PROPERTY_ID]
                    toSave[Env.PROPERTY_TICKER_NAME] = provider[Env.PROPERTY_TICKER_NAME];
                    toSave[Env.PROPERTY_TICKER_SYMBOL] = provider[Env.PROPERTY_TICKER_SYMBOL];
                    toSave[Env.PROPERTY_TICKER_ICON_URL] = provider[Env.PROPERTY_TICKER_ICON_URL];

                    //Busco las monedas aceptadas en el exchanger
                    var currencies = provider['currencies'];

                    for (var ix=0 ; ix < currencies.length ; ix++){
                        debug.debug("[KERNEL] Loading Currency " + currencies[ix]);
                        var previousMarket = {};
                        var currentMarket = {};
                        var currencyObject = markets[currencies[ix]];

                        var remoteTicker = data[currencies[ix]][keyProvider];

                        if (currencyObject !== undefined) {
                            previousMarket = currencyObject[Env.PROPERTY_TICKER_CURRENT_MARKET];
                        } else {
                            currencyObject = {};
                        }
                        if (remoteTicker != undefined){
                            //TERMINO DE POPULAR EL BENA
                            currentMarket[Env.PROPERTY_TICKER_LAST] = remoteTicker['rates']['last'];
                            currentMarket[Env.PROPERTY_TICKER_BUY] = remoteTicker['rates']['ask'];
                            currentMarket[Env.PROPERTY_TICKER_SELL] = remoteTicker['rates']['bid'];
                            currentMarket[Env.PROPERTY_TICKER_VOLUME] = remoteTicker['volume_btc'];
                            debug.debug("[KERNEL] Data populated in Currency "  + currencies[ix]);
                        }else {
                            //TRANSFORMO EL VALOR
                            debug.debug("[KERNEL] No data founded  in Currency " + currencies[ix]);
                        }

                        currencyObject[Env.PROPERTY_TICKER_CURRENT_MARKET] = currentMarket;
                        currencyObject[Env.PROPERTY_TICKER_PREVIOUS_MARKET] = previousMarket;

                        markets[currencies[ix]] = currencyObject;

                    }

                    if (provider[Env.PROPERTY_TICKER_EXCHANGES] !== undefined){
                        debug.debug("[KERNEL] Loading Exchanges Rates" );
                        var officialCurrency = provider[Env.PROPERTY_TICKER_EXCHANGES][Env.PROPERTY_TICKER_EXCHANGE_OFFICIAL];
                        var officialCurrencyObject = markets[provider[Env.PROPERTY_TICKER_EXCHANGES][Env.PROPERTY_TICKER_EXCHANGE_OFFICIAL]];

                        var exchangesCurrencies = provider[Env.PROPERTY_TICKER_EXCHANGES][Env.PROPERTY_TICKER_EXCHANGE_CURRENCIES];

                        if (officialCurrencyObject !== undefined &&
                            exchangesCurrencies !== undefined){
                            debug.debug('[KERNEL] Official Currency ' + officialCurrency);

                            for (var ix= 0; ix < exchangesCurrencies.length; ix++){
                                var rate = rates[officialCurrency+exchangesCurrencies[ix]];
                                if (rate !== undefined){
                                    debug.debug('[KERNEL] Rate ' + rate);
                                    debug.debug("[KERNEL] Rate for Currency " + exchangesCurrencies[ix]);
                                    var currencyExchangeObject = markets[exchangesCurrencies[ix]];
                                    var previousExchangeMarket = {};
                                    var currentExchangeMarket = {};

                                    if (currencyExchangeObject !== undefined) {
                                        previousExchangeMarket = currencyExchangeObject[Env.PROPERTY_TICKER_CURRENT_MARKET];
                                    } else {
                                        currencyExchangeObject = {};
                                    }

                                    currentExchangeMarket[Env.PROPERTY_TICKER_LAST] = officialCurrencyObject[Env.PROPERTY_TICKER_CURRENT_MARKET][Env.PROPERTY_TICKER_LAST] * rate;
                                    currentExchangeMarket[Env.PROPERTY_TICKER_BUY] = officialCurrencyObject[Env.PROPERTY_TICKER_CURRENT_MARKET][Env.PROPERTY_TICKER_BUY] * rate;
                                    currentExchangeMarket[Env.PROPERTY_TICKER_SELL] = officialCurrencyObject[Env.PROPERTY_TICKER_CURRENT_MARKET][Env.PROPERTY_TICKER_SELL] *rate;
                                    currentExchangeMarket[Env.PROPERTY_TICKER_VOLUME] = officialCurrencyObject[Env.PROPERTY_TICKER_CURRENT_MARKET][Env.PROPERTY_TICKER_VOLUME];

                                    currencyExchangeObject[Env.PROPERTY_TICKER_CURRENT_MARKET] = currentExchangeMarket;
                                    currencyExchangeObject[Env.PROPERTY_TICKER_PREVIOUS_MARKET] = previousExchangeMarket;

                                    markets[exchangesCurrencies[ix]] = currencyExchangeObject;
                                    debug.debug("[KERNEL] Rate Data populated in Currency "  + exchangesCurrencies[ix]);
                                }else{
                                    debug.debug("[KERNEL] No Rate Data founded for " + officialCurrency+exchangesCurrencies[ix]);
                                }
                            }
                        }
                    }

                    toSave[Env.PROPERTY_TICKER_MARKETS] = markets;

                    if (localTicker == undefined){
                        localTicker = new TickerClass(toSave);
                        tickers.create(localTicker);
                        debug.debug("[KERNEL] New Ticker created: " + localTicker.get(Env.PROPERTY_TICKER_SYMBOL)) ;
                    }else {
                        toSave[Env.PROPERTY_TICKER_UPDATED] = localTicker.get(Env.PROPERTY_TICKER_UPDATED) + 1;
                        localTicker.save(toSave);
                        debug.debug("[KERNEL] Ticker updated: " + localTicker.get(Env.PROPERTY_TICKER_SYMBOL)) ;
                    }
                }
            }
            debug.debug("[KERNEL] Loaded information about providers. " + tickers.size() + " Tickers loaded");
            Events.trigger("fb-update-done");
        },

        initConfig : function(){
            var me = this;

            debug.debug("[KERNEL] Fetching configuration ");
            configs.fetch();

            var version = this.get(Env.PROPERTY_VERSION);

            var config = configs.get(1); //Default Object
            var toSave = {};
            toSave[Env.PROPERTY_ID] = 1;
            toSave[Env.PROPERTY_VERSION] = version;
            if (config === undefined){
                config = new ConfigClass(toSave);
                configs.create(config);
                debug.debug("[KERNEL] Saved new configuration ");
            }else {
                config.save(toSave);
                debug.debug("[KERNEL] Updated configuration ");
            }

            if (version != config.get(Env.PROPERTY_VERSION)){
                localStorage.clear();
            }

            //Llamo al link para actualizar tasas
            $.ajax({
                url: 'http://query.yahooapis.com/v1/public/yql?q=select%20id%2CRate%20from%20yahoo.finance.xchange%20where%20pair%20in%20(%22EURUSD%22%2C%22USDEUR%22%2C%22CNYUSD%22%2C%22CNYEUR%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
                type: 'GET',
                success: function(data) {
                    if (data){
                        debug.debug("[Sync] Success - Rating Data received. ");
                        me.updateRates(data);
                    }else {
                        debug.debug("[Sync] Success - BUT NO RATING DATA RECEIVED. ");
                    }
                },
                error : function(data){
                    debug.debug("[KERNEL] FAIL! - Something wrong updating rating sources");
                }
            });
        },

        updateRates : function (data){
            debug.debug("[KERNEL] Updating Currency Rates");
            if (data.query != undefined && data.query.count != undefined){
                var count = data.query.count;
                var results = data.query.results.rate;
                var rates = {};

                for (var ix= 0; ix< count; ix++){
                    rates[results[ix]['id']] = results[ix]['Rate'];
                }

                var config = configs.get(1);
                config.save({ rates : rates});
            }
        },

        refresh : function (timer){
            if (timer !== undefined){
                timer = timer * 1000;
                debug.debug("[KERNEL] Interval refresh " + timer);
                window.setInterval(this.loadTickers,timer);
            }
        }
    });

    return Kernel;
});
