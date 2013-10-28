(function() {
  var GitHubService;

  GitHubService = (function() {
    function GitHubService($log, $http, messageService) {
      GitHubService.prototype.get = function(criteria) {
        return $http.jsonp("https://api.github.com/users/" + criteria + "/repos", {
          params: {
            callback: 'JSON_CALLBACK'
          }
        }).success(function(results) {
          return messageService.publish('search', {
            source: 'GitHub',
            criteria: criteria
          });
        }).error(function(results) {
          return $log.error('gitHubService error', results);
        }).then(function(results) {
          return results.data.data;
        });
      };
    }

    return GitHubService;

  })();

  angular.module('app').service('gitHubService', ['$log', '$http', 'messageService', GitHubService]);

}).call(this);
