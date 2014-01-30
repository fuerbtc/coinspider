define([
    'jquery',
    'backbone',
    'underscore',
    'events',
    'forobitcoin/env',
    'text!forobitcoin/templates/row.html',
    'text!forobitcoin/templates/price.html'
], function($,Backbone,_,Events,Env,RowTemplate,PriceTemplate){

    var row = Backbone.View.extend({
        tagName : 'tr',
        className : 'exchangerRow',
        template : _.template(RowTemplate),


        initialize : function() {
            this.templatePrice = _.template(PriceTemplate);
            if (this.model === undefined){
                throw new Error("[RowView] No model attached to this row");
            }

            this.model.on('change:'+Env.PROPERTY_TICKER_UPDATED,this.render,this);

            debug.debug("[RowView] Initialized ColumnView");
        },

        render: function() {
            this.el.id = "row-" + this.model.get(Env.PROPERTY_TICKER_SYMBOL);

            this.$el.html(this.template({ticker : this.properties(), templatePrice : this.templatePrice}));

            //Aplico funcion para transicion
            var me = this;
            setTimeout(function(){
                me.applyTransition();
            },1000);

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

                if (absPercentage > 1000){ //Una medida cautelar ante porcentajes muy grandes
                    percentage = 0;
                    absPercentage = 0;
                }

                var alert = {
                    price : "",
                    alert : "",
                    percentage : percentage
                };

                if (absPercentage >= -Env.DEFAULT_NORMAL_RATE && absPercentage <= Env.DEFAULT_NORMAL_RATE){
                    alert.price = Env.CSS_NORMAL;
                } else {
                    alert.price = current >= previous ? Env.CSS_SUCCESS : Env.CSS_ERROR;

                    if (percentage < Env.DEFAULT_NORMAL_RATE && absPercentage > Env.DEFAULT_ALERT_DOWN_RATE ){
                        alert.alert = "down";
                    }else if (percentage > Env.DEFAULT_NORMAL_RATE && absPercentage > Env.DEFAULT_ALERT_UP_RATE) {
                        alert.alert = "up";
                    }
                }
                return alert;
            }

            var getFormattedNumber = function(val){
                var result = parseFloat(val).toFixed(Env.DEFAULT_SCALE_DECIMAL);

                if (isNaN(result)){
                    debug.debug("[TableView] NaN :" + val);
                    result = -1;
                }
                return result;
            }

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
            $("#row-" + this.model.get(Env.PROPERTY_TICKER_SYMBOL) + " span").each(function(){
                $(this).removeClass(Env.CSS_SUCCESS + " " + Env.CSS_ERROR + " " + Env.CSS_NORMAL);
            });
        }

    });


    var table = Backbone.View.extend({
        el : '#coinspider-table',

        initialize : function(){
            _(this).bindAll('add');

            this.rowViewClass = row;
            this._rowViews = [];
            Events.on('fb-update-done',this.reload,this);

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
                var rowView = new this.rowViewClass({
                    model : ticker
                });

                this._rowViews.push(rowView);
            }

        },

        render : function() {
            var $tbody = this.$el.find('tbody');
            $tbody.empty();

            _(this._rowViews).each(function(childView) {
                $tbody.append(childView.render().el);
            });

            return this;
        },

        reload : function(){

            debug.debug("[TableView] Reloading Exchangers");
            if (this.collection.size() !== this._rowViews.length){
                this._rowViews = []
                this.collection.each(this.add);
            }

            this.render();
        }
    });

    return table;
});