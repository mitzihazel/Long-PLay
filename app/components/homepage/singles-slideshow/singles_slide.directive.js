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
          mode: 'horizontal',
          infiniteLoop: false,
          minSlides: 2,
          maxSlides: 2,
          slideWidth: 320,
          slideMargin: 10,
        });
        $(elm).find('.single--related-short').bxSlider({
          minSlides: 2,
          maxSlides: 2,
          slideWidth: 600,
          slideMargin: 50,
        });
      }, 500);
    },
    templateUrl: 'app/components/homepage/singles-slideshow/singles_slide.tpl.html'
  }
}
