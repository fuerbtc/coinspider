/** Ticker Interface **/

define(['backbone'],function(Backbone){

    var Ticker = Backbone.Model.extend({
        defaults: function() {
            return {
                iconUrl : 'https://github.com/bitcoin/bitcoin/raw/master/share/pixmaps/bitcoin.ico',
                name : 'Empty Exchange',
                last : 0,
                buy : 0,
                sell : 0,
                date : new Date(),
                siteUrl: ''
            }
        },

        update : function(){
            return false;
        }
    });

    return Ticker;
});
