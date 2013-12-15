/**  Config Collection Class **
 */

define(['backbone',
    'underscore',
    'utils/environment',
    'models/config',
    'localStorage'
],function(Backbone,_,Env,ConfigClass){

    var Configs = Backbone.Collection.extend({
        model: ConfigClass,

        initialize : function() {
            if (_.undefined(this.options[Env.PROPERTY_STORAGE])){
                this.localStorage =  new Backbone.LocalStorage(Env.STORAGE_CONFIG);
            }else {
                this.localStorage = new Backbone.LocalStorage(this.options[Env.PROPERTY_STORAGE]);
            }
        }
    });

    return Configs;
});

