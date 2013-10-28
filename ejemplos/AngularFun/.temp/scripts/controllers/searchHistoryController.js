(function() {
  var SearchHistoryController;

  SearchHistoryController = (function() {
    function SearchHistoryController($log, messageService) {
      var _this = this;
      this.searchHistory = [];
      messageService.subscribe('search', function(name, parameters) {
        return _this.searchHistory.push(parameters);
      });
    }

    return SearchHistoryController;

  })();

  angular.module('app').controller('searchHistoryController', ['$log', 'messageService', SearchHistoryController]);

}).call(this);
