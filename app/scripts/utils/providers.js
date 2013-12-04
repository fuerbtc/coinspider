/**
 * Providers Definition.
 *
 * IF YOU WANT TO ADD NEW PROVIDERS. JUST UPDATE THIS FILE!
 *
 * Each provider must have this contract object
 *
 * symbol : {
 *     id : '',
 *     symbol : '',
 *     feedUrl : '', //Json Ticker Request
 *     siteUrl : '',
 *     iconUrl : '',
 *     name : ''
 *     adapter : function (data) {...}
 * }
 *
 * Adapter function should return an object with this contract
 *
 * {
 *   last : 0,
 *   buy : 0,
 *   sell : 0,
 *   update : new Date(),
 *
 * }
 *
 * param 'data' in Adapter represent Json object send it from provider call
 *
 * You can return a boolean in case unexpected 'data' content.
 */
define(["utils/environment",'moment','moment_es'],function(Environment,moment){

    moment.lang('es');


    var providers = {

        mtgox : {
            id : '66',
            symbol : 'mtgox',
            feedUrl : 'https://data.mtgox.com/api/2/BTCUSD/money/ticker_fast',
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
                    //Guardo el String porque LocalStorage no almacena Objectos Date
                    result.update = moment(new Date(parseInt(data.data.now / 1000))).format(Environment.DEFAULT_FORMAT_DATE);
                }

                return result;
            }
        },
        bitstamp : {
            id : '77',
            symbol : 'bitstamp',
            feedUrl :  'https://www.bitstamp.net/api/ticker/',
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
                    result.update = moment(new Date(parseInt(data.timestamp)*1000)).format(Environment.DEFAULT_FORMAT_DATE);
                }

                return result;
            }
        },
        btce : {
            id : '88',
            symbol : 'btce',
            feedUrl :  'https://btc-e.com/api/2/btc_usd/ticker',
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
                    result.update = moment(new Date(parseInt(data.ticker.updated)*1000)).format(Environment.DEFAULT_FORMAT_DATE);
                }

                return result;
            }

        }
    };

    return providers;
});