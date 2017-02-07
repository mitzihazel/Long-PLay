angular.module('longPlay').factory('singles',['$q', '$http', singlesService]);

function singlesService($q, $http, urlConstant) {
  var service = {};
  var apiUrl = '/sample_data/singles.php';

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
