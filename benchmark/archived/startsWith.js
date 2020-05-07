const Benchmark = require("benchmark");
const suite = new Benchmark.Suite("startsWith");

let data = "something long string";

function startsWith(str, toMatch, from){
    for(let j =0;from < str.length; from++, j++){
        if(str[from] !== toMatch[j]){
            return false;
        }
    }
    return true;
}
let pos = (() => 2)();

suite
    .add("startsWith", function() {
        data.startsWith("meth", 2);
    })
    .add("custom with dynamic position", function() {
        if(data[pos] === "m" 
        && data[pos+1] === "e"
        && data[pos+2] === "t"
        && data[pos+3] === "h"){
            let match = true;
        }
    })
    .add("custom with fix position", function() {
        if(data[2] === "m" 
        && data[3] === "e"
        && data[4] === "t"
        && data[5] === "h"){
            let match = true;
        }
    })
    .add("custom startsWith function", function() {
        startsWith(data, "meth", 2);
    })
    .add("indexOf", function() {
        if(data.indexOf("meth") === 2){
            return true;
        }else{
            return false;
        }
    })

    module.exports = suite