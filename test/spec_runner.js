/**
 * Spec Runner Specification
 */

require.config({
    paths: {
        'jquery'        : '../app/scripts/vendor/jquery',
        'underscore'    : '../app/scripts/vendor/underscore',
        'backbone'      : '../app/scripts/vendor/backbone',
        'mocha'         : 'lib/mocha/mocha',
        'chai'          : 'lib/chai',
        'chaiJquery'   : 'lib/chai_jquery',
        'models'        : '../app/scripts/models',
        'utils'           : '../app/scripts/utils'
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
});

require(['require', 'chai', 'chaiJquery', 'mocha', 'jquery'], function(require, chai, chaiJquery){

    // Chai
    var should = chai.should();
    chai.use(chaiJquery);

    /*globals mocha */
    mocha.setup('bdd');

    var specs = [];

    specs.push('spec/ticker_behaviour');

    require(specs,
     function() {
        mocha.run();
    });

});
