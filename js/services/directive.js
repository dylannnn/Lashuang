app.directive('enterSubmit', function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            elem.bind('keydown', function(event) {
                 var code = event.keyCode || event.which;
                 if (code === 13) {
                       if (!event.shiftKey) {
                            event.preventDefault();
                            scope.$apply(attrs.enterSubmit);
                       }
                 }
            });
        }
    }
});
//http://code.ciphertrick.com/2015/03/15/change-row-selection-using-arrows-in-ng-repeat/
app.directive('arrowSelector',['$document',function($document){
    return{
        restrict:'A',
        link:function(scope,elem,attrs,ctrl){
            var elemFocus = false;             
            elem.on('mouseenter',function(){
                elemFocus = true;
            });
            elem.on('mouseleave',function(){
                elemFocus = false;
            });
            $document.bind('keydown',function(e){
                if(elemFocus){
                    if(e.keyCode == 38){
                        console.log(scope.selectedRow);
                        if(scope.selectedRow == 0){
                            return;
                        }
                        scope.selectedRow--;
                        scope.$apply();
                        e.preventDefault();
                    }
                    if(e.keyCode == 40){
                        if(scope.selectedRow == scope.foodItems.length - 1){
                            return;
                        }
                        scope.selectedRow++;
                        scope.$apply();
                        e.preventDefault();
                    }
                }
            });
        }
    };
}]);