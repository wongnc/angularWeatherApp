//Module
var weatherApp = angular.module('weatherApp', ['ngRoute']);

//Routes
weatherApp.config(function ($routeProvider){
	
	$routeProvider
	
	.when('/', {
		templateUrl: 'pages/home.html',
		controller: 'homeController'	
		
	})
	
	.when('/forecast', {
		templateUrl: 'pages/forecast.html',
		controller: 'forecastController'	
		
	})
	
	.when('/forecast/:days', {
	templateUrl: 'pages/forecast.html',
	controller: 'forecastController'	
		
	})
});

weatherApp.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);

//Services
weatherApp.service('cityService', function() {
	
	this.city = "San Francisco, CA";
});

//Controllers

weatherApp.controller('homeController', ['$scope', 'cityService','$http', function($scope, cityService, $http){
	
	$scope.city = cityService.city;
	
	//watch to see when city changes
	$scope.$watch('city', function(){
		cityService.city = $scope.city;
	}, true)

	$http.get("http://api.openweathermap.org/data/2.5/weather?id=5391997&APPID=370a271ac522911d56217344a090d0b2").
        then(function(weatherResult){
            $scope.city = weatherResult.data.name;
		    $scope.dt = weatherResult.data.dt;
		    $scope.temp = weatherResult.data.main.temp;
			console.log($scope.city);
		    console.log($scope.dt);
		    console.log($scope.temp);
        });	
	
}]);

 weatherApp.controller('forecastController', ['$scope', '$routeParams', 'cityService', '$http', function($scope, $routeParams, cityService,$http){
    
    $scope.city = cityService.city;
    
    $scope.days = $routeParams.days || 2;
    
 /*   $http.get("http://api.openweathermap.org/data/2.5/weather?id=5391997&APPID=370a271ac522911d56217344a090d0b2").then(function(res){
         console.log(res);
		 $scope.city = res.data.name;
	});*/
	 
    $scope.weatherAPI = $http.get("http://api.openweathermap.org/data/2.5/weather?id=5391997&APPID=370a271ac522911d56217344a090d0b2").
        then(function(weatherResult){
            $scope.city = weatherResult.data.name;
		    $scope.dt = weatherResult.data.dt;
		    $scope.temp = weatherResult.data.main.temp;
			console.log($scope.city);
		    console.log($scope.dt);
		    console.log($scope.temp);
        });	 
	 
	
	
	 
	$scope.convertToFahrenheit = function(degK){
		
		return Math.round((1.8 * (degK - 273)) + 32);
	}
	
	$scope.convertToDate = function(dt){
		
		return new Date(dt*1000);
	}
	
}]);
