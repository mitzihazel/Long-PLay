// Configuration for Routing.
angular.module('longPlay').config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "app/shared/landing_page/homepage.view.html"
  })
  .when("/single", {
    templateUrl : "app/shared/singles/singles.view.html",
    reloadOnSearch: false
  })
  .when("/sidetone", {
    templateUrl : "app/shared/sidetones/sidetones.view.html",
    reloadOnSearch: false
  })

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
