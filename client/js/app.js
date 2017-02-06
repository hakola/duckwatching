var app = angular.module('myApp', ['ui.bootstrap.datetimepicker']);

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
     delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

app.controller('myCtrl', function($scope, $http) {
    // Fetch species
    $http.get("/species").then(function(response) {
     	$scope.duckData = response.data;
    })

    // Fetch sightins
    $http.get("/sightings").then(function(response) {
     	$scope.sightData = response.data;

    })

    // Set max-date for datetime-input
    $scope.today = new Date();

    // Initializing sorting
    $scope.propertyName = 'dateTime';
  	$scope.reverse = true;

  	// Sort function
  	$scope.sortBy = function(propertyName) {
    	$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    	$scope.propertyName = propertyName;
 	};

 	// Add new sight
 	$scope.addSight = function() {
 		var data = {
			species: $scope.sight.species.name,
			description: $scope.sight.description,
			dateTime: $scope.sight.dateTime,
			count: $scope.sight.count
			}
		// Send sight
 		$http({
		  method: 'POST',
		  url: '/sightings',
		  data: JSON.stringify(data),
		  headers: "Content-Type: application/json",
		}).then(function successCallback(response) {
		    location.reload();
		  }, function errorCallback(response) {
			console.log(response);
		});
 	}
});