(function() {
  var Twitterfy;

  Twitterfy = (function() {
    function Twitterfy($log) {
      return function(username) {
        return "@" + username;
      };
    }

    return Twitterfy;

  })();

  angular.module('app').filter('twitterfy', ['$log', Twitterfy]);

}).call(this);
