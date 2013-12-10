define(['backbone','forobitcoin/env'],function(Backbone,Env){

    var Ticker = Backbone.Model.extend({
        defaults: function() {
            return {
                name : 'Null Exchange',
                symbol : 'xyz',
                siteUrl: 'http://google.com',
                iconUrl : 'https://github.com/bitcoin/bitcoin/raw/master/share/pixmaps/bitcoin.ico',
                feedUrl : 'http://google.com',
                status : Env.TICKER_ENABLE,
                markets : {
                    USD : {
                        current : {
                            last : 0,
                            buy : 0,
                            sell : 0,
                            volume : 0,
                            update : 0
                        },
                        previous : {
                            last : 0,
                            buy : 0,
                            sell : 0,
                            volume : 0,
                            update : 0
                        }
                    }
                }
            }
        }
    });

    return Ticker;
});
