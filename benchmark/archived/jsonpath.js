var jp = require('jsonpath');

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

var Benchmark = require('benchmark');


var id = "npm-jsonpath";
var suite = new Benchmark.Suite(id);
suite.version = "0.2.9";

// add tests 
suite.add(patterns.pattern1, function() {
  jp.query(obj, patterns.pattern1);
})
.add(patterns.pattern2, function() {
  jp.query(obj, patterns.pattern2);
})
.add(patterns.pattern3, function() {
  jp.query(obj, patterns.pattern3);
})
.add(patterns.pattern4, function() {
  jp.query(obj, patterns.pattern4);
})

module.exports = suite