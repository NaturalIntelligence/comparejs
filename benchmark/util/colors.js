var NC="\033[0m"; // No Color

var colors_code = {
	red : "\033[31m" ,
	light_red : "\033[1;31m",
	green : "\033[32m",
	light_green : "\033[1;32m",
	orange : "\033[0;33m",
	yellow : "\033[1;33m",
	white : "\033[1;37m"
}

var color = function(text,color){
	var colorcode = colors_code[color.toLowerCase()] || ''; 
	return colorcode + text + NC;
}

module.exports = color;