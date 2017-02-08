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
      /**
      * Adding class to Header menu navigation
      * when scrolling vertically.
      */
      $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= 100) {
            $(".header-main").addClass("header-main-smallest");
            $rootScope.$broadcast('page-scrolled');
        }
        else if(scroll == 0) {
          $(".header-main").removeClass("header-main-smallest");
          $rootScope.$broadcast('on-top');
        }
      });

      /**
      * function implementations for hamburger-box
      */
      angular.element('.hamburger-box').click(function() {
        angular.element('.hamburger-box').toggleClass('active');

        if ( angular.element('.hamburger-box').hasClass('active') ) {
          $rootScope.$broadcast('menu-opened');
        }
        else {
          $rootScope.$broadcast('menu-closed');
        }

      });

      /**
      * Close hamburger-box when user selected already.
      */
      scope.$on('selected-single', function(event, args) {
        angular.element(".hamburger-box").removeClass('active');
      });
    },
    templateUrl: 'app/shared/header/header.tpl.html'
  }
}
