/**
 * Ticker Class
 *
 * Object Descriptor
 * {
 *     name : ''.
 *     symbol : '',
 *     siteUrl : '',
 *     iconUrl : '',
 *     adapter : '',
 *     market : {
 *         last : '',
 *         buy : '',
 *         sell : '',
 *         date : ''
 *     },
 *     previousMarket : {
 *         last : '',
 *         buy : '',
 *         sell : '',
 *         date : ''
 *     }
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
                status : Environment.TICKER_DISABLE,
                market : {
                    last : 0,
                    buy : 0,
                    sell : 0,
                    update : new Date()
                },
                previousMarket : {
                    last : 0,
                    buy : 0,
                    sell : 0,
                    update : new Date()
                }
            }
        }

    });

    return Ticker;
});
