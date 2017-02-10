angular.module('longPlay',[
  'ngRoute',
  'ngSanitize'
]);

angular.module('longPlay')
.filter('to_trusted', ['$sce', function($sce){
      return function(text) {
          return $sce.trustAsHtml(text);
      };
}]);

  // use the HTML5 History API
  $locationProvider.html5Mode(true);

});

angular.module("longPlay").run(function($location, $rootScope) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    var nextLocation = $location.path();
    var last = nextLocation.replace("/", "");

    if ( last == "" ) {
      $rootScope.path = "homepage";
    }
    else {
      $rootScope.path = last;
    }
  });
});

/**
* Singles Directive
*/
angular.module('longPlay').directive('singlesPage', ['$sce', singlesPageDirective]);

function singlesPageDirective($sce) {
  return {
    restrict: 'A',
    controller: function($scope, singles) {
      $scope.singles = [];

      singles.index()
        .then(function(response) {
            $scope.singles = response;
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
    templateUrl: 'template/singles.tpl.html'
  }
}

/**
* Sidetones directive
*/
angular.module('longPlay').directive('sidetonesPage', ['$timeout', sidetonesPageDirective]);

function sidetonesPageDirective($timeout) {
  return {
    restrict: 'A',
    controller: function($scope, sidetones) {
      $scope.sidetones = [];

      sidetones.index()
        .then(function(data) {
          $scope.sidetones = data;
        }
      );
    },
    link: function(scope, element, attrs) {
      $timeout(function() {
        $(element).find('.bxslider').bxSlider();
      }, 500);

      /**
      * Effects when on large screen and user clicks on sidebar menu
      *  - push the main container to the right.
      */
      scope.$on('menu-opened', function(event, args) {
        angular.element(".short-list").addClass('push-aside');
      });
      scope.$on('menu-closed', function(event, args) {
        angular.element(".short-list").removeClass('push-aside');
      });
    },
    templateUrl: 'template/sidetones.tpl.html'
  }
}

/**
* Books directive
*/
angular.module('longPlay').directive('booksPage', ['$timeout', booksPageDirective]);

function booksPageDirective($timeout) {
  return {
    restrict: 'A',
    controller: function($scope, books) {
      $scope.books = [];

      books.index()
        .then(function(data) {
          $scope.books = data;
        }
      );
    },
    link: function(scope, element, attrs) {
      scope.$on('menu-opened', function(event, args) {
        angular.element(".single .container").addClass('push-aside');
      });
      scope.$on('menu-closed', function(event, args) {
        angular.element(".single .container").removeClass('push-aside');
      });
    },
    templateUrl: 'template/books.tpl.html'
  }
}

/**
* Authors directive
*/
angular.module('longPlay').directive('authorsPage', ['$timeout', '$location', authorsPageDirective]);

function authorsPageDirective($timeout, $location) {
  return {
    restrict: 'A',
    controller: function($scope, authors) {
      var protocol = $location.protocol();
      var host = $location.host();

      $scope.authors = [];
      /**
      * Get the path domain of the site.
      * we will be getting the images using the whole src,
      * along with site path. Due to angular.
      */
      $scope.base_path = protocol + '://' + host;

      authors.index()
        .then(function(data) {
          $scope.authors = data;
        }
      );
    },
    link: function(scope, element, attrs) {
      $timeout(function() {
        $(element).find('.related-singles-bxslider').bxSlider({
          mode: 'horizontal',
          infiniteLoop: false,
          minSlides: 2,
          maxSlides: 2,
          slideWidth: 320,
          slideMargin: 10,
        });
      }, 500);
      scope.$on('menu-opened', function(event, args) {
        angular.element(".author-teaser").addClass('push-aside');
      });
      scope.$on('menu-closed', function(event, args) {
        angular.element(".author-teaser").removeClass('push-aside');
      });
    },
    templateUrl: 'template/authors.tpl.html'
  }
}

/**
* Hamburger Menu directive
*/
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
              $scope.side_menus = response;
          }
        );
      }
      else if( $scope.currentLocation === '/sidetone') {
        sidetones.index()
          .then(function(response) {
            $scope.side_menus = response;
          }
        );
      }
      else if( $scope.currentLocation === '/book') {
        books.index()
          .then(function(response) {
            $scope.side_menus = response;
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

        // var top = $(".aside-content-wrapper a.active" ).offset().top
        // var height = $(".aside-content-wrapper" ).height();
        // var diff = top - height/2
        // $(".aside-content-wrapper" ).scrollTop($(".aside-content-wrapper" ).scrollTop()+diff)
     }
    },
    link: function(scope, element, attrs) {
      angular.element('.aside-content-wrapper').on('click', function(e) {
        var el = angular.element('.aside-content-wrapper a.active');
        var windowHeight = $(window).height();
        var offset;

        offset = (windowHeight / 2);

        var speed = 700;
        angular.element('.aside-content-wrapper').animate({scrollTop:offset}, speed);
      });

      $timeout(function() {
        var screenSize = window.innerWidth;

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
    templateUrl: 'template/hamburger_menu.tpl.html'
  }
}


/**
* Factories or services that get data
*/

/* Singles factory */
angular.module('longPlay').factory('singles',['$q', '$http', singlesService]);

function singlesService($q, $http, urlConstant) {
  var service = {};
  var apiUrl = '/ajax/single_list';

  service.index = function() {
    var def = $q.defer();
    $http.get(apiUrl)
      .success(function(data){
        def.resolve(data);
      })
      .error(function(response){
        def.reject(response);
      });
    return def.promise;
  }

  return service;
}

/**
* Sidetones factory
*/
angular.module('longPlay').factory('sidetones',['$q', '$http', sidetonesService]);

function sidetonesService($q, $http, urlConstant) {
  var service = {};
  var apiUrl = '/ajax/sidetone';

  service.index = function() {
    var def = $q.defer();
    $http.get(apiUrl)
      .success(function(data){
        def.resolve(data);
      })
      .error(function(response){
        def.reject(response);
      });
    return def.promise;
  }

  return service;
}

/**
* Books Factory
*/
angular.module('longPlay').factory('books',['$q', '$http', booksService]);

function booksService($q, $http, urlConstant) {
  var service = {};
  var apiUrl = '/ajax/books';

  service.index = function() {
    var def = $q.defer();
    $http.get(apiUrl)
      .success(function(data){
        def.resolve(data);
      })
      .error(function(response){
        def.reject(response);
      });
    return def.promise;
  }

  return service;
}

/**
* Author Factory
*/
angular.module('longPlay').factory('authors',['$q', '$http', authorsService]);

function authorsService($q, $http, urlConstant) {
  var service = {};
  var apiUrl = '/ajax/authors';

  service.index = function() {
    var def = $q.defer();
    $http.get(apiUrl)
      .success(function(data){
        def.resolve(data);
      })
      .error(function(response){
        def.reject(response);
      });
    return def.promise;
  }

  return service;
}
