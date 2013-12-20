/**
 * Providers Definition.
 *
 * IF YOU WANT TO ADD NEW PROVIDERS. JUST UPDATE THIS FILE!
 *
 * Each provider must have this contract object
 *
 * exchangerName : {
 *          id : '', //UUID - You should provide one :P. I'm lazy.
 *          symbol : '', //SYMBOL . For instance Mt.Gox = mtgox
 *          siteUrl : '', //URL to Link
 *          iconUrl : '', //Icon to use to UX support
 *          name : '' //Exchanger name you want to use
 *          markets : {
 *              BTCUSD : {
 *                  feed : '' //URL Request to get json ticker
 *                  graph : '' //URL Link to watch graph
 *                  crossdomain : '' //To use YQL Ajax Request
 *              }
 *              ...
 *          }
 *          adapter : function (data) {...} //Adapter
 *
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
 * param 'currency' in Adapter represent currency related to the data received
 *
 * You can return a boolean in case unexpected 'data' content.
 */
define(["utils/environment",'moment','moment_es'],function(Env,moment){

    moment.lang('es');

    var providers = {

        //MtGox USD Definition
        mtgox : {
            id : 11,
            symbol : 'mtgox',
            siteUrl : 'https://www.mtgox.com/',
            iconUrl : 'https://www.mtgox.com/favicon.ico',
            name : 'Mt.Gox',

            markets : {
                BTCUSD : {
                    feed : 'http://data.mtgox.com/api/1/BTCUSD/ticker',
                    graph : 'http://bitcoincharts.com/markets/mtgoxUSD.html',
                    crossdomain : true
                },
                BTCEUR : {
                    feed : 'http://data.mtgox.com/api/1/BTCEUR/ticker',
                    graph : 'http://bitcoincharts.com/markets/mtgoxEUR.html',
                    crossdomain : true
                },
                BTCGBP : {
                    feed : 'http://data.mtgox.com/api/1/BTCGBP/ticker',
                    graph : 'http://bitcoincharts.com/markets/mtgoxGBP.html',
                    crossdomain : true
                }
            },


            adapter : function (market,data){
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
            id : 12,
            symbol : 'bitstamp',
            siteUrl : 'https://www.bitstamp.net',
            iconUrl : 'https://www.bitstamp.net/s/icons/favicon.ico',
            name : 'Bitstamp',

            markets : {
                BTCUSD : {
                    feed : 'https://www.bitstamp.net/api/ticker',
                    chart : 'http://bitcoincharts.com/markets/bitstampUSD.html',
                    crossdomain : false
                }
            },

            adapter : function (market,data){
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

        btce : {
            id : 13,
            symbol : 'btce',
            siteUrl : 'https://btc-e.com/',
            iconUrl : 'https://btc-e.com/favicon.ico',
            name : 'Btc-e',

            markets : {
                BTCUSD : {
                    feed: 'https://btc-e.com/api/2/btc_usd/ticker',
                    chart : 'http://bitcoincharts.com/markets/btceUSD.html',
                    crossdomain : false
                },
                LTCUSD : {
                    feed: 'https://btc-e.com/api/2/ltc_usd/ticker',
                    chart : 'http://bitcoincharts.com/markets/btceUSD.html',
                    crossdomain : false
                }
            },
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

        btcchina : {
            id : 14,
            symbol : 'btcchina',
            siteUrl : 'https://btcchina.com',
            iconUrl : 'https://vip.btcchina.com/img/favicon.ico?v=2',
            name : 'BtcChina',

            markets : {
                BTCCNY : {
                    feed : 'https://data.btcchina.com/data/ticker',
                    chart : 'http://bitcoincharts.com/markets/btcnCNY.html',
                    crossdomain : false
                }
            }
        }


//        xbtusd : {
//            id : 100,
//            symbol : 'xbtusd',
//            feedUrl :  'https://www.itbit.com/api/feeds/ticker/XBTUSD',
//            siteUrl : 'https://www.itbit.com',
//            iconUrl : 'https://www.itbit.com/favicon.ico',
//            name : 'itBit',
//            crossdomain   : false,
//            currency: Environment.DOLAR,
//            adapter : function (data){
//                var result = false;
//
//                if (data.bid != undefined){
//                    result = {};
//                    result[Environment.PROPERTY_TICKER_LAST] = data.open;
//                    result[Environment.PROPERTY_TICKER_BUY] = data.ask;
//                    result[Environment.PROPERTY_TICKER_SELL] = data.bid;
//                    result[Environment.PROPERTY_TICKER_UPDATE] = moment(new Date(data.currentTime)).format(Environment.DEFAULT_FORMAT_DATE);
//                    result[Environment.PROPERTY_TICKER_VOLUME] = data.volume;
//                }
//
//                return result;
//            }
//        },
//        bitkonanUSD : {
//            id : 101,
//            symbol : 'bitkonanUSD',
//            feedUrl :  'https://bitkonan.com/api/ticker',
//            siteUrl : 'http://bitcoincharts.com/markets/bitkonanUSD.html',
//            iconUrl : 'https://bitkonan.com/favicon.ico',
//            name : 'BitKonan USD',
//            crossdomain: false,
//            currency: Environment.DOLAR,
//            adapter : function (data){
//                var result = false;
//
//                if (data.bid != undefined){
//                    result = {};
//                    result[Environment.PROPERTY_TICKER_LAST] = data.last;
//                    result[Environment.PROPERTY_TICKER_BUY] = data.ask;
//                    result[Environment.PROPERTY_TICKER_SELL] = data.bid;
//                    result[Environment.PROPERTY_TICKER_UPDATE] = moment(new Date(data.currentTime)).format(Environment.DEFAULT_FORMAT_DATE);
//                    result[Environment.PROPERTY_TICKER_VOLUME] = data.volume;
//                }
//
//                return result;
//            }
//        },
//        krakenUSD : {
//            id : 102,
//            symbol : 'krakenUSD',
//            feedUrl :  'https://api.kraken.com/0/public/Ticker?pair=XBTUSD',
//            siteUrl : 'https://kraken.com',
//            iconUrl : 'https://www.kraken.com/img/favicon.ico?v=1',
//            name : 'Kraken USD',
//            crossdomain: false,
//            currency: Environment.DOLAR,
//            adapter : function (data){
//                var result = false;
//
//                if (data.result.XXBTZUSD != undefined){
//                    var obj = data.result.XXBTZUSD;
//                    result = {};
//                    result[Environment.PROPERTY_TICKER_LAST] = obj.c[0];
//                    result[Environment.PROPERTY_TICKER_BUY] = obj.a[0];
//                    result[Environment.PROPERTY_TICKER_SELL] = obj.b[0];
//                    result[Environment.PROPERTY_TICKER_UPDATE] = moment(new Date()).format(Environment.DEFAULT_FORMAT_DATE);
//                    result[Environment.PROPERTY_TICKER_VOLUME] = obj.v[0];
//                }
//
//                return result;
//            }
//        }
    };

    return providers;
});