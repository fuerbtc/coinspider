define([
    'backbone',
    'models/ticker',
    'collections/tickers',
    'utils/environment',
    'localStorage'
],function(Backbone,TickerClass,TickersClass,Env) {
    var providers = {
        mtgoxNoSymbol : {
            id : 11,
            siteUrl : 'https://www.mtgox.com/',
            iconUrl : 'https://www.mtgox.com/favicon.ico',
            name : 'Mt.Gox',

            markets : {
                BTCUSD : {
                    feed : 'http://data.mtgox.com/api/1/BTCUSD/ticker',
                    graph : 'http://bitcoincharts.com/markets/mtgoxUSD.html',
                    crossdomain : true
                },
                BTCEUR : {
                    feed : 'http://data.mtgox.com/api/1/BTCEUR/ticker',
                    graph : 'http://bitcoincharts.com/markets/mtgoxEUR.html',
                    crossdomain : true
                },
                BTCGBP : {
                    feed : 'http://data.mtgox.com/api/1/BTCGBP/ticker',
                    graph : 'http://bitcoincharts.com/markets/mtgoxGBP.html',
                    crossdomain : true
                }
            }
        },
        mtgoxNoFeed : {
            id : 12,
            siteUrl : 'https://www.mtgox.com/',
            iconUrl : 'https://www.mtgox.com/favicon.ico',
            symbol : 'mtgox',
            name : 'Mt.Gox',

            markets : {
                BTCUSD : {
                    graph : 'http://bitcoincharts.com/markets/mtgoxUSD.html',
                    crossdomain : true
                },
                BTCEUR : {
                    feed : 'http://data.mtgox.com/api/1/BTCEUR/ticker',
                    graph : 'http://bitcoincharts.com/markets/mtgoxEUR.html',
                    crossdomain : true
                },
                BTCGBP : {
                    feed : 'http://data.mtgox.com/api/1/BTCGBP/ticker',
                    graph : 'http://bitcoincharts.com/markets/mtgoxGBP.html',
                    crossdomain : true
                }
            }
        },
        mtgox : {
            id : 13,
            siteUrl : 'https://www.mtgox.com/',
            iconUrl : 'https://www.mtgox.com/favicon.ico',
            symbol : 'mtgox',
            name : 'Mt.Gox',

            markets : {
                BTCUSD : {
                    feed : 'http://data.mtgox.com/api/1/BTCUSD/ticker',
                    graph : 'http://bitcoincharts.com/markets/mtgoxUSD.html',
                    crossdomain : true
                },
                BTCEUR : {
                    feed : 'http://data.mtgox.com/api/1/BTCEUR/ticker',
                    graph : 'http://bitcoincharts.com/markets/mtgoxEUR.html',
                    crossdomain : true
                },
                BTCGBP : {
                    feed : 'http://data.mtgox.com/api/1/BTCGBP/ticker',
                    graph : 'http://bitcoincharts.com/markets/mtgoxGBP.html',
                    crossdomain : true
                }
            }
        },
        bitstamp : {
            id : 14,
            siteUrl : 'https://www.bitstamp.net',
            iconUrl : 'https://www.bitstamp.net/s/icons/favicon.ico',
            name : 'Bitstamp',
            symbol : 'bitstamp',

            markets : {
                BTCUSD : {
                    feed : 'https://www.bitstamp.net/api/ticker',
                    chart : 'http://bitcoincharts.com/markets/bitstampUSD.html',
                    crossdomain : false
                }
            }
        }
    };


    describe('Ticker', function() {

        describe('working with', function() {
            it('should be invalid due to empty values', function() {
                var ticker = new TickerClass();
                ticker.on("invalid",function(model,error){
                    var err = error;
                    err.should.exist.and.have.string("symbol");
                })
                ticker.save();
            });

            it('should be invalid. Required `symbol` property is empty', function(){
                var ticker = new TickerClass(providers.mtgoxNoSymbol);
                ticker.on("invalid",function(model,error){

                    var err = error;
                    err.should.exist.and.have.string("symbol");
                })
                ticker.save();
            })

            it('should be invalid. Required `feed` property for one market is empty', function(){
                var ticker = new TickerClass(providers.mtgoxNoFeed);
                ticker.on("invalid",function(model,error){
                    error.should.exist.and.have.string("feed");
                });
                ticker.save();
            })

            it('should be a valid Ticker object',function(){
                var sample = new TickerClass(providers.mtgox);

                sample.get(Env.PROPERTY_TICKER_NAME).should.be.equal("Mt.Gox");
                var markets = sample.get(Env.PROPERTY_TICKER_MARKETS);
                markets.should.have.property("BTCUSD")
                    .that.is.an("object");
                markets.should.have.property("BTCEUR")
                    .that.is.an("object");
                markets.should.have.property("BTCGBP")
                    .that.is.an("object");
            });
        });

    });

    describe('Collection Tickers', function() {
        var tickers = new TickersClass();

        before(function(){
            tickers.localStorage._clear();
            tickers.fetch();
        });

        it("should use `localSync`", function(){
            Backbone.getSyncMethod(tickers).should.be.equal(Backbone.localSync);
        });

        it("should initially be empty", function(){
            tickers.length.should.be.equal(0);
        });

        describe("on creating models", function(){
            var ticker1 = new TickerClass(providers.mtgox),
                ticker2 = new TickerClass(providers.bitstamp);

            ticker1.on("invalid",function(model,error){
                console.log("error???? " + error);
            });

            ticker2.on("invalid",function(model,error){
                console.log("error2???? " + error);
            });

            before(function(){
                ticker1.set({'order' : 2});
                ticker2.set({'order' : 1, 'status' : true});
                tickers.create(ticker1);
                tickers.create(ticker2);
            });

            it('should be a ordered list of 2 tickers',function(){
                var jSon = tickers.toJSON();
                jSon.should.have.deep.property("[0].symbol","bitstamp");
                jSon.should.have.deep.property("[1].symbol","mtgox");
            });

            it('should be 1 enabled ticker', function(){
                //Esperamos array de modelos
                tickers.getEnabled().should.have.deep.property("[0].attributes.symbol","bitstamp");
            });

            describe("on a new collection", function(){
                var tickers2 = new TickersClass();

                before(function(){
                    tickers2.fetch();
                });

                it('should be  2 tickers in a new collection, equals to last collection', function (){
                    tickers2.size().should.be.equal(2);

                    var jSon2 = tickers2.toJSON();
                    jSon2.should.have.deep.property("[0].symbol","bitstamp");
                    jSon2.should.have.deep.property("[1].symbol","mtgox");
                });

            });
        });
    });
});
