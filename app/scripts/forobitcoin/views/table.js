define([
    'jquery',
    'backbone',
    'underscore',
    'events',
    'forobitcoin/env',
    'text!forobitcoin/templates/column.html',
], function($,Backbone,_,Events,Env,ColumnTemplate){

    var column = Backbone.View.extend({
        tagName : 'td',
        template: _.template(ColumnTemplate),


        initialize : function() {
            if (this.model === undefined){
                throw new Error("[ColumnView] No model attached to this column");
            }

            this.model.on("change:market",this.render,this);

            debug.debug("[ColumnView] Initialized ColumnView");
        },

        render: function() {
            this.el.id = "column-" + this.model.getName();
            this.$el.html(this.template({ticker : this.properties()}));

            //Aplico funcion para transicion
//            var me = this;
//            setTimeout(function(){
//                me.applyTransition();
//            },1000);

            return this;
        },

        properties : function(){
            var getPercentage = function (current, previous){
                var result = 0;
                if (previous > 0){
                    result = (((current - previous) / previous)*100).toFixed(Env.DEFAULT_SCALE_DECIMAL);
                }

                return result;
            }
            var getCss = function(current, previous){

                var percentage = getPercentage(current,previous);
                var absPercentage = Math.abs(percentage);

                if (absPercentage > 1000){ //Una medida cautelar ante porcentajes muy grandfes
                    percentage = 0;
                    absPercentage = 0;
                }

                var alert = {
                    price : "",
                    alert : "",
                    percentage : percentage
                };




                if (absPercentage >= -Env.DEFAULT_NORMAL_RATE && absPercentage <= Env.DEFAULT_NORMAL_RATE){
                    alert.cssPrice = Env.CSS_NORMAL;
                } else {
                    alert.cssPrice = current >= previous ? Env.CSS_SUCCESS : Env.CSS_ERROR;

                    if (percentage < Env.DEFAULT_NORMAL_RATE && absPercentage > alertDown ){
                        alert.cssAlert = "down";
                    }else if (percentage > Env.DEFAULT_NORMAL_RATE && absPercentage > alertUp) {
                        alert.cssAlert = "up";
                    }
                }
                return alert;
            }

            var getFormattedNumber = function(val){
                return parseFloat(val).toFixed(Env.DEFAULT_SCALE_DECIMAL);
            }

            var alertUp = Env.DEFAULT_ALERT_UP_RATE;
            var alertDown = Env.DEFAULT_ALERT_DOWN_RATE;

            var attributes = {};
            attributes.name = this.model.get(Env.PROPERTY_TICKER_NAME);
            attributes.symbol = this.model.get(Env.PROPERTY_TICKER_SYMBOL);
            attributes.iconUrl = this.model.get(Env.PROPERTY_TICKER_ICON_URL);

            var markets = this.model.get(Env.PROPERTY_TICKER_MARKETS);
            attributes.markets = {};

            for (var currency in markets) {
                if (markets.hasOwnProperty(currency)) {
                    var currencyObj = {};
                    currencyObj[Env.PROPERTY_TICKER_LAST] = getFormattedNumber(markets[currency][Env.PROPERTY_TICKER_CURRENT_MARKET][Env.PROPERTY_TICKER_LAST]);

                    var cssObj = getCss(markets[currency][Env.PROPERTY_TICKER_CURRENT_MARKET][Env.PROPERTY_TICKER_LAST],markets[currency][Env.PROPERTY_TICKER_PREVIOUS_MARKET][Env.PROPERTY_TICKER_LAST]);
                    currencyObj['css'] = cssObj;
                    attributes.markets[currency] = currencyObj;
                }
            }

            return attributes;
        },

        applyTransition: function(){
            //APLICO TRANSICION
        }

    });


    var table = Backbone.View.extend({
        el : '#exchangersTable',

        initialize : function(){
            _(this).bindAll('add', 'remove');
            this.columnViewClass = column;
            this._columnViews = [];

            this.collection.each(this.add);

            this.listenTo(this.collection,"change",this.onChangeModel);

            debug.debug("[TableView] Initialized TableView");
        },

        add : function(model) {
            var ticker  = {};
            if (model instanceof Object){
                ticker = model;
            }else {
                ticker = this.collection.get(model);
            }

            if (ticker !== undefined){
                var columnView = new this.columnViewClass({
                    model : ticker
                });

                this._columnViews.push(columnView);

                if (this._rendered) {
                    debug.debug("[TableView] Adding column inside table ");
                    $(this.el).find('#dynamicBody tr').append(columnView.render().el);
                }else {
                    this.render();
                }
            }

        },

        remove : function(model) {
            var ticker  = {};
            if (model instanceof Object){
                ticker = model;
            }else {
                ticker = this.collection.get(model);
            }

            if (ticker !== undefined){
                var viewToRemove = _(this._columnViews).select(function(cv) { return cv.model === ticker; })[0];
                this._columnViews = _(this._columnViews).without(viewToRemove);

                if (this._rendered) {
                    debug.debug("[TableView] Removing column inside table");
                    $(viewToRemove.el).remove();

                    if (this._columnViews.length <= 0){
                        this.render();
                    }
                }
            }
        },

        render : function() {
            var $row = this.$el.find('#dynamicBody tr');
            $row.empty();

            _(this._columnViews).each(function(childView) {
                $row.append(childView.render().el);
            });

            this._rendered = true;

            return this;
        },

        onChangeModel : function (elem){
            debug.debug("[TableView] Model Updated")
            if (elem.changed.status !== undefined){
                if (elem.changed.status){
                    debug.debug("[TableView] Adding to table");
                    this.add(elem);
                }else {
                    debug.debug("[TableView] Removing from table");
                    this.remove(elem);
                }
            }
        }
    });

    return table;
});