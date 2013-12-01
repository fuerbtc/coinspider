/**
 * Application Environment Constants
 */

define([],function(){
    var constants = {
        TICKER_ENABLE : true,
        TICKER_DISABLE: false,
        DEFAULT_VALUE : 0,
        DEFAULT_ALERT_UP_PERCENT : 5,
        DEFAULT_ALERT_DOWN_PERCENT : 5,
        DEFAULT_REFRESH_TIME : 15, //SECONDS

        //Identificadores estaticos para acceder a modelos
        INSTANCE_CONFIG : 1,

        //EVENTS NAME
        EVENT_ENABLE_TICKER : 'coinspider-enable-ticker',
        EVENT_DISABLE_TICKER : 'coinspider-disable-ticker',
        EVENT_UPDATE_TICKERS : 'coinspider-upate-tickers',
        EVENT_UPDATE_TICKERS_FINISH : 'coinspider-upate-tickers-finish',
        EVENT_STOP_TIMER : 'coinspider-stop-timer',
        EVENT_START_TIMER : 'coinspider-start-timer',
        EVENT_UPDATE_TICKER : 'coinspider-update-ticker',

        //DECISION MAKERS
        REFRESH_ALL_TICKERS : '1',
        REFRESH_ENABLE_TICKERS : '2',

        //LocalStorage Collections
        STORAGE_TICKERS  : 'coinspider-ls-tickers',
        STORAGE_CONFIG   : 'coinspider-ls-config'
    }

    return constants;
});
