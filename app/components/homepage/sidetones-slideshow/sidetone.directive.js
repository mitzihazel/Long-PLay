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
          captions: false,
          minSlides: 2,
          maxSlides: 2,
          slideWidth: 600,
          slideMargin: 10,
          nextSelector: '#swiper-next-singles',
          prevSelector: '#swiper-prev-singles',
        });
      }, 500);
    },
    templateUrl: 'app/components/homepage/sidetones-slideshow/sidetone.tpl.html'
  }
}
