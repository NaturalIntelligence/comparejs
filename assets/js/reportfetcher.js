$(document).ready(function(){
 var suiteName = getParameterByName('q');
 if(suiteName){
	fetchReport(suiteName);
	$("#jslib").val(suiteName);
 }

 $("#compare").click(function(){
	$("#result").empty();
	//var suites = $("#jslib").val();
	var suiteName = $("#jslib").val();

	//$.each(suites,function(i){
	//	var suiteName = suites[i];
		appendQueryParam(suiteName);
		//fetchReport(suiteName);
	//});
 });
});

function appendQueryParam(val){
	var loc = location.href;        
    //loc += loc.indexOf("?") === -1 ? "?" : "&";
    location.href = loc + "?q="+val;
}

function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function fetchReport(suiteName){
	$.get("benchmark/reports/"+suiteName +"_report",function(data){//read the report
		try{
			var report = JSON.parse(data);
		}catch(e){
			console.log(e);
		}
		var serverdetail = report.metadata.serverdetail;
		var testDate = report.metadata.testdate;

		$("#result").append(getReportTemplate(testDate,serverdetail));
		$("#resultModal").modal();
		if(report.suite[0].err){//show error
			$("#reportdetail").append('<div class="red">'+report.suite[0].err+'</div>');
		}else{//show comparision chart
			$("#reportdetail").append('<br /><canvas id="chart" height="150px"></canvas>');
			//collect labels
			var _labels = new Array(report.suite[0].tests.length);
			$.each(report.suite[0].tests, function(j){
				_labels[j] = report.suite[0].tests[j].testname;
			});
			var datasets = new Array(report.suite.length);
			$.each(report.suite,function(k){
				var group = report.suite[k];
				var label = group.groupname + " - " + group.version;
	  			var _series = new Array(group.tests.length);
				$.each(group.tests, function(j){
					_series[j] = group.tests[j].tps;
				});
				datasets[k] = { label : label, data : _series , backgroundColor : barcolors[k]};
			});
			buildChart(_labels,datasets);
		}
	});
}
var barcolors = [ 
	 "rgba(55, 160, 225, 0.7)" 
	,"rgba(225, 58, 55, 0.7)"
	,'rgba(255, 206, 86, 0.7)'
    ,'rgba(75, 192, 192, 0.2)'
    ,'rgba(153, 102, 255, 0.7)'
    ,'rgba(255, 159, 64, 0.7)'
];

function getReportTemplate(dt,srvdtl){
	return '<div id="reportdetail">' +
				'<b>Server detail</b>: '+ srvdtl +
				'<br />'+ dt +
			'</div>';
}

function buildChart(_labels,_datasets){
	var data = {
		labels : _labels,
		datasets: _datasets
	};
	var myBarChart = new Chart("chart", {
	    type: 'horizontalBar',
	    data: data,
	    options: {
	    	title: {
	    		display: true,
	    		text: "Higher is better"
	    	}
	    }
	});
}

