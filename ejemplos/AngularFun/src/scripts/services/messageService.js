(function() {
  var MessageService;

  MessageService = (function() {
    function MessageService($log, $rootScope) {
      MessageService.prototype.publish = function(name, parameters) {
        parameters.timeStamp = Date.now();
        return $rootScope.$broadcast(name, parameters);
      };
      MessageService.prototype.subscribe = function(name, listener) {
        return $rootScope.$on(name, listener);
      };
    }

    return MessageService;

  })();

  angular.module('app').service('messageService', ['$log', '$rootScope', MessageService]);

}).call(this);
