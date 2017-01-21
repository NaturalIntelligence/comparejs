# comparejs
Compare features and performance of similar js libraries (not just stats)


## How to add performance tests for new js library

1. Go to [tests](https://github.com/NaturalIntelligence/comparejs/tree/master/benchmark/tests) folder
2. Add a test js file similar to below code;

```js
var Benchmark = require('benchmark');


var id = "sample001"; //Manadatory
var suite = new Benchmark.Suite(id);
// add tests 
suite.add('RegExp#test', function() {
  /o/.test('Hello World!');
})
.add('String#indexOf', function() {
  'Hello World!'.indexOf('o') > -1;
})

module.exports = suite
```
3. Add [profile](https://github.com/NaturalIntelligence/comparejs/blob/master/benchmark/profile.js) entry
4. Add dev dependency in package.json (if any)
5. run `npm run benchmarktest`
6. check if a new file is generated in [reports](https://github.com/NaturalIntelligence/comparejs/tree/master/benchmark/reports) folder

