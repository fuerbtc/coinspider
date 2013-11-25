define([],function(){
    var providers = {

        // Debe adaptarse la data recibida en cada peticion ajax de cada proveedor
        // a un obejto con las siguientes propiedades.
        // La funcion adaptadora se llamada 'adapter'
        // {
        //    last : 0,
        //    buy : 0,
        //    sell : 0,
        //    time : new Date(),
        // }

        mtgox : {
            id : '66',
            symbol : 'mtgox',
            url : 'https://data.mtgox.com/api/2/BTCUSD/money/ticker_fast',
            siteUrl : 'https://mtgox.com',
            iconUrl : 'https://www.mtgox.com/favicon.ico',
            name : 'Mt.Gox',

            adapter : function (data){
                var result = false;

                if (data.result == "success"){
                    result = {};
                    //Mt.Gox envia 5 decimales
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

    return providers;
});