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

            _(this).bindAll('applyTransition');
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

            var attributes = {};
            var market = this.model.get(Env.PROPERTY_TICKER_MARKET);
            var previous = this.model.get(Env.PROPERTY_TICKER_PREVIOUS_MARKET);
            var alertUp = Env.DEFAULT_ALERT_UP_RATE;
            var alertDown = Env.DEFAULT_ALERT_DOWN_RATE;

            var getCss = function(current, previous){
                var percentage = ((current - previous) / 100).toFixed(Env.DEFAULT_SCALE_DECIMAL);
                var alert = {
                    cssPrice : "",
                    cssAlert : "",
                    percentage : percentage
                };

                var absPercentage = Math.abs(percentage);

                if (absPercentage >= -Env.DEFAULT_NORMAL_RATE && absPercentage <= Env.DEFAULT_NORMAL_RATE){
                    alert.cssPrice = Env.CSS_NORMAL;
                } else {
                    alert.cssPrice = current > previous ? Env.CSS_SUCCESS : Env.CSS_ERROR;

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


            attributes.last = getFormattedNumber(market[Env.PROPERTY_TICKER_LAST]);
            attributes.buy = getFormattedNumber(market[Env.PROPERTY_TICKER_BUY]);
            attributes.sell = getFormattedNumber(market[Env.PROPERTY_TICKER_SELL]);
            //attributes.update = market[Env.PROPERTY_TICKER_UPDATE];
            //attributes.volume = getFormattedNumber(market[Env.PROPERTY_TICKER_VOLUME]);
            //attributes.name = this.model.get(Env.PROPERTY_TICKER_NAME);
            //attributes.iconUrl = this.model.get(Env.PROPERTY_TICKER_ICON_URL);
            //attributes.siteUrl = this.model.get(Env.PROPERTY_TICKER_SITE_URL);
            attributes.currency = this.model.get(Env.PROPERTY_TICKER_CURRENCY);
            attributes.symbol = this.model.get(Env.PROPERTY_TICKER_SYMBOL);

            attributes.css = {
                'last' : getCss(market[Env.PROPERTY_TICKER_LAST],previous[Env.PROPERTY_TICKER_LAST]),
                'buy' : getCss(market[Env.PROPERTY_TICKER_BUY],previous[Env.PROPERTY_TICKER_BUY]),
                'sell' : getCss(market[Env.PROPERTY_TICKER_SELL],previous[Env.PROPERTY_TICKER_SELL])
            };

            return attributes;
        },

        applyTransition: function(){
            //APLICO TRANSICION
        }

    });


    var table = Backbone.View.extend({
        el : '#exchangers-stats',

        initialize : function(){
            _(this).bindAll('add', 'remove', 'boot');
            this.columnViewClass = column;
            this._columnViews = [];

            this.collection.each(this.boot);

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
                    debug.debug("[TableView] Adding column ");
                    //$(this.el).find('#exchangers-table tbody').append(column.render().el);
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
            var me = this;
            //When collection is empty. show Jumbotron
            var $table = me.$el.find('#exchangers-table');
            $table.fadeIn('slow');
            me._rendered = true;

            var $body = $table.find('tbody');
            $body.empty();

            _(me._columnViews).each(function(childView) {
                $body.append(childView.render().el);
            });

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