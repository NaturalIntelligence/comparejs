var fastpath = require('fastpath');

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

var matcher = fastpath(patterns);

var Benchmark = require('benchmark');
var id = "npm-fastpath";
var suite = new Benchmark.Suite(id);
suite.version = "2.1.0";

// add tests 
suite.add(patterns.pattern1, function() {
  fastpath(patterns.pattern1).evaluate(obj);
})
.add(patterns.pattern2, function() {
  fastpath(patterns.pattern2).evaluate(obj);
})
.add(patterns.pattern3, function() {
  fastpath(patterns.pattern3).evaluate(obj);
})
.add(patterns.pattern4, function() {
  fastpath(patterns.pattern4).evaluate(obj);
})
.add("All", function() {
  fastpath(patterns).evaluate(obj);
})
.add("All paaterns parsed in advanced", function() {
  matcher.evaluate(obj);
})

module.exports = suite