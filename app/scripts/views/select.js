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
            this.listenTo(this.collection,'reset',this.render);

            if (this.collection.getEnables().length <= 0 ){
                Events.trigger(Environment.EVENT_STOP_TIMER);
            }else {
                Events.trigger(Environment.EVENT_START_TIMER);
            }

            debug.debug("Initialized SelectView");
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
        },

        onChangeSelect : function (event, obj) {

            //Detecto si select o deselect elemento del select
            if (obj.selected !== undefined){ //selected
                debug.debug("Ticker Enabled  " + obj.selected);
                if (this.collection.getEnables().length == 0){
                    //Por defecto el timer siempre esta desactivado
                    Events.trigger(Environment.EVENT_START_TIMER);
                }
                Events.trigger(Environment.EVENT_ENABLE_TICKER,obj.selected);
            }else if (obj.deselected !== undefined) {
                debug.debug("Ticker Disabled " + obj.deselected);
                if (this.collection.getEnables().length == 1){
                    //Al haber solo 1, el timer se desactiva
                    Events.trigger(Environment.EVENT_STOP_TIMER);
                }
                Events.trigger(Environment.EVENT_DISABLE_TICKER,obj.deselected);
            }
        }
    });

    return select;

});
