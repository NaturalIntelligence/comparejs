var jp = require('@f5io/jsonpath');

var obj = {
    'a': {
        1: 'la',
        2: 'boo',
        'h': [
            {foo: [1,2,3]},
            {foo: [4,5,6]},
            {foo: 12, name: 'a'},
            {foo: 13.5, name: { 'h': 45}},
            {foo: 11.8, name: 'c'},
            true,
            123,
            [3,4,5]
        ]
    },
    'b': {
        1: 'la',
        2: 'boo',
        'h': [
            {foo: [1,2,3]},
            {foo: [4,5,6]},
            {foo: 12, name: 'a'},
            {foo: 13.5, name: { 'h': 45}},
            {foo: 11.8, name: 'c'},
            true,
            123,
            [3,4,5]
        ]
    },
    'c': {
        1: 'la',
        2: 'boo',
        'h': [
            {foo: [1,2,3]},
            {foo: [4,5,6]},
            {foo: 12, name: 'a'},
            {foo: 13.5, name: { 'h': 45}},
            {foo: 11.8, name: 'c'},
            true,
            123,
            [3,4,5]
        ]
    },
    'd': {
        1: 'la',
        2: 'boo',
        'h': [
            {foo: [1,2,3]},
            {foo: [4,5,6]},
            {foo: 12, name: 'a'},
            {foo: 13.5, name: { 'h': 45}},
            {foo: 11.8, name: 'c'},
            true,
            123,
            [3,4,5]
        ]
    }
}

var patterns = {
    pattern1: '$..h[*].foo',
    pattern2: '$.b[1,2]',
    pattern3: '$.b.2',
    pattern4: '$..h[?(@.foo>13)]'
}

/*console.log(jp(patterns.pattern1,obj));
console.log(jp(patterns.pattern2,obj));
console.log(jp(patterns.pattern3,obj));
console.log(jp(patterns.pattern4,obj));*/

var Benchmark = require('benchmark');
var id = "npm-fastpath";
var suite = new Benchmark.Suite(id);
suite.version = "2.1.0";

// add tests 
suite.add(patterns.pattern1, function() {
  jp(patterns.pattern1,obj)
})
.add(patterns.pattern2, function() {
  jp(patterns.pattern2,obj)
})
.add(patterns.pattern3, function() {
  jp(patterns.pattern3,obj)
})
.add(patterns.pattern4, function() {
  jp(patterns.pattern4,obj)
})

module.exports = suite