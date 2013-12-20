define([
    'jquery',
    'backbone',
    'utils/environment'
],function($,Backbone, Environment){

    var DoMath = Backbone.Model.extend({

        initialize : function(){

        },

        percentage : function (current, previous){
            var result = 0;
            if (isNumber(current) && isNumber(previous) && previous > 0){
                result = (((current - previous) / previous)*100).toFixed(Environment.DEFAULT_SCALE_DECIMAL);
            }

            return result;
        }
    });

    return DoMath;




});