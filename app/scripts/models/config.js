/**
 * Configuration Class
 */
define(['backbone','utils/environment'],function(Backbone,Environment){

    var Config = Backbone.Model.extend ({
        defaults: function() {
            return {
                id : Environment.INSTANCE_CONFIG,
                refreshTimer : Environment.DEFAULT_REFRESH_TIME,
                alertUp : Environment.DEFAULT_ALERT_UP_PERCENT,
                alertDown : Environment.DEFAULT_ALERT_DOWN_PERCENT
            }
        }
    });

    return Config;
});
