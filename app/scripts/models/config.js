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
                alertDown : Environment.DEFAULT_ALERT_DOWN_PERCENT,
                currency : Environment.DEFAULT_CURRENCY,
                currency_rate : Environment.DEFAULT_CONVERSION,
                enableMessageCounter : Environment.DEFAULT_ENABLE_MESSAGE_COUNTER,
                enableLog : Environment.LOG_DISABLE
            }
        }
    });

    return Config;
});
