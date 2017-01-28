


var arraySize = 2333,
    resultCount = 150,
    itemCount = 50,
    groupCount = 145;

var json = {
    results: []
};

var i, j;

var bigArray = [];
for (i = 0; i < arraySize; i++) {
    bigArray[i] = 1;
}

var items = [];
for (i = 0; i < itemCount; i++) {
    items[i] = JSON.parse(JSON.stringify({a: {b: 0, c: 0}, s: {b: {c: bigArray}}}));
}

for (i = 0; i < resultCount; i++) {
    json.results[i] = {groups: [], v: {v: [1, 2, 3, 4, 5, 6, 7, 8]}};
    json.results[i].groups = [];
    for (j = 0; j < groupCount; j++) {
        json.results[i].groups[j] = {items: items, a: "121212"};
    }
}

var Benchmark = require('benchmark');

var id = "npm-jsonpath-plus";
var suite = new Benchmark.Suite(id);
suite.version = "0.16.0";

var jpp = require('jsonpath-plus');
var jp = require('jsonpath');

// add tests 
suite.add("jsonpathplus: Big data: $.results[*].groups[*].items[42]", function() {
  jpp({json: json, path: '$.results[*].groups[*].items[42]'});
})
suite.add("jsonpath: Big data: $.results[*].groups[*].items[42]", function() {
  jp.query(json, '$.results[*].groups[*].items[42]');
})
module.exports = suite