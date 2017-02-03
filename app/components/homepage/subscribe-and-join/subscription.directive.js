angular.module('longPlay').directive('subscribe', [subscriptionDirective]);

function subscriptionDirective() {
  return {
    restrict: 'A',
    controller: function($scope, Subscription) {
      $scope.subscriptions = [];

      Subscription.index()
        .then(function(response) {
          $scope.subscriptions = response.subscribe;
        }
      );
    },
    link: function(scope, element, attrs) {
    },
    templateUrl: 'app/components/homepage/subscribe-and-join/subscription.tpl.html'
  }
}
