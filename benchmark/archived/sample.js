var Benchmark = require('benchmark');


var id = "sample001";
var suite = new Benchmark.Suite(id);
// add tests 
suite.add('RegExp#test', function() {
  /o/.test('Hello World!');
})
.add('String#indexOf', function() {
  'Hello World!'.indexOf('o') > -1;
})

module.exports = suite