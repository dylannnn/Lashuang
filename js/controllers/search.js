app.controller("searchController", ["$scope", "$rootScope", "$location", "$route", "$http", "FIREBASE_URL", "$firebaseArray", "pageLoad", "Upload", function ($scope, $rootScope, $location, $route, $http, FIREBASE_URL, $firebaseArray, pageLoad, Upload) {
    //initial function running
    pageLoad.iniFunc();
    
    //Debug para
	console.dir($route.current.params);
	
    //tab feature
    $scope.selectedTab = 1;
	
	//Get query word Function. Return the string
	function getQueryVal() {
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
		function(m,key,value) {
			vars[key] = value;
		});
		return vars;
	}
    
//===============================================
	//$rootScope.queryWord = getQueryVal()["q"];
	$rootScope.found = false;
//===============================================
	console.log("1. $rootScope.found is " + $rootScope.found);//false
    //Search Word function. 
	function searchWord () {
        //Connect to firebase
		var ref = new Firebase(FIREBASE_URL + "dictionary");
        var dictionary = $firebaseArray(ref);
		
		$scope.catalogueDict = $firebaseArray(ref);
		
        //Callback function. After loaded, then run this.
		dictionary.$loaded().then(function(data) {
            
			console.log("Data length: " + data.length);
			console.dir(data);
			
			$scope._limitNo = data.length;
			
			$rootScope.queryWord = getQueryVal()["q"];
			console.log("$rootScope.queryWord is " + $rootScope.queryWord);
            //Create an array to compare with the query string
			var words = [];
			for (var i = 0; i < data.length; i++) {
				var wordContent = data[i];
				words.push(wordContent.word);
			}
			console.dir(words);
			
			if (words.indexOf($rootScope.queryWord) != -1) {
                //if found
				$rootScope.found = true;
				
				console.log("2. $rootScope.found is " + $rootScope.found);
                
                //???
				$scope.searchedWord = $rootScope.queryWord;
                
                $scope.wordIndex = words.indexOf($rootScope.queryWord);
				
			} else {
				$rootScope.found = false;
                //$scope.wordIndex = words.indexOf($rootScope.queryWord);
			}
			
			if ($rootScope.found) {
				console.log("Founded");
				loadQueryWordContent ($scope.wordIndex);
			}		
		});
	}
	searchWord ();
	
	
	//search. For in loop
	function loadQueryWordContent (wordIndex) {
		console.log("Loading...");
		var ref = new Firebase(FIREBASE_URL + "dictionary");
        $scope.loadDictionary = $firebaseArray(ref);
		
		$scope.loadDictionary.$loaded().then(function(data) {
            
            console.dir(data[wordIndex].dictContent);
            $scope.thisDictContent = data[wordIndex].dictContent;
            $scope.thisDictExp = $scope.thisDictContent.explanation;
			$scope.thisDictCommonUsage = $scope.thisDictContent.commonUsage;
			$scope.thisExem = $scope.thisDictContent.examples;
            console.dir($scope.thisDictExp);
            console.dir($scope.thisDictCommonUsage);
            console.dir($scope.thisExem);
		});
	}
	
//	$scope.catalogueDict.$loaded().then(function (data) {
//		for (var i = 0; i <= data.length; i ++) {
//			if (data[i].word.indexOf($rootScope.queryWord) != -1) {
//				
//			}
//		}
//	});
	
	
	$scope.limitNoFunc = function () {
		$scope.limitNo = $scope.limitNo + 5
		if ($scope.limitNo >= $scope._limitNo) {
			$scope.limitNo = $scope._limitNo;
		}
	}
    //Load all vocabulary to Catalogue in the dict page view and add "active" class if the item match the query item
    //$scope.limitNo <= _limitNo;
    //Add New Word
//    $('.successAdded').hide();
//    $scope.addWord = function () {
//        console.log("Clicked!");
//        var ref = new Firebase(FIREBASE_URL);
//        var dictionary = ref.child('dictionary');
//
//        //var dictContent = 
//        dictionary.push({
//            word : $scope.word.newWord,
//            image : $scope.word.imageName
//        }, function (error) {
//            if (error) {
//                console.log('Push failed');
//            } else {
//                //$scope.newWord = '';
//                console.log('Push Successed');
//                $scope.clearInput();
//                $scope.added();
//            }
//        });
//    };
//	
    // Put new word explanation to an array
	$http.get("/data/pos.json").success(function(data) {$scope.pos = data;}).error(function() {console.log("Get JSON failed!")});
	
    $scope._newWordExp = [];
	
    $scope._pos = [];
	$scope.addPos = function () {
		console.log("You selected something!");
        if ($scope.word.pos) {
            $scope._pos.push({
                pos : $scope.word.pos
            });
        }
        console.dir($scope._pos);
        //console.dir($scope.word.newWordExp[posItem]);
	}
    $scope.delPos = function ($index) {
        console.log("You deleted a POS");
        $scope._pos.splice($index, 1);
        console.dir($scope._pos);
    }

    
    $scope.addItemOne = function () {

        
        //$scope.itemOne = $scope._newWordExp;
		if ($scope.word.newWordExp) {
			console.log("TRUE");
            
            
            
			//$scope._pos.push($scope.word.pos);
            
            $scope._newWordExp.push({
                
//				content: $scope.word.newWordExp[posItem.pos]
			});
            
            //$scope._pos.push({
				//content: $scope.word.newWordExp
			//});
            
            
//			$scope._newWordExp[$index].push({
//				content: $scope.word.newWordExp[$index]
//			});

			console.dir($scope._newWordExp);
            console.dir($scope._pos);
			//$scope.word.newWordExp = '';
		} else {
			console.log("FALSE");
		}
    };
    $scope.deleteItemOne = function ($index) {
		$scope._newWordExp.splice($index, 1);
	};
	
	
    $scope._newWordCommonUsage = [];

    
    $scope.addItemTwo = function (index) {
        //$scope.itemTwo = $scope._newWordCommonUsage;
		if ($scope.word.newWordCommonUsage) {
			console.log("TRUE");
			$scope._newWordCommonUsage.push({
				content: $scope.word.newWordCommonUsage
			});
			console.dir($scope._newWordCommonUsage);
			$scope.word.newWordCommonUsage = '';
		} else {
			console.log("FALSE");
		}
    };
	$scope.deleteItemTwo = function ($index) {
		$scope._newWordCommonUsage.splice($index, 1);
	};
    
    $scope._newWordExamples = [];

    
    $scope.addItemThree = function (index) {
        //$scope.itemThree = $scope._newWordExamples;
		if ($scope.word.newWordExamples) {
			console.log("TRUE");
			$scope._newWordExamples.push({
				content: $scope.word.newWordExamples
			});
			console.dir($scope._newWordExamples);
			$scope.word.newWordExamples = '';
		} else {
			console.log("FALSE");
		}
    };
    $scope.deleteItemThree = function ($index) {
		$scope._newWordExamples.splice($index, 1);
	};
	
	
    $scope.addNewWord = function () {
		
        console.log("!!!!! Clicked!");
        var ref = new Firebase(FIREBASE_URL);
        var dictionary = ref.child('dictionary');
		console.log($scope._newWordExp.length);
		
		
		if ($scope._newWordExp.length == 0){
			$scope._newWordExp = [{content:""}];
		}
		
		if ($scope._newWordCommonUsage.length == 0){
			$scope._newWordCommonUsage = [{content:""}];
		}
		
		if ($scope._newWordExamples.length == 0){
			$scope._newWordExamples = [{content:""}];
		}
		
        //var dictContent = 
        dictionary.push({
            word : $scope.word.newWord,
			dictContent : {
				explanation : $scope._newWordExp,
				commonUsage : $scope._newWordCommonUsage,
				examples : $scope._newWordExamples
			}
        }, function (error) {
            if (error) {
                console.log('Push failed');
            } else {
                console.log('Push Successed');
				$scope.clearAddNewWord();
            }
        });
    };
	
    $scope.clearAddNewWord = function () {
		console.log("Running clearAddNewWord function");
	}
    
    

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
    

	
	
    //Image Upload function
    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
	
	$scope.log = '';
	
    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: '../php/uploader.php',
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.progressBar = progressPercentage;
					$('.uploadProgress .bar').css("width", progressPercentage +'%');
					$scope.log = 'Progress: ' + progressPercentage + '%'
                }).success(function (data, status, headers, config) {
                    
                    var _fileName = config.file.name;
                    var _fileNameArr = _fileName.split('.');
                    
                    $rootScope.upluadFileName = _fileNameArr[0];
                    $rootScope.upluadFileFullName = _fileNameArr[0] + '.' + _fileNameArr[1]
                    $rootScope.upluadFile = files[0];
                    console.log("upluadFileName: " + $rootScope.upluadFileName + '; upluadFileFullName: ' + $rootScope.upluadFileFullName);
					$location.path('/dict/').search({q: $rootScope.upluadFileName});
                });
            }
        }
    };
    
    
    
    
    // Magnific Popup
	$('a.popup').magnificPopup({
		type: 'inline',
		midClick: true,
		closeBtnInside: true,
		closeOnBgClick: false,
		closeOnContentClick: false,
		mainClass: 'laPop mfp-fade',
		removalDelay: 300,
		fixedBgPos: true,
		callbacks: {
			open: function () {
				// Will fire when this exact popup is opened
				// this - is Magnific Popup object
				//$scope.disableInput();
			},
			close: function () {
				// Will fire when popup is closed
				$("#addNewWord input,#addNewWord select").val("");
				//$scope.word.newWordExp = '';
			},
			updateStatus: function (data) {
				console.log('Status changed', data);
				// "data" is an object that has two properties:
				// "data.status" - current status type, can be "loading", "error", "ready"
				// "data.text" - text that will be displayed (e.g. "Loading...")
				// you may modify this properties to change current status or its text dynamically
			},
			parseAjax: function (mfpResponse) {
				// mfpResponse.data is a "data" object from ajax "success" callback
				// for simple HTML file, it will be just String
				// You may modify it to change contents of the popup
				// For example, to show just #some-element:
				// mfpResponse.data = $(mfpResponse.data).find('#some-element');

				// mfpResponse.data must be a String or a DOM (jQuery) element

				console.log('Ajax content loaded:', mfpResponse);
			},
			ajaxContentAdded: function () {
				// Ajax content is loaded and appended to DOM
				console.log(this.content);
			}
		}
	});
	// END Magnific Popup

    
    
    
    
    
    
    
    
    
    
}]);