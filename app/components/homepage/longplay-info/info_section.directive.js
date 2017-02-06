angular.module('longPlay').directive('infoBlock', [infoBlockDirective]);

function infoBlockDirective() {
  return {
    restrict: 'A',
    controller: function($scope, longplayInfo) {
      $scope.info = [];

      longplayInfo.index()
        .then(function(data) {
          $scope.info = data.about;
        }
      );
    },
    link: function(scope, element, attrs) {
    },
    templateUrl: 'app/components/homepage/longplay-info/info_section.tpl.html'
  }
}
