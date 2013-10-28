(function() {
  var Controller, Tabs;

  Controller = (function() {
    function Controller($log, $scope, $element, $rootScope) {
      var _this = this;
      $scope.tabs = [];
      $scope.select = function(tab) {
        tab.transcluded = true;
        if (tab.selected === true) {
          return;
        }
        angular.forEach($scope.tabs, function(tab) {
          return tab.selected = false;
        });
        return tab.selected = true;
      };
      this.addTab = function(tab, tabId) {
        if ($scope.tabs.length === 0) {
          $scope.select(tab);
        }
        $scope.tabs.push(tab);
        if (tabId) {
          return $rootScope.$on("changeTab#" + tabId, function() {
            return $scope.select(tab);
          });
        }
      };
    }

    return Controller;

  })();

  Tabs = (function() {
    function Tabs($log) {
      return {
        controller: ['$log', '$scope', '$element', '$rootScope', Controller],
        replace: true,
        restrict: 'E',
        scope: {},
        templateUrl: '/views/directives/tabs.html',
        transclude: true
      };
    }

    return Tabs;

  })();

  angular.module('app').directive('appTabs', ['$log', Tabs]);

}).call(this);
