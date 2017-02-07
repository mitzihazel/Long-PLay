angular.module('longPlay').directive('sidetoneSlider', ['$timeout', sidetoneSliderDirective]);

function sidetoneSliderDirective($timeout) {
  return {
    restrict: 'A',
    controller: function($scope, sidetoneSlider) {
      $scope.sidetones = [];

      sidetoneSlider.index()
        .then(function(response) {
          $scope.sidetones = response.sidetones;
        }
      );

    },
    link: function(scope, element, attrs) {
      $timeout(function() {
        $(element).find('.sidetones-bxslider').bxSlider({
          mode: 'horizontal',
          infiniteLoop: false,
          minSlides: 2,
          maxSlides: 2,
          slideWidth: 320,
          slideMargin: 10,
        });
      }, 500);
    },
    templateUrl: 'app/components/homepage/sidetones-slideshow/sidetone.tpl.html'
  }
}
