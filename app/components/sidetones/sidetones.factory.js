angular.module('longPlay').factory('sidetones',['$q', '$http', sidetonesService]);

function sidetonesService($q, $http, urlConstant) {
  var service = {};
  var apiUrl = '/sample_data/sidetones.php';

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
