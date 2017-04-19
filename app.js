//Module
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//bypass the SCE error 
weatherApp.config(['$sceDelegateProvider', function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'http://api.openweathermap.org/**'
    ])
}]);

//fix URL error
weatherApp.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);

//Services
weatherApp.service('cityService', function() {
	
	this.city = "San Francisco, CA";
});



