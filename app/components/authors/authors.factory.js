angular.module('longPlay').factory('authors',['$q', '$http', authorsService]);

function authorsService($q, $http, urlConstant) {
  var service = {};
  var apiUrl = '/sample_data/authors.php';

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
