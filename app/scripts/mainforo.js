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
        localStorage : ['//cdnjs.cloudflare.com/ajax/libs/backbone-localstorage.js/1.1.0/backbone.localStorage-min','vendor/backbone.localStorage-1.1.7.min'],
        text: ['//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.10/text.min','vendor/require-text-2.0.10.min'],
        backboneNestedModel : ['vendor/backbone-nested-v1.1.2.min']
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
        backboneNestedModel : {
            deps: [
                'backbone',
            ],
            exports: 'BackboneNestedModel'
        }

    }
});

require(['jquery',
    'vm',
    'forobitcoin/kernel',
    'forobitcoin/views/app'
    ],
    function ($,Vm,Kernel,AppView,Test) {
        'use strict';

        var version = "0.1";
        //Production = 0
        //debug.setLevel(0);

        /**
         * Inicializa configuracion del sistema
         */

        debug.debug("[Main] Started App");

        $(document).ready(function(){
            var kernel = new Kernel({ providers : {
                    mtgox : {
                        id : 1,
                        name : 'Mt.Gox',
                        symbol : 'mtgox',
                        iconUrl : 'https://www.mtgox.com/favicon.ico',
                        currencies : [ 'USD', 'EUR' ]
                    },
                    bitstamp : {
                        id : 2,
                        name : 'Bitstmap',
                        symbol : 'bitstamp',
                        iconUrl : 'https://www.bitstamp.net/s/icons/favicon.ico',
                        currencies : [ 'USD'],
                        exchanges : {
                            official : 'USD',
                            currencies : ['EUR']
                        }
                    },
                    btce : {
                        id : 3,
                        name : 'Btc-e',
                        symbol : 'btce',
                        iconUrl : 'https://btc-e.com/favicon.ico',
                        currencies : [ 'USD','EUR']
                    },
                    btcchina : {
                        id : 4,
                        name : 'BTCChina',
                        symbol : 'btcchina',
                        iconUrl : 'https://vip.btcchina.com/img/favicon.ico?v=2',
                        currencies  : [ 'CNY' ],
                        exchanges : {
                            official : 'CNY',
                            currencies : [ 'USD' ]
                        }
                    }
                },
                version : version
            });

            debug.debug('[Main] Loading information about providers');
            var tickers =  kernel.getTickers();

            var appView = Vm.create({}, 'AppView', AppView, {tickers: tickers});
            appView.render();

            debug.debug('[Main] Loaded Backbone Engine');
        });
});
