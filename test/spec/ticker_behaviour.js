define(['models/ticker','utils/environment'],function(TickerClass,Env) {


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
            id : 11,
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
            id : 11,
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
        }
    }


    describe('Ticker', function() {

        describe('constructor', function() {
            it('should throw an error, Empty Ticker Initialization', function() {
                try {
                   new TickerClass();
                } catch (err) {
                    err.should.to.be.instanceof(Error);
                }
            });

            it('should throw an error, Validation exception: symbol is empty', function(){
                try {
                    new TickerClass(providers.mtgoxNoSymbol).should.throw(Error);
                } catch (err){
                    err.should.to.be.instanceof(Error)
                    err.message.should.have.string("symbol");
                }
            })

            it('should throw an error, Validation exception: feed for one market is empty', function(){
                try {
                    new TickerClass(providers.mtgoxNoFeed).should.throw(Error);
                } catch (err){
                    err.should.to.be.instanceof(Error);
                    err.message.should.have.string("feed");
                }
            })

            it('should be a valid initialization object',function(){

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
});
