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
                throw new Error("No model attached to this row");
            } else if (this.options.config === undefined){
                throw new Error("No config attached to this row");
            }

            this.model.on("change:update",this.render,this);
            debug.debug("Initialized RowView");
        },

        render: function() {
            this.$el.html(this.template({ticker : this.model.attributes, config: this.options.config.attributes}));
            return this;
        }
    });


    var table = Backbone.View.extend({
        el : '#exchangers-stats',

        initialize : function(){
            _(this).bindAll('add', 'remove', 'boot');
            this.rowViewClass = row;
            this._rowViews = [];

            this.collection.each(this.boot);

            Events.on(Environment.EVENT_ENABLE_TICKER,this.add,this);
            Events.on(Environment.EVENT_DISABLE_TICKER,this.remove,this);

            debug.debug("Initialized TableView");
        },



        add : function(model) {
            debug.debug("Adding row to the table");

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
                    debug.debug("Adding row inside table");
                    $(this.el).find('#exchangers-table tbody').append(rowView.render().el);
                }
            }

        },

        remove : function(model) {
            debug.debug("Removida la fila");
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
                    debug.debug("Removing row inside table");
                    $(viewToRemove.el).remove();
                }
            }
        },

        boot : function (model){
            if (model.get('status')){
                this.add(model);
            }
        },

        render : function() {
            //When collection is empty. show Jumbotron
            if (this.collection.getEnables().length <= 0 ){
                this.$el.find('#exchangers-table').fadeOut('slow');
                this.$el.find('#exchangers-empty').fadeIn('slow');
            }else {
                this.$el.find('#exchangers-empty').fadeOut('slow');
                var $table = this.$el.find('#exchangers-table');
                $table.fadeIn('slow');

                this._rendered = true;

                var $body = $table.find('tbody');
                $body.empty();

                _(this._rowViews).each(function(childView) {
                    $body.append(childView.render().el);
                });
            }
            return this;
        }
    });

    return table;
});
