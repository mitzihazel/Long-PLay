angular.module('longPlay').directive('heading', [headingDirective]);

function headingDirective() {
  return {
    restrict: 'A',
    controller: function($scope, SingleFeatured) {
      $scope.single_featured = [];

      SingleFeatured.index()
        .then(function(response) {
          $scope.single_featured = response.single_feature;
        }
      );
    },
    link: function(scope, element, attrs) {
    },
    templateUrl: 'app/components/homepage/heading/heading.tpl.html'
  }
}
