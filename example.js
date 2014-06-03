var searchText = 'x-men movie';
var links1 = [], links2 = [], links3 = [];

//search google
var gs = require('lib/search-engines-scraper').googleScraper();
gs.search(
    searchText,
    function(links1) {
        console.log("Google found: " + links1.join("\n"));
    },
     true //debug
);

//search yahoo
var ys = require('lib/search-engines-scraper').yahooScraper();
ys.search(
    searchText,
    function(links2) {
        console.log("Yahoo found: " + links2.join("\n"));
    },
    true //debug
);

//search baidu
var bs = require('lib/search-engines-scraper').baiduScraper();
bs.search(
    searchText,
    function(links3) {
        console.log("Baidu found: " + links3.join("\n"));
    },
    true //debug
);