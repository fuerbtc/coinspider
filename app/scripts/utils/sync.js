/**
 * Synchronization Process with Providers
 */
define([
    'jquery',
    'backbone',
    'underscore',
    'events',
    'utils/environment',
    'models/ticker',
    'models/config',
    'collections/tickers',
    'collections/configs',
    'utils/providers',
    'crossdomain'
],function($,Backbone,_,Events,Environment,TickerClass,ConfigClass,TickersClass,ConfigsClass, Providers){

    var tickers = new TickersClass();
    var configs = new ConfigsClass();

    var sync = Backbone.Model.extend({


        initialize : function() {
            //Register event to save data
            _(this).bindAll('refreshTicker');


            debug.debug("Registering events ...");
            this.registerEvents();

            //Inicializo la configuracion
            this.initConfiguration();

            //Inicializo todos los providers en la Collection
            this.initTickers(true);
        },

        /**
         * Registra los eventos que definidos en el objeto Sync
         *
         */
        registerEvents : function () {
            Events.on(Environment.EVENT_ENABLE_TICKER,function(id){
                debug.debug("Enabled model "+ id);
                tickers.get(id).save({status : Environment.TICKER_ENABLE });
            },this);

            Events.on(Environment.EVENT_DISABLE_TICKER,function(id){
                debug.debug("Disabled model "+ id);
                tickers.get(id).save({status : Environment.TICKER_DISABLE });

            },this);

            Events.on(Environment.EVENT_UPDATE_TICKERS,function(){
                debug.debug("Fired refreshing enabled tickers");
                this.refreshTickers(Environment.REFRESH_ENABLE_TICKERS);
            },this);

            Events.on(Environment.EVENT_UPDATE_TICKER,function(jsonTicker,model){
                debug.debug("Fired updating model")
                this.updateTicker(jsonTicker,model);
            },this);
        },

        /**
         * Hace una query al Api del proveedor. Como el Json es asincrono, se dispara un trigger
         * que invoca una funcion que se encarga de actualizar el LocalStorage
         *
         * @param Ticker - Objeto ticker
         * @returns {boolean}
         */
        refreshTicker : function (model){

            //Updating model
            debug.debug("Updating model ... ");
            var me = this;

            $.ajax({
                url: model.get('feedUrl'),
                type: 'GET',
                success: function(data) {
                    var jsonTicker = {};
                    if (data && data.responseText.query !== undefined){
                        try {
                            jsonTicker = JSON.parse(data.responseText.query.results.html.body.p);
                        }catch (Exception) {
                            jsonTicker = {};
                        }
                    }

                    debug.debug("OK 200 - Received data successfully");
                    Events.trigger(Environment.EVENT_UPDATE_TICKER, jsonTicker, model);
                    me.checkLastTrigger();
                },
                error : function(data){
                    debug.debug("BUMP !!!")
                    me.checkLastTrigger();
                }
            });
        },

        /**
         * Actualiza todos los Proveedores.
         */
        refreshTickers : function (type) {
            debug.debug("Updating tickers information");

            switch (type){
                default:
                case Environment.REFRESH_ALL_TICKERS:
                    debug.debug("Updating all ...")
                    tickers.each(this.refreshTicker);
                    this.lastTrigger = tickers.length;
                    break;
                case Environment.REFRESH_ENABLE_TICKERS:
                    debug.debug("Updating enables ...")
                    var enableTickers = tickers.getEnables();
                    this.lastTrigger = enableTickers.length;
                    _.each(enableTickers,this.refreshTicker);
                    break;
            }
        },


        /**
         * Guardar en el LocalStorage la data de una manera generica
         * para poder ser usado como si viene de un solo sitio por Backbone
         *
         * @model - Modelo a actualizar
         *
         * @data - Es el json que viene desde el proveedor. El cual debes adaptarlo al modelo.
         *
         */
        updateTicker : function (data, model) {
            //Save accede a la collecion y busca el objeto del modelo,
            //si no esta lo guarda. Si esta, actualiza.
            var provider = this.getProvider(model.get('symbol'));
            if (provider){
                var adaptedData = provider.adapter(data);

                model.save(adaptedData);
                debug.debug("Saved data " + model.get('name')
                    + "| Last " + model.get('last')
                    + "| Buy " + model.get('buy')
                    + "| Sell " + model.get('sell'));
            }
        },

        getTickers : function() {
            return tickers;
        },

        getProvider : function(symbol){
            var currentProvider = false;
            if (Providers[symbol] !== undefined) {
                currentProvider = Providers[symbol];
            }

            return currentProvider;
        },

        /**
         * Crea o añade un Ticker en TickerCollection a partir de la descripcion correspondiente definida en Providers
         * @param provider
         */
        initTicker : function(provider,override){
            if (provider.id !== undefined){
                debug.debug("Loading Ticker: " + provider.symbol);
                var ticker = tickers.get(provider.id);

                if (ticker === undefined || override){
                    ticker = new TickerClass();
                    ticker.set (
                        {
                            id : provider.id,
                            name : provider.name,
                            symbol : provider.symbol,
                            siteUrl : provider.siteUrl,
                            iconUrl : provider.iconUrl,
                            feedUrl : provider.url,
                        }
                    );
                    tickers.create(ticker);
                    debug.debug("Created for first time ...")
                }

                debug.debug("Ready " + ticker.get('name'));
            }
        },

        /**
         * Inicializa todos los tickers en TickerCollection a partir de la informacion definida en Providers
         */
        initTickers : function(override){
            debug.debug("Loading Tickers ...");
            //Obtengo los tickers guardados en el localStorage
            tickers.fetch();
            debug.debug("Loaded from localstorage " + tickers.length + " tickers");

            //Busco alguno nuevo
            for (var key in Providers){
                if (Providers.hasOwnProperty(key)){
                    this.initTicker(Providers[key],override);
                }
            }
        },

        /**
         * Inicializa configuracion del sistema
         */
        initConfiguration : function () {
            debug.debug("Loading Configuration ...");
            //Obtengo la configuracion del localStorage
            configs.fetch();

            if (configs.get(Environment.INSTANCE_CONFIG) === undefined){
                debug.debug("Not found configuration.")
                var config = new ConfigClass();
                configs.create(config);
                debug.debug("Created a default one")
            }

            debug.debug("Loaded Configuration ...");
        },

        /**
         * Devuelve la collecion con la configuracion. Se sigue este principio,ya que
         * utilizamos una implementacion de LocalStorage en Backbone. Esta implementacion
         * solo funciona a traves de colecciones.
         *
         * @returns {collections.configs}
         */
        getConfiguration : function() {
            return configs;
        },

        checkLastTrigger : function() {
            this.lastTrigger--;
            if (this.lastTrigger <= 0){
                debug.debug("Triggering Event Update Tickers Finish");
                Events.trigger(Environment.EVENT_UPDATE_TICKERS_FINISH);
            }
        }
    })

    return sync;
});
