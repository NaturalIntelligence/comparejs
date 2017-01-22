var loremIpsum = require('fast-lorem-ipsum').fLI;

var Benchmark = require('benchmark');


var id = "fast-lorem-ipsum";
var suite = new Benchmark.Suite(id);
suite.version = "1.0.1";
// add tests 
suite.add('loremIpsum(1500,"c")', function() {
  loremIpsum(1500,"c");
})
.add('loremIpsum(100,"w")', function() {
  loremIpsum(100,"w");
})
.add('loremIpsum(1000,"w")', function() {
  loremIpsum(1000,"w");
})
.add('loremIpsum(3000,"w")', function() {
  loremIpsum(3000,"w");
})
.add('loremIpsum(5000,"w")', function() {
  loremIpsum(5000,"w");
})
module.exports = suite