(function() {
  var GitHubController;

  GitHubController = (function() {
    function GitHubController($log, gitHubService) {
      var _this = this;
      this.search = function(searchTerm) {
        return gitHubService.get(searchTerm).then(function(results) {
          return _this.repos = results;
        });
      };
    }

    return GitHubController;

  })();

  angular.module('app').controller('gitHubController', ['$log', 'gitHubService', GitHubController]);

}).call(this);
