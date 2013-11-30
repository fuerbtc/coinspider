/*
 * JavaScript Debug - v0.4 - 6/22/2010
 * http://benalman.com/projects/javascript-debug-console-log/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 *
 * With lots of help from Paul Irish!
 * http://paulirish.com/
 */
window.debug=(function(){var i=this,b=Array.prototype.slice,d=i.console,h={},f,g,m=9,c=["error","warn","info","debug","log"],l="assert clear count dir dirxml exception group groupCollapsed groupEnd profile profileEnd table time timeEnd trace".split(" "),j=l.length,a=[];while(--j>=0){(function(n){h[n]=function(){m!==0&&d&&d[n]&&d[n].apply(d,arguments)}})(l[j])}j=c.length;while(--j>=0){(function(n,o){h[o]=function(){var q=b.call(arguments),p=[o].concat(q);a.push(p);e(p);if(!d||!k(n)){return}d.firebug?d[o].apply(i,q):d[o]?d[o](q):d.log(q)}})(j,c[j])}function e(n){if(f&&(g||!d||!d.log)){f.apply(i,n)}}h.setLevel=function(n){m=typeof n==="number"?n:9};function k(n){return m>0?m>n:c.length+m<=n}h.setCallback=function(){var o=b.call(arguments),n=a.length,p=n;f=o.shift()||null;g=typeof o[0]==="boolean"?o.shift():false;p-=typeof o[0]==="number"?o.shift():n;while(p<n){e(a[p++])}};return h})();

/**
 * Require.js Configuration
 */
require.config({

    baseUrl: 'scripts',

    paths: {
        jquery: ['//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min','vendor/jquery-1.10.2.min'],
        backbone: ['//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min','vendor/backbone-1.0.0.min'],
        underscore: ['//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min','vendor/underscore-1.5.2.min'],
        chosen: ['//cdnjs.cloudflare.com/ajax/libs/chosen/1.0/chosen.jquery.min', 'vendor/jquery-chosen-1.0.min'],
        bootstrap : ['//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.0.2/js/bootstrap.min', 'vendor/bootstrap-3.0.2.min'],
        localStorage : ['//cdnjs.cloudflare.com/ajax/libs/backbone-localstorage.js/1.1.0/backbone.localStorage-min','vendor/backbone.localStorage-1.1.7.min'],
        crossdomain : 'vendor/jquery-xdomainajax-0.11',
        nouislider : ['//cdnjs.cloudflare.com/ajax/libs/noUiSlider/4.3.0/jquery.nouislider.min','vendor/jquery-nouislider-4.3.0.min'],
        //'requirejs-i18n': '../bower_components/requirejs-i18n/i18n',
        'text': ['//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.10/text.min','vendor/require-text-2.0.10.min']
        //requirejs: '../bower_components/requirejs/require',
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        chosen : ['jquery'],
        crossdomain : ['jquery'],
        nouislider :  ['jquery'],
        bootstrap : {
            deps : ['jquery']
        }
    }
});

require(['jquery',
    'domReady',
    'views/app',
    'vm',
    'utils/sync'],
    function ($,dom,AppView,Vm,Sync) {
        'use strict';

        debug.debug('Running CoinSpider');
        $(document).ready(function(){
            dom.ready($);
            debug.debug('Loaded DOM features');

            Sync.init();
            var config = Sync.getConfiguration();
            var tickerList = Sync.getTickers();

            debug.debug('Loaded information about providers');

            var appView = Vm.create({}, 'AppView', AppView, {configuration: config, tickers: tickerList});
            appView.render();
            //Router.initialize({appView: appView});  // The router now has a copy of all main appview
            debug.debug('Loaded Backbone Engine');
        });
});
