(function() {
  var Tab;

  Tab = (function() {
    function Tab($log) {
      var link;
      link = function(scope, element, attrs, controller) {
        return controller.addTab(scope, attrs.tabId);
      };
      return {
        link: link,
        locals: {
          transcluded: '@'
        },
        replace: true,
        require: '^appTabs',
        restrict: 'E',
        scope: {
          caption: '@',
          selected: '@'
        },
        templateUrl: '/views/directives/tab.html',
        transclude: true
      };
    }

    return Tab;

  })();

  angular.module('app').directive('appTab', ['$log', Tab]);

}).call(this);
