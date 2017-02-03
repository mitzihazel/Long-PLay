angular.module('longPlay').factory('Subscription',['$q', '$http', SubscriptionService]);

function SubscriptionService($q, $http, urlConstant) {
  var service = {};
  var apiUrl = '/sample_data/subscription_data.php';

  service.index = function() {
    var def = $q.defer();
    $http.get(apiUrl)
      .success(function(data){
        def.resolve(data);
      })
      .error(function(response){
        def.reject(response);
      });
    return def.promise;
  }

  return service;
}
