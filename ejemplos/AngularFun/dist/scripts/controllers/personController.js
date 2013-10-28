(function() {
  var PersonController;

  PersonController = (function() {
    function PersonController($log, $location, personService) {
      var setPeople,
        _this = this;
      setPeople = function() {
        return personService.get().then(function(results) {
          return _this.people = results;
        });
      };
      this.insertPerson = function(person) {
        return personService.save(person).success(function(results) {
          _this.error = '';
          _this.person = {};
          return setPeople();
        }).error(function(results, status) {
          if (status === 403) {
            return _this.error = results;
          }
        }).then(function(results) {
          return results;
        });
      };
      setPeople();
    }

    return PersonController;

  })();

  angular.module('app').controller('personController', ['$log', '$location', 'personService', PersonController]);

}).call(this);
