angular.module('longPlay').directive('sidetoneSlider', [sidetoneSliderDirective]);

function sidetoneSliderDirective() {
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
      $(element).find('.sidetones-bxslider').bxSlider();
    },
    templateUrl: 'app/components/homepage/sidetones-slideshow/sidetone.tpl.html'
  }
}
