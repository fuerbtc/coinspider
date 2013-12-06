/**
 * Application Environment Constant and Application Default Values
 */

define([],function(){
    var constants = {
        TICKER_ENABLE : true,
        TICKER_DISABLE: false,
        DEFAULT_VALUE : 0,
        DEFAULT_ALERT_UP_PERCENT : 0,
        DEFAULT_ALERT_DOWN_PERCENT : 0,
        DEFAULT_REFRESH_TIME : 15, //SECONDS
        DEFAULT_CURRENCY : '$',
        DOLAR: '$',
        EURO : '€',
        DEFAULT_CONVERSION : '1,3545',

        LOG_ENABLE : 4,
        LOG_DISABLE : 0,
        DEFAULT_ENABLE_MESSAGE_COUNTER : true,

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
        EVENT_SET_LEVEL_LOGGING : 'coinspider-set-logging',

        //DECISION MAKERS
        REFRESH_ALL_TICKERS : '1',
        REFRESH_ENABLE_TICKERS : '2',

        //LocalStorage Collections
        STORAGE_TICKERS  : 'coinspider-ls-tickers',
        STORAGE_CONFIG   : 'coinspider-ls-config',

        CSS_SUCCESS : 'success',
        CSS_ERROR : 'danger',

        DEFAULT_FORMAT_DATE : 'h:mm:ss a',

        PROPERTY_CONFIG_ENABLE_LOG : 'enableLog',
        PROPERTY_CONFIG_ENABLE_MESSAGE_COUNTER : 'enableMessageCounter'
    }

    return constants;
});
