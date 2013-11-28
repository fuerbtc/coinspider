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
                last : 0,
                buy : 0,
                sell : 0,
                date : new Date(),
                status : Environment.TICKER_DISABLED,

                // La funcion adapter siempre devolver un objeto de estas caracteristicas:
                // {
                //    last : 0,
                //    buy : 0,
                //    sell : 0,
                //    time : new Date(),
                // }
                adapter : function(data) { return {}}
            }
        }

    });

    return Ticker;
});
