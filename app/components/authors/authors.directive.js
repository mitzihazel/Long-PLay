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
    },
    templateUrl: 'app/components/authors/authors.tpl.html'
  }
}
