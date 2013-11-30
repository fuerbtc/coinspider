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
//            if (this.model == null){
//                throw new Error("No configuration loaded");
//            }
            //Initialize UiSlider
            //Para Refresco
            $('#refreshSlider').noUiSlider({
                range: [10, 60]
                ,start: 15
                ,step: 5
                ,handles: 1
                ,serialization: {
                    to: [ $("#refreshTimeStatus"), 'html' ],
                    resolution : 1
                }
            });

            $('#alertUpSlider').noUiSlider({
                range: [0, 20]
                ,start: 5
                ,step: 1
                ,handles: 1
                ,serialization: {
                    to: [ $("#alertUpStatus"), 'html' ] ,
                    resolution : 1
                }
            });

            $('#alertDownSlider').noUiSlider({
                range: [0, 20]
                ,start: 5
                ,step: 1
                ,handles: 1
                ,serialization: {
                    to: [ $("#alertDownStatus"), 'html' ],
                    resolution : 1
                }
            })
        },

        events : {
            'click' : 'render'
        },

        render : function(){
            $('#configModal').modal();
        }
    });

    return config;
});
