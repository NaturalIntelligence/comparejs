var Benchmark = require('benchmark');


var suite = new Benchmark.Suite;
suite.id = "sample001";
// add tests 
suite.add('RegExp#test', function() {
  /o/.test('Hello World!');
})
.add('String#indexOf', function() {
  'Hello World!'.indexOf('o') > -1;
})

module.exports = suite