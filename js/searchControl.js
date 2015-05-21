var app = angular.module('LaShuang', []);

app.controller("LaShuangCtrl", function($scope, $http) {
  $http.get('data/lashuang.json').
    success(function(data, status, headers, config) {
      $scope.frDict = data.frDict;
	  console.log(data);
    }).
    error(function(data, status, headers, config) {
      // log error
    });
});