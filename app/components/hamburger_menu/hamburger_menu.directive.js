angular.module('longPlay').directive('hamburgerMenu', ['$rootScope', '$location', '$timeout',  singlesSidebarDirective]);

function singlesSidebarDirective($rootScope, $location, $timeout)   {
  return {
    restrict: 'A',
    controller: function($scope, singles, sidetones, books, authors, anchorSmoothScroll) {
      $scope.side_menus = [];
      $scope.currentLocation = $location.path();

      /**
      * Check the current page displayed
      * - render the sidebar content based on it.
      */
      if( $scope.currentLocation === '/single') {
        singles.index()
          .then(function(response) {
              $scope.side_menus = response.singles;
          }
        );
      }
      else if( $scope.currentLocation === '/sidetone') {
        sidetones.index()
          .then(function(response) {
            $scope.side_menus = response.sidetones;
          }
        );
      }
      else if( $scope.currentLocation === '/book') {
        books.index()
          .then(function(response) {
            $scope.side_menus = response.books;
          }
        );
      }
      else if( $scope.currentLocation === '/author') {
        authors.index()
          .then(function(response) {
            $scope.side_menus = response;
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
      $timeout(function() {
        var screenSize = window.innerWidth;
        console.log(screenSize);

        // we only need this effect when on Small screen sizes
        if (screenSize < 992 ) {
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
