/**
 * Synchronization Process with Providers
 */
define(['jquery','backbone','crossdomain'],function($,Backbone){

    var providers = {
        mtgox : {
            id : '66',
            symbol : 'mtgox',
            url : 'https://data.mtgox.com/api/2/BTCUSD/money/ticker_fast',
            siteUrl : 'https://mtgox.com',
            iconUrl : 'https://www.mtgox.com/favicon.ico',
            name : 'Mt.Gox',

            // Debe adaptarse la data recibida a un objeto con las siguientes caracteristicas
            // {
            //    last : 0,
            //    buy : 0,
            //    sell : 0,
            //    time : new Date(),
            // }
            adapter : function (data){
                var result = false;

                if (data.result == "success"){
                    result = {};
                    //Enviar 5 decimales
                    result.last = data.data.last.value;
                    result.buy = data.data.buy.value;
                    result.sell = data.data.sell.value;
                    //MtGox retorna el tiempo en unidades de microsegundos
                    result.time = new Date(parseInt(data.data.now / 1000));
                }

                return result;
            }
        },
        bitstamp : {
            id : '77',
            symbol : 'bitstamp',
            url :  'https://www.bitstamp.net/api/ticker/',
            siteUrl : 'https://www.bitstamp.net/',
            iconUrl : 'https://www.bitstamp.net/s/icons/favicon.ico',
            name : 'Bitstamp',
            adapter : function (data){
                var result = false;

                if (data.last != undefined){
                    result = {};
                    //Envian dos decimales
                    result.last = data.last;
                    result.buy = data.ask;
                    result.sell = data.bid;
                    result.time = new Date(data.timestamp);
                }

                return result;
            }
        },
        btce : {
            id : '88',
            symbol : 'btce',
            url :  'https://btc-e.com/api/2/btc_usd/ticker',
            siteUrl : 'https://btc-e.com',
            iconUrl : 'https://btc-e.com/favicon.ico',
            name : 'Btc-e',
            adapter : function (data){
                var result = false;

                if (data.ticker != undefined){
                    result = {};
                    //Envian 5 decimales
                    result.last = data.ticker.last;
                    result.buy = data.ticker.buy;
                    result.sell = data.ticker.sell;
                    result.time = new Date(data.ticker.updated);
                }

                return result;
            }

        }
    };



    //Contruir este objeto encapsulando la Colleccion, por temas de "Seguridad"
    //http://www.htmlgoodies.com/beyond/javascript/class-member-encapsulation-in-javascript-data-hiding.html#fbid=3oaYHZfjweM

    // El mejor aproach es que fuera de este objeto crea la collecion y listo...
    // No se deberia tener acceso a ella desde ninguna otra parte...

    var sync = {



        init : function (){
            //Register event to save data
            this.register();

            //Inicializo la collection con el LocalStorage
        },

        /**
         * Hace una query al Api del proveedor. Como el Json es asincrono, se dispara un trigger
         * que invoca una funcion que se encarga de actualizar el LocalStorage
         *
         * @param provider - Identificador del Provider
         * @returns {boolean}
         */
        refresh : function (provider){
            var currentProvider = {};
            if (providers[provider] === undefined) {
                return false;
            }else {
                currentProvider = providers[provider];
            }

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

            return true;
        },

        /**
         * Registra el evento que se encarga de almacenar el valor consultado
         *
         * @data - Objeto Json tal y como lo envia el provider.
         * @symbol - Id del Provider
         */
        register : function () {
            $('body').on('btc-update-provider', function(event,data,symbol){
                //Deberia entonces aqui llamar al modelo de ticker y guardar en localstorage

                //Aqui deberia buscar el provider y adaptar la data segun el provider

                //Y invocar  a save

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
        }
    };

    return sync;
});


//b) TENDRAS QUE CREAR OTRA COLLECION QUE SOLO COGA DEL LOCALSTORAGE LOS ELEMENTOS CON UN ESTADO
//ESA COLECCION SERA PARA LA TABLA , CONSTRUYES LA VIEW, ETC

//a) TENDRAS QUE CONSTRUIR UNA VIEW CON ESTA COLECCION PARA CONSTRUIR LA SELECT. Y ACTUALIZAR EL ESTADO
//CUANDO SE SELECCIONA O UN SELECCIONE

//EL REFRESH CADA 10 SEC.TIENE QUE ACTUALIZAR LOS PROVIDERS QUE ESTAN LA COLLECION de B. Supongo que como
//parte de este metodo

//

// Otra cosa puede ser. Calculo matematico y
