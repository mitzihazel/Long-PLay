angular.module('longPlay').directive('singleSlideshow', ['$timeout', singleSlideshowDirective]);

function singleSlideshowDirective() {
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
      $(elm).find('.bxslider').bxSlider();
    },
    templateUrl: 'app/components/homepage/singles-slideshow/singles_slide.tpl.html'
  }
}
