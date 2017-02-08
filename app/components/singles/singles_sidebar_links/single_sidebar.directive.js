angular.module('longPlay').directive('singlesSidebar', ['$rootScope', '$location', singlesSidebarDirective]);

function singlesSidebarDirective($rootScope, $location) {
  return {
    restrict: 'A',
    controller: function($scope, singles, anchorSmoothScroll) {
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
        angular.element(".singles-page-sidebar-wrapper").addClass('up-scrolled');
      });
      scope.$on('on-top', function(event, args) {
        angular.element(".singles-page-sidebar-wrapper").removeClass('up-scrolled');
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
