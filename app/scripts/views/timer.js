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
                throw new Error("Not configuration founded");
            }

            _(this).bindAll('refresh','updateTimer');
            this.currentTimer = this.getRefreshTimer();

            this.model.on('change:refreshTimer',this.updateTimer, this);
            Events.on(Environment.EVENT_STOP_TIMER,this.disableTimer,this);
            Events.on(Environment.EVENT_START_TIMER,this.enableTimer,this);
            Events.on(Environment.EVENT_UPDATE_TICKERS_FINISH, this.renderDone,this);
        },

        render : function(){
            this.$el.html(this.template({ time : this.currentTimer }));
        },

        refresh : function (){
            this.currentTimer--;
            if (this.currentTimer >= 0){
                if(this.currentTimer == 0){
                    //Paro la llamada a timeout
                    this.renderWorking();
                    //Lanzo el evento!
                    debug.debug("Refreshing tickers");
                    Events.trigger(Environment.EVENT_UPDATE_TICKERS);
                }else {
                    window.setTimeout(this.refresh,1000);
                }
                debug.debug("Estoy haciendo algo");
                this.render()
            }
        },

        updateTimer : function (){
            this.currentTimer = this.getRefreshTimer();
        },

        getRefreshTimer : function(){
            return this.model.get('refreshTimer');
        },

        renderWorking: function (){
            $('#refreshAction a').addClass('working').find('i').addClass('animated rotateOut');
        },

        renderDone: function () {
            $('#refreshAction a').removeClass('working').find('i').removeClass('animated rotateOut');
            //this.enableTimer();
        },

        disableTimer : function(){
            $('#refreshAction').fadeOut('fast');
            $('#messages').fadeOut('fast');
            this.currentTimer = -15;
        },

        enableTimer : function() {
            $('#refreshAction').fadeIn('fast');
            $('#messages').fadeIn('fast');
            this.currentTimer = this.getRefreshTimer();
            window.setTimeout(this.refresh,1000);
        }
    });

    return timer;
})

