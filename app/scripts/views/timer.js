/**
 * Timer
 */
define([
    'jquery',
    'backbone',
    'underscore',
    'events',
    'utils/environment',
    'text!templates/timer.html'
], function($,Backbone,_,Events,Environment,timerTemplate){
    var timer = Backbone.View.extend({
        el : '#messages',
        template : _.template(timerTemplate),
        currentTimer : Environment.DEFAULT_REFRESH_TIME,


        initialize : function(){ //Evito tener que comprobar si me viene un modelo. Es explicito que se añade o el modelo o la collecion

            if (this.model === undefined){
                throw new Error("Not configuration founded");
            }

            _(this).bindAll('refresh','updateTimer');

            this.currentTimer = this.getRefreshTimer();

            window.setTimeout(this.refresh,1000);
            Events.on('coinspider-update-config',this.updateTimer);
        },

        render : function(){
            this.$el.html(this.template({ time : this.currentTimer }));
        },

        refresh : function (){
            this.currentTimer--;

            if(this.currentTimer <= 0){
                debug.debug("Ejecuto llamadas a providers!!!");
                this.currentTimer = this.getRefreshTimer();
            }
            window.setTimeout(this.refresh,1000);
            this.render()
        },

        updateTimer : function (){
            this.currentTimer = this.getRefreshTimer();
        },

        getRefreshTimer : function(){
            return this.model.get('refreshTimer');
        }


    });

    return timer;
})

