angular.module('longPlay').directive('booksPage', ['$timeout', booksPageDirective]);

function booksPageDirective($timeout) {
  return {
    restrict: 'A',
    controller: function($scope, books) {
      $scope.books = [];

      books.index()
        .then(function(data) {
          $scope.books = data.books;
        }
      );
    },
    link: function(scope, element, attrs) {
      scope.$on('menu-opened', function(event, args) {
        angular.element(".single .container").addClass('push-aside');
      });
      scope.$on('menu-closed', function(event, args) {
        angular.element(".single .container").removeClass('push-aside');
      });
    },
    templateUrl: 'app/components/books/books.tpl.html'
  }
}
