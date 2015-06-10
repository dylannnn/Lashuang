app.controller("searchController", ["$scope", "$rootScope", "$location", "$route", "FIREBASE_URL", "$firebaseArray", "pageLoad", "Upload", function ($scope, $rootScope, $location, $route, FIREBASE_URL, $firebaseArray, pageLoad, Upload) {
    //initial function running
    pageLoad.iniFunc();
	console.dir($route.current.params);
	
	
	
    
    $scope.selectedTab = 1;
	
	//Get query word
	function getQueryVal() {
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
		function(m,key,value) {
			vars[key] = value;
		});
		return vars;
	}

	$rootScope.queryWord = getQueryVal()["q"];
	//console.log(queryWord);
	
	$rootScope.found = false;
	console.log("1. $rootScope.found is " + $rootScope.found);
	function searchWord () {
		var ref = new Firebase(FIREBASE_URL + "dictionary");
        var dictionary = $firebaseArray(ref);
		
		dictionary.$loaded().then(function(data) {
			console.log("Data length: " + data.length);
			console.dir(data);
			
			$rootScope.queryWord = getQueryVal()["q"];
			
			var words = [];
			for (var i = 0; i < data.length; i++) {
				var wordContent = data[i];
				words.push(wordContent.word);
			}
			console.dir(words);
			
			if (words.indexOf($rootScope.queryWord) != -1) {
				$rootScope.found = true;
				console.log("2. $rootScope.found is " + $rootScope.found);
				$scope.searchedWord = $rootScope.queryWord;
				
			} else {
				$rootScope.found = false;
			}
			
			
				
	
	function loadQueryWordContent () {
		console.log("Loading...");
		var ref = new Firebase(FIREBASE_URL + "dictionary");
        $scope.loadDictionary = $firebaseArray(ref);
	}
			
	console.log("3. $rootScope.found is " + $rootScope.found);
			
	if ($rootScope.found) {
		console.log("Founded");
		loadQueryWordContent ();
	}
			
			
			
			
		});
	}
	searchWord ();
	
    //Add New Word
    $('.successAdded').hide();
    $scope.addWord = function () {
        console.log("Clicked!");
        var ref = new Firebase(FIREBASE_URL);
        var dictionary = ref.child('dictionary');

        //var dictContent = 
        dictionary.push({
            word : $scope.word.newWord,
            image : $scope.word.imageName
        }, function (error) {
            if (error) {
                console.log('Push failed');
            } else {
                //$scope.newWord = '';
                console.log('Push Successed');
                $scope.clearInput();
                $scope.added();
            }
        });
    };
    $scope.clearInput = function () {
        $('.newWordInput').val('');
        $('.submitNewWordInput').attr("disabled", "disabled");
    }
    $scope.added = function () {
        $('.successAdded').show();
    }
    
    $scope.disableInput = function () {
        console.log("Inputed");
        var inputVal = $('.newWordInput').val();
        console.log("inputVal: " + inputVal);
        var inputValLength = inputVal.length;
        console.log("inputValLength: " + inputValLength);
        if (inputValLength > 0) {
            $('.submitNewWordInput').removeAttr("disabled");
        } else {
            $('.submitNewWordInput').attr("disabled", "disabled");
        }
    };
    
    //$scope.disableInput();
    
    var requestRef = new Firebase(FIREBASE_URL + "dictionary");
        $scope.requestDictionary = $firebaseArray(requestRef);
    
    $scope.deleteWord = function (key) {
        //var ref = new Firebase("https://lashuang.firebaseio.com/dictionary");
        $scope.requestDictionary.$remove(key);
        
    };
    
    
    //Get input fileds value
    $scope.checkInput = function () {

        var ref = new Firebase(FIREBASE_URL + "dictionary");
        $scope.dictionary = $firebaseArray(ref);
        
        $scope.searchWordLength = $('input.input').val().length;
        //console.log(searchWordLength);
        $scope.resultItems = $('.ajaxResultList li').length;
        console.log("resultItems " + $scope.resultItems);

    };
    
    //$('.uploadedImage, .uploadProgress').hide();
	
    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
    
	$scope.log = '';
	
    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                //globalData.uploadedImage = file;
                //console.log("Images is " +  globalData.uploadedImage);
                Upload.upload({
                    url: '../php/uploader.php',
                    file: file
                }).progress(function (evt) {
					//$('.uploadProgress').show();
					
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.progressBar = progressPercentage;
					
					$('.uploadProgress .bar').css("width", progressPercentage +'%');
					$scope.log = 'Progress: ' + progressPercentage + '%. ' + 'File: ' + evt.config.file.name;
                    
                }).success(function (data, status, headers, config) {
                    //$scope.imageFile = files[0]; //Show Image
                    console.log('file ' + config.file.name + " Data is " + data);
                    $rootScope.imgFileName = config.file.name;
                    $rootScope.imgFile = files[0];
                    $location.path('/dict');
                    //$('.uploadedImage, .uploadProgress').show();
                    //$('.img').show();
					//globalData.searchable = true;
                    //globalData.uploadedImageName = config.file.name;
                    //console.log("globalData.uploadedImageName is " +  globalData.uploadedImageName );
                });
            }
        }
    };
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}]);