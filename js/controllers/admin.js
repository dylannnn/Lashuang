app.controller("adminAddController", ["$scope", "$rootScope", "$location", "FIREBASE_URL", "$firebaseArray", "pageLoad", "Upload", function ($scope, $rootScope, $location, FIREBASE_URL, $firebaseArray, pageLoad, Upload) {
console.log("Welcome to admin");
	
	 $scope.addNewWord = function () {
        console.log("Clicked!");
        var ref = new Firebase(FIREBASE_URL);
        var dictionary = ref.child('dictionary');

        //var dictContent = 
        dictionary.push({
            word : $scope.word.newWord,
			dictContent : {
				explanation : [$scope.word.newWordExp],
				commonUsage : [$scope.word.newWordCommonUsage],
				examples : [$scope.word.newWordExamples]
			}
        }, function (error) {
            if (error) {
                console.log('Push failed');
            } else {
                console.log('Push Successed');
            }
        });
    };
	
	
	
	var requestRef = new Firebase(FIREBASE_URL + "dictionary");
	$scope.requestDictionary = $firebaseArray(requestRef);

	$scope.deleteWord = function (key) {
	//var ref = new Firebase("https://lashuang.firebaseio.com/dictionary");
		$scope.requestDictionary.$remove(key);
	};
	
}]);