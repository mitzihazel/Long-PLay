angular.module('longPlay').directive('hamburgerMenu', ['$rootScope', '$location', singlesSidebarDirective]);

function singlesSidebarDirective($rootScope, $location) {
  return {
    restrict: 'A',
    controller: function($scope, singles, sidetones, anchorSmoothScroll) {
      $scope.side_menus = [];

      /**
      * Check the current page displayed
      * - render the sidebar content based on it.
      */
      if($location.path() === '/single') {
        singles.index()
          .then(function(response) {
              $scope.side_menus = response.singles;
          }
        );
      }
      else if($location.path() === '/sidetone') {
        sidetones.index()
          .then(function(response) {
            $scope.side_menus = response.sidetones;
          }
        );
      }

      /**
      * Implementing anchorScroll
      */
      $scope.scrollTo = function(id) {
        $location.hash(id);
        anchorSmoothScroll.scrollTo(id);
        angular.element(".aside-content-wrapper a" ).removeClass('active');
        angular.element(".aside-content-wrapper a[href=#"+ id +"]" ).addClass('active');
     }
    },
    link: function(scope, element, attrs) {
      $(window).resize(function(){
        var screenSize = window.innerWidth;

        // we only need this effect when on Small screen sizes
        if (screenSize < 1200 ) {
          angular.element(".aside-content-wrapper").click(function() {
            $rootScope.$broadcast('selected-single');
          });
        }
      });

      /**
      * Update the position of Hamburger when Page is scrolled and
      * Header menu is changed.
      */
      scope.$on('page-scrolled', function(event, args) {
        angular.element(".page-sidebar-wrapper").addClass('up-scrolled');
      });
      scope.$on('on-top', function(event, args) {
        angular.element(".page-sidebar-wrapper").removeClass('up-scrolled');
      });

      /**
      * Hamburger Menu Options
      */
      scope.$on('menu-opened', function(event, args) {
        angular.element(".page-sidebar-wrapper").addClass('active');
      });
      scope.$on('menu-closed', function(event, args) {
        angular.element(".page-sidebar-wrapper").removeClass('active');
      });

      /**
      * Sidebar wrapper display
      */
      scope.$on('selected-single', function(event, args) {
        angular.element(".page-sidebar-wrapper").removeClass('active');
      });
    },
    templateUrl: 'app/components/hamburger_menu/hamburger_menu.tpl.html'
  }
}
