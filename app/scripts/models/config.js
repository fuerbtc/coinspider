/**
 * Configuration Class
 */
define(['backbone','utils/environment'],function(Backbone,Env){

    var Config = Backbone.Model.extend ({
        defaults: function() {
            //Default Configuration Values
            var standard = {};

            standard[Env.PROPERTY_ID] = Env.INSTANCE_CONFIG;
            standard[Env.PROPERTY_CONFIG_REFRESH_TIMER] = Env.DEFAULT_REFRESH_TIME;
            standard[Env.PROPERTY_CONFIG_ALERT_UP] = Env.DEFAULT_ALERT_UP_PERCENT;
            standard[Env.PROPERTY_CONFIG_ALERT_DOWN] = Env.DEFAULT_ALERT_DOWN_PERCENT;
            standard[Env.PROPERTY_CONFIG_VERSION] = Env.DEFAULT_VALUE;
            standard[Env.PROPERTY_CONFIG_ENABLE_LOG] = Env.LOG_DISABLE;
            standard[Env.PROPERTY_CONFIG_ENABLE_MESSAGE_COUNTER] = Environment.DEFAULT_ENABLE_MESSAGE_COUNTER;

            standard[Env.PROPERTY_CONFIG_RATES] = {
                USDEUR : 0.728,
                EURUSD : 1.373,
                EURCNY : 8.336,
                CNYUSD : 6.071,
                CNYUSD : 0.165,
                CNYEUR : 0.120
            }

            standard[Env.PROPERTY_CONFIG_RATES_UPDATE] = Env.DEFAULT_VALUE;

            return standard;
        }
    });

    return Config;
});
