angular.module('longPlay').factory('FooterMenu',['$q', '$http', FooterMenuService]);

function FooterMenuService($q, $http, urlConstant) {
  var service = {};
  var apiUrl = '/sample_data/footer_menu.php';

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
