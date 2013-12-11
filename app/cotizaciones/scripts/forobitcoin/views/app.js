define([
    'jquery',
    'underscore',
    'backbone',
    'vm',
    'forobitcoin/env',
    'forobitcoin/views/table',
], function($, _, Backbone,Vm, Env,TableView){

    var AppView = Backbone.View.extend({
        initialize: function(){
            if (this.options.tickers === undefined){
                throw new Error("[AppView] No tickers found");
            }
        },

        render : function() {
            var me = this;

            debug.debug("[AppView] Loading Views");
            var tableStats =  Vm.create(me,'TableView',TableView,{collection: this.options.tickers});
        }
    });

    return AppView;
});
