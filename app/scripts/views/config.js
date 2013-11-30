define([
    'jquery',
    'backbone',
    'underscore',
    'events',
    'nouislider'
], function($,Backbone,_,ConfigClass,Events){

    var config = Backbone.View.extend({

        el : '#configAction',

        initialize : function (){
            if (this.model == null){
                throw new Error("No configuration loaded");
            }

            _(this).bindAll('save');

            var model = this.model;
            var me = this;

            //Initialize UiSlider
            //Para Refresco
            $('#refreshTime_Slider').noUiSlider({
                range: [10, 60]
                ,start: model.get('refreshTime')
                ,step: 5
                ,handles: 1
                ,serialization: {
                    to: [ $("#refreshTimeStatus"), 'html' ],
                    resolution : 1
                }
            }).change (me.save);

            $('#alertUp_Slider').noUiSlider({
                range: [0, 20]
                ,start: model.get('alertUp')
                ,step: 1
                ,handles: 1
                ,serialization: {
                    to: [ $("#alertUpStatus"), 'html' ] ,
                    resolution : 1
                }
            }).change (me.save);

            $('#alertDown_Slider').noUiSlider({
                range: [0, 20]
                ,start: model.get('alertDown')
                ,step: 1
                ,handles: 1
                ,serialization: {
                    to: [ $("#alertDownStatus"), 'html' ],
                    resolution : 1
                }
            }).change (me.save);

            debug.debug("Initialized ConfigView");
        },

        events : {
            'click' : 'render'
        },

        render : function(){
            $('#configModal').modal();
        },

        save : function(event){

            if(event.target === undefined){
                return; //exit with nothing
            }

            //El elemento dom debe cumplir con la regla:
            //El identificador debe llamarse igual a la propiedad en el modelo
            //pero debe incluirse el caracter '_' para avisar a este algoritmo dinamico
            // hasta donde debe leer
            var $elem = $(event.target);
            var id = $elem.attr('id');
            var value = $elem.val(); // En base al plugin UISlider invocar val obtienes el valor del slider
            var propertyName = id != null ? id.split('_')[0] : '';
            debug.debug ("Updating property " + propertyName + " with value " + value);
            this.model.save(propertyName, value);
            debug.debug("Saved! ");
        }
    });

    return config;
});
