/**
 * Ticker Class
 *
 * Object Descriptor
 * {
 *     name : ''.
 *     symbol : '',
 *     siteUrl : '',
 *     iconUrl : '',
 *     last : '',
 *     buy : '',
 *     sell : '',
 *     date : ''
 *     adapter : '',
 * }
 *
 * **/

define(['backbone','utils/environment'],function(Backbone,Environment){

    var Ticker = Backbone.Model.extend({
        defaults: function() {
            return {
                name : 'Null Exchange',
                symbol : 'xyz',
                siteUrl: 'http://google.com',
                iconUrl : 'https://github.com/bitcoin/bitcoin/raw/master/share/pixmaps/bitcoin.ico',
                feedUrl : 'http://google.com',
                last : 0,
                buy : 0,
                sell : 0,
                update : new Date(),
                status : Environment.TICKER_DISABLE
            }
        }

    });

    return Ticker;
});
