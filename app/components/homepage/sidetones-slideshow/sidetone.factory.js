angular.module('longPlay').factory('sidetoneSlider',['$q', '$http', sidetoneSliderService]);

function sidetoneSliderService($q, $http, urlConstant) {
  var service = {};
  var apiUrl = '/sample_data/sidetones_slider.php';

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
