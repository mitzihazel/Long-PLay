angular.module('longPlay').factory('books',['$q', '$http', booksService]);

function booksService($q, $http, urlConstant) {
  var service = {};
  var apiUrl = '/sample_data/books.php';

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
