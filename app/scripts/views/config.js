define([
    'jquery',
    'backbone',
    'underscore',
    'events',
    'utils/environment',
    'nouislider'
], function($,Backbone,_,Events,Environment){

    var config = Backbone.View.extend({

        el : '#configAction',

        initialize : function (){
            if (this.model == null){
                throw new Error("[ConfigView] No configuration loaded");
            }

            _(this).bindAll('save','onChangeLogSwitch','onChangeCounterSwitch');

            var model = this.model;
            var me = this;

            //Initialize UiSlider
            //Para Refresco
            $('#refreshTimer_Slider').noUiSlider({
                range: [10, 60]
                ,start: model.get('refreshTimer')
                ,step: 5
                ,handles: 1
                ,serialization: {
                    to: [ $("#refreshTimerStatus"), 'html' ],
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

            $('#logSwitch').bind('change',me.onChangeLogSwitch).each(function(){
                this.checked = me.model.get(Environment.PROPERTY_CONFIG_ENABLE_LOG);
            });

            $('#messageCounterSwitch').bind('change',me.onChangeCounterSwitch).each(function(){
                this.checked = me.model.get(Environment.PROPERTY_CONFIG_ENABLE_MESSAGE_COUNTER);
            });

            debug.debug("[ConfigView] Initialized ConfigView");
        },

        events : {
            'click' : 'render'
        },

        render : function(){
            $('#configModal').modal();
            debug.debug("[ConfigView] Rendered ConfigView");
            return this;
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

            this.model.save(propertyName, value);
            debug.debug ("[ConfigView] Updated config property " + propertyName + " [" + value + "]");

            //Si es necesario se lanza, pero las vistas deben tener acceso al modelo de configuracion
            //y escuchar cuando se actualiza alguna propiedad
            //Events.trigger('coinspider-update-config');
        },

        onChangeLogSwitch : function(event){
            debug.debug("[ConfigView] - OnChange Set Log Level")

            var me = this;
            var setLog = function(level){
                var toSave = {};
                toSave[Environment.PROPERTY_CONFIG_ENABLE_LOG] = level;
                me.model.save(toSave);
                debug.debug('[ConfigView] - Saved log level: ' + level);
                debug.setLevel(level);
            }

            if (event.target !== undefined){
                if (event.target.checked){
                    setLog(Environment.LOG_ENABLE);
                }else {
                    setLog(Environment.LOG_DISABLE);
                }
            }
        },

        onChangeCounterSwitch : function(event){
            debug.debug("[ConfigView] - OnChange Set Message Counter")
            if (event.target !== undefined){
                var toSave = {};
                var value = event.target.checked;
                toSave[Environment.PROPERTY_CONFIG_ENABLE_MESSAGE_COUNTER] = value;
                this.model.save(toSave);
                debug.debug('[ConfigView] - Saved Disabled message counter: ' + value);
                //Al guardarse esta propiedad , en el timer se esta escuchando por este cambio
                //para activar / desactivar el div del mensaje
            }
        }
    });

    return config;
});
