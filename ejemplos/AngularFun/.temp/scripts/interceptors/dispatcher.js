(function() {
  var Dispatcher, Interceptor;

  Dispatcher = (function() {
    function Dispatcher($log, $rootScope, $q) {
      return {
        response: function(response) {
          $rootScope.$broadcast("success:" + response.status, response);
          return response;
        },
        responseError: function(response) {
          $rootScope.$broadcast("error:" + response.status, response);
          return $q.reject(response);
        }
      };
    }

    return Dispatcher;

  })();

  Interceptor = (function() {
    function Interceptor($httpProvider) {
      $httpProvider.interceptors.push(['$log', '$rootScope', '$q', Dispatcher]);
    }

    return Interceptor;

  })();

  angular.module('app').config(['$httpProvider', Interceptor]);

}).call(this);
