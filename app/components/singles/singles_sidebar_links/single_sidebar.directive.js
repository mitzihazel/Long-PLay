angular.module('longPlay').directive('singlesSidebar', ['$rootScope', '$location', '$anchorScroll', singlesSidebarDirective]);

function singlesSidebarDirective($rootScope, $location, $anchorScroll) {
  return {
    restrict: 'A',
    controller: function($scope, singles) {
      $scope.singles_side = [];

      singles.index()
        .then(function(response) {
            $scope.singles_side = response.singles;
        }
      );

      /**
      * Implementing anchorScroll
      */
      $scope.scrollTo = function(id) {
        $location.hash(id);
        $anchorScroll();
     }
    },
    link: function(scope, element, attrs) {
      angular.element(".aside-content-wrapper").click(function() {
        $rootScope.$broadcast('selected-single');
      });

      /**
      * Hamburger Menu Options
      */
      scope.$on('menu-opened', function(event, args) {
        angular.element(".singles-page-sidebar-wrapper").addClass('active');
      });
      scope.$on('menu-closed', function(event, args) {
        angular.element(".singles-page-sidebar-wrapper").removeClass('active');
      });

      /**
      * Sidebar wrapper display
      */
      scope.$on('selected-single', function(event, args) {
        angular.element(".singles-page-sidebar-wrapper").removeClass('active');
      });
    },
    templateUrl: 'app/components/singles/singles_sidebar_links/singles_sidebar.tpl.html'
  }
}
