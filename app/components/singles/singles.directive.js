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
    },
    templateUrl: 'app/components/singles/singles.tpl.html'
  }
}
