//Controllers

weatherApp.controller('homeController', ['$scope', '$location','cityService', function($scope, $location, cityService){
	
	$scope.city = cityService.city;
	
	//watch to see when city changes
	$scope.$watch('city', function(){
		cityService.city = $scope.city;
	}, true)
	
	//function to press enter in textbox
	$scope.submit = function(){
		$location.path("/forecast");
	};
	
}]);

 weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', '$http', function($scope, $resource, $routeParams, cityService, $http){
    
    $scope.city = cityService.city;
    
    $scope.days = $routeParams.days || '2';
	 
	 $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=370a271ac522911d56217344a090d0b2");
	 
	 $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, cnt:$scope.days});
	 
	 //convert degrees to fahrenheit
	 $scope.convertToFahrenheit = function(degK){
		
		return Math.round((1.8 * (degK - 273)) + 32);
	}
	//convert date to readable format
	$scope.convertToDate = function(dt){
		
		return new Date(dt*1000);
	}
	
}]);