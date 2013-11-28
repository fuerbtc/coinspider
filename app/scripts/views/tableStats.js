define([
    'jquery',
    'backbone',
    'underscore',
    'collections/tickers',
    'events',
    'utils/environment',
    'text!templates/table.html',
], function($,Backbone,_,TickerClass,Events,Environment,tableTemplate){

    var row = Backbone.View.extend({
        tagName : 'tr',
        className : 'row',

        initialize : function() {
            if (this.model === undefined){
                throw new Error("No model attached to this row");
            }

            this.model.on("change:date",this.render);
            debug.debug("Initialized RowView");
        },

        render : function() {
            debug.debug("Renderizo los datos al actualizarse este modelo " + this.model.get('name') + ": " + this.model.get('last'));
        }
    });


    var table = Backbone.View.extend({
        el : '#exchangers-stats',

        initialize : function(){
            _(this).bindAll('add', 'remove', 'boot');
            this.rowViewClass = row;
            this._rowViews = [];

            this.collection.each(this.boot);

            Events.on('coinspider-add-ticker',this.add);
            Events.on('coinspider-remove-ticker',this.remove);

            debug.debug("Initialized TableView");
        },



        add : function(id) {
            debug.debug("Añadida la fila");
            var ticker = this.collection.get(id);

            if (ticker !== undefined){
                var rowView = new this.rowViewClass({
                    model : ticker
                });

                this._rowViews.push(rowView);

                if (this._rendered) {
                    debug.debug("Printing row inside table");
                    //$(this.el).append(rowView.render().el);
                }
            }

        },

        remove : function(id) {
            debug.debug("Removida la fila");
            var ticker = this.collection.get(id);

            if (ticker !== undefined){
                var viewToRemove = _(this._rowViews).select(function(cv) { return cv.model === ticker; })[0];
                this._rowViews = _(this._rowViews).without(viewToRemove);

                if (this._rendered) {
                    debug.debug("Removing row inside table");
                    //$(viewToRemove.el).remove();
                }
            }
        },

        boot : function (model){
            if (model.get('status')){
                this.add(model.get('id'));
            }
        },

        render : function() {
            //When collection is empty. show Jumbotron
            if (this.collection.length <= 0 ){
                this.$el.find('.jumbotron').fadeIn('slow');
            }

            var that = this;
            this._rendered = true;

//            $(this.el).empty();

//            _(this._rowViews).each(function(childView) {
//                $(that.el).append(childView.render().el);
//            });

            return this;
        }
    });

    return table;
});
