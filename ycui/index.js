/**
 * Created by moka on 16-9-13.
 */
var app = angular.module('app', []);

app.directive('ycModalTransclude', ['$animate', function($animate) {
    return {
        link: function(scope, element, attrs, controller, transclude) {
            transclude(scope.$parent, function(clone) {
                element.empty();
                $animate.enter(clone, element);
            });
        }
    };
}]);

app.directive('ycModal',[function () {
    return {
        restrict: 'AE',
        transclude:true,
        template:`
            <div class="dialog-bg">
                <div class="dialog-wraper">
                    <div class="dialog-title">
                        <i class="dialog-close yc-icon">&#xe614;</i>
                    </div>
                    <div class="dialog-con" yc-modal-transclude>

                    </div>
                    <div class="dialog-submit">
                        <a href="javascript:void (0)" class="ok">确定</a>
                        <a href="javascript:void (0)" class="no">取消</a>
                    </div>
                </div>
            </div>
        `,
        replace: true,
        compile:function (element, attrs, transclude) {
            return{
                link:function (scope,element,attr) {

                },
                pre:function (scope,element,attr) {

                }
            }
        }
    };
}]);

app.provider('$ycModal',function () {
    var $modalProvider = {
        $get:['$rootScope','$document','ycModal',function ($rootScope, $document,ycModal) {
            var $modal = {};

            $modal.open = function () {
                $document.find('body').append($compile('<yc-modal></yc-modal>'))
            }
            
            return $modal
        }]
    }
    return $modalProvider;
});


app.controller('dialogCtrl',['$scope','$ycModal',function ($scope,$ycModal) {
    $scope.show = function () {
        $ycModal.open();
    }
    console.info($ycModal);
}]);