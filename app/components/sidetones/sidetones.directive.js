angular.module('longPlay').directive('sidetonesPage', ['$timeout', sidetonesPageDirective]);

function sidetonesPageDirective($timeout) {
  return {
    restrict: 'A',
    controller: function($scope, sidetones) {
      $scope.sidetones = [];

      sidetones.index()
        .then(function(data) {
          $scope.sidetones = data.sidetones;
        }
      );
    },
    link: function(scope, element, attrs) {
      $timeout(function() {
        $(element).find('.bxslider').bxSlider();
      }, 500);
    },
    templateUrl: 'app/components/sidetones/sidetones.tpl.html'
  }
}
