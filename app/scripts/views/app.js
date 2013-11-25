define([
    'jquery',
    'underscore',
    'backbone',
    'vm',
    'views/select'
], function($, _, Backbone,Vm,selectView){

    var AppView = Backbone.View.extends({
        el : $('exchangersPanel'),

        initialize: function(){

        },

        render : function() {
            var me = this;
            var selectView = Vm.create(me,'SelectView',selectView);
        }



         //Ver la parte donde se invoca a otros cachos de views. A partir de linea 22
        //https://github.com/thomasdavis/backboneboilerplate/blob/gh-pages/js/views/app.js

        //Concepto para actualizar la view
        //http://stackoverflow.com/questions/8731915/binding-render-callback-in-backbone-js

        //Buen tutorial que se puede tomar como aproach
        //Para crear una coleccion de Tickers y asociarlos a las filas de una columna.
        //http://liquidmedia.org/blog/2011/02/backbone-js-part-3/

        //Luego supongo que hay que crear una funcion que actualize el modelo y juegue con los colores.

        //Aqui se tiene que tener una coleccion. Esa coleccion se popula un select
        //Los elementos seleccionados pasan a la tabla

        //Cuando el modelo se actualiza deberia actualizar la tabla


        //Ejemplos
        //http://rotundasoftware.github.io/backbone.collectionView/

        //Trabajando con listas
        //http://dailyjs.com/2013/01/03/backbone-tutorial-6/

        //Si pillas una idea de actualizacion dinamica
        //http://jsfiddle.net/CoryDanielson/phw4t/6/



    });

});
