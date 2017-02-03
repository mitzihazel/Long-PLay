angular.module('longPlay').directive('singleSlideshow', [singleSlideshowDirective]);

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
    link: function(scope, element, attrs) {
    },
    templateUrl: 'app/components/homepage/singles-slideshow/singles_slide.tpl.html'
  }
}
