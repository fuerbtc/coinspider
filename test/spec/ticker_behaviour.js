define([
    'models/ticker',
    'collections/tickers',
    'utils/environment'
],function(TickerClass,TickersClass,Env) {

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

        describe('initialization', function() {
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

    describe('Collection Ticker', function() {
        var STORAGE = "coinspider-test-tickers";

        it('should be an empty collection when localStorage is empty', function(){
            //window.localStorage.removeItem(STORAGE);
            window.localStorage.setItem("Storage","Luis");

            var tickers = new TickersClass();
            tickers.fetch();

            tickers.size().should.be.equal(0);
        });

        it('should be a ordered list of 2 tickers', function (){
            var ticker1 = new TickerClass(providers.mtgox);
            var ticker2 = new TickerClass(providers.bitstamp);

            console.log(window.localStorage.getItem("Storage"));

            ticker1.set({'order' : 2});
            ticker2.set({'order' : 1});

            var tickers = new TickersClass();
            tickers.create(ticker1);
            tickers.create(ticker2);



            var jSon = tickers.toJSON();
            jSon.should.have.deep.property("[0].symbol","bitstamp");
            jSon.should.have.deep.property("[1].symbol","mtgox");
        });

        it('should be 0 enabled tickers from previous list', function (){
            var tickers = new TickersClass();
            tickers.fetch();

            tickers.getEnabled().should.be.empty;
        });

//        it('should be 1 enabled tickers, after enabled one', function (){
//            var tickers = new TickersClass();
//            tickers.fetch();
//
//            var mtgox = tickers.get(13);
//            mtgox.save({'status':true})
//
//            tickers.getEnabled().should.have.deep.property("[1].symbol","mtgox");
//        });
    });
});
