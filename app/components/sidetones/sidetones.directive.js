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

      /**
      * Effects when on large screen and user clicks on sidebar menu
      *  - push the main container to the right.
      */
      scope.$on('menu-opened', function(event, args) {
        angular.element(".short-list").addClass('push-aside');
      });
      scope.$on('menu-closed', function(event, args) {
        angular.element(".short-list").removeClass('push-aside');
      });
    },
    templateUrl: 'app/components/sidetones/sidetones.tpl.html'
  }
}
