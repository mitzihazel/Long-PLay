angular.module('longPlay').factory('longplayInfo',['$q', '$http', longplayInfoService]);

function longplayInfoService($q, $http, urlConstant) {
  var service = {};
  var apiUrl = '/sample_data/info_section.php';

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
