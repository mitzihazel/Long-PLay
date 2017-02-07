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
      angular.element('.hamburger-box').click(function() {
        angular.element('.hamburger-box').toggleClass('active');
      });
    },
    templateUrl: 'app/shared/header/header.tpl.html'
  }
}
