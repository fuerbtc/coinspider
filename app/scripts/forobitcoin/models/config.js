define(['backbone','forobitcoin/env'],function(Backbone,Env){

    var Config = Backbone.Model.extend({

        defaults : function () {
            return {
                version : 0,
                rates : {
                    USDEUR : 0.729,
                    EURUSD : 1.372,
                    CNYEUR : 0.165
                }
            }
        }
    });

    return Config;
});
