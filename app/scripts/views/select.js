define([
    'jquery',
    'backbone',
    'underscore',
    'events',
    'utils/environment',
    'text!templates/select.html'
],function($,Backbone,_,Events,Environment,selectTemplate){

    var select = Backbone.View.extend({
        //el: $('#exchangers-box'),
        el: '#exchangers-box',
        template : _.template(selectTemplate),

        initialize: function() {
            if (this.collection.getEnables().length <= 0 ){
                debug.debug("[SelectView] Triggering EVENT_STOP_TIMER - No Tickers Enabled");
                Events.trigger(Environment.EVENT_STOP_TIMER);
            }else {
                debug.debug("[SelectView] Triggering EVENT_START_TIMER - Tickers Enabled");
                Events.trigger(Environment.EVENT_START_TIMER);
            }

            debug.debug("[SelectView] Initialized SelectView");
        },

        events : {
          'change #exchangers' : 'onChangeSelect'
        },

        render: function() {
            this.$el.html(this.template({ tickers: this.collection.toJSON() }));

            //Una vez renderizado, invoco al Plugin Jquery Chosen
            /*-- Chosen --*/
            $(".ch-select").chosen();
            $(".ch-select-deselect").chosen({
                allow_single_deselect: true
            });
            /*-- End Chose --*/
            debug.debug('[SelectView] Rendered SelectView');
            return this;
        },

        onChangeSelect : function (event, obj) {
            debug.debug("[SelectView] Select Change Event");

            //Detecto si select o deselect elemento del select
            if (obj.selected !== undefined){ //selected
                debug.debug("[SelectView] Ticker " + obj.selected + " selected ");
                if (this.collection.getEnables().length == 0){
                    //Por defecto el timer siempre esta desactivado
                    //Por lo tanto si es la primera vez desde aqui activo el Timer
                    debug.debug("[SelectView] Triggering EVENT_START_TIMER - First time ticker enabled");
                    Events.trigger(Environment.EVENT_START_TIMER);
                }
                debug.debug("[SelectView] Triggering EVENT_ENABLE_TICKER - Calling sync to enable " + obj.selected);
                Events.trigger(Environment.EVENT_ENABLE_TICKER,obj.selected);
            }else if (obj.deselected !== undefined) {
                debug.debug("Ticker Disabled " + obj.deselected);
                if (this.collection.getEnables().length == 1){
                    //Al haber solo 1, el timer se desactiva
                    debug.debug("[SelectView] Triggering EVENT_STOP_TIMER - Last ticker disabled");
                    Events.trigger(Environment.EVENT_STOP_TIMER);
                }
                debug.debug("[SelectView] Triggering EVENT_DISABLE_TICKER - Calling sync to disable " + obj.deselected);
                Events.trigger(Environment.EVENT_DISABLE_TICKER,obj.deselected);
            }
        }
    });

    return select;

});
