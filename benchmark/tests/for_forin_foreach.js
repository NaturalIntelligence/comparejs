var arr = [], loop = 5000;
  
  while (loop--) {
   arr[loop - 1] = loop;
  }
  
  var fn = function(x) {
   x = x;
  };

var Benchmark = require('benchmark');

var id = "for_forin_foreach";
var suite = new Benchmark.Suite(id);
// add tests 
suite.on('setup',function(){
  
})
.add('for', function() {
  for (var i = 0; i < arr.length; i++) {
	 fn(arr[i]);
	}
})
.add('for..in', function() {
  for (var i in arr) {
	 fn(arr[i]);
	}
})
.add('forEach', function() {
   arr.forEach(fn);
})

module.exports = suite