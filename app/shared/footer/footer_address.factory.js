angular.module('longPlay').factory('FooterAddress',['$q', '$http', FooterAddressService]);

function FooterAddressService($q, $http, urlConstant) {
  var service = {};
  var apiUrl = '/sample_data/footer_address.php';

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
