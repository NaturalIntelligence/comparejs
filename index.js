#!/usr/bin/env node

var Benchmark = require('benchmark');
var color = require('./benchmark/util/colors')
var Reporter = require('./reporter')


var sampleSuite = require('./benchmark/tests/sample');
var suits = [];
suits.push(sampleSuite);


var reporter = new Reporter();
for (var i = 0; i < suits.length; i++) {
	var suiteid = suits[i].id;
	suits[i]
	.on('start',function(){
		console.log("Running Suite: " + suiteid);
	})
	.on('error',function(e){
		console.log(color("Error in Suite: " + suiteid,'red'));
	})
	.on('abort',function(e){
		console.log(color("Aborting Suite: " + suiteid,'red'));
	})
	// add listeners 
	.on('complete', function() {
	  for (var j = 0; j < this.length; j++) {
	    reporter.add(suiteid,this[j].name , this[j].stats.rme , this[j].stats.sample.length ,
		  this[j].count , // The number of times a test was executed.
		  this[j].cycles , // The number of cycles performed while benchmarking.
		  this[j].hz //The number of executions per second.
		)
	  }
	  reporter.export();
	})
	// run async 
	.run({ 'async': true });
}


process.on('uncaughtException', function (err) {
	console.log(color("ERROR:\t" + err, 'red'));
  //process.exit(1); //want the server keep running
});