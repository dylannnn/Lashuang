var app = angular.module('LaShuang', ["LiveSearch"]);

app.controller('pageLoad', function ($scope, $http) {
    // Page load Function
    //    1. Switch template based on the "searched"  variable
    //    2. Include popup content based on the variable "incPop"
    //    3. isMobile function detect the visitor use mobile or not to visit this site
    //    4. getBrowser function is get the browser vender -> MOZ has unconsistent issue, use this one to fix
    //    5. addClassTo function is to add a class name
    $scope.scriptHandler = {
		getInclude: function () {
			$scope.searched = false; //Important Variable
			if($scope.searched){
				return 'includes/dictContent.html';
			}
			return 'includes/mainSearch.html';
		},
		includePopup: function () {
			$scope.incPop = false; //Important Variable
			if($scope.incPop){
				return 'includes/addNewVocabulary.html';
			}
			return '';
		},
		isMobile : function () {
			var isNotMobile = (function () {
				var check = false;
				(function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))check = true} )(navigator.userAgent || navigator.vendor || window.opera);
				return check;
			})();
			switch (isNotMobile) {
				case true:
					$scope.scriptHandler.progressBtn();
					break;
				case false:
					break;
				default:
					return false;
			}
		},
		getBrowser : function () {
			//return  navigator ? navigator.userAgent.toLowerCase() : "other";
			if (navigator.userAgent.indexOf("Chrome") != -1) {
				return 'Chrome';
			}
			else if (navigator.userAgent.indexOf("Opera") != -1) {
				return 'Opera';
			}
			else if (navigator.userAgent.indexOf("Firefox") != -1) {
				return 'Firefox';
			}
			else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) {
				return 'IE';
			}
			else {
				return 'unknown';
			}
			//
		},
		addClassTo : function (claName) {
			$(claName).addClass('moz');
		},
		progressBtn : function () {
			var progressBar = new ProgressBar.Circle('.uploadProgressBtn', {
				strokeWidth: 5,
				color: "#faa500",
				fill: "#000",
				trailColor: "#666",
				trailWidth: 10,
				text: {
					value: ' ',
					color: 'transparent',
					className: 'progressbarText',
					autoStyle: false
				},
				duration: 1200,
				easing: "easeOut"
			});
		},
        requiredFunc : function () {
            $("[data-toggle='tooltip']").tooltip();

            // ##1 - Bind the upload btn
            $('#searchWrapper .upload').click(function () {
                $('#searchWrapper .uploadBtn').click();
            });
            
            $('#searchWrapper .uploadMobile').click(function () {
                $('#searchWrapper .uploadBtn').click();
            });

            $('.ajaxResultWrapper').hide();

            $('.input').on('focus', function () {
                $('.searchIcon .icon').addClass('focus');
            });

            $('.input').on('focusout', function () {
                $('.searchIcon .icon').removeClass('focus');
            });
            
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
					},
					close: function () {
						// Will fire when popup is closed
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
        },
		pageload : function () {
			// #0 - Running the required functions

			// #2 - Check if open the site on Mobile or not
			$scope.scriptHandler.isMobile();
            $scope.scriptHandler.requiredFunc();
			
			$http.get("../includes/ajax/test.php").success(function (data) {
				$scope.tasks = data;
				console.log($scope.tasks);
			});
		}
	};
});

app.controller('searchCtrl',function ($scope, $http) {
    
    $scope.scriptHandler.pageload();
    
	var searchHandler = {
        showSearchInputVal : function () {
			var searchInput = $('#searchWrapper .input');
			searchInput.keyup(function () {
				var strLength = searchInput.val().length;
				if (strLength > 0) {
					console.log("Typed!!!");
                    
                    searchHandler.readJSON();
                    
                    
					$('.uploadBar').hide();
					$('.ajaxResultWrapper').slideDown('fast');
				} else if (strLength == 0) {
					$('.ajaxResultWrapper').slideUp('fast', function () {
						$('.uploadBar').show();
					});
				}
			});
		},
        readJSON : function () {
             //parse the local json testing
            $http.get('data/dict.json').
            success(function(data, status, headers, config) {
                $scope.words = data.words;
                for (var i = 0; i <= $scope.words.length;  i++) {
                    $scope.word = $scope.words[i];
                    console.log("dict Length is " +$scope.words.length);
                    for (key in $scope.words[i]) {
                        console.log("Key: " +key);
                        
                        console.log("Item Key: " +$scope.words[i][key]);
                    }
                }
            }).
            error(function(data, status, headers, config) {
                // log error
            });
        }
    };
    searchHandler.showSearchInputVal();
});

app.controller("liveSearch", function($scope, $http, $q, $window) {

    $scope.wordSearch = "";
    
    $scope.mySearchCallback = function(params) {

      var defer = $q.defer();

      $http.jsonp("http://gd.geobytes.com/AutoCompleteCity?callback=JSON_CALLBACK&q=" + params.query)
        .then(function(response) {
          if(!response.data) {
            defer.resolve([]);
          }
          var cities = response.data.map(function(city) {
            var parts = city.split(",");
            return {
              fullName: city,
              city: parts[0],
              state: parts[1],
              country: parts[2]
            };
          });
          defer.resolve(cities);
        })
        .catch(function(e) {
          $window.alert(e.message);
          defer.reject(e);
        });

        return defer.promise;
    };
});

app.controller("OpenPopup", function ($scope) {
	if ($scope.scriptHandler.getBrowser() == "Firefox") {
		$scope.scriptHandler.addClassTo('.browser');
		$('.browser').mCustomScrollbar({
			scrollInertia: 10,
			theme: "dark-thin"
		});//Shows erron on firefox but IT works, need to change the speed of the scroll
	}
	$('a.cancel').click(function () {
		$.magnificPopup.close(); 
	});
});

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
					console.log("Enter Key Pressed");
					var searchInput = $('#searchWrapper .input');
					if (searchInput.val().length > 0) {
						
					}
				});
                event.preventDefault();
            }
			
        });
    };
});