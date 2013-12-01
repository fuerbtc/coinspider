/**  Config Collection Class **
 */

define(['backbone','utils/environment','models/config','localStorage'],function(Backbone,Environment,ConfigClass){
    var Configs = Backbone.Collection.extend({
        model: ConfigClass,
        localStorage: new Backbone.LocalStorage(Environment.STORAGE_CONFIG)
    });

    return Configs;
});

