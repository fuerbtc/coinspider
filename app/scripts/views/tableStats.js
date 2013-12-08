define([
    'jquery',
    'backbone',
    'underscore',
    'collections/tickers',
    'events',
    'utils/environment',
    'text!templates/table.html',
    'text!templates/row.html',
], function($,Backbone,_,TickersClass,Events,Environment,tableTemplate,rowTemplate){

    var row = Backbone.View.extend({
        tagName : 'tr',
        template: _.template(rowTemplate),


        initialize : function() {
            if (this.model === undefined){
                throw new Error("[RowView] No model attached to this row");
            } else if (this.options.config === undefined){
                throw new Error("[RowView] No config attached to this row");
            }

            _(this).bindAll('applyTransition');
            this.model.on("change:market",this.render,this);

            debug.debug("[RowView] Initialized RowView");

        },

        render: function() {
            this.el.id = "row-" + this.model.get(Environment.PROPERTY_TICKER_SYMBOL);
            this.$el.html(this.template({ticker : this.properties()}));

            //Aplico funcion para transicion
            var me = this;
            setTimeout(function(){
                me.applyTransition();
            },1000);


            return this;
        },

        properties : function(){

            var attributes = {};
            var market = this.model.get(Environment.PROPERTY_TICKER_MARKET);
            var previous = this.model.get(Environment.PROPERTY_TICKER_PREVIOUS_MARKET);
            var config = this.options.config;
            var alertUp = config.get(Environment.PROPERTY_CONFIG_ALERT_UP);
            var alertDown = config.get(Environment.PROPERTY_CONFIG_ALERT_DOWN);

            var getCss = function(current, previous){
                var percentage = ((current - previous) / 100).toFixed(2);
                var alert = {
                    cssPrice : "",
                    cssAlert : "",
                    percentage : percentage
                };

                if (percentage >= -Environment.DEFAULT_NORMAL_RATE && percentage <= Environment.DEFAULT_NORMAL_RATE){
                    alert.cssPrice = Environment.CSS_NORMAL;
                } else {
                    alert.cssPrice = current > previous ? Environment.CSS_SUCCESS : Environment.CSS_ERROR;

                    if (percentage < Environment.DEFAULT_NORMAL_RATE && Math.abs(percentage) > alertDown ){
                        alert.cssAlert = "down";
                    }else if (percentage > Environment.DEFAULT_NORMAL_RATE && Math.abs(percentage) > alertUp) {
                        alert.cssAlert = "up";
                    }
                }
                return alert;
            }

            attributes.last = market[Environment.PROPERTY_TICKER_LAST];
            attributes.buy = market[Environment.PROPERTY_TICKER_BUY];
            attributes.sell = market[Environment.PROPERTY_TICKER_SELL];
            attributes.update = market[Environment.PROPERTY_TICKER_UPDATE];
            attributes.volume = market[Environment.PROPERTY_TICKER_VOLUME];
            attributes.name = this.model.get(Environment.PROPERTY_TICKER_NAME);
            attributes.iconUrl = this.model.get(Environment.PROPERTY_TICKER_ICON_URL);
            attributes.siteUrl = this.model.get(Environment.PROPERTY_TICKER_SITE_URL);
            attributes.currency = config.get('currency');
            attributes.symbol = this.model.get(Environment.PROPERTY_TICKER_SYMBOL);

            attributes.css = {
                'last' : getCss(market.last,previous.last),
                'buy' : getCss(market.buy,previous.buy),
                'sell' : getCss(market.sell,previous.sell)
            };

            return attributes;
        },

        applyTransition: function(){
            $("#row-"+this.model.get("symbol") + " span").each(function(){
                $(this).removeClass(Environment.CSS_SUCCESS + " " + Environment.CSS_ERROR + " " + Environment.CSS_NORMAL);
            });
        }

    });


    var table = Backbone.View.extend({
        el : '#exchangers-stats',

        initialize : function(){
            _(this).bindAll('add', 'remove', 'boot');
            this.rowViewClass = row;
            this._rowViews = [];

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
                var rowView = new this.rowViewClass({
                    model : ticker,
                    config : this.options.config
                });

                this._rowViews.push(rowView);

                if (this._rendered) {
                    debug.debug("[TableView] Adding row ");
                    $(this.el).find('#exchangers-table tbody').append(rowView.render().el);
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
                var viewToRemove = _(this._rowViews).select(function(cv) { return cv.model === ticker; })[0];
                this._rowViews = _(this._rowViews).without(viewToRemove);

                if (this._rendered) {
                    debug.debug("[TableView] Removing row inside table");
                    $(viewToRemove.el).remove();

                    if (this._rowViews.length <= 0){
                       this.render();
                    }
                }
            }
        },

        boot : function (model){
            if (model.get(Environment.PROPERTY_TICKER_STATUS)){
                this.add(model);
            }
        },

        render : function() {
            var me = this;
            //When collection is empty. show Jumbotron
            if (this.collection.getEnables().length <= 0 ){
                this.$el.find('#exchangers-table').fadeOut('slow',function(){
                    me.$el.find('#exchangers-empty').fadeIn('slow'); //Chaining fadein
                    me._rendered = false;
                });
            }else {
                this.$el.find('#exchangers-empty').fadeOut('slow',function(){
                    var $table = me.$el.find('#exchangers-table');
                    $table.fadeIn('slow');
                    me._rendered = true;

                    var $body = $table.find('tbody');
                    $body.empty();

                    _(me._rowViews).each(function(childView) {
                        $body.append(childView.render().el);
                    });
                });

            }
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