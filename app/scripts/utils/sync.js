/**
 * Synchronization Process with Providers
 */
define(['jquery','backbone','models/ticker','collections/tickers','utils/providers','crossdomain'],function($,Backbone,TickerClass,TickersClass, providers){

    var tickers = new TickersClass();

    var sync = {

        init : function (){
            //Register event to save data
            debug.debug("Registering events ...");
            this.register();

            debug.debug("Loading Tickers ...");
            //Inicializo todos los providers en la Collecion
            this.loadTickers();

            return this;
        },

        /**
         * Hace una query al Api del proveedor. Como el Json es asincrono, se dispara un trigger
         * que invoca una funcion que se encarga de actualizar el LocalStorage
         *
         * @param symbol - Identificador del Provider
         * @returns {boolean}
         */
        refresh : function (symbol){
            var currentProvider = this.getProvider(symbol);
            $.ajax({
                url: currentProvider.url,
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
                    $('body').trigger('btc-update-provider', [jsonTicker, currentProvider.symbol]);
                }
            });

            return this;
        },

        /**
         * Registra el evento que se encarga de almacenar el valor consultado
         *
         * @data - Objeto Json tal y como lo envia el provider.
         * @symbol - Id del Provider
         */
        register : function () {
            var me = this;

            $('body').on('btc-update-provider', function(event,data,symbol){
                //Obtengo el Proveedor
                var currentProvider = me.getProvider(symbol);

                //Se adapta  la data obtenida del proveedor
                var adapterData = currentProvider.adapter(data);

                this.save(currentProvider,adapterData);
            });
        },

        /**
         * Actualiza todos los Proveedores.
         */
        refreshAll : function () {
            for (var key in providers){
                if (providers.hasOwnProperty(key)){
                    this.refresh(key);
                }
            }
        },

        /**
         * Guardar en el LocalStorage la data de una manera generica
         * para poder ser usado como si viene de un solo sitio por Backbone
         *
         * @provider - El objeto provider del que podras sacar informacion estatica como el nombre, url,
         *             del provider
         *            {
         *              id : '66'
         *              symbol : 'mtgox',
         *              url : 'https://data.mtgox.com/api/2/BTCUSD/money/ticker_fast',
         *              siteUrl : 'https://mtgox.com',
         *              iconUrl : 'https://www.mtgox.com/favicon.ico',
         *              name : 'Mt.Gox',
         *              ...
         *            }
         *
         *
         * @data - Es el adaptador
         *           {
         *              last : 0,
         *              buy : 0,
         *              sell : 0,
         *              time : new Date(),
         *           }
         *
         *
         */
        save : function (provider, data) {
         //Save accede a la collecion y busca el objeto del modelo,
         //si no esta lo guarda. Si esta, actualiza.
        },

        getTickers : function() {
            return tickers;
        },

        getProvider : function(symbol){
            var currentProvider = {};
            if (providers[provider] === undefined) {
                throw new ReferenceError('Provider ' + symbol + ' is not defined');
            }else {
                currentProvider = providers[provider];
            }

            return currentProvider;
        },

        /**
         * Carga Ticker Model en Ticker Collection a partir de la descripcion de un provider
         * @param provider
         */
        loadTicker : function(provider){

            if (provider.id !== undefined){
                debug.debug("Loading provider: " + provider.symbol);
                var ticker = tickers.get(provider.id);

                if (ticker === undefined){
                    debug.debug("Ticker undefined")
                    ticker = new TickerClass();
                }

                ticker.set (
                    {
                        id : provider.id,
                        name : provider.name,
                        symbol : provider.symbol,
                        siteUrl : provider.siteUrl,
                        iconUrl : provider.iconUrl,
                        adapter : provider.adapter
                    }
                );

                debug.debug("Updating ticker " + provider.name);
                tickers.add(ticker);
            }
        },

        /**
         * Carga todos los Tickers en la Coleccion.
         */
        loadTickers : function(){
            for (var key in providers){
                if (providers.hasOwnProperty(key)){
                    this.loadTicker(providers[key]);
                }
            }
        }
    };

    return sync;
});


//Pasa de trabajar con dos listas. Trabaja solamente con la Colleccion de Tickers.
//Lo que si puedes tener es un archivo a parte javascript con tus proveedores
//Y luego lo que debes hacer es cargar esos proveedores como modelos y meterlos
//en la collecion y salvar. Como el localstorage es persistente, se solucionan muchos
//temas de golpe...


//b) TENDRAS QUE CREAR OTRA COLLECION QUE SOLO COGA DEL LOCALSTORAGE LOS ELEMENTOS CON UN ESTADO
//ESA COLECCION SERA PARA LA TABLA , CONSTRUYES LA VIEW, ETC

//a) TENDRAS QUE CONSTRUIR UNA VIEW CON ESTA COLECCION PARA CONSTRUIR LA SELECT. Y ACTUALIZAR EL ESTADO
//CUANDO SE SELECCIONA O UN SELECCIONE

//EL REFRESH CADA 10 SEC.TIENE QUE ACTUALIZAR LOS PROVIDERS QUE ESTAN LA COLLECION de B. Supongo que como
//parte de este metodo

//

// Otra cosa puede ser. Calculo matematico y
