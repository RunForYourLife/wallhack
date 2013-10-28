(function() {
  var PersonService;

  PersonService = (function() {
    function PersonService($log, $http) {
      var urlBase;
      urlBase = '/people';
      PersonService.prototype.get = function() {
        return $http.get(urlBase).then(function(results) {
          return results.data;
        });
      };
      PersonService.prototype.getPerson = function(id) {
        return $http.get("" + urlBase + "/" + id).then(function(results) {
          return results.data;
        });
      };
      PersonService.prototype.save = function(person) {
        return $http.post("" + urlBase, person).error(function(results, status) {
          return {
            results: results,
            status: status
          };
        });
      };
    }

    return PersonService;

  })();

  angular.module('app').service('personService', ['$log', '$http', PersonService]);

}).call(this);
