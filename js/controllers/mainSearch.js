app.controller("mainSearch", ["$scope", "$location", "$firebaseObject", "$firebaseArray", "pageLoad", "Upload", function ($scope, $location, $firebaseObject, $firebaseArray, pageLoad, Upload) {
    //initial function running
    pageLoad.iniFunc();
    //Add New Word
    $('.successAdded').hide();
    $scope.addWord = function () {
        console.log("Clicked!");
        var ref = new Firebase("https://lashuang.firebaseio.com");
        var dictionary = ref.child('dictionary');
        dictionary.push({
            word : $scope.word.newWord,
            image : $scope.word.imageName
        }, function (error) {
            if (error) {
                console.log('Push failed');
            } else {
                //$scope.newWord = '';
                console.log('Push Successed');
                clearInput();
                $scope.added();
            }
        });
    };
    function clearInput () {
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
    
    $scope.disableInput();
    
    var requestRef = new Firebase("https://lashuang.firebaseio.com/dictionary");
        $scope.requestDictionary = $firebaseArray(requestRef);
    
    $scope.deleteWord = function (key) {
        //var ref = new Firebase("https://lashuang.firebaseio.com/dictionary");
        $scope.requestDictionary.$remove(key);
        
    };
    //Get input fileds value
    $scope.checkInput = function () {

        var ref = new Firebase("https://lashuang.firebaseio.com/dictionary");
        $scope.dictionary = $firebaseArray(ref);
        
        $scope.searchWordLength = $('input.input').val().length;
        //console.log(searchWordLength);
        $scope.resultItems = $('.ajaxResultList li').length;
        console.log("resultItems " + $scope.resultItems);
        if ($scope.searchWordLength > 0 ) {
            //$('.uploadBar').hide();
        } else {
            //$('.uploadBar').show();
        }
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
                    url: '../includes/uploader.php',
                    file: file
                }).progress(function (evt) {
					//$('.uploadProgress').show();
					
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.progressBar = progressPercentage;
					
					$('.uploadProgress .bar').css("width", progressPercentage +'%');
					$scope.log = 'Progress: ' + progressPercentage + '%. ' + 'File: ' + evt.config.file.name;
                    
                }).success(function (data, status, headers, config) {
                    $scope.imageFile = files[0]; //Show Image
                    console.log('file ' + config.file.name + " Data is " + data);
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