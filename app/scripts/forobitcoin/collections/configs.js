/**  Config Collection Class **
 */

define(['backbone','forobitcoin/env','forobitcoin/models/config','localStorage'],function(Backbone,Env,ConfigClass){
    var Configs = Backbone.Collection.extend({
        model: ConfigClass,
        localStorage: new Backbone.LocalStorage(Env.STORAGE_CONFIG)
    });

    return Configs;
});

