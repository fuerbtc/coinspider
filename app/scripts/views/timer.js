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

        initialize : function(){
            if (this.model === undefined){
                throw new Error("[TimerView] Not configuration founded");
            }

            _(this).bindAll('refresh','updateTimer');
            this.currentTimer = this.getRefreshTimer();

            //Al cambiar la propiedad de la configuracion se debe actualizar el timer
            this.model.on('change:refreshTimer',this.updateTimer, this);

            //Registro de Evento para detener el Timer
            Events.on(Environment.EVENT_STOP_TIMER,this.disableTimer,this);

            //Registro de Evento para iniciar el timer
            Events.on(Environment.EVENT_START_TIMER,this.enableTimer,this);

            //Registro de evento para saber cuando el kernel ha terminado de actualizar
            Events.on(Environment.EVENT_UPDATE_TICKERS_FINISH, this.renderDone,this);

            //Permitir al usuario actualizacion manual
            var me = this;
            $('#refreshAction').bind('click',function(event){
                me.currentTimer = 1;
            });

            debug.debug("[TimerView] Initialized TimerView");
        },

        render : function(){
            this.$el.html(this.template({ time : this.currentTimer }));
            debug.debug("[TimerView] Rendered TimerView");
            return this;
        },

        refresh : function (){
            this.currentTimer--;
            if (this.currentTimer >= 0){
                if(this.currentTimer == 0){
                    debug.debug("[TimerView] stop tick ...");
                    this.renderWorking();
                    //Lanzo el evento!
                    debug.debug("[TimerView] Triggering EVENT_UPDATE_TICKERS");
                    Events.trigger(Environment.EVENT_UPDATE_TICKERS);
                }else {
                    debug.debug("tick ...");
                    window.setTimeout(this.refresh,1000);
                }
                this.render();
            }
        },

        updateTimer : function (){
            this.currentTimer = this.getRefreshTimer();
            debug.debug("[TimerView] - change:refreshTimer - Timer Updated");
        },

        getRefreshTimer : function(){
            return this.model.get('refreshTimer');
        },

        renderWorking: function (){
            $('#refreshAction a').addClass('working').find('i').addClass('animated rotateOut');
        },

        renderDone: function () {
            $('#refreshAction a').removeClass('working').find('i').removeClass('animated rotateOut');
            this.enableTimer();
            debug.debug("[TimerView] - EVENT_UPDATE_TICKERS_FINISH - Timer started again ...");
        },

        disableTimer : function(){
            $('#refreshAction').fadeOut('fast');
            $('#messages').fadeOut('fast');
            this.currentTimer = -15;
            debug.debug("[TimerView] - EVENT_STOP_TIMER - Timer stopped ...");
        },

        enableTimer : function() {
            $('#refreshAction').fadeIn('fast');
            $('#messages').fadeIn('fast');
            this.currentTimer = this.getRefreshTimer();
            window.setTimeout(this.refresh,1000);
            debug.debug("[TimerView] - EVENT_START_TIMER - Timer started ...");
        }
    });

    return timer;
})

