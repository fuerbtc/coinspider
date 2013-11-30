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
