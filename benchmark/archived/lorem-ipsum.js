var loremIpsum = require('lorem-ipsum');

var Benchmark = require('benchmark');


var id = "lorem-ipsum";
var suite = new Benchmark.Suite(id);
suite.version = "1.0.3";
// add tests 
suite.add('loremIpsum({count:100,units:"words"})', function() {
  loremIpsum({count:100,units:"words"});
})
.add('loremIpsum({count:1000,units:"words"})', function() {
  loremIpsum({count:1000,units:"words"});
})
.add('loremIpsum({count:3000,units:"words"})', function() {
  loremIpsum({count:3000,units:"words"});
})
.add('loremIpsum({count:100,units:"words"})', function() {
  loremIpsum({count:5000,units:"words"});
})
module.exports = suite