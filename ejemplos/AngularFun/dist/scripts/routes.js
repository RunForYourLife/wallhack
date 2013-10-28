(function() {
  var Routes;

  Routes = (function() {
    function Routes($routeProvider) {
      $routeProvider.when('/github/:id', {
        controller: 'gitHubController'
      }).otherwise({
        redirectTo: '/github'
      });
    }

    return Routes;

  })();

  angular.module('app').config(['$routeProvider', Routes]);

}).call(this);
