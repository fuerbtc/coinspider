/**
 * Application Environment Constant and Application Default Values
 */

define([],function(){
    var constants = {
        //LocalStorage Collections
        STORAGE_TICKERS  : 'forobitcoin-ls-tickers',
        DEFAULT_SCALE_DECIMAL : 3,
        DEFAULT_NORMAL_RATE : 0.1,
        DEFAULT_ALERT_UP_RATE : 0.5,
        DEFAULT_ALERT_DOWN_RATE : 0.5,

        CSS_SUCCESS : 'success',
        CSS_ERROR : 'danger',
        CSS_NORMAL : 'info',

        DEFAULT_FORMAT_DATE : 'h:mm:ss a',

        //Property Descriptors
        PROPERTY_ID : 'id',
        PROPERTY_TICKER_NAME : 'name',
        PROPERTY_TICKER_SYMBOL : 'symbol',
        PROPERTY_TICKER_SITE_URL : 'siteUrl',
        PROPERTY_TICKER_ICON_URL : 'iconUrl',
        PROPERTY_TICKER_FEED_URL : 'feedUrl',
        PROPERTY_TICKER_STATUS : 'status',
        PROPERTY_TICKER_MARKET : 'market',
        PROPERTY_TICKER_LAST : 'last',
        PROPERTY_TICKER_BUY : 'buy',
        PROPERTY_TICKER_SELL : 'sell',
        PROPERTY_TICKER_VOLUME : 'volume',
        PROPERTY_TICKER_UPDATE : 'update',
        PROPERTY_TICKER_PREVIOUS_MARKET : 'previousMarket',
        PROPERTY_TICKER_CROSS_DOMAIN : 'crossdomain',
        PROPERTY_TICKER_ORDER : 'order',
        PROPERTY_TICKER_CURRENCY : 'currency'
    }

    return constants;
});
