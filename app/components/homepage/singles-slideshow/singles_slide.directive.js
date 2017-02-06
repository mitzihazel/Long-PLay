angular.module('longPlay').directive('singleSlideshow', ['$timeout', singleSlideshowDirective]);

function singleSlideshowDirective($timeout) {
  return {
    restrict: 'A',
    controller: function($scope, SinglesSlideshow) {
      $scope.singles = [];

      SinglesSlideshow.index()
        .then(function(response) {
          $scope.singles = response.singles;
        }
      );
    },
    link: function(scope, elm, attr) {
      $timeout(function() {
        $(elm).find('.bxslider').bxSlider({
          minSlides: 2,
          maxSlides: 2,
          slideMargin: 10,
        });
        $(elm).find('.single--related-short').bxSlider({
          minSlides: 2,
          maxSlides: 2,
          slideMargin: 10,
        });
      }, 500);
    },
    templateUrl: 'app/components/homepage/singles-slideshow/singles_slide.tpl.html'
  }
}
