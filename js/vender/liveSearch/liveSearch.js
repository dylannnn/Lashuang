'use strict';

angular.module("LiveSearch", ["ng"])
 .directive("liveSearch", ["$compile", "$timeout", function ($compile, $timeout) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            liveSearchCallback: '=',
            liveSearchSelect: '=?',
            liveSearchSelectCallback: '=',
            liveSearchItemTemplate: '@',
            liveSearchWaitTimeout: '=?',
            liveSearchMaxResultSize: '=?',
            liveSearchMaxlength: '=?'
        },
        template: "<input id='filter-by' class='form-control input' name='search'  type='search' placeholder='Rechercher' tabindex='1'/>",
        link: function (scope, element, attrs, controller) {
            var timeout;

            scope.results = [];
            scope.visible = false;
            scope.selectedIndex = -1;

            scope.select = function (index) {
                scope.selectedIndex = index;
                scope.visible = false;
            };

            scope.isSelected = function (index) {
                return (scope.selectedIndex === index);
            };

            scope.$watch("selectedIndex", function(newValue, oldValue) {
                var item = scope.results[newValue];
                if(item) {
                    if(attrs.liveSearchSelectCallback) {
                        var value = scope.liveSearchSelectCallback.call(null, {items: scope.results, item: item});
                        element.val(value);
                    }
                    else {
                        if (attrs.liveSearchSelect) {
                            element.val(item[attrs.liveSearchSelect]);
                        }
                        else {
                            element.val(item);
                        }
                    }
                }
                if ('undefined' !== element.controller('ngModel')) {
                    element.controller('ngModel').$setViewValue(element.val());
                }
            });

         

            element[0].onkeydown = function (e) {
                //keydown
                if (e.keyCode == 40) {
                    if(scope.selectedIndex + 1 === scope.results.length) {
                        scope.selectedIndex = 0;
                    }
                    else {
                        scope.selectedIndex++;
                    }
                }
                //keyup
                else if (e.keyCode == 38) {
                    if(scope.selectedIndex === 0) {
                        scope.selectedIndex = scope.results.length - 1;    
                    }
                    else if(scope.selectedIndex == -1) {
                        scope.selectedIndex = 0;
                    }
                    else scope.selectedIndex--;
                }
                //keydown or keyup
                if (e.keyCode == 13) {
                    scope.visible = false;
                }

                //unmanaged code needs to force apply
                scope.$apply();
            };

            element[0].onkeyup = function (e) {
                if (e.keyCode == 13 || e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
                    return false;
                }
                var target = element;
                // Set Timeout
                $timeout.cancel(timeout);
                // Set Search String
                var vals = target.val().split(",");
                var search_string = vals[vals.length - 1].trim();
                // Do Search
                console.log("1. search_string.length  is " + search_string.length );
                console.log("2. scope.liveSearchMaxlength  is " + scope.liveSearchMaxlength);
                console.log("3. search_string.length  is " + search_string.length);
                if (search_string.length < 3 ||
                    (scope.liveSearchMaxlength !== null && search_string.length > scope.liveSearchMaxlength)) {
                    scope.visible = false;
                    //unmanaged code needs to force apply
                    scope.$apply();
                    return;
                }
                timeout = $timeout(function () {
                    var results = [];
                    var promise = scope.liveSearchCallback.call(null, { query: search_string });
                    promise.then(function (dataArray) {
                        if (dataArray) {
                            results = dataArray.slice(0, (scope.liveSearchMaxResultSize || 20) - 1);
                        }
                        scope.visible = true;
                    });
                    promise.finally(function() {
                        scope.selectedIndex = -1;
                        scope.results = results.filter(function(elem, pos) {
                            return results.indexOf(elem) == pos;
                        });
                    });
                }, scope.liveSearchWaitTimeout || 100);
            };

            var itemTemplate = element.attr("live-search-item-template") || "{{result}}";
            var template = "<div class='searchResultsWrapper'><ul ng-show='visible' class='searchResults'><li class='resultItem' ng-class=\"{ 'selected' : isSelected($index) }\" ng-click='select($index)' ng-repeat='result in results'><a href='#'><span class='text'>" + itemTemplate + "</span></a></li></ul><div>";
            var searchPopup = $compile(template)(scope);
            document.getElementById("liveSearch").appendChild(searchPopup[0]);
        }
    };
}]);
