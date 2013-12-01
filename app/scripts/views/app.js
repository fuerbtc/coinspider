define([
    'jquery',
    'underscore',
    'backbone',
    'vm',
    'utils/environment',
    'views/select',
    'views/tableStats',
    'views/config',
    'views/timer'
], function($, _, Backbone,Vm, Environment,SelectView,TableStatsView,ConfigView,TimerView){

    var AppView = Backbone.View.extend({
        el : $('#exchangersPanel'),

        initialize: function(){
            if (this.options.configuration === undefined){
                throw new Error("[AppView] No configuration found");
            }
            if (this.options.tickers === undefined){
                throw new Error("[AppView] No providers found");
            }
        },

        render : function() {
            var me = this;

            debug.debug("[AppView] Loading Views");
            var config =this.options.configuration.get(Environment.INSTANCE_CONFIG);
            var configView = Vm.create(me,'ConfigView',ConfigView,{model : config} );
            //No se renderiza ConfigView porque es el usuario que debe pulsar en el boton de

            var timerView = Vm.create(me,'TimerView', TimerView,{model : config} );
            timerView.render();

            var selectView = Vm.create(me,'SelectView',SelectView, {collection: this.options.tickers});
            selectView.render();

            var tableStats =  Vm.create(me,'TableStatsView',TableStatsView,{collection: this.options.tickers, config: config});
            tableStats.render();
        }
    });

    return AppView;
});
