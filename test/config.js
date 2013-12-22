/**
 * Configuration for Test Environment
 */

require.config({
    paths: {
        'jquery' : 'scripts/vendor/jquery',
        'underscore' : 'scripts/vendor/underscore',
        'backbone' : 'scripts/vendor/backbone',
        'mocha' : 'lib/mocha/mocha',
        'chai' : 'lib/chai',
        'chaiJquery' : 'lib/chai_jquery',
        'models' : 'scripts/models',
        'collections' : 'scripts/collections',
        'utils' : 'scripts/utils',
        'localStorage' : ['scripts/vendor/backbone.localStorage']
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'jquery': {
            exports: '$'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'chaiJquery': ['jquery', 'chai'],
        mocha: {
            exports: 'mocha'
        },
        chai: {
            exports: 'chai'
        }
    }
    //urlArgs: 'bust=' + (new Date()).getTime()
});

require(['jquery','require','chai','mocha'], function($,require,chai){
    //Global
    mocha.setup({ui: 'bdd', ignoreLeaks: true});

    // Chai
    var should = chai.should();
    //chai.use(chaiJquery);

    var specs = [];
    specs.push('spec/ticker_behaviour');

    require(specs,
        function() {
            if (window.mochaPhantomJS) {
                mochaPhantomJS.run();
            }
            else {
                mocha.run();
            }
        });
});