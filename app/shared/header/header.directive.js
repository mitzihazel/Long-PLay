angular.module('longPlay').directive('header', [headerDirective]);

function headerDirective() {
  return {
    restrict: 'A',
    controller: function($scope, Menu) {
      $scope.menu = [];

      Menu.index()
        .then(function(response){
          $scope.menu = response.links;
        }
      );
    },
    link: function(scope, element, attrs) {
    },
    templateUrl: 'app/shared/header/header.tpl.html'
  }
}
