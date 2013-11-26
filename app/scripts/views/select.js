define([
    'jquery',
    'backbone',
    'underscore',
    'text!templates/select.html'
],function($,Backbone,_,selectTemplate){

    var select = Backbone.View.extend({
        //el: $('#exchangers-box'),
        el: '#exchangers-box',
        template : _.template(selectTemplate),

        initialize: function() {
            this.listenTo(this.collection,'reset',this.render);
            debug.debug("Initialized SelectView");
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
        }

        //TODOS
        // SI EN LOS PROVIDERS ESTA DEFINIDO, SE ACTIVA POR DEFECTO EN LA SELECT
        // CUANDO UN ELEMENTO SE SELECCIONA/DESELECCIONA COPIARLO A OTRA LISTA, ESTA OTRA LISTA
        // DEBE ESTAR SYNCRONIZADA CON LA TABLA PARA AGREGAR O QUITAR LA INFORMACION DEL PROVEEDOR
        // COMO PARTE DE LA IMPLEMENTACION DE LA TABLA DEBE JUGAR CON COLORCITOS Y EFECTO JAVASCRIPTS

        //TIENE QUE EXISTIR LUEGO UN TIMER QUE....ACTUALIZE LA INFORMACION EN LOCALSTORAGE Y AVISAR A LA OTRA
        //COLLECCION QUE DEBE ACTUALIZAR...



    });

    return select;

});
