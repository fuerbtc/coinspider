define(['jquery','backbone','underscore','text!templates/select.html'],function($,Backbone,_,selectTemplate){

    var select = Backbone.View.extend({
        el: $('#exchangers-box'),
        template : _.template(selectTemplate),

        initialize: function() {
            this.listenTo(this.collection,'reset',this.render)
            this.collection.fetch();
        },
        render: function() {
            this.el.html(this.template({ tickers: this.collection }));

            //Una vez renderizado, invoco al Plugin Jquery Chosen
            /*-- Chosen --*/
            $(".ch-select").chosen();
            $(".ch-select-deselect").chosen({
                allow_single_deselect: true
            });
            /*-- End Chose --*/
        }
    });

    return select;

});
