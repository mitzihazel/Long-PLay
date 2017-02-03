angular.module('longPlay').factory('SingleFeatured',['$q', '$http', SingleFeaturedService]);

function SingleFeaturedService($q, $http, urlConstant) {
  var service = {};
  var apiUrl = '/sample_data/featured_single.php';

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
