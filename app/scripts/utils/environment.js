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
        DEFAULT_NORMAL_RATE : 0.1,
        DEFAULT_REFRESH_TIME : 30, //SECONDS
        DEFAULT_CURRENCY : 'USD',
        CURRENCY_DOLAR: 'USD',
        CURRENCY_EURO : 'EUR',
        DEFAULT_CONVERSION : '1,3545',
        DEFAULT_SCALE_DECIMAL : "3",
        VERSION : "version",

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
        CSS_NORMAL : 'info',

        DEFAULT_FORMAT_DATE : 'h:mm:ss a',

        //Property Descriptors
        PROPERTY_ID : 'id',
        PROPERTY_TEST : 'test',
        PROPERTY_STORAGE : 'storage',
        PROPERTY_CONFIG_ENABLE_LOG : 'enableLog',
        PROPERTY_CONFIG_ENABLE_MESSAGE_COUNTER : 'enableMessageCounter',
        PROPERTY_CONFIG_REFRESH_TIMER : 'refreshTimer',
        PROPERTY_CONFIG_ALERT_UP : 'alertUp',
        PROPERTY_CONFIG_ALERT_DOWN : 'alertDown',
        PROPERTY_CONFIG_VERSION : 'version',
        PROPERTY_CONFIG_RATES : 'rates',
        PROPERTY_CONFIG_RATES_UPDATE : 'updateRates',

        //Properties Ticker Descriptor
        PROPERTY_TICKER_NAME : 'name',
        PROPERTY_TICKER_SYMBOL : 'symbol',
        PROPERTY_TICKER_SITE_URL : 'siteUrl',
        PROPERTY_TICKER_ICON_URL : 'iconUrl',
        PROPERTY_TICKER_STATUS : 'status',
        PROPERTY_TICKER_MARKETS : 'markets',
        PROPERTY_TICKER_MARKETS_UPDATE : 'marketsUpdate',
        PROPERTY_TICKER_LAST : 'last',
        PROPERTY_TICKER_BUY : 'buy',
        PROPERTY_TICKER_SELL : 'sell',
        PROPERTY_TICKER_VOLUME : 'volume',
        PROPERTY_TICKER_UPDATE : 'update',
        PROPERTY_TICKER_MARKET_CURRENT : 'current',
        PROPERTY_TICKER_MARKET_PREVIOUS : 'previous',
        PROPERTY_TICKER_MARKET_FEED : 'feed',
        PROPERTY_TICKER_MARKET_COIN : 'coin',
        PROPERTY_TICKER_MARKET_CURRENCY : 'currency',

        PROPERTY_TICKER_MARKET_FEED_CROSSDOMAIN : 'crossdomain',
        PROPERTY_TICKER_ORDER : 'order'
    }

    return constants;
});
