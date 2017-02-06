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
          captions: false,
          minSlides: 2,
          maxSlides: 2,
          slideWidth: 600,
          slideMargin: 10,
          nextSelector: '#swiper-next-singles',
          prevSelector: '#swiper-prev-singles',
        });
        $(elm).find('.single--related-short').bxSlider({
          mode: 'horizontal',
          captions: false,
          minSlides: 2,
          maxSlides: 2,
          slideWidth: 600,
          slideMargin: 50,
          nextSelector: '#swiper--small-next-singles',
          prevSelector: '#swiper--small-prev-singles',
        });
      }, 500);
    },
    templateUrl: 'app/components/homepage/singles-slideshow/singles_slide.tpl.html'
  }
}
