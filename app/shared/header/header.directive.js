angular.module('longPlay').directive('header', ['$rootScope', headerDirective]);

function headerDirective($rootScope) {
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

        if ( angular.element('.hamburger-box').hasClass('active') ) {
          $rootScope.$broadcast('menu-opened');
        }
        else {
          $rootScope.$broadcast('menu-closed');
        }

      });
    },
    templateUrl: 'app/shared/header/header.tpl.html'
  }
}
