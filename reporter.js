const os = require('os');
const fs = require('fs');
const path = require('path');

const reportPath = "benchmark/reports/"
/**
fileName: reportee_date_hhmmss or report_date_hhmmss
File format
  1st line: OS detail
  2nd to Nth lins: test detail
**/
var reporter = function(){
	var reportee = process.env.CMPJS_REPORTEE || "report";
	this.reportName = path.join(reportPath, reportee + "_" + getDatePart(new Date()));
	this.csvLines = os.platform() + "," + os.release()  + "," + os.type() + "," + os.arch() + "," + os.totalmem() + "\r\n";
	//appendToFile(this.reportName,csvLine);
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
	appendToFile(this.reportName,this.csvLines);
	this.csvLines = "";
}

function getDatePart (dt){
	return dt.getFullYear() + pad(dt.getMonth()+1,2) + pad(dt.getDate(),2) + "_" + pad(dt.getHours(),2) + pad(dt.getMinutes(),2) + pad(dt.getSeconds(),2);
}

var pad = function(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function appendToFile(fileName, data){
	fs.appendFile(fileName, data, function (err) {
		if (err) throw err;
	 	console.log('Bencmark data is added to ' + fileName);
	});
}

module.exports = reporter;