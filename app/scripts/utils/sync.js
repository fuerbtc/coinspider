/**
 * CoinSpider Kernel Object
 */
define([
    'jquery',
    'backbone',
    'underscore',
    'events',
    'utils/environment',
    'models/ticker',
    'collections/tickers',
    'utils/providers',
    'crossdomain'
],function($,Backbone,_,Events,Env,TickerClass,TickersClass,Providers){

    var tickers = new TickersClass();

    var sync = Backbone.Model.extend({

        initialize : function() {

            // Binding object with 'this' context
            _(this).bindAll('refreshTicker');

            debug.debug("[Sync] Registering events ...");
            this.registerEvents();

            //Inicializo todos los providers en la Collection
            debug.debug("[Sync] Initializing Tickers ...");
            this.initTickers();
        },

        /**
         * Registra los eventos definidos en el Kernel
         *
         */
        registerEvents : function () {

            // EVENTO EVENT_ENABLE_TICKER - Ticker enable and immediately refresh current value
            Events.on(Env.EVENT_ENABLE_TICKER,function(id){
                debug.debug("[Sync] - EVENT_ENABLE_TICKER - Model enabled : "+ id);
                var model = tickers.get(id);

                var obj = {};
                obj[Env.PROPERTY_TICKER_STATUS] = Env.TICKER_ENABLE;
                obj[Env.PROPERTY_TICKER_ORDER] = tickers.getEnables().length;

                model.save(obj);

                //Cuando se activa, se manda a actualizar
                this.refreshTicker(model);
            },this);

            // EVENT : EVENT_DISABLE_TICKER - Ticker disabled and updating order in list
            Events.on(Env.EVENT_DISABLE_TICKER,function(id){
                debug.debug("[Sync] - EVENT_DISABLE_TICKER - Model disabled : "+ id);

                var obj = {};
                obj[Env.PROPERTY_TICKER_STATUS] = Env.TICKER_DISABLE;
                tickers.get(id).save(obj);

                //Updating order
                var tickersEnables = tickers.getEnables();
                var order = -1;
                _.each(tickersEnables, function(model){
                    var object = {};
                    object[Env.PROPERTY_TICKER_ORDER] = order++;
                    model.save(object)
                });
            },this);

            // EVENT : EVENT_UPDATE_TICKERS - Update current value for enabled tickers
            Events.on(Env.EVENT_UPDATE_TICKERS,function(){
                debug.debug("[Sync] - EVENT_UPDATE_TICKERS - Refreshing Tickers ...");
                this.refreshTickers(Env.REFRESH_ENABLE_TICKERS);
            },this);
        },

        /**
         * A partir de la informacion definida en providers.js se inicializa los tickers en TickerCollection
         *
         * Cada actualizacion de provider hay que incrementar la version para que los tickers se vuelvan a cargar
         *
         * @param override Indica al sistema que sobreescriba con valores por defecto la informacion almacenada en localstorage
         */
        initTickers : function(){
            //Obtengo los tickers guardados en el localStorage
            debug.debug("[Sync] Fetch ticker collection ...");
            tickers.fetch();
            debug.debug("[Sync] Loaded " + tickers.length + " tickers from LocalStorage");

            //Searching for new providers
            debug.debug("[Sync] Searching new providers definition.");

            _.each(Providers, function(provider,key){
                if (tickers.get(provider[Env.PROPERTY_ID]) === undefined){
                    try {
                        this.initTicker(provider);
                    }catch (err){
                        debug.debug("[Sync] Error reading properties for Provider " + provider[Env.PROPERTY_TICKER_NAME] + " Error: " + err.message);
                    }
                }else {
                    debug.debug("[Sync] Loaded Ticker " + provider[Env.PROPERTY_TICKER_NAME] +  " from cache ...");
                }
            },this);
        },

        /**
         * Inicializa un Ticker en TickerCollection a partir de la descripcion definida providers.js
         * @param provider El objeto Provider. For more information read provider.js
         */
        initTicker : function(provider){

            if (provider && provider.id !== undefined){
                debug.debug("[Sync] Creating New Ticker : " + provider.symbol);

                try {
                    var ticker = new TickerClass(provider);
                    tickers.create(ticker);
                    debug.debug("[Sync] Ready Ticker " + provider.name);
                } catch (err){
                    debug.debug("[Sync] Is not possible load  Ticker " + provider.name + ". Please check Providers list");
                }

            }
        },

        /**
         * Refresca los Tickers. Representa el evento EVENT_UPDATE_TICKERS. Este evento se dispara cada vez que
         * expira el tiempo de espera o el usuario pulsa sobre el boton refrescar.
         *
         * @param type - Por defecto refresca todos los tickers definidos en providers. Pero tambien se puede
         * especificar que refresca solo los activos (Environment.REFRESH_ENABLE_TICKERS)
         */
        refreshTickers : function (type) {
            debug.debug("[Sync] Updating tickers information ... ");

            switch (type){
                default:
                case Env.REFRESH_ALL_TICKERS:
                    debug.debug("[Sync] Updating all tickers ...")
                    tickers.each(this.refreshTicker);
                    this.lastTrigger = tickers.length; //Numero de veces que se debe esperar antes de enviar el evento que indica que la actualizacion ha terminado
                    break;
                case Env.REFRESH_ENABLE_TICKERS:
                    debug.debug("[Sync] Updating tickers enabled ...")
                    var enableTickers = tickers.getEnables();
                    this.lastTrigger = enableTickers.length; //Numero de veces que se debe esperar antes de enviar el evento que indica que la actualizacion ha terminado
                    _.each(enableTickers,this.refreshTicker);
                    break;
            }
        },

        /**
         * Hace una query al Api del proveedor. Como el Json es asincrono, se invoca una funcion
         * encargada de actualizar el modelo
         *
         * @param Ticker - Ticker
         * @returns {boolean}
         */
        refreshTicker : function (model){
            debug.debug("[Sync] Updating model " + model.get(Env.PROPERTY_TICKER_NAME));
            var me = this;

            var reqEngine = null;
            var isCrossDomain = model.get(Env.PROPERTY_TICKER_CROSS_DOMAIN);

            if (isCrossDomain){
                reqEngine = $.ajax;
            } else {
                reqEngine = $.CrossDomainAjax;
            }

            reqEngine({
                url: model.get(Env.PROPERTY_TICKER_FEED_URL),
                type: 'GET',
                success: function(data) {
                    if (data){
                        debug.debug("[Sync] Success - Data received. ");
                        me.updateTicker(data, model);
                        me._checkLastTrigger();
                    }else {
                        debug.debug("[Sync] Success - BUT NO DATA RECEIVED. ");
                    }
                },
                error : function(data){
                    debug.debug("[Sync] FAIL! - Something wrong updating -> Id:" + model.get(Env.PROPERTY_ID) + " Name:" + model.get(Env.PROPERTY_TICKER_NAME));
                    me._checkLastTrigger();
                }
            });
        },

        /**
         * Actualiza el modelo con los datos recibidos. Los datos recibidos se adaptan con la funcion adapter
         * provista por cada Proveedor.
         *
         * @model - Modelo que se actualiza
         *
         * @data - Es el objeto Json recibido desde el proveedor, el cual debe adaptarse al modelo.
         *
         */
        updateTicker : function (data, model) {
            //Save accede a la collecion y busca el objeto del modelo,
            //si no esta lo guarda. Si esta, actualiza.
            var provider = this.getProvider(model.get(Env.PROPERTY_TICKER_SYMBOL));
            if (provider){
                debug.debug("[Sync] Adapting data received");
                var adaptedData = provider.adapter(data);

                //Guardar ultimo mercado!
                var previous = model.get(Env.PROPERTY_TICKER_MARKET);

                model.save({
                    'previousMarket' : previous,
                    'market' : adaptedData
                });

                //Get new market
                var market = model.get(Env.PROPERTY_TICKER_MARKET);
                debug.debug("[Sync] Saved data:  " + model.get(Env.PROPERTY_TICKER_NAME) + "| Last " + market.last + "| Buy " + market.buy + "| Sell " + market.sell);
            }
        },

        /**
         * Devuelve toda la coleccion de Tickers. Se sigue este principio ya que
         * utilizamos una implementacion de LocalStorage en Backbone. Esta implementacion
         * solo funciona a traves de colecciones.
         * @returns {collections.tickers}
         */
        getTickers : function() {
            return tickers;
        },

        /**
         * A partir del symbol del proveedor se localiza el objeto definido en providers.js
         * @param symbol
         * @returns {boolean}
         */
        getProvider : function(symbol){
            var currentProvider = false;
            if (Providers[symbol] !== undefined) {
                currentProvider = Providers[symbol];
            }
            return currentProvider;
        },

        /**
         * Funcion utilitaria que controla cuando se debe avisar a las vistas que el proceso de actualizacion ha terminado
         * @private
         */
        _checkLastTrigger : function() {
            this.lastTrigger--;
            if (this.lastTrigger <= 0){
                debug.debug("[Sync] Refresh tickers has finished");
                debug.debug("[Sync] Triggering EVENT_UPDATE_TICKERS_FINISH");
                Events.trigger(Env.EVENT_UPDATE_TICKERS_FINISH);
            }
        }
    })

    return sync;
});
