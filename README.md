Search Engines Scraper (based on casperjs and phantomjs)
==============

Requirements
--------------
In order to use this lib you need to install
- phantomjs
- casperjs

Usage
--------------
You can see example.js for working examples:

    casperjs example.js

Search method accepts 3 arguments:
- (string) searchText
- (function) callback with link parameters which executes after successful scraping
- (boolean) debug variable which enables verbose mode.

Scraping google:

    var searchText = 'x-men movie';
    var links1 = [];

    //search google
    var gs = require('lib/search-engines-scraper').googleScraper();
    gs.search(
        searchText,
        function(links1) {
            console.log("Google found: " + links1.join("\n"));
        },
         true
    );

Scraping yahoo:

    var searchText = 'x-men movie';
    var links1 = [];

    //search google
    var ys = require('lib/search-engines-scraper').yahooScraper();
    ys.search(
        searchText,
        function(links1) {
            console.log("Yahoo found: " + links1.join("\n"));
        },
         true
    );

Scraping baidu:

    var searchText = 'x-men movie';
    var links1 = [];

    //search google
    var bs = require('lib/search-engines-scraper').baiduScraper();
    bs.search(
        searchText,
        function(links1) {
            console.log("Baidu found: " + links1.join("\n"));
        },
         true
    );

*Keep in mind that require method caches returning variables.*