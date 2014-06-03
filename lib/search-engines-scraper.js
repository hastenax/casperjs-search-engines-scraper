var require = patchRequire(require);

function GoogleScraper() {
    this.links = [];
    this.where = 'form[action="/search"]';
    this.url = 'http://www.google.com';
    this.searchVariable = 'q';
    this.mustContains;
    this.what = 'h3 a';
}

GoogleScraper.prototype.search = function(searchText, callback, debug) {
    require.cache['casper'] = {};
    var casper = require('casper').create();
    var _instance = this;
    var data = {};
    if (debug)
        console.log("\nGoing to: " + this.url);
    data[_instance.searchVariable] = searchText;
    casper.userAgent('Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)');
    casper.start(_instance.url, function() {
        this.fill(_instance.where, data, true);
    });

    casper.then(function() {
        _instance.links = this.evaluate(function (selector, mustContains) {
                var tmp = [];
                [].forEach.call(
                    document.querySelectorAll(selector),
                    function(el){
                        var url = el.getAttribute('href');
                        if (mustContains == undefined || url.indexOf(mustContains) > 0)
                            tmp.push(url);
                    }
                );
                return tmp;
            },
            {
                selector: _instance.what,
                mustContains: _instance.mustContains
            }
        );
    });

    casper.run(function() {
        if (debug) {
            console.log('Search: ' + searchText);
            console.log('Found: ' + _instance.links.length + " links")
        }
        callback(_instance.links);
        //this.exit();
    });
}

Function.prototype.inherits = function(parent) {
    this.prototype = Object.create(parent.prototype);
};

GoogleImagesScraper.inherits(GoogleScraper);
function GoogleImagesScraper() {
    GoogleScraper.apply(this, arguments); // call super
    this.what = 'a';
    this.url = 'http://images.google.com';
    this.mustContains = 'url?q=';
};

//todo: bypass human check
YandexScraper.inherits(GoogleScraper);
function YandexScraper() {
    GoogleScraper.apply(this, arguments); // call super
    this.what = 'a';
    this.url = 'http://www.yandex.ru';
    this.mustContains;
    this.where = 'form[action="http://yandex.ru/yandsearch"]';
    this.searchVariable = 'text';
};

YahooScraper.inherits(GoogleScraper);
function YahooScraper() {
    GoogleScraper.apply(this, arguments); // call super
    this.url = 'http://www.yahoo.com';
    this.mustContains;
    this.where = 'form[name="sf1"]';
    this.searchVariable = 'p';
};

BaiduScraper.inherits(GoogleScraper);
function BaiduScraper() {
    GoogleScraper.apply(this, arguments); // call super
    this.url = 'http://www.baidu.com';
    this.mustContains;
    this.where = 'form[name="f1"]';
    this.searchVariable = 'wd';
};

exports.googleScraper = function googleScraper() {
    return new GoogleScraper();
};

exports.googleImagesScraper = function googleImagesScraper() {
    return new GoogleImagesScraper();
};

exports.yandexScraper = function yandexScraper() {
    return new YandexScraper();
};

exports.yahooScraper = function yahooScraper() {
    return new YahooScraper();
};

exports.baiduScraper = function baiduScraper() {
    return new BaiduScraper();
};