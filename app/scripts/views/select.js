define([
    'jquery',
    'backbone',
    'underscore',
    'events',
    'text!templates/select.html'
],function($,Backbone,_,Events,selectTemplate){

    var select = Backbone.View.extend({
        //el: $('#exchangers-box'),
        el: '#exchangers-box',
        template : _.template(selectTemplate),

        initialize: function() {
            this.listenTo(this.collection,'reset',this.render);
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
                Events.trigger('coinspider-add-ticker',obj.selected);
                debug.debug("New Ticker Added " + obj.selected);
            }else if (obj.deselected !== undefined) {
                Events.trigger('coinspider-remove-ticker',obj.deselected);
                debug.debug("New Ticker Removed " + obj.deselected);
            }




            //la coleccion debe escuchar por cambios y deberia actualizar la collecion

            //se deberia


            //Y luego invocar un evento que va actualizar otra collecion...
            //Esa otra collecions esta en una vista encargada de pintar la tabla.
            //La invocacion del evento es en base a esta otra web
            //http://lostechies.com/derickbailey/2011/07/19/references-routing-and-the-event-aggregator-coordinating-views-in-backbone-js/

            //Se supone entonces que al quitar o reponer elementos de esa lista
            //la tabla se renderizara de acorde a esto. La tabla y la vista tienen que estar sincronizadas
            //siguiendo las indicaciones de esta web
            //PARTE 1 - HAZLO AHORA : http://liquidmedia.org/blog/2011/02/backbone-js-part-3/
            //PARTE 2 - HAZ LA OTRA VISTA DEL CONTADOR -
            //PARTE 3 - HAZ LA VISTA PARA CONFIGURACION. NUMERO DE SEGUNDOS. VALORES DE PORCENTAJE PARA AVISAR.
        }

        //Tiene que existir una vista que se encarga del contador
        //El contador leera los elementos seleccionados de la select
        //y actualizara los valores en el localstorage

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
