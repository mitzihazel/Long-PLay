angular.module('longPlay').directive('singlesPage', [singlesPageDirective]);

function singlesPageDirective() {
  return {
    restrict: 'A',
    controller: function($scope, singles) {
      $scope.singles = [];

      singles.index()
        .then(function(response) {
            $scope.singles = response.singles;
        }
      );
    },
    link: function(scope, element, attrs) {
      /**
      * Effects when on large screen and user clicks on sidebar menu
      *  - push the main container to the right.
      */
      scope.$on('menu-opened', function(event, args) {
        angular.element(".single .container").addClass('push-aside');
      });
      scope.$on('menu-closed', function(event, args) {
        angular.element(".single .container").removeClass('push-aside');
      });
    },
    templateUrl: 'app/components/singles/singles.tpl.html'
  }
}
