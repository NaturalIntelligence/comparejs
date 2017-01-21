#!/usr/bin/env node

const testDir = "benchmark/tests/";
const archDir = "benchmark/archived/";

var Benchmark = require('benchmark');
var fs = require('fs');
var path = require('path');
var color = require('./benchmark/util/colors')
var Reporter = require('./reporter')

var suits = [];
var normalizedPath = require("path").join(__dirname, testDir);

//load all the testsuites
require("fs").readdirSync(normalizedPath).forEach(function(file) {
	if(file.substr(file.length - 3) === ".js"){
		var suite = require("./" + testDir + file) ;
		suite.testFileName = file; 
  		suits.push(suite);
	}
});

//Run each testsuite and move to archived once completed without error
for (var i = 0; i < suits.length; i++) {
	var suiteTestFileName = suits[i].testFileName;

	suits[i]
	.on('start',function(){
		console.log("Running Suite: " + this.name);
	})
	.on('error',function(e){
		console.log(color("Error in Suite: " + this.name,'red'));
	})
	.on('abort',function(e){
		console.log(color("Aborting Suite: " + this.name,'red'));
	})
	/*.on('cycle',function(event){
		console.log("Suite ID:" + event.target.id);
	})*/
	// add listeners 
	.on('complete', function() {
	  var reporter = new Reporter(this.name,this.version);
	  for (var j = 0; j < this.length; j++) {
	    reporter.add(this.name,this[j].name , this[j].stats.rme , this[j].stats.sample.length ,
		  this[j].count , // The number of times a test was executed.
		  this[j].cycles , // The number of cycles performed while benchmarking.
		  this[j].hz //The number of executions per second.
		)
	  }

	  reporter.export();
	  //move the suite to archieved
	  process.env.CMPJS_ARCH && move(testDir,archDir,suiteTestFileName);
	})
	// run async 
	.run({ 'async': true });
}



function move(from,to,file){
	try{
		fs.rename(path.join(from,file), path.join(to,file));
	}catch(e){
		console.log(color("ERROR:\t Unable to move :: " + e, 'red'));
	}
}

//Report on console when some library has issues
process.on('uncaughtException', function (err) {
	console.log(color("ERROR:\t" + err, 'red'));
});