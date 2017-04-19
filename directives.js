//Directives
weatherApp.directive("weatherReport", function(){
	return{
		restrict: 'E',
		templateUrl: 'directives/weatherReport.html',
		replace:true,
		//poke holes in scope
		scope:{
			weatherDay: "=",
			convertToStandard: "&",
			convertToDate: "&",
			dateFormat: "@"
		}
	}
});