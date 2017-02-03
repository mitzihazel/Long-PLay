angular.module('longPlay').directive('footer', [footerDirective]);

function footerDirective() {
  return {
    restrict: 'A',
    controller: function($scope, FooterMenu, FooterAddress) {
      $scope.footer_links = [];
      $scope.footer_address = [];

      FooterMenu.index()
        .then(function(data) {
          $scope.footer_links = data.footer_links;
        }
      );
      FooterAddress.index()
        .then(function(data) {
          $scope.footer_address = data.footer_address;
        }
      );
    },
    link: function(scope, element, attrs) {
    },
    templateUrl: 'app/shared/footer/footer.tpl.html'
  }
}
