const os = require('os');
const fs = require('fs');
const path = require('path');
const color = require('./benchmark/util/colors');

const reportPath = "benchmark/reports/"
/**
Report Format

**/
var reporter = function(prefix,ver){
	this.reportName = path.join(reportPath, prefix + "_report");
	var today = new Date();
	this.csvLines = "#DATE: " + getDate(today) + " " + getTime(today) + "\r\n";
	this.csvLines += "#VERSION: " + ver  + "\r\n";
	this.csvLines += "#REPORTEE: " + (process.env.CMPJS_REPORTEE  || "local" ) + "\r\n";
	this.csvLines += os.platform() + " " + os.release()  + " " + os.type() + " " + os.arch() + ", Total Memory(mb)" + (os.totalmem()/1048576) + "\r\n";
}

reporter.prototype.add = function(suitename,testname,rme,sampleCount,testCount,cycleCount,opsPerSec){
	this.csvLines +=  suitename + "," +
		  testname + "," + rme + "," + sampleCount + "," +
		  testCount + "," + // The number of times a test was executed.
		  cycleCount + "," + // The number of cycles performed while benchmarking.
		  opsPerSec  //The number of executions per second.
		  + "\r\n";
}

reporter.prototype.export = function(){
	if(process.env.CMPJS_ARCH){
		writeToFile(this.reportName,this.csvLines);
	}else{
		console.log("Report: " + this.reportName);
		console.log(color(this.csvLines,'yellow'));
	}
	this.csvLines = "";
}

function getDate (dt){
	return dt.getFullYear() + "-" + pad(dt.getMonth()+1,2) + "-" + pad(dt.getDate(),2);
}
function getTime (dt){
	return pad(dt.getHours(),2) + ":" + pad(dt.getMinutes(),2) + ":" + pad(dt.getSeconds(),2);
}

var pad = function(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function writeToFile(fileName, data){
	fs.writeFile(fileName, data, function (err) {
		if (err) throw err;
	 	console.log('Benchmark data is added to ' + fileName);
	});
}

module.exports = reporter;