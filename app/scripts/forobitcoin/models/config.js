define(['backbone','forobitcoin/env'],function(Backbone,Env){

    var Config = Backbone.Model.extend({

        defaults : function () {
            return {
                version : 0,
                rates : {
                    USDEUR : 0.726,
                    EURUSD : 1.376,
                    CNYUSD : 0.165,
                    CNYEUR : 0.120
                },
                update : 0
            }
        }
    });

    return Config;
});
