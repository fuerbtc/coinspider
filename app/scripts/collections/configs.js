/**  Config Collection Class **
 */

define(['backbone','models/config','localStorage'],function(Backbone,ConfigClass){
    var Configs = Backbone.Collection.extend({
        model: ConfigClass,
        localStorage: new Backbone.LocalStorage("bitcoins-board-config")
    });

    return Configs;
});

