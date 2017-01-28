
var fs = require("fs");
var path = require("path");
var fileNamePath = path.join(__dirname,"assets/sample.xml");
var xmlData = fs.readFileSync(fileNamePath).toString();

//console.log(xmlData);


var xml2jsExpat = require('xml2js-expat');
var parser = new xml2jsExpat.Parser();
parser.on('end', function (result, error) {
    //console.log(JSON.stringify(result,null,4));
});
parser.parseString(xmlData);

var xml2js = require('xml2js');
// var result = xml2js.parseString(xmlData, function(err, result){
//     console.log(JSON.stringify(result,null,4))
// });

var XMLMapping = require('xml-mapping');
//console.log(JSON.stringify(XMLMapping.load(xmlData),null,4))

var xml2json = require('xml2json');
//console.log(JSON.stringify(xml2json.toJson(xmlData),null,4));

var Benchmark = require('benchmark');


var id = "XMLdata2JSONdata";
var suite = new Benchmark.Suite(id);
// add tests 
suite
.add('xml-mapping', function() {
  XMLMapping.load(xmlData);
})
.add('xml2js', function() {
  xml2js.parseString(xmlData, function(err, result){
    //do nothing
  });
})
.add('xml2json', function() {
  xml2json.toJson(xmlData)
})
//Err: node: ../node-expat.cc:129: bool Parser::parseString(v8::String&, int): Assertion `buf != __null' failed.
//Aborted (core dumped)
// .add('xml2js-expat', function() {
//   parser.parseString(xmlData);
// })


module.exports = suite