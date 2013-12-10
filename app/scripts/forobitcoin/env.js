/**
 * Application Environment Constant and Application Default Values
 */

define([],function(){
    var constants = {
        //LocalStorage Collections
        STORAGE_TICKERS  : 'forobitcoin-ls-tickers',
        STORAGE_CONFIG : 'forobitcoin-ls-config',
        DEFAULT_SCALE_DECIMAL : 3,
        DEFAULT_NORMAL_RATE : 1,
        DEFAULT_ALERT_UP_RATE : 5,
        DEFAULT_ALERT_DOWN_RATE : 5,
        TIMER : 15,

        CSS_SUCCESS : 'success',
        CSS_ERROR : 'danger',
        CSS_NORMAL : 'info',

        DEFAULT_FORMAT_DATE : 'h:mm:ss a',

        //Property Descriptors
        PROPERTY_VERSION : 'version',
        PROPERTY_ID : 'id',
        PROPERTY_TICKER_NAME : 'name',
        PROPERTY_TICKER_SYMBOL : 'symbol',
        PROPERTY_TICKER_SITE_URL : 'siteUrl',
        PROPERTY_TICKER_ICON_URL : 'iconUrl',
        PROPERTY_TICKER_MARKETS : 'markets',
        PROPERTY_TICKER_CURRENT_MARKET : 'current',
        PROPERTY_TICKER_PREVIOUS_MARKET : 'previousMarket',
        PROPERTY_TICKER_LAST : 'last',
        PROPERTY_TICKER_BUY : 'buy',
        PROPERTY_TICKER_SELL : 'sell',
        PROPERTY_TICKER_VOLUME : 'volume',
        PROPERTY_TICKER_UPDATE : 'update',
        PROPERTY_TICKER_EXCHANGES: 'exchanges',
        PROPERTY_TICKER_EXCHANGE_OFFICIAL : 'official',
        PROPERTY_TICKER_EXCHANGE_CURRENCIES : 'currencies',
        PROPERTY_TICKER_UPDATED : 'updated'

    }

    return constants;
});
