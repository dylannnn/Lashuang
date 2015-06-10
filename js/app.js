var app = angular.module('LaShuang', ['ngRoute', 'appCtrls', 'firebase', 'ngFileUpload']).constant('FIREBASE_URL', 'https://lashuang.firebaseio.com/');

var appCtrls = angular.module('appCtrls', ['firebase','ngFileUpload']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'views/home.html',
            controller:'homeController'
        }).
        when('/dict', {
            templateUrl: 'views/search.html',
            controller:'searchController',
        }).
        otherwise({
            redirectTo: '/'
        });
}]);

app.filter('searchFor', function(){
    return function(arr, searchWord){
        if(!searchWord){
            return arr;
        }
        var result = [];
        searchWord = searchWord.toLowerCase();
        angular.forEach(arr, function(item){
            if(item.word.toLowerCase().indexOf(searchWord) !== -1){
                result.push(item);
            }
        });
        return result;
    };
});