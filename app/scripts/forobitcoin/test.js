define([
    'jquery',
    'backbone',
    'underscore',
    'events',
    'forobitcoin/env',
    'forobitcoin/models/ticker',
    'forobitcoin/collections/tickers',
    'forobitcoin/models/config',
    'forobitcoin/collections/configs'
],function($,Backbone,_,Events,Env,TickerClass,TickersClass,ConfigClass,ConfigsClass){

    var Test = Backbone.Model.extend({

        testNestedModel : function (){
            var ticker = new TickersClass(
                {   id :2,
                    markets : [
                    {
                        currency  : 'USD',
                        current : {
                            last : 1,
                            buy : 1,
                            sell : 1,
                            volume : 1,
                            update : 1
                        },
                        previous : {
                            last : 2,
                            buy : 3,
                            sell : 3,
                            volume : 3,
                            update : 3
                        }
                    }
                ]}
            );

            var collection = new TickersClass();
            collection.create(ticker);

            collection.bind("change:markets",function(){
                debug.debug("Ok de puta madre");
            })

            ticker.save({
                markets : [
                    {
                        currency  : 'USD',
                        current : {
                            last : 1,
                            buy : 1,
                            sell : 1,
                            volume : 1,
                            update : 1
                        },
                        previous : {
                            last : 2,
                            buy : 3,
                            sell : 3,
                            volume : 3,
                            update : 3
                        }
                    },
                    {
                        currency  : 'EUR',
                        current : {
                            last : 1,
                            buy : 1,
                            sell : 1,
                            volume : 1,
                            update : 1
                        },
                        previous : {
                            last : 2,
                            buy : 3,
                            sell : 3,
                            volume : 3,
                            update : 3
                        }
                    }
                    ]
            });
        }
    });

    return Test;

});
