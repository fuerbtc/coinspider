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
            feedUrl : 'http://data.mtgox.com/api/1/BTCUSD/ticker',
            siteUrl : 'http://bitcoincharts.com/markets/mtgoxUSD.html',
            iconUrl : 'https://www.mtgox.com/favicon.ico',
            name : 'Mt.Gox',
            crossdomain : true,

            adapter : function (data){
                var result = false;

                if (data.result == "success"){
                    result = {};
                    //Mt.Gox envia 5 decimales
                    result[Environment.PROPERTY_TICKER_LAST] = data.return.last.value;
                    result[Environment.PROPERTY_TICKER_BUY] = data.return.buy.value;
                    result[Environment.PROPERTY_TICKER_SELL] = data.return.sell.value;
                    //MtGox retorna el tiempo en unidades de microsegundos
                    //Guardo el String porque LocalStorage no almacena Objectos Date
                    result[Environment.PROPERTY_TICKER_UPDATE] = moment(new Date(parseInt(data.return.now / 1000))).format(Environment.DEFAULT_FORMAT_DATE);
                    result[Environment.PROPERTY_TICKER_VOLUME] = data.return.vol.value;
                }

                return result;
            }
        },
        bitstamp : {
            id : '77',
            symbol : 'bitstamp',
            feedUrl :  'https://www.bitstamp.net/api/ticker',
            siteUrl : 'http://bitcoincharts.com/markets/bitstampUSD.html',
            iconUrl : 'https://www.bitstamp.net/s/icons/favicon.ico',
            name : 'Bitstamp',
            crossdomain: false,
            adapter : function (data){
                var result = false;

                if (data.last != undefined){
                    result = {};
                    //Envian dos decimales
                    result[Environment.PROPERTY_TICKER_LAST] = data.last;
                    result[Environment.PROPERTY_TICKER_BUY] = data.ask;
                    result[Environment.PROPERTY_TICKER_SELL] = data.bid;
                    result[Environment.PROPERTY_TICKER_UPDATE] = moment(new Date(parseInt(data.timestamp)*1000)).format(Environment.DEFAULT_FORMAT_DATE);
                    result[Environment.PROPERTY_TICKER_VOLUME] = data.volume;
                }

                return result;
            }
        },
        btcebtc : {
            id : '88',
            symbol : 'btcebtc',
            feedUrl :  'https://btc-e.com/api/2/btc_usd/ticker',
            siteUrl : 'http://bitcoincharts.com/markets/btceUSD.html',
            iconUrl : 'https://btc-e.com/favicon.ico',
            name : 'Btc-e BTC',
            crossdomain: false,
            adapter : function (data){
                var result = false;

                if (data.ticker != undefined){
                    result = {};
                    //Envian 5 decimales
                    result[Environment.PROPERTY_TICKER_LAST] = data.ticker.last;
                    result[Environment.PROPERTY_TICKER_BUY] = data.ticker.buy;
                    result[Environment.PROPERTY_TICKER_SELL] = data.ticker.sell;
                    result[Environment.PROPERTY_TICKER_UPDATE] = moment(new Date(parseInt(data.ticker.updated)*1000)).format(Environment.DEFAULT_FORMAT_DATE);
                    result[Environment.PROPERTY_TICKER_VOLUME] = data.ticker.vol_cur;
                }

                return result;
            }
        },
        xbtusd : {
            id : '100',
            symbol : 'xbtusd',
            feedUrl :  'https://www.itbit.com/api/feeds/ticker/XBTUSD',
            siteUrl : 'https://www.itbit.com',
            iconUrl : 'https://www.itbit.com/favicon.ico',
            name : 'itBit',
            crossdomain: false,
            adapter : function (data){
                var result = false;

                if (data.bid != undefined){
                    result = {};
                    result[Environment.PROPERTY_TICKER_LAST] = data.open;
                    result[Environment.PROPERTY_TICKER_BUY] = data.ask;
                    result[Environment.PROPERTY_TICKER_SELL] = data.bid;
                    result[Environment.PROPERTY_TICKER_UPDATE] = moment(new Date(data.currentTime)).format(Environment.DEFAULT_FORMAT_DATE);
                    result[Environment.PROPERTY_TICKER_VOLUME] = data.volume;
                }

                return result;
            }
        }
    };

    return providers;
});