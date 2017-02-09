angular.module('longPlay',[
  'ngRoute',
  'ngSanitize'
]);

angular.module('longPlay')
.filter('to_trusted', ['$sce', function($sce){
      return function(text) {
          return $sce.trustAsHtml(text);
      };
}]);
